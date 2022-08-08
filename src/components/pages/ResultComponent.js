import Spinner from "../spinner/spinner";
import Error from "../error/error";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/useMarvelService";

const ResultComponent = (props) => {
  const { comicId } = useParams();
  const [comicSt, setComic] = useState(false);

  const { getCharacter, getOneComics, clearError, loading, error } =
    useMarvelService();

  const getData = props.who == "comics" ? getOneComics : getCharacter;

  useEffect(() => {
    clearError();
    getData(comicId).then(setComic);
  }, [comicId]);

  const loadingBlock = loading ? <Spinner /> : null;
  const errorBlock = error ? <Error /> : null;
  const content = !(error || loading || !comicSt) ? (
    <props.Component oneComic={comicSt} />
  ) : null;
  return (
    <>
      {loadingBlock}
      {errorBlock}
      {content}
    </>
  );
};

export default ResultComponent;
