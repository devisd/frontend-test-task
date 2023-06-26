import { render, screen } from "@testing-library/react";
import { Buttons } from "../app/userList/buttons/Buttons";

const onClick = jest.fn();
const user = {
  avatar: "",
  first_name: "",
  id: 0,
  last_name: "",
  username: "",
  rating: 0,
};

describe("Buttons Component", () => {
  it("Buttons render", () => {
    render(<Buttons user={user} onClick={onClick} />);
    const linkElement = screen.getByText(/0/);
    expect(linkElement).toBeInTheDocument();
  });

  it("Buttons snapshot", () => {
    expect(render(<Buttons user={user} onClick={onClick} />)).toMatchSnapshot();
  });
});
