import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";

import decoration from '../../resources/img/vision.png';


const App = () => {
    const [id, setId] = useState(null);

    const onClickCharacter = (id) => {
        setId(id = id);
    }
    return (
        <div className="app">
            <ErrorBoundaries>
                <AppHeader/>
            </ErrorBoundaries>
            <main>
                <ErrorBoundaries>
                    <RandomChar/>
                </ErrorBoundaries>
                <div className="char__content">
                    <ErrorBoundaries>
                        <CharList onClickCharacter={(id) => onClickCharacter(id)}/>
                    </ErrorBoundaries>
                    <ErrorBoundaries>
                        <CharInfo id={id}/>
                    </ErrorBoundaries>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;