import Spinner from "../components/spinner/spinner";
import Error from "../components/error/error";
import Skeleton from "../components/skeleton/Skeleton";

export const setContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return <Skeleton />;
    case "loading":
      return <Spinner />;
    case "error":
      return <Error />;
    case "confirmed":
      return <Component data={data} />;
  }
};
