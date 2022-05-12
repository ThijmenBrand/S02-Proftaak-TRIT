export default interface CookieShape {
  ShowCookieBanner: boolean;
  AcceptedAllCookies: boolean;
  AcceptedAnalyticalCookies?: boolean;
  AcceptedFunctionalCookies?: boolean;
}

export class BaseCookieShape implements CookieShape {
  ShowCookieBanner;
  AcceptedAllCookies;
  AcceptedAnalyticalCookies?;
  AcceptedFunctionalCookies?;

  constructor(opts: CookieShape) {
    this.ShowCookieBanner = opts.ShowCookieBanner;
    this.AcceptedAllCookies = opts.AcceptedAllCookies;
    this.AcceptedAnalyticalCookies = opts.AcceptedAnalyticalCookies;
    this.AcceptedFunctionalCookies = opts.AcceptedFunctionalCookies;
  }
}
