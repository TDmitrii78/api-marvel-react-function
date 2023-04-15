import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spiner from '../spiner/Spiner';
import Error from '../error/Error';

import ServiceMarvel from '../../services/ServiceMarvel';

import './comicsList.css';


const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [startOffset, setStartOffset] = useState(0);
    const [offset, setOffset] = useState(null);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const [buttonOff, setButtonOff] = useState(false);


    const serviceMarvel = new ServiceMarvel();

    const getAllComics = (offset) => {
        loadServ();
        serviceMarvel.getAllComics(offset)
        .then(res => loadOk(res))
        .catch(() => loadError());
    }

    const loadServ = () => {
        setLoad(true);
        setError(false);
    }

    const loadOk = (res) => {
        let ended = false;
        if (res.data.results.length < 8) {
            ended = true;
        }
        setComics([...comics, ...res.data.results])
        setLoad(false)
        setError(false);
        setButtonOff(ended);
    }

    const loadError = () => {
        setLoad(false);
        setError(true);
    }

    useEffect(() => {
        setOffset(startOffset);
    }, [])

    useEffect(() => {
        getAllComics(offset);
    }, [offset])

    const onNextComics = () => {
        setOffset(offset => offset + 8)
    }

    const spiner = (load) ? <Spiner/> : null;
    const errorMes = (error) ? <Error/> : null;
    const content = true ? <Content 
                                buttonOff={buttonOff}
                                load={load}
                                comics={comics}
                                onNextComics={onNextComics} 
                            /> : null;

    return (
        <div className="comics__list">
            {content}
            {spiner}
            {errorMes}
        </div>
    )
}

const Content = (props) => {
    const {buttonOff, load, comics, onNextComics} = props;

    return (
        <>
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {
                        comics.map((el, i) => {
                            return (
                                <CSSTransition key={i} timeout={500} classNames="comics__item">
                                    <li     
                                        key={i}
                                        className="comics__item">
                                        <Link to={`/comics/${el.id}`}>
                                            <img src={el.thumbnail.path + `.` + el.thumbnail.extension} alt="ultimate war" className="comics__item-img"/>
                                            <div className="comics__item-name">{el.title}</div>
                                            <div className="comics__item-price">{el.prices[0].price ? el.prices[0].price : `out of stock `}$</div>
                                        </Link>
                                    </li>
                                </CSSTransition>
                            )
                        })
                    }
                </TransitionGroup>
            </ul>
            <button
                style={load || buttonOff ? {"display" : "none"} : {"display" : "block"}}
                onClick={onNextComics}
                onKeyDown={key => { return (key === 'enter') ? onNextComics() : null}}
                className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </>
    )
}

export default ComicsList;