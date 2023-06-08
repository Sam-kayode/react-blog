import { useState, useEffect } from "react";
import "./App.css";
import "./style.scss";
import "./media-query.css";
import Home from "./pages/Home";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Detail from "./pages/Detail";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import { auth } from "./firebase/firebase";
import { signOut } from "firebase/auth";
// import TagBlog from "./pages/TagBlog";
// import CategoryBlog from "./pages/CategoryBlog";
// import ScrollToTop from "./components/ScrollToTop";
// import Blogs from "./pages/Blogs";

function App() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate("/auth");
    });
  };

  return (
    <div className="App">
      <Header user={user} handleLogout={handleLogout} />
      {/* <ScrollToTop /> */}
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/search" element={<Home user={user} />} />
        <Route path="/detail/:id" element={<Detail user={user} />} />
        <Route
          path="/create"
          element={
            user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/update/:id"
          element={
            user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />
          }
        />
        {/* <Route path="/blogs" element={<Blogs />} /> */}
        {/* <Route path="/tag/:tag" element={<TagBlog />} /> */}
        {/* <Route path="/category/:category" element={<CategoryBlog />} /> */}
        <Route path="/about" element={<About />} />
        <Route
          path="/auth"
          element={user?.uid ? <Navigate to="/" />: <Auth setUser={setUser} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
