import { useContext, useState } from "react";
import { BooksContext } from "../../context/BooksContext";

export default function SearchSidebar({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { books } = useContext(BooksContext)

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-40 transition-opacity ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={onClose}>
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}`} onClick={(e) => e.stopPropagation()}>
        <div className="p-5 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">Search</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
        </div>
        <div className="p-5">
          <input 
            type="text" 
            placeholder="Search for books..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded-md" 
          />
        </div>
        <ul className="p-5 space-y-3">
          {searchQuery.trim() !== "" && filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <li key={book.id} className="border-b pb-2">
                <p className="font-medium">{book.title}</p>
                <p className="text-sm text-gray-500">{book.author}</p>
              </li>
            ))
          ) : searchQuery.trim() !== "" ? (
            <p className="text-gray-500">No results found.</p>
          ) : null}
        </ul>
      </div>
    </div>
  );
}