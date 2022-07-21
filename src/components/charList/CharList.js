import { Component } from "react";
import propTypes from "prop-types";

import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  constructor(props) {
    super(props);
    this.marvelService = new MarvelService();

    this.refssss = [];
    this.aaa = "aaa";
    this.state = {
      allCharacters: [],
      offset: 311,
      onMoreLoading: false,
      heroEnded: false,
    };
  }

  componentDidMount = () => {
    this.renderAllCharachtersAtStart();
  };

  renderAllCharachtersAtStart = () => {
    let currentLimit = +localStorage.getItem("currentLimit") + 9;
    if (currentLimit > 100) currentLimit = 100;
    if (!currentLimit) currentLimit = 9;
    this.onRequest(311, currentLimit);
  };

  onLoading = () => {
    this.setState({ onMoreLoading: true });
  };

  onRequest = (offset = 311, limit = 9) => {
    this.onLoading();
    this.marvelService.getAllCharachters(offset, limit).then((res) => {
      this.setState({
        allCharacters: [...this.state.allCharacters, ...res],
        offset: this.state.offset + 9 + +localStorage.getItem("currentLimit"),
        onMoreLoading: false,
        heroEnded: res.length < 9 ? true : false,
      });
      localStorage.setItem("currentLimit", this.state.offset - 311);
    });
  };

  addRef = (elem) => {
    this.refssss.push(elem);
  };

  charOnFocus = (e) => {
    this.refssss.forEach((ref) => {
      ref.classList.remove("char__item_selected");
    });
    e.target.classList.add("char__item_selected");
  };

  render = () => {
    const list = this.state.allCharacters.map(({ name, thumbnail, id }) => {
      let additionalStyle = null;
      if (thumbnail.indexOf("image_not_available") !== -1)
        additionalStyle = { objectFit: "contain" };
      return (
        <li
          className="char__item"
          ref={this.addRef}
          tabIndex={0}
          key={id}
          onFocus={this.charOnFocus}
          onClick={() => this.props.onCharClick(id)}
          onKeyUp={(e) => {
            if (e.code == "Space" || e.code == "Enter") {
              this.props.onCharClick(id);
            }
          }}
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
          onClick={() => this.onRequest(this.state.offset, this.currentLimit)}
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

CharList.propTypes = { onCharClick: propTypes.func.isRequired };

export default CharList;
