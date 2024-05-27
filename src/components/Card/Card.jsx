import { Link } from 'react-router-dom';
import s from './Card.module.css'

export const Card = ({imageSrc, title, tags}) => {

    return (
        <div className={s.card}>
            <div className={s.cardImageContainer}><img className={s.cardImage} src={imageSrc}/></div>
            <div className={s.cardTitle}>{ title }</div>
            <div className={s.tags}>
                {tags.map(tag => {
                    return <span className={s.tag} style={{backgroundColor: tag.color}} key={tag.value}>{ tag.value }</span>
                })}
            </div>
        </div>
    );
}