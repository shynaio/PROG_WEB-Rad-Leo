import { API } from '../constants/api';

/**
 * Toutes les fonctions dans cette classes effectuent une requête et retournent la réponse.
 * Certains d'entre elles ont une méthode différente de GET, (i.e. PATCH et POST) qui nécessite
 * le passage des headers et de la donnée à ajouter dans body.
 */
export class PokemonAPI {
    static fetchAllPokemons = async () => {
        const response = await fetch(API.fetchAllPokemons.url, { method: API.fetchAllPokemons.method });
        const data = await response.json();
        return data;
    }

    static fetchPokemonById = async (id) => {
        const url = API.fetchPokemon.url + id;
        const response = await fetch(url, { method: API.fetchPokemon.method });
        const data = await response.json();
        return data;
    }

    static getPokemonSpriteByIdURL = (id) => {
        return API.fetchPokemonSprite.url + id + '.svg';
    }
};