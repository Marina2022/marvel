import "./randomChar.scss";

import { useState, useEffect } from "react";

import mjolnir from "../../resources/img/mjolnir.png";
import useMarvelService from "../../services/useMarvelService";
import { setContent } from "../../utils/setContent";

const RandomChar = () => {
  const [charSt, setCharSt] = useState(null);
  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setCharSt(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  return (
    <div className="randomchar">
      {setContent(process, RandomCharBlock, charSt)}

      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          className="button button__main"
          onClick={() => {
            updateChar();
          }}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const RandomCharBlock = ({ data }) => {
  let { name, description, thumbnail, homepage, wiki } = data;

  if (description === "") {
    description = "Пока не написали описание";
  }
  if (description) {
    if (description.length > 100)
      description = description.substring(0, 100) + "...";
  }
  let additionalStyle = null;
  if (thumbnail.indexOf("image_not_available") !== -1)
    additionalStyle = { objectFit: "contain" };
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={additionalStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
