import React from 'react';
// import * as React from 'react'; namespace import, if using typescript and/or hooks

import Button from '@mui/material/Button';
import { useEffect, useState, useRef } from 'react';
// add useState if we are using it

const databaseURL = 'http://localhost:3000/media';



function App() {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [watchList, setWatchList] = useState([]);
  const inputRef = useRef(null);

  function handleSubmitClick() {

    if (searchInput !== '') {
      console.log('searchInput:', searchInput);
      fetch(`http://localhost:3000/media/${encodeURIComponent(searchInput)}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error('response contained an error');
          // may need to add error handling if someone misspelled something (aka if the database doesn't return anything)
        })
        .then((selectedMovies) => { 
          console.log('movies returned:', selectedMovies);       
          if (Array.isArray(selectedMovies)) {
            setMovies(selectedMovies);
            setSearchInput('');
        } else {
            setMovies([selectedMovies]);
            setSearchInput('');
        }
          // the above would mean that now ONLY the movie they searched for is showing up on the UI
          //emptying out the search value in the input textbox
        });
    } else {
      alert('Please enter a title');
    }
  }

  //render each movie using React
  function renderMovie(movie) {
    const title = movie.title;
    const type = movie.type;
    const genre = movie.genre;
    const year = movie.year;
    // const description = movie.description;
    const imgURL = movie.img_url;
    // const favorite = movie.favorite;
    // const watchList = movie.watch_list;

    return (
      <div className='movie-card' key={movie.id}>
        <img
          src={imgURL}
          onMouseOver={(e) =>
            console.log(e, 'movie description here, fill this part out later')
          }
        />
        {/* for the above, i didn't get to the point where we are able to see the movie description when you hover over the image, but this is the basic idea */}
        <p>{title}</p>
        <p>{type}</p>
        <p>{genre}</p>
        <p>{year}</p>
        <Button variant='contained' onClick={addToWatchList}>
          Add to Watch List
        </Button>
        <br /><br />
      </div>
    );
  }

  //fetch request to get the database entries, once per page load
  useEffect(() => {
    fetch(databaseURL)
      .then((response) => {
        console.log(response);
        if (response.ok) return response.json();
        else throw new Error('response contained an error');
      })
      .then((movies) => {
        if (Array.isArray(movies)) {
          setMovies(movies);
        } else {
          setMovies([movies]);
        }
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

//function to add movies to watchList 
const addToWatchList = (movie) => {// filter through each movie inside watchlist
  const inWatchList = watchList.filter((element)=> element.id === movie.id).length > 0; // checks if the current movies id were trying to add matches movie id in the watchlist

  if(!inWatchList) {
    setWatchList([...watchList, movie]);
  }
}
//remove movies from watchlist 
// const removeFromWatchList = (movieId) => {
//   setWatchList((prevWatchList) => prevWatchList.filter((movie) => movie.id !== movieId));
// };

  return (
    <>
      <h1>ViewQueue</h1>
      <div>
        <label>
          Search for a Title:
          <input
            type='text'
            id='title'
            name='title'
            placeholder='Title'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            ref={inputRef}
          />
        </label>
        <Button
          variant='contained'
          id='searchButton'
          onClick={handleSubmitClick}
        >
          Search
        </Button>
      </div>

      <div className='movies'>{movies.map(renderMovie)}</div>
    </>
  );
}

export default App;
