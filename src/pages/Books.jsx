import { BooksContext } from "../context/BooksContext";
import { useContext, useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import FilterSection from "../components/booksPage/FilterSection";

function Books() {
  const { books } = useContext(BooksContext)
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [filters, setFilters] = useState({
    price: null,
    genres: [],
    tags: []
  });

  useEffect(() => {
    let updatedBooks = books;
  
    // Filter by price
    if (filters.price) {
      updatedBooks = updatedBooks.filter((book) =>
        filters.price === "low" ? book.price < 20 : book.price >= 20
      );
    }
  
    // Filter by genres (case insensitive)
    if (filters.genres.length > 0) {
      updatedBooks = updatedBooks.filter((book) =>
        filters.genres.every((genre) => 
          book.genres.some((bGenre) => bGenre.toLowerCase() === genre.toLowerCase())
        )
      );
    }

    // Filter by tags (case insensitive)
    if (filters.tags.length > 0) {
      updatedBooks = updatedBooks.filter((book) =>
        filters.tags.every((tag) => 
          book.tags.some((bTag) => bTag.toLowerCase() === tag.toLowerCase())
        )
      );
    }

    // Ensure all books show if no filters are applied
    if (!filters.price && filters.genres.length === 0 && filters.tags.length === 0) {
      updatedBooks = books; // Reset to all books
    }
  
    setFilteredBooks(updatedBooks);
  }, [filters, books]); 

  const handlePriceFilter = (value) => {
    setFilters((prev) => ({
      ...prev,
      price: prev.price === value ? null : value, // Toggle price filter
    }));
  };
  
  const handleTagsFilter = (value) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(value)
        ? prev.tags.filter((t) => t !== value)
        : [...prev.tags, value],
    }));
  }

  const handleGenreFilter = (value) => {
    setFilters((prev) => ({
      ...prev,
      genres: prev.genres.includes(value)
        ? prev.genres.filter((g) => g !== value) // Remove if already selected
        : [...prev.genres, value], // Add new selection
    }));
  };
  
  return (
    <>
      <div className="flex-1 flex p-2 justify-center">
        <div className="flex-1 flex max-w-7xl py-12">
          <div className="flex-[0_0_20%] flex flex-col border-r-2 pr-5 border-gray-400 border-solid">
            <h1 className="flex text-xl mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-3">
                <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
              </svg>
              Filters
            </h1>

            {/* Price Section */}
            <FilterSection
              title="Price"
              options={[
                { value: "low", label: "From $0.00 to $19.99" },
                { value: "mid", label: "From $20.00" },
              ]}
              selectedValue={filters.price}
              onChange={handlePriceFilter}
              isMulti={false}
            />

            {/* Tags Section */}
            <FilterSection
              title="Tags"
              options={[
                { value: "Classic", label: "Classic" },
                { value: "Bestseller", label: "Bestseller" },
                { value: "Trending", label: "Trending" },
                { value: "Movie Adaptation", label: "Movie Adaptation" },
              ]}
              selectedValue={filters.tags}
              onChange={handleTagsFilter}
              isMulti={true}
            />

            {/* Genres Section */}
            <FilterSection
              title="Genres"
              options={[
                { value: "Fiction", label: "Fiction" },
                { value: "Pyschology", label: "Pyschology" },
                { value: "Self-help", label: "Self-help" },
                { value: "Science Fiction", label: "Science Fiction" },
                { value: "Romance", label: "Romance" },
              ]}
              selectedValue={filters.genres}
              onChange={handleGenreFilter}
              isMulti={true}
            />              
          </div>

          <div className="flex-[0_0_80%] px-5">
            <h1 className="text-2xl font-semixbold">Books</h1>
            <p className="text-gray-500 mb-5">{filteredBooks.length} results</p>
            <ul className="grid grid-cols-3 xl:grid-cols-4">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <li>
                  <BookCard key={book.id} book={book} />
                </li>
              ))
            ) : (
              <p>No books match your filters.</p>
            )}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Books;