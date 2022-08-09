import "./charInfo.scss";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/useMarvelService";
import { setContent } from "../../utils/setContent";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { getCharacter, setProcess, process } = useMarvelService();
  const onCharLoaded = (charFromResponse) => {
    setChar(charFromResponse);
  };

  const updateChar = (id) => {
    if (!id) return;
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  useEffect(() => {
    updateChar(props.charId);
  }, [props.charId]);

  return (
    <div className="char__info">{setContent(process, CharInfoView, char)}</div>
  );
};

const CharInfoView = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;
  let additionalStyle = null;
  if (thumbnail.indexOf("image_not_available") !== -1)
    additionalStyle = { objectFit: "contain" };

  const comicsBlock = comics.map((item, index) => {
    let comicsId = item.resourceURI.substring(43);
    if (index < 10)
      return (
        <li className="char__comics-item" key={index}>
          <Link to={`/comics/${comicsId}`} className="li-pointer">
            {item.name}
          </Link>
        </li>
      );
  });
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={additionalStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">{comics.length > 0 ? "Comics:" : ""}</div>
      <ul className="char__comics-list">{comicsBlock}</ul>
    </>
  );
};

export default CharInfo;
