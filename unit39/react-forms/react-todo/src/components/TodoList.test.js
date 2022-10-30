import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TodoList from "./TodoList";

const newTodo = (todo = 'test this todo') => {
  const todoInput = screen.getByLabelText('Add todo:')

  fireEvent.change(todoInput, { target: { value: todo } })

  const btn = screen.getByText('Submit')

  fireEvent.click(btn)
}


// smoke test
it('renders without crashing', () => {
  render(<TodoList />)
})

// snapshot test
it('matches snapshot', () => {
  const { asFragment } = render(<TodoList />)

  expect(asFragment()).toMatchSnapshot()
})

it('can add a new todo', () => {
  render(<TodoList />)

  expect(screen.queryByText('x')).not.toBeInTheDocument()

  newTodo()

  expect(screen.getByText('x')).toBeInTheDocument()
  expect(screen.getByText('test this todo -')).toBeInTheDocument()
})

it('can delete a todo', () => {
  render(<TodoList />)

  newTodo()

  fireEvent.click(screen.getByText('x')) // click delete button

  // todo is removed
  expect(screen.queryByText('test this todo -')).not.toBeInTheDocument()
})