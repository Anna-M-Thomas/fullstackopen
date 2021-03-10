import blogService from "../services/blogs";

export const setAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "SET_ALL_BLOGS",
      data: { blogs },
    });
  };
};

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    const addedBlog = await blogService.addBlog(newBlog);
    dispatch({
      type: "ADD_BLOG",
      data: { addedBlog },
    });
  };
};

export const addLikes = (blogId) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.increaseLikes(blogId);
    dispatch({
      type: "UPDATE_BLOG",
      data: { updatedBlog },
    });
  };
};

export const addComment = (blogId, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(blogId, comment);
    dispatch({
      type: "UPDATE_BLOG",
      data: { updatedBlog },
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_BLOGS":
      return action.data.blogs;
    case "ADD_BLOG":
      return state.concat(action.data.addedBlog);
    case "UPDATE_BLOG":
      return state.map((item) =>
        item.id === action.data.updatedBlog.id ? action.data.updatedBlog : item
      );
    default:
      return state;
  }
};

export default blogReducer;
