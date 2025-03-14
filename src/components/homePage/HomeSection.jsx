import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HomeSection = ({ title, children }) => {
  return (
    <div className="flex px-2">
      <section className="flex-1 flex max-w-7xl py-12 flex-col m-auto overflow-hidden xl:overflow-visible">
        <div className="flex justify-between">
          <h1 className="font-semibold text-3xl mb-4">{title}</h1>
          <Link to="/books" className="uppercase font-medium hover:underline underline-offset-8">See more</Link>
        </div>
        {children}
      </section>
    </div>
  );
};

HomeSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default HomeSection;