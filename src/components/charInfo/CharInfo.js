import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import ServiceMarvel from "../../services/ServiceMarvel";
import Spiner from '../spiner/Spiner';
import Error from '../error/Error';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.css';

const CharInfo = (props) => {

    const [character, setCharacter] = useState({comics: []});
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const [id, setId] = useState(null);

    const serviceMarvel = new ServiceMarvel();

    const loadServ = (id) => {
        setLoad(true);
        setError(false);
        setId(id);
        return serviceMarvel.getRequestCharacter(id);
    }

    const loadOk = (res) => {
        setCharacter(res);
        setLoad(false);
        setError(false);
    }

    const loadError = (res) => {
        setLoad(false);
        setError(true);
    }

    const getCharacter = (id) => {
        loadServ(id)
        .then(res => loadOk(res))
        .catch(res => loadError(res));
    }

    useEffect(() => {
        if (props.id) {
            getCharacter(props.id);
        }

    }, [props.id])

    const skeleton = (id) ? null : <Skeleton/>;
    const errorMes = (error) ? <Error/> : null;
    const spiner = (load) ? <Spiner/> : null;
    const content = (!error && !load && id) ? <Content character={character}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {spiner}
            {errorMes}
            {content}
        </div>
    )
}

const Content = (props) => {
    const {name, thumbnail, homepage, Wiki, description, comics} = props.character;

    let styleImg = {"objectFit": "cover"};
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        styleImg = {"objectFit": "unset"};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="character" style={styleImg}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={Wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">

                {(description !== "") ? description: "Not information"}

            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

                {(comics.length) ? null : 'Not comics.'}
                {
                    comics.map((el, i) => {
                        if (i < 9) {
                            let id = el.resourceURI.split('/').reverse()[0];
                            return <li className="char__comics-item" key={i}>
                                        <Link to={`/comics/${id}/`}>
                                            {el.name}
                                        </Link>
                                    </li>
                        }
                        return null
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    id: PropTypes.number
}

Content.propTypes = {
    name: PropTypes.string, 
    thumbnail: PropTypes.string,
    homepage: PropTypes.string, 
    Wiki: PropTypes.string,
    description: PropTypes.string,
    comics: PropTypes.array
}

export default CharInfo;