import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs"; 

const BackButton = ({destination = "/"}) => (
  <div className="flex">
    <Link
      to={destination}
      className="bg-sky-800 text-white px-4 py-1 rounded-lg flex items-center" 
    >
      <BsArrowLeft className="text-2xl mr-2" />
      Back
    </Link>
  </div>
);

export default BackButton;
