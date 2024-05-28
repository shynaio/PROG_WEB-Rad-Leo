import { Link } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { ROUTES } from '../../routes/routes';

import MissingNo from '/svg/MissingNo.svg'
import s from './NotFoundPage.module.css';

//Affichage de la page d'erreur d'url
export const NotFoundPage = () => {
    return (
        <div className={s.pageContainer}>
            <Header/>
            <div className={s.card}>
                <div className={s.cardImageContainer}>
                    <img src={MissingNo} draggable="false"/>
                    <div className={s.shadow}></div>
                </div>
                <div className={s.cardContentContainer}>
                    <h2>Looks like you found Missingno!</h2>
                    The resource you were trying to find does not exist.
                    <p>Click <Link to={ROUTES.index} className={s.link}>here</Link> to go back to the home page.</p>
                </div>
            </div>
        </div>
    );
}