import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BlogFilter from "../../Layout/BlogsCard/BlogFilter";
import BlogsCard from "../../Layout/BlogsCard/BlogsCard";
import { getAllBlogs } from "../../services/blogs/blogs";
import { AllBlogType } from "../../types/BlogsTypes";
import "./Blogs.css";
import Newsletter from "../../Layout/NewsLetter/Newsletter";
const Blogs = () => {
  const [blogs, setBlogs] = useState<AllBlogType[] | []>([]);
  useEffect(() => {
    const fetchAllBlogs = async () => {
      const blogs = await getAllBlogs();
      setBlogs(blogs);
    };

    fetchAllBlogs();
  }, []);
  return (
    <section className="blogs__container">
      {/* ---------------------- LISTING - HERO SECTION  ------------------------------------- */}
      <div className="home__bg">
        <Image
          src="/background/bg1.jpg"
          alt="background image"
          className="blogsbg__image"
        />
      </div>
      <div className="blogs__header">
        <h1 className="h1__text light__text text__center">Blogs</h1>
        <p className="p__text light__text text__center">
          1.118.940.376 The best service package is waiting for you
        </p>
      </div>
      {/* ---------------------- LISTING - HERO SECTION  ------------------------------------- */}

      <section className="blogs__bottom px__8">
        {/* ---------------------- BLOGS - CARDS  ------------------------------------- */}
        <section className="blogs__cards__container">
          {blogs &&
            blogs.map((item) => <BlogsCard key={item.title} blog={item} />)}
        </section>

        {/* ---------------------- BLOGS - FILTERS  ------------------------------------- */}
        <section className="blogs__filter">
          <BlogFilter blogs={blogs} />
        </section>
      </section>

      {/* ---------------------- SINGLE LISTING - NEWSLETTER  ------------------------------------- */}
      <section className="blogs__newsletter px__8">
        <Newsletter />
      </section>
    </section>
  );
};

export default Blogs;
