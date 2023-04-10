import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import ServiceMarvel from '../../services/ServiceMarvel';
import Spiner from '../spiner/Spiner';
import Error from '../error/Error';

import './singleComicPage.css';


const SingleComic = () => {
    const {comicsId} = useParams();
    const [comics, setComics] = useState(null);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
 
    const serviceMarvel = new ServiceMarvel();

    useEffect(() => {
        getComics(comicsId);
    }, [comicsId])

    const loadServ = () => {
        setLoad(true);
        setError(false);
    }

    const loadError = () => {
        setError(true);
        setLoad(false);
    }

    const loadOk = () => {
        setLoad(false);
        setError(false);
    }

    const getComics = (id) => {
        loadServ();
        serviceMarvel.getComics(id).
        then(res => {
            setComics(...res.data.results);
            loadOk();
        })
        .catch(() => loadError());
    }

    const errorMes = error ? <Error/> : null;
    const spiner = load ? <Spiner/> : null;
    const content = !load && !error && comics ? <Content comics={comics}/> : null;
        
    return (
        <div className="single-comic">
            {content}
            {spiner}
            {errorMes}
        </div>
    )
}

const Content = (props) => {

    const {thumbnail, title, description, prices, pageCount, textObjects} = props.comics;

    return (
        <>  
            <img src={thumbnail.path + '.' + thumbnail.extension} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description ? description : 'Not information.'}</p>
                <p className="single-comic__descr">{pageCount ? pageCount : 'not information'} pages</p>
                <p className="single-comic__descr">Language: {textObjects.length ? textObjects[0].language : 'not information'}</p>
                <div className="single-comic__price">{prices[0].price ? prices[0].price : `out of stock `}$</div>
            </div>
            <Link to='/comics/' className="single-comic__back">Back to all</Link>
       </>
    )
}


Content.propTypes = {
    comics: PropTypes.object
}

export default SingleComic;