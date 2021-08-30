import { render, screen } from "@testing-library/react";
import CircleChart from "../app/components/CircleChart";

it("renders caption", () => {
  render(<CircleChart size={180} progress={80} caption={"javascript"} />);

  const caption = screen.getByText("javascript");

  expect(caption).toBeVisible();
});

it("renders percentage with % char", () => {
  render(<CircleChart size={180} progress={80} caption={"javascript"} />);
  const percentage = screen.getByText("80%");
  expect(percentage).toBeVisible();
});

it("renders component with correct size", () => {
  render(<CircleChart size={180} progress={80} caption={"javascript"} />);

  const circleWrapper = screen.getByTestId("svg-wrapper");

  expect(circleWrapper).toHaveStyle({ width: "180px", height: "180px" });
});

it("throws an error if progress is greater than 100", () => {
  // cria um mock para a função console.log e altera seu valor padrão
  const spy = jest.spyOn(global.console, "error").mockImplementation(() => {});

  expect(() =>
    render(<CircleChart size={180} progress={101} caption={"javascript"} />)
  ).toThrowError();

  expect(spy).toHaveBeenCalled();

  // limpa o mock da função console.log
  spy.mockRestore();
});
