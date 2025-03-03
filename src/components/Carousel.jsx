import BookCard from "./BookCard";

function Carousel({ books }) {
  return (
    <div className="overflow-x-auto whitespace-nowrap flex-nowrap scroll-smooth scrollbar-hide">
      <ul className="flex gap-4">
        {books.map((book, index) => (
          <li key={index}>
            <BookCard book={book}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Carousel;