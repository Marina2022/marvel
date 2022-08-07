import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import FormComponent from "../formComponent/FormComponent";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [selectedCharId, setSelectedCharId] = useState();

  const onCharClick = (id) => {
    setSelectedCharId(id);
  };

  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList onCharClick={onCharClick} />
        <ErrorBoundary>
          <CharInfo charId={selectedCharId} />
        </ErrorBoundary>

        <FormComponent />
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
