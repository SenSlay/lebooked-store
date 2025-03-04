// import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import HomeSection from "../components/HomeSection";
import { BooksContext } from "../context/BooksContext";
import { useContext } from "react";
import PopularCategories from "../components/PopularCategories";
import { Link } from "react-router-dom";

function Home() {
  const { books, loading, error } = useContext(BooksContext);

  if (error) return <p>Error: {error}</p>;
  
  const bestsellers = books.filter(book => book.tags.includes("Bestseller"));
  const trending = books.filter(book => book.tags.includes("Trending"));

  return (
    <main className="h-full">
        <div className="relative bg-[url('../images/hero.jpg')] bg-no-repeat bg-cover bg-center before:absolute before:inset-0 before:bg-black/60 h-[650px] flex justify-center items-center ">
          <div className="relative z-10 p-6 text-white text-center min-w-[60%] flex flex-col items-center">
            <h1 className="font-bold text-7xl text-blue-500 mb-3">LeBooked</h1>
            <p className="font-medium text-2xl mb-5">Your Next Favorite Read Awaits</p>
            <Link to='/books' className="border-2 border-white text-white px-4 py-2 text-lg font-semibold w-[200px] block uppercase hover:bg-white hover:text-blue-600 rounded-sm">
              Shop Now
            </Link>
          </div>
        </div>
        <HomeSection title="Popular Categories">
          <PopularCategories titles={['Self-Help', 'Romance', 'Science-Fiction', 'Classics']}></PopularCategories>
        </HomeSection>
      
        <HomeSection title="What's Trending">
          {loading ? <p>Loading...</p> : <Carousel books={trending} />}
        </HomeSection>

        <HomeSection title="Bestsellers">
          {loading ? <p>Loading...</p> : <Carousel books={bestsellers} />}
        </HomeSection>
      </main>
  );
}

export default Home;