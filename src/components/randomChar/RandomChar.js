import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";
import { Component } from "react";
import Spinner from "../spinner/spinner";
import Error from "../error/error";

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };
  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  onCharLoading = () => {
    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  updateChar = () => {
    this.onCharLoading();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };
  render = () => {
    const { char, loading, error } = this.state;
    const spinnerComp = loading ? <Spinner /> : null;
    const errorComp = error ? <Error /> : null;
    const randomCharBlock = !(loading || error) ? (
      <RandomCharBlock char={char} onBtnClick={this.updateChar} />
    ) : null;
    return (
      <div className="randomchar">
        {spinnerComp}
        {errorComp}
        {randomCharBlock}

        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button
            className="button button__main"
            onClick={() => {
              // this.setState({ loading: true });
              this.updateChar();
            }}
          >
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  };
}

const RandomCharBlock = ({ char }) => {
  let { name, description, thumbnail, homepage, wiki } = char;

  if (description == "") {
    description = "Пока не написали описание";
  }
  if (description) {
    if (description.length > 100)
      description = description.substring(0, 100) + "...";
  }
  let additionalStyle = null;
  if (thumbnail.indexOf("image_not_available") !== -1)
    additionalStyle = { objectFit: "contain" };
  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={additionalStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
