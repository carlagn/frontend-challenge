import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Movie from "../Movie";

describe("Movie page", () => {
  const loadingAndScreenExist = async (container: any, id: string) => {
    expect(container.getByTestId('loading-wrapper')).toBeInTheDocument();
    await waitFor(() => {
      expect(container.getByTestId(id)).toBeInTheDocument();
    })
  }

  test("should display a movie page", async () => {
    const validImdbID = "tt0314331"
    const movie = render(
        <Movie
            imdbID={validImdbID}
            setActiveMovie={() => {}}
            addToFavourites={() => {}}
            isFavourite={false}
        />
    );
    loadingAndScreenExist(movie, 'movie-wrapper')
  });
});