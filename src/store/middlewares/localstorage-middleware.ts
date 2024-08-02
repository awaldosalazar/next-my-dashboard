import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";

export const localStorageMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => (action: Action) => {
        next(action);

        if (action.type.includes(`pokemons/toggleFavorite`)) {
            const { pokemons } = state.getState() as RootState;
            localStorage.setItem('favorites-pokemons', JSON.stringify(pokemons));
        }
    }
}                