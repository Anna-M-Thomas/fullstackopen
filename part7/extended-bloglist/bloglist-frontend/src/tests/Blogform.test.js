import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blogform from "./Blogform";

describe("<Blogform/>", () => {
  test("Form successfully submits correct blog details", () => {
    const createBlog = jest.fn();
    const component = render(<Blogform createBlog={createBlog} />);
    const form = component.container.querySelector("form");
    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");
    fireEvent.change(title, {
      target: { value: "I'm not a cat" },
    });
    fireEvent.change(author, {
      target: { value: "An unfortunate lawyer" },
    });
    fireEvent.change(url, {
      target: { value: "https://i-am-not-a-kitty-cat.com/blog" },
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog).toHaveBeenCalledWith({
      title: "I'm not a cat",
      author: "An unfortunate lawyer",
      url: "https://i-am-not-a-kitty-cat.com/blog",
    });
  });
});
