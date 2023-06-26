import { render, screen } from "@testing-library/react";
import { ListTitle } from "../app/userList/ListTitle";

const title = "Список пользователей";
const className = "";

describe("ListTitle Component", () => {
  it("ListTitle renders", () => {
    render(<ListTitle title={title} className={className} />);
    expect(screen.getByText("Список пользователей")).toBeInTheDocument();
  });

  it("ListTitle snapshot", () => {
    expect(
      render(<ListTitle title={title} className={className} />)
    ).toMatchSnapshot();
  });
});
