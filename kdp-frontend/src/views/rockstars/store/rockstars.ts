import { RockstarShape } from "@/models/Rockstar";
import Axios from 'axios';

interface rockstarState {
    rockstar : RockstarShape;
}

const rockstar = {
    namespaced: true,
    state(): rockstarState {
        return {
            rockstar: {
                id: '',
                name: '',
                description: '',
            },
        };
    },
    getters: {
        getRockstar: (state: rockstarState): RockstarShape => {
            return state.rockstar;
        },
    },
    actions: {
        getRockstar: async ({ commit }: any, rockstarId: string) => {
            const { data, status } = await Axios.get(
            `https://rockstar-api.azurewebsites.net/api/rockstar/${rockstarId}`
            );
            
            if (status >= 200 && status <= 299) {
                commit('SET_ROCKSTAR', data);
            }
        },       
    },
    mutations: {
        SET_ROCKSTAR: (state: rockstarState, data: RockstarShape) => {
            state.rockstar = data;
        },
    },
};

export default rockstar;