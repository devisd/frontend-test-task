import { render, screen } from "@testing-library/react";
import { Modal } from "../app/modal/Modal";

const onClick = jest.fn();
const user = {
  id: 1292,
  first_name: "Test",
  last_name: "Unit",
  username: "unit.test",
  avatar: "",
  rating: 3,
};

describe("Modal Component", () => {
  it("Modal renders", () => {
    render(
      <Modal
        dialogOpen={true}
        handleDialogClose={onClick}
        dialogType={"positive"}
        dialogUser={user}
      />
    );
    expect(screen.getByText(/unit.test/)).toBeInTheDocument();
  });

  it("Modal snapshot", () => {
    expect(
      render(
        <Modal
          dialogOpen={true}
          handleDialogClose={onClick}
          dialogType={"positive"}
          dialogUser={user}
        />
      )
    ).toMatchSnapshot();
  });
});
