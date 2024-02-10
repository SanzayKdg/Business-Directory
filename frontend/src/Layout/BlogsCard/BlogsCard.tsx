import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BlogCardType } from "../../types/Props/props.types";
import "./BlogsCard.css";
import { FaTags, FaUser, FaRegClock } from "react-icons/fa";
const BlogsCard = (props: BlogCardType) => {
  const { blog } = props;

  return (
    <Link to={`/blog/${blog.slug}`} className="blogs__card">
      <div className="blog__top">
        <Image
          className="blog__background"
          src={blog.cover}
          alt="Business Image"
        />
      </div>

      <div className="blogs__mid">
        <div className="blog__details">
          <div className="blog__details__top">
            <FaTags size={16} color="#261f2280" />
            <p className="p__text blog__tags">{blog.tags[0]}</p>
            <p className="p__text tag__divider">|</p>
            <p className="p__text blog__tags">{blog.tags[1]}</p>
          </div>

          <p className="p__text blog__title">
            <b>{blog.title}</b>
          </p>

          <div className="user__blog">
            <div className="blog__date">
              <FaRegClock size={16} color="#261f2280" />
              <p className="p__text blog__user__details">
                {blog.created_at}
              </p>
            </div>

            <div className="user__name">
              <FaUser size={16} color="#261f2280" />
              <p className="p__text blog__user__details">
                {blog.author.full_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogsCard;
