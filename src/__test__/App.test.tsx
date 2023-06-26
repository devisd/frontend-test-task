import { render, screen } from "@testing-library/react";
import App from "../app/App";

describe("App Component", () => {
  it("App render", () => {
    render(<App />);

    expect(screen.queryByRole("list")).toBeNull();
  });

  it("App snapshot", () => {
    expect(render(<App />)).toMatchSnapshot();
  });
});
