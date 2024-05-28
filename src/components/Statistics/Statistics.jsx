import s from './Statistics.module.css';

//Component qui permet d'afficher les differents statistics du pokemon
export const Statistics = ({data}) => {
    return (
        <div className={s.pokemonStatistics}>
            {data && data.map(stat => {
                return (
                    <div className={s.statisticsLine} key={stat.name}>
                        <div>{ stat.name }</div>
                        <div>{ stat.value }</div>
                        <progress max={100} value={stat.factor} color={stat.color}></progress>
                    </div>
                );
            })}
        </div>
    );
};