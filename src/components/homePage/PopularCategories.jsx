import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const categoryImages = {
  'Self-Help': '../images/category/self-help_category.png',
  Romance: '../images/category/romance_category.png',
  'Science Fiction': '../images/category/science-fiction_category.png',
  Classic: '../images/category/classics_category.png',
};

function PopularCategories({ titles }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {titles.map((title, index) => (
        <Link to={`/books?category=${title}`} key={index}>
          <div className="w-full bg-slate-100 flex items-center flex-col rounded hover:shadow-xl">
            <img
              src={categoryImages[title]}
              alt="Category"
              className="w-full h-[200px] bg-white mb-4 rounded-t"
            />
            <h1 className="font-medium text-lg mx-2 mb-4">{title}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
}

PopularCategories.propTypes = {
  titles: PropTypes.array.isRequired,
};

export default PopularCategories;
