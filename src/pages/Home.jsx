// import { useEffect, useState } from "react";
import Carousel from '../components/homePage/Carousel';
import HomeSection from '../components/homePage/HomeSection';
import PopularCategories from '../components/homePage/PopularCategories';
import { Link } from 'react-router-dom';
import { useBooksContext } from '../context/BooksContext';

function Home() {
  const { books, loading, error } = useBooksContext();

  if (error) return <p>Error: {error}</p>;

  const bestsellers = books.filter((book) =>
    book.tags.some(tag => tag.name === 'Bestseller')
  );
  
  const trending = books.filter((book) =>
    book.tags.some(tag => tag.name === 'Trending')
  );

  return (
    <>
      <div className="relative bg-[url('../images/hero1.jpg')] bg-no-repeat bg-cover bg-center before:absolute before:inset-0 before:bg-black/60 h-[650px] flex justify-center items-center ">
        <div className="relative z-10 p-6 text-white text-center min-w-[60%] flex flex-col items-center">
          <h1 className="font-bold text-7xl text-blue-500 mb-3">LeBooked</h1>
          <p className="font-medium text-2xl mb-5">
            Your Next Favorite Read Awaits
          </p>
          <Link
            to="/books"
            className="border-2 border-white text-white px-4 py-2 text-lg font-semibold w-[200px] block uppercase hover:bg-white hover:text-blue-600 rounded-sm"
          >
            Shop Now
          </Link>
        </div>
      </div>
      <HomeSection title="Popular Categories">
        <PopularCategories
          titles={['Self Help', 'Romance', 'Fiction', 'Young Adult']}
        ></PopularCategories>
      </HomeSection>

      <HomeSection title="What's Trending">
        {loading ? <p>Loading...</p> : <Carousel books={trending} />}
      </HomeSection>

      <HomeSection title="Bestsellers">
        {loading ? <p>Loading...</p> : <Carousel books={bestsellers} />}
      </HomeSection>
    </>
  );
}

export default Home;
