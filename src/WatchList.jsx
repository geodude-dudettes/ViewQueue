import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import NavBar from './NavBar';

export default function WatchList() {
  const [watchList, setWatchList] = useState([]);


  const databaseURL = 'http://localhost:3000/watchlist';

  // fetching database
  useEffect(() => {
    fetch(databaseURL)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch Watch List");
      return response.json();
    })
    .then((movies) => {
      if (Array.isArray(movies)) {
        setWatchList(movies);
      } else {
        setWatchList([movies]);
      }
    })
    .catch((error) => console.error("Error fetching watch list:", error))
  }, []);

  // // Adding movie to the watch list
  // const addItem = () => {
  //   setWatchList([...watchList, input]);
  //   setInput('');
  // };

  const removeItem = (movie) => {
    // const updatedMovie = { watch_list: false };

    fetch(`http://localhost:3000/watchlist/${movie.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(updatedMovie),
    })
      .then(() => {
        setWatchList(watchList.filter((movie) => movie.id ))
      // .then((response) => {
      //   if (response.ok) {
          window.location.reload();
         // return response.json();
        // } else {
        //   throw new Error('Failed to remove the movie from watch list');
        // }
       })
      .catch((error) => console.error("Error deleting movie from watch list:", error));
  };

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
          <Link to='/watchList'>
            <Button variant='contained' onClick={() => removeItem(movie)}>
              Remove Item
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
  
      {/* <button onClick={addItem}> Add </button> */}

      <div className='movies'>{watchList.map(renderMovie)}</div>
    </>
  );
}
