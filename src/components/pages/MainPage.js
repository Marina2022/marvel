import { useState } from "react";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <RandomChar />
      <div className="char__content">
        <CharList onCharClick={onCharClick} />
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedCharId} />
          </ErrorBoundary>
          <FormComponent />
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
