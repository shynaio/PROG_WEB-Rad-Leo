import { Link } from 'react-router-dom';

import pokeball from '/img/pokeball.png'
import pokedexLogo from '/img/pokedex.png'
import s from './Header.module.css';
import { ROUTES } from '../../routes/routes';

export const Header = () => {
    return (
        <div className={s.header}>
            <Link to={ROUTES.index}><img src={pokeball}/></Link>
            <Link to={ROUTES.index}><img src={pokedexLogo}/></Link>
        </div>
    );
};