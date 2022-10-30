import React from "react";
import { render } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";

// smoke test
it('renders without crashing', () => {
  render(<NewTodoForm />)
})

// snapshot test
it('matches snapshot', () => {
  const { asFragment } = render(<NewTodoForm />)

  expect(asFragment()).toMatchSnapshot()
})