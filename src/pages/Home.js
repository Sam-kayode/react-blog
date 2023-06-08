import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";
import Trending from "../components/Trending";

const Home = ({ user, active }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);
  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlogs();
    const blogs = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      blogs();
      getTrendingBlogs();
    };
  }, []);

  useEffect(() => {
    getBlogs();
  }, [active]);

  const getBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const docs = query(blogRef, orderBy("title"));
    const docSnapshot = await getDocs(docs);
    setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  if (loading) {
    return !blogs[0] && <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        setLoading(false);
        getBlogs();
        getTrendingBlogs();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="row mx-0 max-w-[1300px] mx-auto">
        <p className="text-left pl-10 text-[20px] mt-[80px] px-2">
          {user?.displayName && (
            <>
              Hi <span className=" font-bold">{user.displayName},</span>
            </>
          )}
        </p>
        <Trending blogs={trendBlogs} />
        <div className="">
          <div className=" text-xl font-bold py-2 mb-4">Daily Blog</div>
          <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-4 px-[40px] ">
            {blogs?.map((blog) => (
              <BlogSection
                key={blog.id}
                user={user}
                handleDelete={handleDelete}
                {...blog}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
