import React, { useState, useEffect } from 'react';
import deadHorse from './assets/illustrations/illustration-empty-state.png';
import './style//global.scss';
import SearchBar from "./components/SearchBar";
import GridView from "./components/GridView";

function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [resultArray, setResultArray] = useState(null);
  const [moviesArray, setMoviesArray] = useState([]);

  useEffect(() => {
    if (searchInput.length > 0) {
      fetch(`http://www.omdbapi.com/?apikey=193a013b&s=${encodeURIComponent(searchInput)}`)
      .then(res => res.json())
      .then((result) => {
        if (result.Response === "True") {
          setResultArray(result)
          setMoviesArray(result.Search)
        }
        else {
          setResultArray(null);
          setMoviesArray([]);
        }
      })
    }
  }, [searchInput])

  return (
    <React.Fragment>
        <SearchBar setSearchInput={setSearchInput}/>
        <div className="content">
          {resultArray ?
          (<GridView movies={moviesArray}/>) : 
          (<div className="not-found">
            <img src={deadHorse} className="dead-horse" />
            <h2>Don't know what to search?</h2>
            <p>Here's an offer you can't refuse</p>
          </div>)}
        </div>
      </React.Fragment>
  );
}

export default Home;
