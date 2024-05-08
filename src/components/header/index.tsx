
import { Link } from "react-router-dom";

const Header = () => {
    const listHeader = ["Home", "About", "Contact"];

    return (
    <div className="bg-yellow-600 py-4">
        <div className="container mx-auto">
            <div className="flex flex-row">
              {listHeader.map((item) => {
                return (
                  <Link to={`/${item}`} key={item}>
                    <div className="px-4">
                      <p className="text-white capitalize">{item}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
        </div>
    </div>
  );
};

export default Header;