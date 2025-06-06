import { FaPen } from "react-icons/fa6";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="bg-white border-b shadow-sm flex justify-between items-center px-6 py-4">
      {/* Logo */}
      <Link to="/blogs" className="font-serif text-2xl font-bold text-black hover:opacity-80 transition">
        Medium
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <Link to="/publish">
          <button
            type="button"
            className="flex items-center gap-2 text-black border border-gray-300 hover:bg-gray-100 font-medium rounded-full text-sm px-4 py-1.5 transition"
          >
            <FaPen className="text-sm" />
            Write
          </button>
        </Link>

        <Avatar size="big" name="Vipin Yadav" />
      </div>
    </div>
  );
};
