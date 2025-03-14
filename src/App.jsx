import React from 'react';
// import * as React from 'react'; namespace import, if using typescript and/or hooks

// Implementing react router dom to refactor some of the code to navigate between App and WatchList
import { Route, Routes, Link, } from 'react-router-dom';

import Button from '@mui/material/Button';
import { useEffect, useState, useRef } from 'react';
// add useState if we are using it
import WatchList from './WatchList';
import Navbar from './NavBar'


const databaseURL = 'http://localhost:3000/media';

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const inputRef = useRef(null);
  // const navigate = useNavigate();

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

  // this is for the search feature!!!
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

    function updateMovie(movie) {
      // const movieId = movie.id;
      const updatedMovie = { watch_list: true };

      fetch(`http://localhost:3000/${movie.id}/add`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to update the movie');
          }
        })
        .then(() => {
          // Once the movie has been added to the watchlist, update the state locally

          setMovies((prevMovies) =>
          // The .map() function is used to iterate over each movie (m) in the prevMovies array.
          // It will return a new array, so we're not modifying the original array but creating a new one with updated values.
            prevMovies.map((m) =>
              // This is a ternary (conditional) operation that checks if the movie’s id matches the id of the movie clicked.
              // { ...m } is using the spread operator to copy all the properties of the current movie (m).
              // We then update or add the watch_list property with the value true.
              // If the ids don’t match: We simply return the original movie (m) without modifying it.
              m.id === movie.id ? { ...m, watch_list: true } : m
            )
          );
        })
        .catch((error) => console.error('Failed to add movie to watch list:', error));
    }

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
        <nav>
          <Link to='/watchlist'>
            <Button variant='contained' onClick={() => updateMovie(movie)}>
              Add to Watch List
            </Button>
          </Link>
        </nav>
        <br />
        <br />
      </div>
    );
  }

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

function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/watchlist' element={<WatchList />} />
      <Route path='*' element={<h1>404 Not Found</h1>} />
    </Routes>
    </>
  );
}

export default App;
