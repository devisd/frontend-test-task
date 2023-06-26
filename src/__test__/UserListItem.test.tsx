import { render, screen } from "@testing-library/react";
import { UserListItem } from "../app/userList/UserListItem";

const data = [
  {
    id: 3586,
    first_name: "Georgeanna",
    last_name: "Lueilwitz",
    username: "georgeanna.lueilwitz",
    avatar: "https://robohash.org/cumquilabore.png?size=300x300&set=set1",
    rating: 0,
  },
  {
    id: 4712,
    first_name: "Patti",
    last_name: "Lemke",
    username: "patti.lemke",
    avatar:
      "https://robohash.org/eligendiadipiscitemporibus.png?size=300x300&set=set1",
    rating: 0,
  },
  {
    id: 5821,
    first_name: "Leanna",
    last_name: "White",
    username: "leanna.white",
    avatar: "https://robohash.org/adplaceataut.png?size=300x300&set=set1",
    rating: 0,
  },
];

const onClick = jest.fn();

describe("UserListItem Component", () => {
  it("UserListItem renders", () => {
    render(<UserListItem users={data} onClick={onClick} />);
    expect(screen.getByText(/Georgeanna/)).toBeInTheDocument();
  });
  it("UserListItem render without data", () => {
    render(<UserListItem users={[]} onClick={onClick} />);

    expect(screen.queryByRole("listitem")).toBeNull();
  });

  it("UserListItem snapshot", () => {
    expect(
      render(<UserListItem users={data} onClick={onClick} />)
    ).toMatchSnapshot();
  });
});
