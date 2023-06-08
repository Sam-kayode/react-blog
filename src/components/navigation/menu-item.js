import { NavLink } from "react-router-dom";

export function MenuItem(props) {
  return (
    <div className="w-[90px]">
      <NavLink
        to={props.to}
        className={({ isActive }) => (isActive ? "text-green-500 w-5" : '')}
        end
      >
        <div className="col-span-4 font-bold ">
          {props.title}
        </div>
      </NavLink>
    </div>
  );
}
