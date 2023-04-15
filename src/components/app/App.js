import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { lazy, Suspense } from "react";

import ErrorBoundaries from "../errorBoundaries/ErrorBoundaries";
import AppHeader from '../appHeader/AppHeader';
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPages"));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
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
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path ='/Comics/:comicsId' element={<SingleComicPage/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;