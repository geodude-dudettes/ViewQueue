import React from 'react';
// import * as React from 'react'; namespace import, if using typescript and/or hooks

import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

const databaseURL = 'http://localhost:5173/';
const searchInput = document.getElementById('title');

function addToWatchList () {};

function handleSubmitClick() {
    const title = searchInput.value;

    if (title) {
    fetch(databaseURL)
    .then((response) => {
        if (response.ok)
            return response.json();
        else throw new Error('response contained an error');
        // may need to add error handling if someone misspelled something (aka if the database doesn't return anything)
    })
    .then((selectedMovie) => {
        renderMovie(selectedMovie);
        // the above would mean that now ONLY the movie they searched for is showing up on the UI
        searchInput.value = '';
        //emptying out the search value in the input textbox
    });
} else {
    alert('Please enter a title');
}
};

//render each movie using React
function renderMovie(movie) {
  const title = movie.title;
  const type = movie.type;
  const genre = movie.genre;
  const year = movie.year;
  const description = movie.description;
  const imgURL = movie.img_url;
  const favorite = movie.favorite;
  const watchList = movie.watch_list;




  return (
    <div>
      <img src={imgURL} onMouseOver={e => console.log(e, 'movie description here, fill this part out later')} />
      {/* for the above, i didn't get to the point where we are able to see the movie description when you hover over the image, but this is the basic idea */}
      <p>{title}</p>
      <p>{type}</p>
      <p>{genre}</p>
      <p>{year}</p>
      <Button variant='contained' onClick={addToWatchList}>
        Add to Watch List
      </Button>
    </div>
  );
}

function App() {
  //fetch request to get the database entries, once per page load
  useEffect(() => {
    fetch(databaseURL)
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error('response contained an error');
      })
      .then((movies) => {
        movies.forEach(renderMovie);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }, []);

  return (
    <>
      <h1>ViewQueue</h1>
      <div>
        <label>Search for a Title:<input type="text" id="title" name="title" /></label>
        <Button variant='contained' id="searchButton" onClick={handleSubmitClick}>
        Search
      </Button>
      </div>

      <Button variant='contained'>Hello World</Button>

      <>renderMovie</>
      {/* the above is wrong - but how do i get the contents of the renderMovie function into a div here? */}
    </>
  );
}

export default App;
