import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { lazy, Suspense } from "react";

import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";
import AppHeader from '../appHeader/AppHeader';
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPages"));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const Page404 = lazy(() => import("../pages/404"));


const App = () => {

    return (
        <Router>
            <div className="app">
                <ErrorBoundaries>
                        <AppHeader/>
                </ErrorBoundaries>
                <main>
                    <Suspense fallback={<span>Loading...</span>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>   
                            <Route path ='/character/:characterName' element={<SinglePage page={'character'}/>}/>                 
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path ='/comics/:comicsId' element={<SinglePage page={'comics'}/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;