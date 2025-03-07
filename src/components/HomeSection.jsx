const HomeSection = ({ title, children }) => {
  return (
    <div className="flex px-2">
      <section className="flex-1 flex max-w-7xl py-12 flex-col m-auto overflow-hidden xl:overflow-visible">
        <h1 className="font-semibold text-3xl mb-4">{title}</h1>
        {children}
      </section>
    </div>
  );
};

export default HomeSection;