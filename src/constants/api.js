//Les differentes constantes utilisées lors des appels à l'api
export const API = Object.freeze({
    'fetchPokemonSprite': {
        'method': 'GET',
        'url': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/'
    },
    'fetchAllPokemons': {
        'method': 'GET',
        'url': 'http://localhost:3001/pokemons'
    },
    'fetchPokemon': {
        'method': 'GET',
        'url': 'http://localhost:3001/pokemons/'
    },
    'fetchPokemonReviews': {
        'method': 'GET',
        'url': 'http://localhost:3001/reviews?pokemonId='
    },
    'addPokemonReview': {
        'method': 'POST',
        'headers': { 'Content-Type': 'application/json' },
        'url': 'http://localhost:3001/reviews?pokemonId='
    },
    'likePokemon': {
        'method': 'PATCH',
        'headers': { 'Content-Type': 'application/json' },
        'url': 'http://localhost:3001/pokemons/'
    }
});