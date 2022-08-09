import "./comicsList.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import useMarvelService from "../../services/useMarvelService";
import Error from "../../components/error/error";
import Spinner from "../../components/spinner/spinner";

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

const ComicsList = () => {
  const [comicsSt, setComicsSt] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [offset, setOffset] = useState(15);
  const { getComics, process, setProcess } = useMarvelService();

  useEffect(() => {
    onRequest(true);
  }, []);

  const onRequest = (initialLoad) => {
    getComics(offset).then((res) => setComicsSt([...comicsSt, ...res]));
    setInitialLoading(initialLoad);
    setOffset((offset) => offset + 8);
    setProcess("confirmed");
  };

  const onLoadMoreClick = () => {
    onRequest(false);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Comics" />
        <title>Marvel comics</title>
      </Helmet>

      {setContent(process, ViewComics, comicsSt, initialLoading)}

      <button
        disabled={process == "loading"}
        className="button button__main button__long"
        onClick={onLoadMoreClick}
      >
        <div className="inner">
          {process == "loading" ? "Loading" : "load more"}
        </div>
      </button>
    </>
  );
};

const ViewComics = ({ data }) => {
  let comicsSt = data;
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
