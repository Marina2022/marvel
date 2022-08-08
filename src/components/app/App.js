import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/spinner";
import ComicsLayout from "../ComicsLayout/ComicsLayout";
import CharacterLayout from "../CharacterLayout/CharacterLayout";

const MainPage = React.lazy(() => import("../pages/MainPage"));
const ComicsPage = React.lazy(() => import("../pages/ComicsPage"));
const ResultComponent = React.lazy(() => import("../pages/ResultComponent"));

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
                element={
                  <ResultComponent who="comics" Component={ComicsLayout} />
                }
              />
              <Route
                path="/:comicId"
                element={
                  <ResultComponent
                    who="character"
                    Component={CharacterLayout}
                  />
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
