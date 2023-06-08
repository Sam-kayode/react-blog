import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MenuItem } from "./navigation/menu-item";
import { menuItems } from "./constants";

const Header = ({ user, handleLogout }) => {
  const userId = user?.uid;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const listMenuItems = menuItems.map((item, index) => (
    <MenuItem to={item.to} title={item.title} key={index} />
  ));

  const ref = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        isMobileMenuOpen && setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
  }, [ref]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const mobileListMenuItems = menuItems.map((item, index) => (
    <NavLink
      key={index}
      to={item.to}
      className={({ isActive }) =>
        isActive ? "text-green-500 text-xl" : "w-screen"
      }
      onClick={toggleMobileMenu}
    >
      <li className="p-3">
        <span>{item.title}</span>{" "}
      </li>
    </NavLink>
  ));

  return (
    <nav className="bg-white shadow-lg fixed top-0 w-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <span href="#" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">
                  React-blog
                </span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              {listMenuItems}
            </div>
          </div>
          <div className="flex items-center space-x-3 ml-auto mr-8 sm:ml-0">
            {userId ? (
              <button
                onClick={handleLogout}
                href=""
                className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
              >
                Sign Out
              </button>
            ) : (
              <NavLink to="/auth">
                {" "}
                <button
                  href=""
                  className="py-2 px-2 font-medium text-gray-500 rounded bg-green-500 hover:text-white transition duration-300"
                >
                  Log In
                </button>
              </NavLink>
            )}
          </div>
          <div className="sm:hidden flex items-center">
            <div
              className="outline-none mobile-menu-button"
              onClick={toggleMobileMenu}
            >
              <svg
                className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className={`${
          isMobileMenuOpen ? "top-[61px] border" : "hidden"
        } bg-white border rounded-md`}
      >
        <ul className="w-screen">{mobileListMenuItems}</ul>
      </div>
    </nav>
  );
};

export default Header;
