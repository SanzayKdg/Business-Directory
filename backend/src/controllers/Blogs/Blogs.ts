import { validate } from "class-validator";
import { UpdateBlogDTO } from "./dto/BlogDto.js";
import Blog from "../../models/Blog/blogs.js";
import { BlogStatus } from "../../@types/blogs.t.js";
import * as fs from "fs";
import { slugify } from "../../@helpers/slugify.js";
import { BASE_URL } from "../../@config/constants.config.js";

// ---------------------- CREATE NEW BLOG (PUBLC -- AUTH) ---------------------------------
export const newBlog = async (req: any, res: any, next: any) => {
  try {
    const { title, description, tags, category } = req.body;
    const slug = slugify(title);
    // Handle Single Image
    const cover = req.files["cover"][0].path;
    let image: any = [];

    // Handle Multiple Image
    const images = req.files["image"];
    images.forEach((item: any) => image.push(item.path));

    await Blog.create({
      title,
      slug,
      description,
      tags,
      cover,
      image,
      category,
      user: req.user._id,
    });

    res
      .status(201)
      .json({ success: true, message: "Blog created successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- GET ALL BLOGS (PUBLC -- NO AUTH) ---------------------------------
export const getAllBlogs = async (req: any, res: any, next: any) => {
  try {
    const blogs = await Blog.find({ blog_status: BlogStatus.PUBLISHED })
      .populate("user", "full_name") // Populate the user name
      .exec();
    if (!blogs) {
      return next(
        res.status(400).json({ success: false, message: "No Blogs Found." })
      );
    }
    const filteredBlogs = blogs.map((blog) => {
      return {
        title: blog.title,
        slug: blog.slug,
        cover: BASE_URL.backend + blog.cover.replace(/\\/g, "/"),
        created_at: blog.createdAt.toDateString().slice(4),
        author: blog.user,
        tags: blog.tags,
        status: blog.blog_status,
      };
    });

    res.status(200).json({ success: true, blogs: filteredBlogs });
  } catch (error: any) {
    res.staus(500).json({ success: false, message: error.message });
  }
};

// ---------------------- GET SINGLE BLOG (PUBLC -- NO AUTH) ---------------------------------

export const getSinlgeBlog = async (req: any, res: any, next: any) => {
  try {
    const blog = await Blog.findById({
      _id: req.params.id,
      blog_status: BlogStatus.PUBLISHED,
    });

    if (!blog) {
      return next(
        res.status(400).json({
          success: false,
          message: "Blog doesnot exists or have been deleted.",
        })
      );
    }

    res.status(200).json({ success: true, blog });
  } catch (error: any) {
    res.staus(500).json({ success: false, message: error.message });
  }
};

// ---------------------- CREATE NEW BLOG (PUBLC -- AUTH) ---------------------------------
export const updateBlog = async (req: any, res: any, next: any) => {
  try {
    const { title, slug, category, description, tags } = req.body;
    // const slug = slugify(title, { lower: true });
    let cover: string = "";
    let image: any = [];
    const payload = new UpdateBlogDTO();
    payload.title = title;
    payload.slug = slug;
    payload.description = description;
    payload.category = category;
    payload.cover = cover;
    payload.image = image;
    payload.tags = tags;

    // check if blog exists
    const blog = await Blog.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!blog) {
      return next(
        res.status(400).json({
          success: false,
          message: "Blog doesnot exists or have been deleted.",
        })
      );
    }

    if (payload?.cover) {
      payload.cover = null;
    }
    if (payload?.image) {
      payload.image = [];
    }
    if (req.files["cover"]) {
      cover = req.files["cover"][0].path;
      payload.cover = cover;

      // Delete old logo (assuming business.logo is an array)
      if (blog.cover && blog.cover.length > 0) {
        const path = blog.cover;
        fs.unlinkSync(path);
      }
    }

    if (req.files["image"]) {
      const images = req.files["image"];
      images.forEach((item: any) => image.push(item.path));
      payload.image = image;

      // Delete old images
      if (blog.image && blog.image.length > 0) {
        blog.image.forEach((path) => fs.unlinkSync(path));
      }
    }

    // Validation
    const errors = await validate(payload);

    if (errors.length > 0) {
      const validation_error = errors.reduce((acc: any, error) => {
        // Destructuring error object and getting property and constraints
        // For e.g. property : password, constraint: minLength['password must be longer or than equal to 8 characters ]
        const { property, constraints } = error;
        acc[property] = Object.values(constraints || {});
        return acc;
      }, {});
      return next(
        res.status(400).json({ success: false, message: validation_error })
      );
    }

    const updated_blog = {
      title: payload.title,
      slug: payload.slug,
      category: payload.category,
      description: payload.description,
      tags: payload.tags,
      cover: payload.cover,
      image: payload.image,
    };
    await Blog.findByIdAndUpdate(blog._id, updated_blog, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Successfully Update Blog.",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---------------------- DELETE BLOG ( USER -- AUTH) ---------------------------------
export const deleteBlog = async (req: any, res: any, next: any) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!blog) {
      return next(
        res.status(400).json({
          success: false,
          message: "Blog doesnot exists or have been deleted.",
        })
      );
    }

    // Delete images & logo
    if (blog.cover) {
      const path = blog.cover;
      fs.unlinkSync(path);
    }

    if (blog.image) {
      blog.image.forEach((path) => {
        fs.unlinkSync(path);
      });
    }

    await Blog.findByIdAndDelete({ _id: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully." });
  } catch (error: any) {
    res.staus(500).json({ success: false, message: error.message });
  }
};
