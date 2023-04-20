import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PropTypes from 'prop-types';

import ServiceMarvel from '../../services/ServiceMarvel';
import SingleComicPage from "./SingleComicPage";
import SingleCharacterPage from "./SingleCharacterPage";
import Spiner from "../spiner/Spiner";
import Error from "../error/Error";


const SinglePage = (props) => {
    const {comicsId, characterName} = useParams();

    const [comics, setComics] = useState(null);
    const [char, setChar] = useState(null);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
 
    const serviceMarvel = new ServiceMarvel();


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
        serviceMarvel.getComics(id)
        .then(res => {
            setComics(...res.data.results);
            loadOk();
        })
        .catch(() => loadError());
    }

    const getCharacter = (name) => {
        loadServ();
        serviceMarvel.getRequestCharacterForName(name)
        .then(res => {
            setChar(...res.data.results);
            loadOk();
        })
        .catch(() => loadError());
    }
    
    useEffect(() => {
        switch (props.page) {
            case 'character':
                getCharacter(characterName)
                break;
            case 'comics':
                getComics(comicsId);
                break;
        }
    }, [])


    const errorMes = error ? <Error/> : null;
    const spiner = load ? <Spiner/> : null;
    const content1 = !load && !error && comics ? <SingleComicPage comics={comics}/> : null;
    const content2 = !load && !error && char ? <SingleCharacterPage char={char}/> : null;
        
    return (
        <div className="single-comic">
            {content1}
            {content2}
            {spiner}
            {errorMes}
        </div>
    )
}

SinglePage.propTypes = {
    page: PropTypes.string
}

export default SinglePage;