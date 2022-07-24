import { useState, useRef, useEffect } from "react";
import propTypes from "prop-types";
import Spinner from "../spinner/spinner";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

const CharList = (props) => {
  const marvelService = new MarvelService();

  const initialOffset = 311;

  const [allCharacters, setAllCharacters] = useState([]);
  const [offsetSt, setOffset] = useState(
    localStorage.getItem("currentOffset")
      ? +localStorage.getItem("currentOffset")
      : initialOffset
  );
  const [onMoreLoading, setOnMoreLoading] = useState(false);
  const [heroEnded, setHeroEnded] = useState(false);

  useEffect(() => {
    renderAllCharachtersAtStart();
  }, []);

  const renderAllCharachtersAtStart = () => {
    onRequest(initialOffset, offsetSt - initialOffset + 9);
  };

  const onLoading = () => {
    setOnMoreLoading(true);
  };

  const onLoadMoreClick = () => {
    onRequest(offsetSt);
  };

  const onLoaded = (res) => {
    setAllCharacters((allCharacters) => [...allCharacters, ...res]);
    setOffset((offset) => offset + 9);

    setOnMoreLoading(false);
    setHeroEnded(res.length < 9 ? true : false);
    localStorage.setItem("currentOffset", offsetSt);
  };

  const onError = () => {
    console.log("error");
  };

  const onRequest = (offset, limit = 9) => {
    onLoading();
    marvelService
      .getAllCharachters(offset, limit)
      .then(onLoaded)
      .catch(onError);
  };

  const refssss = useRef([]);
  const charOnFocus = (e) => {
    refssss.current.forEach((ref) => {
      ref.classList.remove("char__item_selected");
    });
    e.target.classList.add("char__item_selected");
  };

  const list = allCharacters.map(({ name, thumbnail, id }, i) => {
    let additionalStyle = null;
    if (thumbnail.indexOf("image_not_available") !== -1)
      additionalStyle = { objectFit: "contain" };
    return (
      <li
        className="char__item"
        ref={(elem) => (refssss.current[i] = elem)}
        tabIndex={0}
        key={id}
        onFocus={charOnFocus}
        onClick={() => props.onCharClick(id)}
        onKeyUp={(e) => {
          if (e.code === "Space" || e.code === "Enter") {
            props.onCharClick(id);
          }
        }}
      >
        <img src={thumbnail} alt="abyss" style={additionalStyle} />
        <div className="char__name">{name}</div>
      </li>
    );
  });

  return (
    <div className="char__list">
      <ul className="char__grid">{list}</ul>
      <button
        style={heroEnded ? { display: "none" } : null}
        className="button button__main button__long"
        onClick={onLoadMoreClick}
        disabled={onMoreLoading}
      >
        <div className="inner">{onMoreLoading ? "Loading" : "load more"}</div>
      </button>
    </div>
  );
};

CharList.propTypes = { onCharClick: propTypes.func.isRequired };

export default CharList;
