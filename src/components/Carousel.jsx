import BookCard from "./BookCard";
import { useRef, useState, useEffect } from "react";

function Carousel({ books }) {
  const carouselRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollAmount = 261; 
  const totalBooks = books.length;
  const duplicatedBooks = [...books, ...books, ...books];
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const scroll = (direction) => {
    setOffset((prev) => prev + (direction === "left" ? scrollAmount : -scrollAmount));
    setIsTransitioning(true);
  };

  // Reset position when reaching the fake end
  useEffect(() => {
    const handleTransitionEnd = () => {
      if (offset <= -totalBooks * scrollAmount) {
        setIsTransitioning(false);
        setOffset(0); // Instantly reset to start
      }
      if (offset >= scrollAmount) {
        setIsTransitioning(false);
        setOffset(-totalBooks * scrollAmount); // Instantly reset to end
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("transitionend", handleTransitionEnd);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
  }, [offset, totalBooks, scrollAmount]);

  // Auto-play effect (Pauses when hovered)
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => scroll("right"), 3000); 
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Handle edge cases (Jump to the start/end when needed)
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        carouselRef.current.scrollLeft = clientWidth; // Jump to the beginning
      } else if (scrollLeft <= 0) {
        carouselRef.current.scrollLeft = scrollWidth - 2 * clientWidth; // Jump to the end
      }
    };

    const ref = carouselRef.current;
    if (ref) ref.addEventListener("scroll", handleScroll);
    return () => ref?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative"
        onMouseEnter={() => setIsAutoScrolling(false)} 
        onMouseLeave={() => setIsAutoScrolling(true)}
    >
        {/* Left Arrow */}
        <button
          className="absolute xl:-left-10 xl:border-none xl:hover:bg-transparent xl:hover:text-blue-600 xl:text-black left-3 p-1 hidden rounded-full border-2 lg:text-blue-600 lg:border-blue-600 lg:hover:bg-blue-600 lg:hover:text-white lg:block top-1/2 -translate-y-1/2 z-10"
          onClick={() => scroll("left")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
          </svg>

        </button>

      <div className="overflow-x-auto whitespace-nowrap flex-nowrap scroll-smooth scrollbar-hide" ref={carouselRef} >
        <ul className={`flex gap-5 ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`} style={{ transform: `translateX(${offset}px)` }}>
          {duplicatedBooks.map((book, index) => (
            <li key={index}>
              <BookCard book={book}/>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Arrow */}
      <button
        className="absolute xl:-right-10 xl:border-none xl:hover:bg-transparent xl:hover:text-blue-600 xl:text-black right-3 p-1 hidden rounded-full border-2 lg:text-blue-600 lg:border-blue-600 lg:hover:bg-blue-600 lg:hover:text-white lg:block top-1/2 -translate-y-1/2 z-10"
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