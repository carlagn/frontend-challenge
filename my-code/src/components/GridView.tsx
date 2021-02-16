import React, { useState } from 'react';
import '../style/components.scss';
import Movie from '../Movie';

type Props = {
    movies: Array<any>,
}

export default function GridView(props: Props) {
    const [activeMovie, setActiveMovie] = useState("");
    return (
        <div className="temp-width">
            {!activeMovie ? (<div className="grid-wrapper">
            {props.movies.map((movie) =>
                    <div className="grid-item" onClick={() => setActiveMovie(movie.imdbID)}>
                        <div className="backdrop">
                            <div className="movie-info">
                                <div className="movie-title">
                                    {movie.Title}
                                </div>
                                <div className="movie-year">
                                    {movie.Year}
                                </div>
                            </div>
                        </div>
                        <img src={movie.Poster} />
                    </div>
            )}
            </div>) :
            (<Movie imdbID={activeMovie} setActiveMovie={setActiveMovie}/>)}
        </div>
  );
}