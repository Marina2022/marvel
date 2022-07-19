import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import { Component } from "react";

import decoration from "../../resources/img/vision.png";

class App extends Component {
  state = {
    selectedCharId: null,
  };

  onCharClick = (id) => {
    console.log("в Апп пришел id ", id);
    this.setState({ selectedCharId: id });
  };

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            <CharList onCharClick={this.onCharClick} />
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedCharId} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
