import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegClock, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import BlogFilter from "../../Layout/BlogsCard/BlogFilter";
import Newsletter from "../../Layout/NewsLetter/Newsletter";
import { getAllBlogs, getBlogDetails } from "../../services/blogs/blogs";
import { AllBlogType, SingleBlogType } from "../../types/BlogsTypes";
import "./BlogDetails.css";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState<AllBlogType[] | []>([]);
  const [blog, setBlog] = useState<SingleBlogType>();
  useEffect(() => {
    const fetchAllBlogs = async () => {
      const blogs = await getAllBlogs();
      setBlogs(blogs);
    };

    const fetchSingleBlog = async () => {
      const blog = await getBlogDetails(slug);
      setBlog(blog);
    };

    fetchAllBlogs();
    fetchSingleBlog();
  }, [slug]);
  return (
    <section className="blog__details__container">
      {/* ---------------------- BLOG DETAILS - BACKGROUND IMAGE  ------------------------------------- */}

      <section className="listing__bg">
        {blog?.cover ? (
          <Image
            src={`${blog?.cover}`}
            alt="background image"
            className="listingbg__image"
          />
        ) : (
          <Image
            src="/background/bg1.jpg"
            alt="background image"
            className="blogbg__image"
          />
        )}
      </section>

      {/* ---------------------- BLOG DETAILS - TOP DESCRIPTION  ------------------------------------- */}

      <section className="blog__desc__container">
        <div className="blog__desc">
          <h4 className="blog__title">{blog?.title}</h4>
        </div>

        <div className="blog__users">
          <div className="blog__user">
            <FaRegClock size={18} color="#a8a8a8" />
            <p className="p__text blog__user__details">{blog?.created_at}</p>
          </div>

          <div className="blog__user">
            <FaUser size={18} color="#a8a8a8" />
            <p className="p__text blog__user__details">
              {blog?.author.full_name}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------- BLOG DETAILS - TOP DESCRIPTION  ------------------------------------- */}
      <section className="blog__bottom px__8">
        <section className="blog__details__left">
          <div className="blog__images">
            {blog?.images && blog?.images[0] && (
              <Image className="blog__image" src={blog.images[0]} />
            )}
          </div>

          <div className="blog__descriptions">
            <p className="p__text">
              {blog?.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Earum in voluptatem alias, molestiae, numquam
              adipisci suscipit doloribus unde porro consequatur veniam
              veritatis et ex cupiditate quia magnam autem hic exercitationem
              amet voluptatibus voluptate tempore facilis recusandae quod.
              Possimus voluptatem nam voluptatibus tempora sunt voluptas natus
              facilis laborum, unde impedit harum fugit officia sed modi
              placeat. Minima distinctio id suscipit ex quae libero at quam
              accusamus nemo dolorem, tenetur corrupti iure iste aperiam nulla
              labore reiciendis aut perspiciatis, esse nam maiores temporibus.
              Magni tempore quam ullam porro voluptas. Ducimus debitis, possimus
              dolorum reiciendis adipisci autem voluptates ullam recusandae
              tempore natus dicta molestiae id rerum inventore facilis quam
              nesciunt dolores eveniet, ut hic animi repellat cum delectus unde!
              Unde veritatis incidunt facere iste id reiciendis, est quis ex
              quae, mollitia nemo tenetur, velit accusamus laudantium iure
              voluptatibus possimus? Sed et voluptatibus soluta ex velit, quis
              quisquam eos vero nesciunt quos exercitationem aperiam tempore
              reprehenderit ipsam qui nostrum quibusdam! Quasi adipisci
              voluptate aspernatur natus tempore delectus inventore dolore!
              Nostrum, porro eius veniam rem quaerat harum consequuntur
              laboriosam iure? Et fugiat rem quidem pariatur nulla illo omnis
              eum quo tempora totam excepturi commodi sequi placeat, harum cum
              ea sint eveniet obcaecati consequuntur temporibus accusantium
              necessitatibus odio veritatis officia. Id tempore repellendus,
              placeat nesciunt praesentium, cupiditate nobis sequi minima beatae
              vero eaque ducimus? Possimus perspiciatis aliquam quae! Vel
              consequatur nostrum facere assumenda, dolores perspiciatis culpa
              doloribus minima aspernatur voluptatibus. Consequatur porro
              pariatur modi eveniet ut iste magni reiciendis eligendi maxime
              veniam, dolorum, aliquid corporis esse nostrum quae corrupti
              possimus atque a?
            </p>
          </div>

          <div className="blog__subtitle">
            <h6 className="blog__subheading">Your Sub heading goes here</h6>

            <p className="p__text">
              blog description here Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Earum in voluptatem alias, molestiae, numquam
              adipisci suscipit doloribus unde porro consequatur veniam
              veritatis et ex cupiditate quia magnam autem hic exercitationem
              amet voluptatibus voluptate tempore facilis recusandae quod.
              Possimus voluptatem nam voluptatibus tempora sunt voluptas natus
              facilis laborum, unde impedit harum fugit officia sed modi
              placeat. Minima distinctio id suscipit ex quae libero at quam
              accusamus nemo dolorem, tenetur corrupti iure iste aperiam nulla
              labore reiciendis aut perspiciatis, esse nam maiores temporibus.
              Magni tempore quam ullam porro voluptas. Ducimus debitis, possimus
              dolorum reiciendis adipisci autem voluptates ullam recusandae
              tempore natus dicta molestiae id rerum inventore facilis quam
              nesciunt dolores eveniet, ut hic animi repellat cum delectus unde!
              Unde veritatis incidunt facere iste id reiciendis, est quis ex
              quae, mollitia nemo tenetur, velit accusamus laudantium iure
              voluptatibus possimus? Sed et voluptatibus soluta ex velit, quis
              quisquam eos vero nesciunt quos exercitationem aperiam tempore
              reprehenderit ipsam qui nostrum quibusdam! Quasi adipisci
              voluptate aspernatur natus tempore delectus inventore dolore!
              Nostrum, porro eius veniam rem quaerat harum consequuntur
              laboriosam iure? Et fugiat rem quidem pariatur nulla illo omnis
              eum quo tempora totam excepturi commodi sequi placeat, harum cum
              ea sint eveniet obcaecati consequuntur temporibus accusantium
              necessitatibus odio veritatis officia. Id tempore repellendus,
              placeat nesciunt praesentium, cupiditate nobis sequi minima beatae
              vero eaque ducimus? Possimus perspiciatis aliquam quae! Vel
              consequatur nostrum facere assumenda, dolores perspiciatis culpa
              doloribus minima aspernatur voluptatibus. Consequatur porro
              pariatur modi eveniet ut iste magni reiciendis eligendi maxime
              veniam, dolorum, aliquid corporis esse nostrum quae corrupti
              possimus atque a?
            </p>
          </div>
          <div className="blog__images">
            {blog?.images && blog?.images[1] && (
              <Image className="blog__image" src={blog.images[1]} />
            )}
          </div>
          <div className="blog__images">
            {blog?.images && blog?.images[2] && (
              <Image className="blog__image" src={blog.images[2]} />
            )}
          </div>

          <div className="tags__flex">
            <h6 className="tags__heading">Tags</h6>
            <div className="blog__tags__grids">
              {blog?.tags &&
                blog?.tags.map((tag: string) => (
                  <Link to={"/"} className="tags__grid__btn">
                    <p className="p__text blogs__tags">{tag}</p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
        <section className="blog__details__right">
          <BlogFilter blogs={blogs} />
        </section>
      </section>

      <section className="blog__details__newsletter px__8">
        <Newsletter />
      </section>
    </section>
  );
};

export default BlogDetails;
