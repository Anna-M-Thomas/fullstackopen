import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog/>", () => {
  let component;

  const blog = {
    title: "Give me fish I want fish meow meow",
    author: "Satsuki the Cat",
    url: "http://meow.com/meow/blog",
    likes: 2,
    id: "5a422a851b54a676234d17f7",
    user: { username: "Anna", name: "Anna", id: "5" },
  };

  const user = {
    name: "Anna",
    username: "Anna",
    id: "5",
  };

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} />);
  });

  test("Renders title and author, but not URL or likes by default", () => {
    const details = component.container.querySelector(".details");
    expect(details).not.toBeVisible();
  });

  test("URL and likes are displayed when view details button is clicked", () => {
    const details = component.container.querySelector(".details");

    const button = component.getByText("view details");
    fireEvent.click(button);
    //div containing URL and likes is visible
    expect(details).toBeVisible();
    const likeButton = component.getByText("like");
    //like button inside div is also visible
    expect(likeButton).toBeVisible();
  });
});

describe("<Blog/> with mock handler", () => {
  test("Event handler for adding likes is called twice when like button clicked twice", () => {
    const blog = {
      title: "Give me fish I want fish meow meow",
      author: "Satsuki the Cat",
      url: "http://meow.com/meow/blog",
      likes: 2,
      id: "5a422a851b54a676234d17f7",
      user: { username: "Anna", name: "Anna", id: "5" },
    };

    const user = {
      name: "Anna",
      username: "Anna",
      id: "5",
    };

    const increaseLikes = jest.fn();

    const component = render(
      <Blog blog={blog} user={user} increaseLikes={increaseLikes} />
    );
    const button = component.getByText("view details");
    fireEvent.click(button);
    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(increaseLikes.mock.calls).toHaveLength(2);
  });
});

