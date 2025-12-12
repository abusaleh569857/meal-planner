const CategoryCard = ({ cat }) => {
  const { id, name, thumbnail, description } = cat;
  return (
    <div>
      <div className="border-2 border-cyan-200 rounded-xl p-3">
        <h1>Name : {name}</h1>
        <img src={thumbnail} alt="" />
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
