import Spinner from "../spinner/spinner";
import Error from "../error/error";
import "./singleComic.scss";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useMarvelService from "../../services/useMarvelService";

const SingleComic = () => {
  const { comicId } = useParams();
  const [comicSt, setComic] = useState(false);
  const { getOneComics, clearError, loading, error } = useMarvelService();

  useEffect(() => {
    clearError();
    getOneComics(comicId).then(setComic);
  }, [comicId]);

  const loadingBlock = loading ? <Spinner /> : null;
  const errorBlock = error ? <Error /> : null;
  const content = !(error || loading || !comicSt) ? (
    <View oneComic={comicSt} />
  ) : null;
  return (
    <>
      {loadingBlock}
      {errorBlock}
      {content}
    </>
  );
};

const View = ({ oneComic }) => {
  const { thumbnail, title, price, language, pageCount, description } =
    oneComic;
  const navigate = useNavigate();
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount} pages</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}$</div>
      </div>
      <a
        className="single-comic__back li-pointer"
        onClick={() => navigate(-1)}
        to="/"
      >
        Back to previous
      </a>
    </div>
  );
};

export default SingleComic;
