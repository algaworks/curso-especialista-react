import { render, screen } from "@testing-library/react";
import CircleChart from "../app/components/CircleChart";

it("renders caption", () => {
  render(<CircleChart size={180} progress={80} caption={"javascript"} />);

  const caption = screen.getByText("javascript");

  expect(caption).toBeVisible();
});
