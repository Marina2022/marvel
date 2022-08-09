import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from "../../services/useMarvelService";
import { setContent } from "../../utils/setContent";

const SinglePage = (props) => {
  const { comicId } = useParams();
  const [comicSt, setComic] = useState(false);

  const { getCharacter, getOneComics, clearError, process, setProcess } =
    useMarvelService();

  const getData = props.who == "comics" ? getOneComics : getCharacter;

  useEffect(() => {
    clearError();
    getData(comicId)
      .then(setComic)
      .then(() => setProcess("confirmed"));
  }, [comicId]);
  return <>{setContent(process, props.Component, comicSt)}</>;
};

export default SinglePage;
