import React from "react";
import { Link } from "react-router-dom";
const Trending = ({ blogs }) => {
  return (
    <>
      <div>
        {blogs[0] && (
          <div className=" text-xl font-bold py-2 mb-4 mt-6">Trending Posts</div>
        )}
      </div>
      <div className="max-w-[85vw] mx-auto md-w-full overflow-x-auto px-[10px] pb-[30px]">
        <div className="flex md:justify-center">
          {blogs?.map((item) => (
            <div
              className="border rounded-md shadow-xl mx-1 px-2 min-w-[150px] pb-5"
              key={item.id}
            >
              <Link to={`/detail/${item.id}`}>
                <div className="py-2">
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="w-[200px] h-[100px] border mx-auto rounded-sm"
                  />
                </div>
                <div className="">
                  <span className="font-bold">{item.title}</span>
                  <div className=" text-[10px]">
                    {item.author} - {item.timestamp.toDate().toDateString()}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Trending;
