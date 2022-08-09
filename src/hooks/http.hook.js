import { useState } from "react";

export const useHttp = () => {
  const [process, setProcess] = useState("waiting");

  // тут еще метод, headers надо вставить для универсальности, потома
  // здесь зачем-то (на всякий случай) был использован useCallback. Вот когда узнаю зачем, тогда и напишу
  const request = async (url) => {
    try {
      setProcess("loading");
      const resp = await fetch(url);
      if (!resp.ok) throw new Error("чет не то, статус: ", resp.status);
      return await resp.json();
    } catch (err) {
      setProcess("error");
    }
  };

  // и здесь зачем-то (на всякий случай) был использован useCallback. Когда узнаю зачем, тогда и напишу
  const clearError = () => {
    setProcess("waiting");
  };

  return { request, clearError, process, setProcess };
};
