import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

const App = () => {
  const [selectedCharId, setSelectedCharId] = useState();

  const onCharClick = (id) => {
    setSelectedCharId(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        {/* <RandomChar />
        <div className="char__content">
          <CharList onCharClick={onCharClick} />
          <ErrorBoundary>
            <CharInfo charId={selectedCharId} />
          </ErrorBoundary>          
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" /> */}
        <ComicsList />
      </main>
    </div>
  );
};

export default App;
