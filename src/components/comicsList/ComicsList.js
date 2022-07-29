import "./comicsList.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/useMarvelService";
import Error from "../../components/error/error";
import Spinner from "../../components/spinner/spinner";

const ComicsList = () => {
  const [comicsSt, setComicsSt] = useState([]);
  const [initialLoading, setInitialLoading] = useState([true]);
  const [offset, setOffset] = useState(15);
  const { loading, error, getComics } = useMarvelService();

  useEffect(() => {
    onRequest(true);
  }, []);

  const onRequest = (initialLoad) => {
    getComics(offset).then((res) => setComicsSt([...comicsSt, ...res]));
    setInitialLoading(initialLoad);
    setOffset((offset) => offset + 8);
  };

  const errorBlock = error ? <Error /> : null;
  const loadingBlock = loading && initialLoading ? <Spinner /> : null;

  const onLoadMoreClick = () => {
    onRequest(false);
  };

  return (
    <>
      {errorBlock}
      {loadingBlock}
      <ViewComics comicsSt={comicsSt} />
      <button
        disabled={loading}
        className="button button__main button__long"
        onClick={onLoadMoreClick}
      >
        <div className="inner">{loading ? "Loading" : "load more"}</div>
      </button>
    </>
  );
};

const ViewComics = (props) => {
  const { comicsSt } = props;

  const list = comicsSt.map((oneComics, index) => (
    <li className="comics__item" key={index}>
      <Link to={`/comics/${oneComics.id}`}>
        <img
          src={oneComics.thumbnail}
          alt="ultimate war"
          className="comics__item-img"
        />
        <div className="comics__item-name">{oneComics.title}</div>
        <div className="comics__item-price">{oneComics.price}$</div>
      </Link>
    </li>
  ));
  return (
    <div className="comics__list">
      <ul className="comics__grid">{list}</ul>
    </div>
  );
};

export default ComicsList;
