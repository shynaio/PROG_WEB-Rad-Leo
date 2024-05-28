import { Link } from 'react-router-dom';
import s from './Card.module.css'

//Component qui permet d'afficher une Card de Pokémon
export const Card = ({imageSrc, title, tags , linkTo}) => {

    return (
        <Link to={linkTo}>
        <div className={s.card}>
            <div className={s.cardImageContainer}><img className={s.cardImage} src={imageSrc}/></div>
            <div className={s.cardTitle}>{ title }</div>
            <div className={s.tags}>
                {tags.map(tag => {
                    return <span className={s.tag} style={{backgroundColor: tag.color}} key={tag.value}>{ tag.value }</span>
                })}
            </div>
        </div>
        </Link>
    );
}