
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  blogs.sort((a, b) => b.likes - a.likes);
  let { url, __v, _id, ...everyThingElse } = blogs[0];
  return everyThingElse;
};

const mostBlogs = (blogs) => {
  let array = [];
  blogs.forEach((blog) => {
    const found = array.find((item) => item.author === blog.author);
    if (found) {
      const index = array.indexOf(found);
      array[index].blogs += 1;
    } else array.push({ author: blog.author, blogs: 1 });
  });
  array.sort((a, b) => b.blogs - a.blogs);
  return array[0];
};

const mostLikes = (blogs) => {
  let array = [];
  blogs.forEach((blog) => {
    const found = array.find((item) => item.author === blog.author);
    if (found) {
      const index = array.indexOf(found);
      array[index].likes += blog.likes;
    } else array.push({ author: blog.author, likes: blog.likes });
  });
  array.sort((a, b) => b.likes - a.likes);
  return array[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

// {
//   _id: "5a422a851b54a676234d17f7",
//   title: "React patterns",
//   author: "Michael Chan",
//   url: "https://reactpatterns.com/",
//   likes: 7,
//   __v: 0,
// }
