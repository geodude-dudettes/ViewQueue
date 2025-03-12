import React from 'react';
// import * as React from 'react'; namespace import, if using typescript and/or hooks

import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

const databaseURL = 'http://localhost:5173/';

// const addToWatchList = () => {};

//render each movie using React
function renderMovie(movie, { addToWatchList }) {
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
      <img src={imgURL} onMouseOver={e => console.log(e, 'image description here, fill this part out later')} />
      {/* for the above - source would be the destructured image URL off the db response body right? */}
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

// !  need to reacte an addToWatchList function, but would that live here or in the watchList page?

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
      {/* add search */}

      <Button variant='contained'>Hello World</Button>
      <>renderMovie();</>
    </>
  );
}

export default App;
