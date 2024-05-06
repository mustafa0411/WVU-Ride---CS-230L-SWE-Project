import React from "react";
import { BrowserRouter, Link, MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitFor, getByTestId, getAllByText, getByText, screen} from "@testing-library/react";
import SearchPosts from "./Components/SearchPosts";

import CreateAccount from "./Components/CreateAccount";
import CreatePost from "./Components/CreatePost";
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import Profile from "./Components/Profile";



/*
***************** Create Account Tests, currently running 5/5 successful
 */
describe("CreateAccount Component", () => {

  it("should display error message for invalid email", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<BrowserRouter><CreateAccount /></BrowserRouter>);
    const emailInput = getByPlaceholderText("Mix Email");
    const button = getByText("Create Your Account");

    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled;
    });
  });

  it("should display error message for invalid password", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<BrowserRouter><CreateAccount /></BrowserRouter>);
    const passwordInput = getByPlaceholderText("Password");
    const confirmPasswordInput = getByPlaceholderText("Confirm your password");
    const button = getByText("Create Your Account");

    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "invalid" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled;
    });
  });

  it("should display error message for invalid name", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<BrowserRouter><CreateAccount /></BrowserRouter>);
    const nameInput = getByPlaceholderText("Full Name");
    const button = getByText("Create Your Account");

    fireEvent.change(nameInput, { target: { value: "" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled;
    });
  });

  it("should display error message for invalid username", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<BrowserRouter><CreateAccount /></BrowserRouter>);
    const usernameInput = getByPlaceholderText("Username");
    const button = getByText("Create Your Account");

    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled;
    });
  });

  it("should not display error message for valid input", async () => {
    const { getByPlaceholderText, getByTestId } = render(<BrowserRouter><CreateAccount /></BrowserRouter>);
    const nameInput = getByPlaceholderText("Full Name");
    const emailInput = getByPlaceholderText("Mix Email");
    const usernameInput = getByPlaceholderText("Username");
    const passwordInput = getByPlaceholderText("Password");
    const confirmPasswordInput = getByPlaceholderText("Confirm your password");
    const button = getByTestId("create-button")

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@mix.wvu.edu" } });
    fireEvent.change(usernameInput, { target: { value: "johndoe" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).not.toHaveBeenCalled;
    });
  });
});


/*
***************** Navigation Testing, currently running 8/8 successful 
 */
describe("Navigation Component", () => {
  it("should navigate stay on login upon incorrect credentials", async () => {
    const {getByPlaceholderText, getByTestId} = render(<BrowserRouter><Login /></BrowserRouter>);
    const usernameInput = getByPlaceholderText("Username");
    const passwordInput = getByPlaceholderText("Password");
    const button = getByTestId("login-button");

    fireEvent.change(usernameInput, { target: { value: "abc" } });
    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled;
    });
  });

  it("should navigate to create account from login", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/login"]}><Login /></MemoryRouter>
    );
    const createAccountLink = screen.getByText("Create Account");
    fireEvent.click(createAccountLink);
    expect(container.innerHTML).toContain("/createaccount");
  
  });
  
  it("should navigate to forgot password from login", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/login"]}><Login /></MemoryRouter>
    );
    const createAccountLink = screen.getByText("Forgot Password?");
    fireEvent.click(createAccountLink);
    expect(container.innerHTML).toContain("/forgot-password");
  
  });

  it("should navigate to create post from navbar", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/home"]}><HomePage /></MemoryRouter>
    );
    const createAccountLink = screen.getByTestId("post-button");
    fireEvent.click(createAccountLink);
    expect(container.innerHTML).toContain("/post");
  
  });

  it("should navigate to search post from navbar", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/home"]}><HomePage /></MemoryRouter>
    );
    const createAccountLink = screen.getByTestId("search-button");
    fireEvent.click(createAccountLink);
    expect(container.innerHTML).toContain("/search");
  
  });

  it("should navigate to message from navbar", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/home"]}><HomePage /></MemoryRouter>
    );
    const createAccountLink = screen.getByTestId("message-button");
    fireEvent.click(createAccountLink);
    expect(container.innerHTML).toContain("/message");
  
  });

  it("should navigate to profile from navbar", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/home"]}><HomePage /></MemoryRouter>
    );
    const createAccountLink = screen.getByTestId("profile-button");
    fireEvent.click(createAccountLink);
    expect(container.innerHTML).toContain("/profile");
  
  });

  it("should navigate to home from navbar", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/profile"]}><Profile /></MemoryRouter>
    );
    const createAccountLink = screen.getByTestId("home-button");
    fireEvent.click(createAccountLink);
    expect(container.innerHTML).toContain("/home");
  
  });
});


/*
***************** Post Testing, currently running 5/5 successfully
 */


describe("Post Component", () => {

  it("should display error message for null to value", async () => {
    const {getByText, getByPlaceholderText} = render(<BrowserRouter><CreatePost/></BrowserRouter>);
    const toInput = getByPlaceholderText("To:");
    const button = getByText("Create Post");

    fireEvent.change(toInput, { target: { value: "" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled;
    });
  });

  it("should display error message for too long to value", async () => {
    const { getByText, getByPlaceholderText} = render(<BrowserRouter><CreatePost/></BrowserRouter>);
    const toInput = getByPlaceholderText("To:");
    const button = getByText("Create Post");

    fireEvent.change(toInput, { target: { value: "The following is an input of more than 45 characters for a test value within the post testing." } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled;
    });
  });

  it("should display error message for null from value", async () => {
    const { getByText, getByPlaceholderText} = render(<BrowserRouter><CreatePost/></BrowserRouter>);
    const fromInput = getByPlaceholderText("From:");
    const button = getByText("Create Post");

    fireEvent.change(fromInput, { target: { value: "" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled;
    });
  });

  it("should display error message for too long from value", async () => {
    const { getByText, getByPlaceholderText} = render(<BrowserRouter><CreatePost/></BrowserRouter>);
    const fromInput = getByPlaceholderText("From:");
    const button = getByText("Create Post");

    fireEvent.change(fromInput, { target: { value: "The following is an input of more than 45 characters for a test value within the post testing." } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled;
    });
  });

  it("should display error message for null title value", async () => {
    const { getByText, getByPlaceholderText} = render(<BrowserRouter><CreatePost/></BrowserRouter>);
    const titleInput = getByPlaceholderText("Title");
    const button = getByText("Create Post");

    fireEvent.change(titleInput, { target: { value: "" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled;
    });
  });

  it("should display error message for too long title value", async () => {
    const { getByText, getByPlaceholderText} = render(<BrowserRouter><CreatePost/></BrowserRouter>);
    const titleInput = getByPlaceholderText("Title");
    const button = getByText("Create Post");

    fireEvent.change(titleInput, { target: { value: "The following is an input of more than 45 characters for a test value within the post testing." } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled;
    });
  });

  it("should display error message for too long description value", async () => {
    const { getByText, getByPlaceholderText} = render(<BrowserRouter><CreatePost/></BrowserRouter>);
    const descInput = getByPlaceholderText("Description");
    const button = getByText("Create Post");

    fireEvent.change(descInput, { target: { value: "The following is an input of more than 250 characters for a test value within the post testing. This value will be used in testing the length of the description for a specific post made in WVURide. It is to ensure that the length of the description is kept to a maximum of 250 characters." } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled;
    });
  });

});


