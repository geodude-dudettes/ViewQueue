import React from 'react';
// import * as React from 'react'; namespace import, if using typescript and/or hooks

// Implementing react router dom to refactor some of the code to navigate between App and WatchList
import { Route, Routes, Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import { useEffect, useState, useRef } from 'react';
// add useState if we are using it
import WatchList from './WatchList';

const databaseURL = 'http://localhost:3000/media';

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const inputRef = useRef(null);

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
          <Link to='./watchList'>
            <Button variant='contained' onClick={WatchList}>
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
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/watchlist' element={<WatchList />} />
      <Route path='*' element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
