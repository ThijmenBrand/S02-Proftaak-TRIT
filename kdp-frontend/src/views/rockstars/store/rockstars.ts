import { RockstarShape } from "@/models/Rockstar";
import Axios from 'axios';
import ArticleShape from "@/models/Article";

interface rockstarState {
    rockstar : RockstarShape;
    articles : ArticleShape[];
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
            articles: [],
        };
    },
    getters: {
        getRockstar: (state: rockstarState): RockstarShape => {
            return state.rockstar;
        },
        getArticles: (state: rockstarState): ArticleShape[] => {
            return state.articles;  
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
        getArticles: async ({ commit }: any, rockstarId: string) => {
            const { data, status } = await Axios.get(
                `https://rockstar-api.azurewebsites.net/api/article/GetArticlesByRockstar/${rockstarId}`
            );

            if (status >= 200 && status <= 299) {
                commit('SET_ARTICLES', data);
            }
        },
    },
    mutations: {
        SET_ROCKSTAR: (state: rockstarState, data: RockstarShape) => {
            state.rockstar = data;
        },
        SET_ARTICLES: (state: rockstarState, data: ArticleShape[]) => {
            state.articles = data;  
        },
    },
};

export default rockstar;