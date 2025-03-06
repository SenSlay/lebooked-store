import BookCard from "./BookCard";
import { useRef } from "react";

function Carousel({ books }) {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    
    const scrollAmount = 250; // Adjust for desired scroll distance

    const newScrollPosition = carouselRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);

    carouselRef.current.scrollTo({ left: newScrollPosition, behavior: "smooth" });
  };

  return (
    <div className="relative">
        {/* Left Arrow */}
        <button
          className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 text-black"
          onClick={() => scroll("left")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
          </svg>

        </button>

      <div className="overflow-x-auto whitespace-nowrap flex-nowrap scroll-smooth scrollbar-hide" ref={carouselRef}>
        <ul className="flex gap-4">
          {books.map((book, index) => (
            <li key={index}>
              <BookCard book={book}/>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Arrow */}
      <button
        className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 text-black"
        onClick={() => scroll("right")}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
        </svg>

      </button>
    </div>
  )
}

export default Carousel;