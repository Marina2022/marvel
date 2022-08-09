import { useState, useRef, useEffect } from "react";
import propTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Spinner from "../spinner/spinner";
import Error from "../error/error";
import useMarvelService from "../../services/useMarvelService";
import "./charList.scss";

const setContent = (process, Component, data, initialLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return initialLoading ? <Spinner /> : <Component data={data} />;
    case "error":
      return <Error />;
    case "confirmed":
      return <Component data={data} />;
  }
};

const ListBlock = ({ data }) => {
  const { list, onLoadMoreClick, onMoreLoading, heroEnded } = data;
  return (
    <div className="char__list">
      <TransitionGroup className="char__grid">{list}</TransitionGroup>
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

const CharList = (props) => {
  const { getAllCharachters, process, setProcess } = useMarvelService();

  const initialOffset = 311;

  const [allCharacters, setAllCharacters] = useState([]);
  const [offsetSt, setOffset] = useState(
    localStorage.getItem("currentOffset")
      ? +localStorage.getItem("currentOffset")
      : initialOffset
  );
  const [onMoreLoading, setOnMoreLoading] = useState(false);
  const [heroEnded, setHeroEnded] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    renderAllCharachtersAtStart();
  }, []);

  const renderAllCharachtersAtStart = () => {
    onRequest(initialOffset, offsetSt - initialOffset + 9, true);
  };

  const changeLoadMoreBtn = () => {
    setOnMoreLoading(true);
  };

  const onLoadMoreClick = () => {
    onRequest(offsetSt, 9, false);
  };

  const onLoaded = (res) => {
    setAllCharacters((allCharacters) => [...allCharacters, ...res]);
    setOffset((offset) => offset + 9);
    setOnMoreLoading(false);
    setHeroEnded(res.length < 9 ? true : false);
    localStorage.setItem("currentOffset", offsetSt);
  };

  const onRequest = (offset, limit = 9, initialLoading) => {
    changeLoadMoreBtn();
    setInitialLoading(initialLoading);
    getAllCharachters(offset, limit)
      .then(onLoaded)
      .then(() => setProcess("confirmed"));
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
      <CSSTransition timeout={300} classNames="chars" key={id}>
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
      </CSSTransition>
    );
  });

  return setContent(
    process,
    ListBlock,
    {
      list,
      onLoadMoreClick,
      heroEnded,
      onMoreLoading,
    },
    initialLoading
  );
};

CharList.propTypes = { onCharClick: propTypes.func.isRequired };

export default CharList;
