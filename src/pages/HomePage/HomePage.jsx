import { Header } from "../../components/Header/Header";
import { CardList } from "../../components/CardList/CardList";
import { PokemonAPI } from "../../api/PokemonAPI";
import { useEffect, useState } from "react";
import { PKMN_TYPES } from "../../constants/pokemon";
import { Filter } from "../../components/Filter/Filter";

import s from './HomePage.module.css';
import { ROUTES } from "../../routes/routes";

export const HomePage = () => {
    const [pokemons, setPokemons] = useState([]);
    const [filter, setFilter] = useState('');
    
    useEffect(() => {
        loadPokemons();
    }, [filter]);

    /**
     * Cette fonction récupère les pokemons en filtrant selon son nom et ses types.
     * On récupère aussi l'image à afficher.
     * On met en forme un objet avec les propriétés dont on a besoin seulement.
     */
    const loadPokemons = async () => {
        const pokemons = await PokemonAPI.fetchAllPokemons();

        const data = pokemons
            .filter(pokemon => pokemon.name.toLowerCase().includes(filter) || pokemon.types.map(t => t.toLowerCase()).find(t => t.includes(filter)))
            .map(pokemon => {
            return {
                'imageSrc': PokemonAPI.getPokemonSpriteByIdURL(pokemon.id),
                'title': '#' + pokemon.id + ' ' + pokemon.name,
                'tags': pokemon.types.reduce(bakeType, []),
                'linkTo': ROUTES.pokemon + '/' + pokemon.id,
                'id': pokemon.id
            }
        });

        setPokemons(data);
    }

    const updateFilter = (filter) => {
        setFilter(filter.toLowerCase());
    }

    /**
     * Cette fonction permet de fabriquer un tableau avec les types du pokémon, en faisant l'association
     * du nom du type et de sa couleur en hexadécimal.
     */
    const bakeType = (array, type) => {
        array.push({
            value: type,
            color: PKMN_TYPES.find(t => t.name == type.toLowerCase()).color
        });

        return array;
    }

    /**
     * On affiche le composant qui liste les cards ou on indique que la recherche n'a pas retourné
     * de résultat.
     */
    const renderCardList = () => {
        if (pokemons.length > 0) return <CardList data={ pokemons }/>
        return <div className={s.noResult}>No results for query: "{ filter }"</div>
    }

    return (
        <div className={s.homePage}>
            <Header/>
            <Filter onChange={ updateFilter }/>
            { renderCardList() }
        </div>
    );
};