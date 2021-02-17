import React, { useState, useEffect } from 'react';
import './style/global.scss';
import './style/movie.scss';
import arrowLeftGrey from './assets/icons/icon-arrow-grey.svg';
import arrowLeftWhite from './assets/icons/icon-arrow-white.svg';
import imdbLogo from './assets/logos/logo-imdb.svg';
import rtLogo from './assets/logos/logo-rotten-tomatoes.svg';
import heartGrey from './assets/icons/icon-heart-grey.svg';
import heartWhite from './assets/icons/icon-heart-white.svg';
import heartFull from './assets/icons/icon-heart-full.svg';
import LogoLabel from './components/LogoLabel';
import Button from './components/Button';
import Loading from './components/Loading';

type Props = {
    imdbID: string | null,
    setActiveMovie: (value: string) => void,
    addToFavourites: (event: React.MouseEvent<HTMLElement>, value: string) => void
    isFavourite: boolean
}

function Movie(props: Props) {
    const [loading, setLoading] = useState(false);
    const [movieInfo, setMovieInfo] = useState<any>(null);
    const [hoverExit, setHoverExit] = useState<boolean>(false);
    const [iconHeart, setIconHeart] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)
        fetch(`http://www.omdbapi.com/?apikey=193a013b&i=${props.imdbID}&plot=short&tomatoes=true`)
        .then(res => res.json())
        .then((result) => {
            setLoading(false)
            let info = null
            if (result.Response === "True") info = result
            else {
                props.setActiveMovie("")
            }
            setMovieInfo(info)
        })
    }, [props.imdbID])

    const getArrayOf = (list: string) => {
        if(list?.length > 0) return list.split(", ")
        return []
    }
  return (
      loading ? (<Loading />) :
    (<div className="movie-wrapper">
        <div className="movie-content">
        <div
            className="exit"
            style={{backgroundImage: `url(${hoverExit ? arrowLeftWhite : arrowLeftGrey})`}}
            onMouseEnter={() => setHoverExit(true)}
            onMouseLeave={() => setHoverExit(false)}
            onClick={() => props.setActiveMovie("")}
        >
        </div>
            <div className="movie-small">
                <span>{movieInfo?.Runtime} · </span>
                <span>{movieInfo?.Year} · </span>
                <span className="rating">{movieInfo?.Rated}</span>
            </div>
            <div className="movie-title">{movieInfo?.Title}</div>
            <div className="movie-badges">
                <LogoLabel icon={imdbLogo} text={movieInfo?.imdbRating} color="yellow"/>
                <LogoLabel icon={rtLogo} text={movieInfo?.tomatoMeter} color="red"/>
                <Button
                    icon={props.isFavourite ? heartFull : (iconHeart ? heartWhite : heartGrey)}
                    text={ props.isFavourite ? "Added" : "Add to favourites"}
                    active={props.isFavourite}
                    onEnter={setIconHeart}
                    onClick={(e) => props.addToFavourites(e, props.imdbID || "")}
                />
            </div>
            <div className="movie-section-wrapper">
                <div className="movie-section plot">
                    <div className="section-title">Plot</div>
                    <p>{movieInfo?.Plot}</p>
                </div>
                <div className="movie-section">
                    <div className="section-title">Cast</div>
                    {getArrayOf(movieInfo?.Actors).map((actor, index) => (
                        <p key={`a${index}`}>{actor}</p>
                    ))}
                </div>
                <div className="movie-section">
                    <div className="section-title">Genre{getArrayOf(movieInfo?.Genre).length > 1 && "s"}</div>
                    {getArrayOf(movieInfo?.Genre).map((genre, index) => (
                        <p key={`g${index}`}>{genre}</p>
                    ))}
                </div>
                <div className="movie-section">
                    <div className="section-title">Director{getArrayOf(movieInfo?.Director).length > 1 && "s"}</div>
                    {getArrayOf(movieInfo?.Director).map((director, index) => (
                        <p key={`d${index}`}>{director}</p>
                    ))}
                </div>
            </div>
        </div>
        <div className="movie-poster">
            <img src={movieInfo?.Poster} />
        </div>
    </div>)
  );
}

export default Movie;
