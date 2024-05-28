import { useEffect } from "react";
import { useState } from "react";
import { IoHeartSharp } from "react-icons/io5";

import s from './Likes.module.css';

//Component qui permet d'afficher le like ainsi que sa valeur
export const Likes = ({countValue, callback}) => {
    return (
        <div className={s.likesContainer} onClick={callback}>
            <span className={s.heart} style={{ color: (countValue > 0) ? '#FF5050' : 'inherit' }}><IoHeartSharp /></span> {countValue | 0}
        </div>
    );
};