import "./charInfo.scss";

import { useState, useEffect } from "react";

import useMarvelService from "../../services/useMarvelService";
import Spinner from "../spinner/spinner";
import Error from "../error/error";
import Skeleton from "../skeleton/Skeleton";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacter } = useMarvelService();
  const onCharLoaded = (charFromResponse) => {
    setChar(charFromResponse);
  };

  const updateChar = (id) => {
    if (!id) return;
    getCharacter(id).then(onCharLoaded);
  };

  useEffect(() => {
    updateChar(props.charId);
  }, [props.charId]);

  const skeletonBlock = !(loading || error || char) ? <Skeleton /> : null;
  const loadingBlock = loading ? <Spinner /> : null;
  const errorBlock = error ? <Error /> : null;
  const charInfo = !(loading || error || !char) ? (
    <CharInfoView char={char} />
  ) : null;
  return (
    <div className="char__info">
      {skeletonBlock}
      {loadingBlock}
      {errorBlock}
      {charInfo}
    </div>
  );
};

const CharInfoView = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  let additionalStyle = null;
  if (thumbnail.indexOf("image_not_available") !== -1)
    additionalStyle = { objectFit: "contain" };
  const comicsBlock = comics.map((item, index) => {
    if (index < 10)
      return (
        <li className="char__comics-item" key={index}>
          {item.name}
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
