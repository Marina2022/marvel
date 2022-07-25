import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, error, request, clearError } = useHttp();

  const _apiKey = "6fe3eeae104132db9d3a4b00d8ece5e9";
  const _baseURL = "https://gateway.marvel.com:443/v1/public/";

  const getAllCharachters = async (offset, limit) => {
    const res = await request(
      `${_baseURL}characters?limit=${limit}&offset=${offset}&apikey=${_apiKey}`
    );
    return res.data.results.map((oneChar) => _transformCharacter(oneChar));
  };

  const getCharacter = async (id) => {
    const res = await request(`${_baseURL}characters/${id}?apikey=${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  return { loading, error, clearError, getCharacter, getAllCharachters };
};

export default useMarvelService;
