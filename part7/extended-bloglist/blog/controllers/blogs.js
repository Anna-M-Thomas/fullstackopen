const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");

//Everyone populates "user" with username, name, id, for consistency's sake
//if I don't populate, user.name won't display on blogs details after updates/new posts

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
      .populate("user", {
        username: 1,
        name: 1,
        id: 1,
      })
      .populate("comments", {
        content: 1,
      });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id/comments", async (request, response, next) => {
  try {
    const comments = await Comment.find({ blog: request.params.id });
    response.json(comments);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/:id/comments", async (request, response, next) => {
  try {
    const body = request.body;
    console.log("request inside blogsRouter", request);
    console.log("body inside blogsRouter", body);
    console.log("comment content inside blogsRouter", body.content);

    const comment = new Comment({
      content: body.content,
      blog: request.params.id,
    });

    const result = await comment.save();

    const blog = await Blog.findById(request.params.id);

    blog.comments = blog.comments.concat(result._id);
    await blog.save();

    //Instead of figuring out how to populate after saving...again...
    const populatedBlog = await Blog.findById(request.params.id)
      .populate("user", {
        username: 1,
        name: 1,
        id: 1,
      })
      .populate("comments", {
        content: 1,
        id: 1,
      });

    response.status(201).json(populatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const token = request.token;

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const blog = await Blog.findById(request.params.id);

    if (!(blog.user.toString() === decodedToken.id)) {
      return response.status(401).json({
        error: "this blog belongs to another user and can't be deleted",
      });
    }

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

//Put only increments likes
blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      { _id: `${request.params.id}` },
      { $inc: { likes: 1 } },
      { new: true }
    )
      .populate("user", {
        username: 1,
        name: 1,
        id: 1,
      })
      .populate("comments", {
        content: 1,
        id: 1,
      });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const token = request.token;

    if (request.body.title === undefined || request.body.author === undefined) {
      return response.status(400).json({ error: "No title and/or no author" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    });

    const result = await blog.save();
    //Instead of figuring out how to populate after saving...
    const populatedResult = await Blog.findById(result.id)
      .populate("user", {
        username: 1,
        name: 1,
        id: 1,
      })
      .populate("comments", {
        content: 1,
        id: 1,
      });

    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(populatedResult);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
