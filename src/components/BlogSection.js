import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

const BlogSection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
}) => {
  return (
   
      <div
        className=" border shadow-lg mx-auto w-full px-2 rounded-md"
        key={id}
      >
        <div className="">
          <div className="hover-blogs-img">
            <div className="w-full mx-auto border rounded-md my-3">
              <img
                src={imgUrl}
                alt={title}
                className=" w-full"
              />
            </div>
          </div>
        </div>
        <div className="text-left">
          <div className="pl-2">
            <h5 className="font-bold text-left my-2">{title}</h5>{" "}
            <p className=" text-[12px] mb-3">
              <span className=" font-bold">{author}</span> -&nbsp;
              {timestamp.toDate().toDateString()}
            </p>
            <span className="text-[12px]">category -</span>
            <span className="rounded bg-green-400 w-fit text-[12px] p-[1px] myt-6">
              {category}
            </span>
            <div className="mt-3 text-[14px]">{excerpt(description, 120)}</div>
            <Link to={`/detail/${id}`}> <button className=" text-green-400 text-[12px]">
              Read More ....   

            </button> </Link>
          </div>

          {user && user.uid === userId && (
            <div className="text-right pr-2 h-fit">
              <FontAwesome
                name="trash"
                className="m-4 text-[20px] cursor-pointer text-red-500"
                onClick={() => handleDelete(id)}
              />
              <Link to={`/update/${id}`}>
                <FontAwesome
                  name="edit"
                  className="cursor-pointer text-[20px]"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
  );
};

export default BlogSection;
