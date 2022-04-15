import { AccountInfo, AuthenticationResult, AuthError, InteractionStatus, InteractionType, PopupRequest, PublicClientApplication, RedirectRequest, SilentRequest } from "@azure/msal-browser";
import { getCurrentInstance, ref, Ref, toRefs, watch } from "vue";

export type MsalContext = {
    instance: PublicClientApplication,
    accounts: Ref<AccountInfo[]>,
    inProgress: Ref<InteractionStatus>
}

export function useMsal(): MsalContext {
    const interalInstance = getCurrentInstance();
    if(!interalInstance) {
        throw "useMsal() cannot be called outside the setup() function of a component";
    }
    const {instance, accounts, inProgress} = toRefs(interalInstance.appContext.config.globalProperties.$msal);

    if(!instance || !accounts || !inProgress) {
        throw "Please install the msalPlugin";
    }

    if(inProgress.value === InteractionStatus.Startup) {
        instance.value.handleRedirectPromise().catch(() => {
            // Errors should be handled by listening to the LOGIN_FAILURE event
            return;
        });
    }

    return {
        instance: instance.value,
        accounts,
        inProgress
    }
}

export function useIsAuthenticated(): Ref<boolean> {
    const { accounts } = useMsal();
    const isAuthenticated = ref(accounts.value.length > 0);

    watch(accounts, () => {
        isAuthenticated.value = accounts.value.length > 0;
    });

    return isAuthenticated;
}

export function getAccountInfo(): AccountInfo[] {
    return useMsal().accounts.value;
}

export type MsalAuthenticationResult = {
    acquireToken: any;
    result: any;
    error: Ref<AuthError|null>;
    inProgress: Ref<boolean>;
}

export function useMsalAuthentication(interactionType: InteractionType, request: PopupRequest|RedirectRequest|SilentRequest): MsalAuthenticationResult {
    const { instance, inProgress } = useMsal();

    const localInProgress = ref<boolean>(false);
    const result = ref<AuthenticationResult|null>(null);
    const error = ref<AuthError|null>(null);

    const acquireToken = async (requestOverride?: PopupRequest|RedirectRequest|SilentRequest) => {
        if (!localInProgress.value) {
            localInProgress.value = true;
            const tokenRequest = requestOverride || request;

            if (inProgress.value === InteractionStatus.Startup || inProgress.value === InteractionStatus.HandleRedirect) {
                try {
                    const response = await instance.handleRedirectPromise()
                    if (response) {
                        result.value = response;
                        error.value = null;
                        return;
                    }
                } catch (e) {
                    result.value = null;
                    error.value = e as AuthError;
                    return;
                }
            }

            try {
                const response = await instance.acquireTokenSilent(tokenRequest);
                result.value = response;
                error.value = null;
            } catch(e) {
                if (inProgress.value !== InteractionStatus.None) {
                    return;
                }

                if (interactionType === InteractionType.Popup) {
                    instance.loginPopup(tokenRequest).then((response) => {
                        result.value = response;
                        error.value = null;
                    }).catch((e) => {
                        error.value = e;
                        result.value = null;
                    });
                } else if (interactionType === InteractionType.Redirect) {
                    await instance.loginRedirect(tokenRequest).catch((e) => {
                        error.value = e;
                        result.value = null;
                    });
                }
            }
            localInProgress.value = false;
        }
    }

    const stopWatcher = watch(inProgress, () => {
        if (!result.value && !error.value) {
            acquireToken();
        } else {
            stopWatcher();
        }
    });

    acquireToken();
    
    return {
        acquireToken,
        result,
        error,
        inProgress: localInProgress
    }
}