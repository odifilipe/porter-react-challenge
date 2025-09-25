import React from "react";

export const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
);

export const ErrorState = ({ error, onRetry }) => (
    <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Algo deu errado</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
        {onRetry && (
            <button
                onClick={onRetry}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
                Tentar novamente
            </button>
        )}
    </div>
);

export const EmptyState = ({ message = "Nenhum usuário encontrado", showFavoritesHint = false }) => (
    <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">
            {showFavoritesHint ? '❤️' : '👤'}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
        {showFavoritesHint && (
            <p className="text-gray-600 max-w-md mx-auto">
                Favorite alguns usuários para vê-los aqui!
            </p>
        )}
    </div>
);