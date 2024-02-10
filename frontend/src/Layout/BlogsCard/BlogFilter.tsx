import "./BlogFilter.css";
import { Image, Input } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { FaRegClock, FaTags } from "react-icons/fa6";
import {
  AllBlogType,
  CategoryType,
  popularCategory,
  popularTags,
} from "../../types/BlogsTypes";
import { Link } from "react-router-dom";
type Blogs = { blogs: AllBlogType[] };
const BlogFilter = (props: Blogs) => {
  const { blogs } = props;
  return (
    <section>
      <div className="search__form">
        <Input
          className="blog__search p__text"
          focusBorderColor="white"
          border="hidden"
          type="text"
          variant="outline"
          placeholder="What are you Looking for?"
        />
        <FaSearch size={18} className="blog__search__icon" />
      </div>

      <div className="recent__blogs">
        <h6 className="blogs__heading__h6">Recent Posts</h6>

        <div className="recent__blog__items">
          {blogs &&
            blogs.map((blog: AllBlogType) => (
              <div className="blog__flex">
                <div className="blog__cover">
                  <Image src={blog.cover} className="blog__cover" />
                </div>

                <div className="flex__right">
                  <div className="blog__detail">
                    <FaTags size={16} color="#261f2280" />
                    <p className="p__text blog__tag blog__desc">
                      {blog.tags[0]}
                    </p>
                  </div>

                  <div className="blog__detail">
                    <p className="p__text blog__desc">
                      <b>{blog.title}</b>
                    </p>
                  </div>

                  <div className="blog__detail">
                    <FaRegClock size={16} color="#261f2280" />
                    <p className="p__text blog__user__details blog__desc">
                      {blog.created_at}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="recent__blogs">
        <h6 className="blogs__heading__h6">Popular Categories</h6>

        <div className="recent__blog__items">
          {popularCategory &&
            popularCategory.map((category: CategoryType) => (
              <Link to={"/"} className="categories__flex">
                <p className="p__text popular__categories">{category.name}</p>
                <p className="p__text categories__count">
                  {category.noOfBlogs}
                </p>
              </Link>
            ))}
        </div>
      </div>
      <div className="recent__blogs">
        <h6 className="blogs__heading__h6">Popular Tags</h6>

        <div className="blog__tags__grids">
          {popularTags &&
            popularTags.map((tag: string) => (
              <Link to={"/"} className="tags__grid">
                <p className="p__text popular__tags">{tag}</p>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BlogFilter;
