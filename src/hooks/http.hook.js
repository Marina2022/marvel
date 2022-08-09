import { useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [process, setProcess] = useState("waiting");

  // тут еще метод, headers надо вставить для универсальности, потома
  // здесь зачем-то (на всякий случай) был использован useCallback. Вот когда узнаю зачем, тогда и напишу
  const request = async (url) => {
    try {
      setLoading(true);
      setProcess("loading");
      const resp = await fetch(url);
      if (!resp.ok) throw new Error("чет не то, статус: ", resp.status);
      setLoading(false);
      return await resp.json();
    } catch (err) {
      setError(err);
      setLoading(false);
      setProcess("error");
    }
  };

  // и здесь зачем-то (на всякий случай) был использован useCallback. Когда узнаю зачем, тогда и напишу
  const clearError = () => {
    setError(null);
    setProcess("waiting");
  };

  return { loading, error, request, clearError, process, setProcess };
};
