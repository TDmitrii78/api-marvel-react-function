import { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import Spiner from '../spiner/Spiner';
import Error from '../error/Error';
import ServiceMarvel from '../../services/ServiceMarvel';

import './charList.css';


const CharList = (props) => {

    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const [startOffset, setStartOffset] = useState(210);
    const [offset, setOffset] = useState(null);
    const [buttonOff, setButtonOff] = useState(false); 

    const serviceMarvel = new ServiceMarvel();

    const loadServ = (offset) => {
        setLoad(true);
        setError(false)
        return serviceMarvel.getRequestAllCharacter(offset);
    }

    const loadOk = (res) => {
        let ended = false;
        if (res.data.results.length < 9) {
            ended = true;
        }
        setData([...data, ...res.data.results]);
        setLoad(false);
        setError(false);
        setButtonOff(ended);
    }

    const loadError = (res) => {
        setLoad(false);
        setError(true);
    }

    const onNextCharacter = () => {       
        setOffset(offset + 9);
    }

    const getCharacter = (offset) => {
        loadServ(offset)
        .then(res => loadOk(res))
        .catch(() => loadError())
    }

    useEffect(() => {
        const arrData = JSON.parse(localStorage.getItem("data"));
        if ((localStorage.getItem("offset") && localStorage.getItem("data"))) {
            setOffset(+localStorage.getItem("offset"));
            setData(arrData.slice(0, arrData.length - 9))
        } else {
            setOffset(startOffset);
        };
    }, [])

    useEffect(() => {
        if (offset) {
            getCharacter(offset);
        }
    }, [offset])

    useEffect(() => {
        localStorage.setItem("offset", offset);
        localStorage.setItem("data", JSON.stringify(data));
    }, [data, offset])


        const spiner = (load) ? <Spiner/> : null;
        const errorMes = (error) ? <Error/> : null;
        const content = true ? <Content 
                                    load={load}
                                    data={data} 
                                    onNextCharacter={onNextCharacter}
                                    onClickCharacter={(id) => props.onClickCharacter(id)}
                                    buttonOff={buttonOff}
                                /> : null;
        return (
            <div className="char__list">
                {content}
                {spiner}
                {errorMes}
            </div>
        )
    
}

const Content = (props) => {

    const onClickCharacter = (id, i) => {
        props.onClickCharacter(id);
        selectEffectCharacter(i);
    }
    
    const myRef = useRef([]);

    const selectEffectCharacter = (i) => {
        myRef.current.forEach(el => {
            el.classList.remove('char__item_selected');
        });
        myRef.current[i].classList.add('char__item_selected');
    }

    const {data, onNextCharacter, load, buttonOff} = props;
    const character = data.map((el, i) => {

        const characterImg = el.thumbnail.path + '.' + el.thumbnail.extension;

        let imgStyle = {"objectFit": "cover"};  
        if (characterImg === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
            imgStyle = {"objectFit": "unset"};
        }
   
        return (
            <li
                ref={el => myRef.current[i] = el}
                key={el.id} 
                className='char__item'
                tabIndex={"0"}
                onClick={() => {onClickCharacter(el.id, i)}}
                onKeyDown={(e => (e.key === 'Enter') ? onClickCharacter(el.id, i) : null)}
            >
                <img src={characterImg} 
                    style={imgStyle}
                       alt="character foto"/>
                <div className="char__name">{el.name}</div>
            </li>
        )
    });

    

    return (
        <>
            <ul className="char__grid">
                {character}
            </ul>
            <button style={((load || buttonOff) ? {"display" : "none"} : {"display": "block"})}
                onClick={onNextCharacter}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </>
    )
}

CharList.propType = {
    onClickCharacter: PropTypes.func
}

Content.propType = {
    data: PropTypes.array,
    onClickCharacter: PropTypes.func,
    onNextCharacter: PropTypes.func,
    buttonOff: PropTypes.bool
}

export default CharList;