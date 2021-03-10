import blogs from "../../../src/services/blogs";

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Anna",
      username: "Nattolover",
      password: "nattoyumyum",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login in to application");
    cy.get(".loginForm");
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("Nattolover");
      cy.get("#password").type("nattoyumyum");
      cy.contains("login").click();
    });

    it("A blog can be created", function () {
      cy.contains("add blog").click();
      cy.get("#title").type("We can't stop");
      cy.get("#author").type("Miley Cyrus");
      cy.get("#url").type("http://miley-cyrus.com/blog");
      cy.contains("create").click();
      cy.get(".blog").should("have.length", 1);
      cy.get(".blog").contains("We can't stop");
    });
  });

  describe("When a blog is already created", function () {
    beforeEach(function () {
      cy.login("Nattolover", "nattoyumyum");
      cy.makeblog(
        "We can't stop",
        "Miley Cyrus",
        "http://miley-cyrus.com/blog"
      );
    });

    it("User can like blog", function () {
      cy.contains("We can't stop").as("theBlog");
      cy.get("@theBlog").contains("view details").click();
      cy.get("@theBlog").contains("like").click();
      cy.contains("Successfully added likes!");
    });

    it("User can delete their blog", function () {
      cy.contains("We can't stop").as("theBlog");
      cy.get("@theBlog").contains("delete").click();
      cy.contains("Blog successfully deleted!");
    });

    it("Another user can't delete the blog", function () {
      cy.contains("logout").click();
      const user = {
        name: "Another user",
        username: "anotheruser",
        password: "lalalalalal",
      };
      cy.request("POST", "http://localhost:3001/api/users", user);
      cy.login("anotheruser", "lalalalalal");
      cy.contains("We can't stop").should("not.contain", "delete");
    });
  });

  describe.only("When multiple blogs are created", function () {
    beforeEach(function () {
      cy.login("Nattolover", "nattoyumyum");
      cy.makeblog(
        "We can't stop",
        "Miley Cyrus",
        "http://miley-cyrus.com/blog"
      );
      cy.makeblog(
        "I Love Pandas",
        "Panda Fan",
        "http://panda-panda.panda/panda_panda"
      );
      cy.makeblog(
        "Don't Eat Me",
        "A Fish",
        "http://anti-pescatarian-brigade/blog"
      );
    });

    it("Blogs are ordered by number of likes", function () {
      //Don't Eat Me should have 3 likes
      cy.contains("Don't Eat Me").contains("view details").click();
      cy.contains("Don't Eat Me").contains("like").click();
      cy.contains("Don't Eat Me").contains("like").click();
      cy.contains("Don't Eat Me").contains("like").click();
      //I Love Pandas should have 2 likes
      cy.contains("I Love Pandas").contains("view details").click();
      cy.contains("I Love Pandas").contains("like").click();
      cy.contains("I Love Pandas").contains("like").click();
      //We Can't Stop has 0 likes
      cy.visit("http://localhost:3000");

      cy.get(".like").then((spans) => {
        expect(spans[0].innerText).to.equal("3");
        expect(spans[1].innerText).to.equal("2");
        expect(spans[2].innerText).to.equal("0");
      });
    });
  });
});
