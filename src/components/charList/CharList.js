import { Component } from "react";

import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  marvelService = new MarvelService();
  state = {
    allCharacters: [],
    offset: 311,
  };

  componentDidMount = () => {
    this.updateAllCharachters();
  };

  updateAllCharachters = () => {
    this.onRequest();
  };

  onRequest = (offset = 311) => {
    this.marvelService.getAllCharachters(offset).then((res) =>
      this.setState({
        allCharacters: [...this.state.allCharacters, ...res],
        offset: offset + 9,
      })
    );
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
        <button
          className="button button__main button__long"
          onClick={() => this.onRequest(this.state.offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  };
}

export default CharList;
