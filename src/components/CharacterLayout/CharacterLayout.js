import "./singleComic.scss";
import { Helmet } from "react-helmet";

import { useNavigate } from "react-router-dom";

const ComicsLayout = ({ data }) => {
  const { thumbnail, name, description } = data;
  const navigate = useNavigate();
  return (
    <div className="single-comic">
      <Helmet>
        <meta name="description" content={name} />
        <title>{name}</title>
      </Helmet>
      <img src={thumbnail} alt={name} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">
          {description == "" ? "Нету дескрипшена" : description}
        </p>
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

export default ComicsLayout;
