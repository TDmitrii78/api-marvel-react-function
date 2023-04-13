import {useEffect, useState} from "react";

import PropTypes from 'prop-types';

import ServiceMarvel from "../../services/ServiceMarvel";
import Spiner from "../spiner/Spiner";
import Error from "../error/Error";

import './randomChar.css';

import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = (props) => {

    const [character, setCharacter] = useState({});
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);

    const serviceMarvel = new ServiceMarvel();

    const randomCharacter = () => {
        return `${Math.floor(Math.random() * (1011400 - 1011000) + 1011000)}`;
    }

    const loadServ = (id) => {
        setLoad(true);
        setError(false)
        return serviceMarvel.getRequestCharacter(id)
    }

    const loadOk = (res) => {
        setCharacter(res);
        setLoad(false);
        setError(false);
    }

    const loadError = () => {
        setError(true);
        setLoad(false);
    }

    const getCharacter = (id) => {
        loadServ(id)
        .then(res => loadOk(res))
        .catch(() => loadError());
    }

    useEffect(() => {
        getCharacter(randomCharacter());
    }, [])

    const onRandomChar = () => {
        getCharacter(randomCharacter());
    }

    const spiner = load ? <Spiner/> : null;
    const errorMes = error ? <Error/> : null;
    const content = (!load  && !error ) ? <RandomBlock character={character}/> : null;
    return (
        <div className="randomchar">
            {content}
            {spiner}
            {errorMes}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner"
                        onClick={onRandomChar}
                    >try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    );
}

const RandomBlock = ({character}) => {

    const {thumbnail, name, homepage, Wiki, description} = character;
    let imageStyle = {"objectFit": "cover"};
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imageStyle = {"objectFit": "unset"};
    }
    
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" style={imageStyle} className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">

                    { (description !== "") ? description : "Not information" } 

                    </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={Wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

RandomBlock.propTypes = {
    thumbnail: PropTypes.string,
    name: PropTypes.string,
    homepage: PropTypes.string,
    Wiki: PropTypes.string,
    description: PropTypes.string
}

export default RandomChar;