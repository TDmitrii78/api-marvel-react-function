import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";
import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPages";
import SingleComicPage from '../pages/SingleComicPage';
import Page404 from "../pages/404";


const App = () => {

    return (
        <Router>
            <div className="app">
                <ErrorBoundaries>
                    <AppHeader/>
                </ErrorBoundaries>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>    
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path ='/Comics/:comicsId' element={<SingleComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;