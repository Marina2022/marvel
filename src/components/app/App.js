import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/spinner";
import ComicsLayout from "../ComicsLayout/ComicsLayout";
import CharacterLayout from "../CharacterLayout/CharacterLayout";

const MainPage = React.lazy(() => import("../pages/MainPage"));
const ComicsPage = React.lazy(() => import("../pages/ComicsPage"));
const SinglePage = React.lazy(() => import("../pages/SinglePage"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route
                path="/comics/:comicId"
                element={<SinglePage who="comics" Component={ComicsLayout} />}
              />
              <Route
                path="/:comicId"
                element={
                  <SinglePage who="character" Component={CharacterLayout} />
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
