/**
 * Formatar dados do usuário da API
 * @param {Object} rawUser - Dados brutos da API
 * @returns {Object} - Usuário formatado
 */
export const formatUser = (rawUser) => {
    if (!rawUser) return null;

    return {
        id: rawUser.login?.uuid || Math.random().toString(),
        name: {
            first: rawUser.name?.first || '',
            last: rawUser.name?.last || '',
            full: `${rawUser.name?.first || ''} ${rawUser.name?.last || ''}`.trim()
        },
        email: rawUser.email || '',
        picture: {
            thumbnail: rawUser.picture?.thumbnail || '',
            medium: rawUser.picture?.medium || '',
            large: rawUser.picture?.large || ''
        },
        gender: rawUser.gender || '',
        nat: rawUser.nat || '',
        phone: rawUser.phone || '',
        registered: rawUser.registered?.date || '',
        // Campos adicionais
        isFavorite: false,
        searchableText: `${rawUser.name?.first || ''} ${rawUser.name?.last || ''} ${rawUser.email || ''}`.toLowerCase()
    };
};

/**
 * Filtrar usuários por termo de busca
 * @param {Array} users - Lista de usuários
 * @param {string} searchTerm - Termo de busca
 * @returns {Array} - Usuários filtrados
 */
export const filterUsersBySearch = (users, searchTerm) => {
    if (!searchTerm.trim()) return users;

    const term = searchTerm.toLowerCase();
    return users.filter(user =>
        user.searchableText.includes(term)
    );
};

/**
 * Filtrar apenas usuários favoritos
 * @param {Array} users - Lista de usuários
 * @returns {Array} - Apenas usuários favoritos
 */
export const filterFavoriteUsers = (users) => {
    return users.filter(user => user.isFavorite);
};