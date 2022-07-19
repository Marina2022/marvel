import { Component } from "react";

import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  marvelService = new MarvelService();
  state = {
    allCharacters: [],
  };

  componentDidMount = () => {
    this.updateAllCharachters();
  };

  updateAllCharachters = () => {
    this.marvelService
      .getAllCharachters()
      .then((res) => this.setState({ allCharacters: res }));
  };

  render = () => {
    const list = this.state.allCharacters.map(({ name, thumbnail, id }) => {
      let additionalStyle = null;
      if (thumbnail.indexOf("image_not_available") !== -1)
        additionalStyle = { objectFit: "contain" };
      return (
        <li
          className="char__item"
          key={id}
          onClick={() => this.props.onCharClick(id)}
        >
          <img src={thumbnail} alt="abyss" style={additionalStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });

    return (
      <div className="char__list">
        <ul className="char__grid">{list}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  };
}

export default CharList;
