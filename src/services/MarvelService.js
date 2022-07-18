export default class MarvelService {
  _apiKey = "4448bbef67695bf5b8ebb9970e3fd3e7";
  _baseURL = "https://gateway.marvel.com:443/v1/public/";

  getResourse = async (url) => {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("чет не то, статус: ", resp.status);
    return await resp.json();
  };

  getAllCharachters = () =>
    this.getResourse(
      `${this._baseURL}characters?limit=9&offset=401&apikey=${this._apiKey}`
    );
  getCharacter = async (id) => {
    const res = await this.getResourse(
      `${this._baseURL}characters/${id}?apikey=${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}