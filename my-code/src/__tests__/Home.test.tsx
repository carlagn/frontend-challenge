import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "../Home";

describe("Home page", () => {
  const loadingAndScreenExist = async (container: any, id: string) => {
    expect(container.getByTestId('loading-wrapper')).toBeInTheDocument();
    await waitFor(() => {
      expect(container.getByTestId(id)).toBeInTheDocument();
    })
  }

  test("should display a not found page", async () => {
    const home = render(<Home />);
    expect(home.getByTestId('search-input')).toBeInTheDocument();
    expect(home.getByTestId('not-found')).toBeInTheDocument();
  });

  test("user writes a query with no results", async () => {
    const home = render(<Home />);
    const invalidQuery = "asjkdhaksjdh";
    const input = home.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {target: { value: invalidQuery }});
    expect(home.getByTestId('loading-wrapper')).toBeInTheDocument();
    loadingAndScreenExist(home, 'not-found');
  });
  
  test("user writes a query that is too small", async () => {
    const home = render(<Home />);
    const invalidQuery = "h";
    const input = home.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {target: { value: invalidQuery }});
    expect(home.getByTestId('not-found')).toBeInTheDocument();
  });
  
  test("user writes a query with results", async () => {
    const home = render(<Home />);
    const validQuery = "love";
    const input = home.getByTestId('search-input');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, {target: { value: validQuery }});
    loadingAndScreenExist(home, 'grid-wrapper');
  });
  
});