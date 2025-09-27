import React, { useState, useRef, useEffect } from 'react';
import { useSearch, useFavorites } from '../../hooks/useUserHooks';

const SearchInput = () => {
    const { searchTerm, setSearchTerm, clearSearch, showFavoritesOnly, toggleFavoritesFilter } = useSearch();
    const { favoritesCount } = useFavorites();
    const [inputValue, setInputValue] = useState(searchTerm || '');
    const inputRef = useRef(null);
    
    // Sincronizar o valor do input com o searchTerm do store
    useEffect(() => {
        setInputValue(searchTerm || '');
    }, [searchTerm]);

    // Lidar com mudanças no input
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Submeter a busca
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(inputValue.trim());
    };

    // Limpar a busca
    const handleClearSearch = () => {
        setInputValue('');
        clearSearch();
        inputRef.current?.focus();
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                {/* Campo de busca */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Buscar por nome ou email..."
                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {inputValue && (
                        <button
                            type="button"
                            onClick={handleClearSearch}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Checkbox de favoritos */}
                    <div className="flex items-center">
                        <input
                            id="favorites-only"
                            type="checkbox"
                            checked={showFavoritesOnly}
                            onChange={toggleFavoritesFilter}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="favorites-only" className="ml-2 block text-sm text-gray-700">
                            Mostrar apenas favoritos
                            {favoritesCount > 0 && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                    {favoritesCount}
                                </span>
                            )}
                        </label>
                    </div>
                    {/* Botões de ação */}
                    <div className="flex space-x-2">
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Limpar filtros
                            </button>
                        )}
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SearchInput;
