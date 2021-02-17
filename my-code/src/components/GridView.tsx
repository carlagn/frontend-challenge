import React, { useState, useEffect } from 'react';
import '../style/components.scss';
import Movie from '../Movie';
import emptyHeartIcon from '../assets/icons/icon-heart-white.svg';
import fullHeartIcon from '../assets/icons/icon-heart-full.svg';

type Props = {
    movies: Array<any>,
}

export default function GridView(props: Props) {
    const [activeMovie, setActiveMovie] = useState("");
    const [favourites, setFavourites] = useState("");

    const addFavourite = (event: React.MouseEvent<HTMLElement>, id: string) => {
        let favouritesCookie = document.cookie.split("favourites=")[1]
        if (favouritesCookie.includes(";"))
            favouritesCookie = favouritesCookie.split(";")[0]
        
        if (!document.cookie.includes("favourites="))
            document.cookie = `favourites=${id}`
        
        else if (!document.cookie.includes(id))
            document.cookie = `favourites=${favouritesCookie}${id}`
        
        else if (document.cookie.includes(id)) {
            const finalCookie = favouritesCookie.replace(`${id}`, "")
            document.cookie = `favourites=${finalCookie}`
        }

        setFavourites(document.cookie)
        event.stopPropagation()
    }

    const isMovieLiked = (id: string) => {
        if (document.cookie.includes(id) && favourites.includes(id)) {
            return true
        }
        return false
    }

    return (
        <div className="temp-width">
            {!activeMovie ? (<div className="grid-wrapper" data-testid="grid-wrapper">
            {props.movies.map((movie) =>
                    <div
                        className="grid-item"
                        onClick={() => setActiveMovie(movie.imdbID)}
                        key={movie.imdbID}
                        data-testid="grid-item"
                    >
                        <div className="backdrop">
                            <div className="like-btn" onClick={(e) => addFavourite(e, movie.imdbID)}>
                                <img src={isMovieLiked(movie.imdbID) ? fullHeartIcon : emptyHeartIcon} />
                            </div>
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
            (<Movie
                imdbID={activeMovie}
                setActiveMovie={setActiveMovie}
                isFavourite={isMovieLiked(activeMovie)}
                addToFavourites={addFavourite}
            />)}
        </div>
  );
}