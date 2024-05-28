import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { PokemonAPI } from "../../api/PokemonAPI";
import { Header } from "../../components/Header/Header";

import { MAX_STAT, PKMN_TYPES } from "../../constants/pokemon";

import s from './PokemonPage.module.css';
import { CommentList } from "../../components/CommentList/CommentList";
import { Likes } from "../../components/Likes/Likes";
import { Statistics } from "../../components/Statistics/Statistics";

export const PokemonPage = () => {
    const [pokemon, setPokemon] = useState({});
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const idValid = (id > 0 && id < 152);
    
    /**
     * On se protège d'effectuer des requêtes avec des identifiants invalides,
     * puis on charge les données du pokemon et les avis.
     */
    useEffect(() => {
        if (!idValid) return;
        loadPokemonData();
        loadReviews();
    }, [id]);

    const loadPokemonData = async () => {
        const pokemonData = await PokemonAPI.fetchPokemonById(id);
        setPokemon(parsePokemonData(pokemonData));
    }

    /**
     * On prend les données chargés depuis l'API, et on ajoute des propriétés telles que l'image à afficher,
     * le tableau des types avec les couleurs, ou encore les statistiques que l'on calcule.
     */
    const parsePokemonData = (pokemonData) => {
        pokemonData.imageSrc = PokemonAPI.getPokemonSpriteByIdURL(id);
        pokemonData.types = pokemonData.types.map(type => {
            return {
                value: type,
                color: PKMN_TYPES.find(t => t.name == type.toLowerCase()).color
            }
        });
        pokemonData.statistics = Object.keys(pokemonData.base).map(stat => {
            const factor = Math.round((pokemonData.base[stat] / MAX_STAT[camelCase(stat)]) * 100);
            return {
                name: stat,
                value: pokemonData.base[stat],
                factor: factor,
                color: factorToColor(factor)
            }
        });

        return pokemonData;
    }

    const loadReviews = async () => {
        const reviewsData = await PokemonAPI.fetchPokemonReviewsById(id);
        setReviews(reviewsData);
    }

    /**
     * Cette fonction permet de donner des noms à des seuils de valeurs pour l'affichage des
     * statistiques.
     */
    const factorToColor = (value) => {
        if (value < 25) return 'bad';
        if (value < 50) return 'low';
        if (value < 75) return 'ok';
        return 'good';
    }

    /**
     * Cette fonction permet de prendre le nom de la statistique et l'écrire en camel case pour
     * pouvoir la récupérer directement dans les constantes.
     */
    const camelCase = (str) => {
        return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    }

    /**
     * Fonction appelée lors du like d'un pokemon. On met à jour la valeur dans une copie de l'objet,
     * et on effectue une requête patch.
     */
    const likePokemonCallback = () => {
        let updatedLikes = pokemon.like | 0;
        updatedLikes = (updatedLikes) ? updatedLikes + 1 : 1;
        
        const updatedPokemon = { ...pokemon, like: updatedLikes };
        setPokemon(updatedPokemon);

        PokemonAPI.likePokemonById(id, JSON.stringify({ like: updatedLikes }));
    }

    /**
     * Fonction appelée lors de l'ajout d'un avis sur un pokemon.
     * On effectue une requête post pour ajouter le commentaire.
     */
    const postReviewCallback = (review) => {
        review.pokemonId = id;
        const updatedReviews = [...reviews, review];

        setReviews(updatedReviews);

        PokemonAPI.addPokemonReviewById(id, JSON.stringify(review));
    };

    /**
     * Si l'identifiant est valide, on affiche les différents composants.
     * Sinon on affiche un message d'erreur.
     */
    const renderPage = () => {
        if (!idValid) {
            return (
                <div>This pokemon is not in our list!</div>
            );
        } else {
            return (
                <>
                    <div className={s.pokemonDetails}>
                        <div className={s.pokemonImageContainer}>
                            <img className={s.pokemonImage} src={pokemon.imageSrc}/>
                        </div>
                        <div className={s.pokemonDataContainer}>
                            <h2>{ pokemon.name } <Likes countValue={pokemon.like} callback={likePokemonCallback}/></h2>
                            <div className={s.pokemonTypes}>
                                {pokemon.types && pokemon.types.map(type => {
                                    return <span className={s.type} style={{backgroundColor: type.color}} key={type.color}>{ type.value }</span>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={s.pokemonStatisticsContainer}>
                        <Statistics data={ pokemon.statistics }/>
                    </div>
                    <div className={s.reviewsBlock}>
                        <CommentList data={ reviews } callback={ postReviewCallback }/>
                    </div>
                </>
            )
        }
    };

    return (
        <div className={s.pokemonPage}>
            <Header/>
            <div className={s.pokemonDetailsContainer}>
                { renderPage() }
            </div>
        </div>
    );
};