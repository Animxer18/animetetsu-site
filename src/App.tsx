import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import PacmanLoading from "./components/PacmanLoading";

const Root = lazy(() => import("./pages/Root"));
const Search = lazy(() => import("./pages/Search"));
const Recents = lazy(() => import("./pages/Recents"));
const Popular = lazy(() => import("./pages/Popular"));
const AnimeDetails = lazy(() => import("./pages/AnimeDetails"));
const WatchEpisode = lazy(() => import("./pages/WatchEpisode"));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<PacmanLoading />}>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recent" element={<Recents />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/watch/:epId" element={<WatchEpisode />} />
            <Route path="/:animeId" element={<AnimeDetails />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
