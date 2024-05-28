import { Card } from '../Card/Card';
import s from './CardList.module.css';

//Component qui permet d'afficher les differentes Card des Pokémons
export const CardList = ({data}) => {
    return (
        <div className={s.cardList}>
            {data.map(datum => {
                return (<Card imageSrc={datum.imageSrc} title={datum.title} tags={datum.tags} key={datum.id} linkTo={datum.linkTo}/>)
            })}
        </div>
    );
};