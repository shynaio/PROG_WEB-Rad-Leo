import { Route, Routes, BrowserRouter } from "react-router-dom";

import { HomePage } from "./pages/HomePage/HomePage";
import { ROUTES } from "./routes/routes";
import { PokemonPage } from "./pages/PokemonPage/PokemonPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

import './App.css'

/**
 * On offre les routes vers la page de recherche des pokemons, et la page 404.
 */
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<HomePage/>} path={ROUTES.index} />
                <Route element={<PokemonPage/>} path={ROUTES.pokemon + '/:id'} />
                <Route element={<NotFoundPage/>} path="*" />
            </Routes>
        </BrowserRouter>
    );
}

export default App
