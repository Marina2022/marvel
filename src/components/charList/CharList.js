import { Component } from "react";

import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  marvelService = new MarvelService();
  state = {
    allCharacters: [],
    offset: 311,
    onMoreLoading: false,
    heroEnded: false,
  };

  componentDidMount = () => {
    this.updateAllCharachters();
  };

  updateAllCharachters = () => {
    let currentOffset = localStorage.getItem("currentOffset");
    console.log(currentOffset);
    if (currentOffset > 100) currentOffset = 100;
    this.onRequest(311, currentOffset);
  };

  onLoading = () => {
    this.setState({ onMoreLoading: true });
  };

  onRequest = (offset = 311, limit = 9) => {
    this.onLoading();
    localStorage.setItem("currentOffset", offset - 311 + 9);
    this.marvelService.getAllCharachters(offset, limit).then((res) =>
      this.setState({
        allCharacters: [...this.state.allCharacters, ...res],
        offset: this.state.offset + 9,
        onMoreLoading: false,
        heroEnded: res.length < 9 ? true : false,
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
          style={this.state.heroEnded ? { display: "none" } : null}
          className="button button__main button__long"
          onClick={() => this.onRequest(this.state.offset)}
          disabled={this.state.onMoreLoading}
        >
          <div className="inner">
            {this.state.onMoreLoading ? "Loading" : "load more"}
          </div>
        </button>
      </div>
    );
  };
}

export default CharList;
