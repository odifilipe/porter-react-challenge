const { info } = require("autoprefixer");

const BASE_URL = 'https://randomuser.me/api/';
const DEFAULT_PARAMS = {
    results: 25,
    seed: 'abc',
    inc: 'login,name,email,picture,phone,registered'
};

class UserService {
    /** 
    * Contruir URL com os parâmetros da requisição
    * @param {Object} params - Parâmetros da requisição
    * @returns {string} - URL completa
    **/
    buildURL(params = {}) {
        const urlParams = new URLSearchParams({
            ...DEFAULT_PARAMS,
            ...params
        });
        return `${BASE_URL}?${urlParams.toString()}`;
    }

    /**
     * Fazer requisição com tratamento de erros
     * @param {string} url - URL da requisição
     * @returns {Promise} - Resposta da API
     * **/
    async makeRequest(url) {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    }

    /** 
     * Buscar usuários da API
     * @param {number} page - Página a ser consultada
     * @param {number} results - Quantidade de resultados por página
     * @returns {Promise} - Lista de usuários
     * **/
    async getUsers(page = 1, results = 25) {
        try {
            const url = this.buildURL({ page, results });
            const data = await this.makeRequest(url);

            return {
                users: data.results || [],
                info: data.info || {},
                success: true,
                error: null
            };
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);

            let errorMessage = 'Erro ao carregar usuários';

            if (error.message.includes('HTTP Error')) {
                errorMessage = `Erro do servidor: ${error.message}`;
            }

            return {
                users: [],
                info: {},
                success: false,
                error: errorMessage
            };
        }
    }
}

export const userService = new UserService();