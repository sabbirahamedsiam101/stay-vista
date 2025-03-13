import PropTypes from "prop-types";
import queryString from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";

const CategoryBox = ({ label, icon: Icon }) => {
  const navigate = useNavigate()
  const [params , setParams] = useSearchParams()
  const category = params.get('category')
  const handleClick = () => {
    let currentQuery = { category: label };
    const url = queryString.stringifyUrl({
      url: "/",
      query: currentQuery,
    });
    // console.log("current url : ", url);
    navigate(url)
  };
  return (
    <div
      onClick={handleClick}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-4
  ${category === label && 'border-black  text-neutral-800'}
  hover:text-neutral-800
  transition
  cursor-pointer`}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
};

export default CategoryBox;
