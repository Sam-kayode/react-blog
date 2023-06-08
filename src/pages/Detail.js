import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Detail = ({ user }) => {
  const userId = user?.uid;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  const getBlogDetail = async () => {
    setLoading(true);
    const docRef = doc(db, "blogs", id);
    try {
      const blogDetail = await getDoc(docRef);
      setBlog(blogDetail.data());
    } catch (error) {
      toast.error("The post does not exist or is unavailable");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-[700px] mx-auto px-4">
      <h1 className="mt-[70px] mb-5 font-bold text-[40px]">{blog?.title}</h1>
      <div className="">
        <img src={blog?.imgUrl} class="mx-auto " />
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="mb-6">
              <span className="">
                By <span className=" font-bold">{blog?.author}</span> -&nbsp;
                {blog?.timestamp.toDate().toDateString()}
              </span>
              <p className="mt-5 text-justify">{blog?.description}</p>

              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
