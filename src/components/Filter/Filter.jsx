import { useRef } from "react";
import { FaFilter } from "react-icons/fa6";

import s from './Filter.module.css';

//Component qui permet d'afficher la barre de filtre
export const Filter = ({onChange}) => {
    const filterInput = useRef();

    const getFilterValue = () => {
        return onChange(filterInput.current.value);
    }

    return (
        <div className={s.filter}>
            <div className={s.iconContainer}><FaFilter /></div>
            <input ref={filterInput} onKeyUp={getFilterValue} className={s.filterInput} type="text" placeholder="Filter the pokemon list, ex: Pikachu"></input>
        </div>
    );
};