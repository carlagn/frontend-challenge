import React, { useState } from 'react';
import '../style/components.scss';
import searchIcon from '../assets/icons/icon-magnifier-grey.svg';

type Props = {
  setSearchInput: (value: string) => void
}

export default function SearchBar(props: Props) {
  const [movieQuery, setMovieQuery] = useState("");

  const updateMovieQuery = (e: React.FormEvent<HTMLInputElement>) => {
    props.setSearchInput(e.currentTarget.value);
    setMovieQuery(e.currentTarget.value);
  }

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-container">
        <img src={searchIcon} className="search-icon" alt="logo" />
        <input type="text" id="movie-query" name="movie-query" onChange={updateMovieQuery} value={movieQuery} placeholder="Search movies..." />
      </div>
    </div>
  );
}