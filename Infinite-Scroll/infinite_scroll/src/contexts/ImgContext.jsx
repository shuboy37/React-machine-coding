import { createContext, useContext, useState } from "react";

export const ImgContext = createContext({
  imgs: [],
  setImgs: () => {},
  page: 1,
  setPage: () => {},
  loading: false,
  setLoading: () => {},
  query: "",
  setQuery: () => {},
});

export const ImgProvider = ({ children }) => {
  const [imgs, setImgs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <ImgContext.Provider
      value={{
        imgs,
        setImgs,
        page,
        setPage,
        loading,
        setLoading,
        query,
        setQuery,
      }}
    >
      {children}
    </ImgContext.Provider>
  );
};

export default function useImgInfo() {
  return useContext(ImgContext);
}
