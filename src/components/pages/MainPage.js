import { useState } from "react";

import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchForm from "../searchForm/SearchForm";

import decoration from '../../resources/img/vision.png';

const MainPage = (props) => {
    const [id, setId] = useState(null);

    const onClickCharacter = (id) => {
        setId(id);
    }
    
    return (
        <>
            <ErrorBoundaries>
                <RandomChar/>
            </ErrorBoundaries>
            <div className="char__content">
                <ErrorBoundaries>
                    <CharList onClickCharacter={(id) => onClickCharacter(id)}/>
                </ErrorBoundaries>
                <ErrorBoundaries>
                    <div>
                        <CharInfo id={id}/>
                        <SearchForm/> 
                    </div>    
                </ErrorBoundaries>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;