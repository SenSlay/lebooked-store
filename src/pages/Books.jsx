import { BooksContext } from "../context/BooksContext";
import { useContext, useState, useEffect } from "react";
import BookCard from "../components/common/BookCard";
import FilterSection from "../components/booksPage/FilterSection";
import { useSearchParams } from "react-router-dom";

function Books() {
  const { books } = useContext(BooksContext)
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [filters, setFilters] = useState({
    price: null,
    genres: [],
    tags: []
  });
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category"); // Get category from URL
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Set genre filter based from URL
  useEffect(() => {
    if (category) {
      setFilters((prev) => ({
        ...prev,
        genres: [category.toLowerCase()], 
      }));
    }
  }, [category]);

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
    <div className="flex-1 flex p-2 justify-center">
      <div className="flex-1 flex flex-col max-w-7xl py-6 lg:py-12 relative">
        <div>
          <button 
            className="lg:disabled lg:hidden flex items-center text-lg font-semibold mb-3 px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={() => setIsFilterOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-2">
              <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
            </svg>
            Filters
          </button>
        </div>

        {/* Overlay (Only visible when sidebar is open) */}
        {isFilterOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={() => setIsFilterOpen(false)} 
          />
        )}

        <div className="flex">
          {/* Sidebar (Hidden on small screens) */}
          <div className={`z-20 flex flex-col border-r-2 p-5 lg:p-0 lg:pr-5 border-gray-400 border-solid
            fixed top-0 left-0 h-full w-64 bg-white transform overflow-auto lg:overflow-hidden
            ${isFilterOpen ? "translate-x-0" : "-translate-x-full"} 
            transition-transform duration-300 lg:relative lg:translate-x-0 lg:w-[20%]
          `}>
            <div className="mb-3 relative">
              <h1 className="text-xl font-semibold flex ">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-2">
                  <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                </svg>
                Filters
              </h1>

              {/* Close Button (Only on small screens) */}
              <button 
                className="lg:hidden absolute p-2 -right-2 -top-1 text-gray-600 hover:text-black"
                onClick={() => setIsFilterOpen(false)}
              >
                ✖
              </button>
            </div>


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
                { value: "Classic", label: "Classic" },
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

          {/* Books List */}
          <div className="flex-1 lg:flex-[0_0_80%] px-1 lg:px-5">
            <h1 className="text-2xl font-semixbold">Books</h1>
            <p className="text-gray-500 mb-5">{filteredBooks.length} results</p>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <li key={book.id}>
                  <BookCard book={book} page={"books"} />
                </li>
              ))
            ) : (
              <p>No books match your filters.</p>
            )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Books;