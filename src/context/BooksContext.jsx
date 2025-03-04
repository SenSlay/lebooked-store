import { createContext } from "react";
import useBooks from "../hooks/useBooks";

// eslint-disable-next-line react-refresh/only-export-components
export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const { books, loading, error } = useBooks("/db.json");

  return (
    <BooksContext.Provider value={{ books, loading, error }}>
      {children}
    </BooksContext.Provider>
  );
};