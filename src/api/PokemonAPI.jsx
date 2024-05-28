import { API } from '../constants/api';

/**
 * Toutes les fonctions dans cette classes effectuent une requête et retournent la réponse.
 * Certains d'entre elles ont une méthode différente de GET, (i.e. PATCH et POST) qui nécessite
 * le passage des headers et de la donnée à ajouter dans body.
 */
export class PokemonAPI {
    //Récupère la liste de tout les pokemons et return la data
    static fetchAllPokemons = async () => {
        try {
            const response = await fetch(API.fetchAllPokemons.url, { method: API.fetchAllPokemons.method });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in fetchAllPokemons', error);
            return null;
        }
    }

    //Récupère les informations d'un pokemon par sont ID et return la data
    static fetchPokemonById = async (id) => {
        try {
            const url = API.fetchPokemon.url + id;
            const response = await fetch(url, { method: API.fetchPokemon.method });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in fetchPokemonById', error);
            return null;
        }
    }

    //Récupère l'image d'un pokemon par sont ID et return la data
    static getPokemonSpriteByIdURL = (id) => {
        return API.fetchPokemonSprite.url + id + '.svg';  
    }

    //Récupère les commentaires d'un pokemon par sont ID et return la data
    static fetchPokemonReviewsById = async (id) => {
        try {
            const url = API.fetchPokemonReviews.url + id;
            const response = await fetch(url, { method: API.fetchPokemonReviews.method });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in fetchPokemonReviewsById', error);
            return null;
        }
    }

    //Récupère les commentaires d'un pokemon par sont ID, rajoute un commentaire et return la data
    static addPokemonReviewById = async (id, commentData) => {
        try {
            const url = API.addPokemonReview.url + id;
            const response = await fetch(url, {
                method: API.addPokemonReview.method,
                headers: API.addPokemonReview.headers,
                body: commentData
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in addPokemonReviewById', error);
            return null;
        }
    }
    //Récupère le nombre de like d'un pokemon par sont ID, en rajoute 1 et return la data
    static likePokemonById = async (id, pokemonData) => {
        try {
            const url = API.likePokemon.url + id;
            const response = await fetch(url, {
                method: API.likePokemon.method,
                headers: API.likePokemon.headers,
                body: pokemonData
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error in likePokemonById', error);
            return null;
        }
    }

}