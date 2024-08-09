import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft+=e.deltaY;
  }

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjhiZDc0MDdkNjhlZDM0OWQ1NjQ0NWRiMWI2NzVmNCIsIm5iZiI6MTcyMzEyMjIyNi43ODY4ODQsInN1YiI6IjY2YjRjMDQyZjA1NjZkYzRkMTI0MTgzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t_tLPQYsicsDtjcNwaffMjczZU950bkBnxxs8HrPfmg'
    }
  };
  
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel)
  },[]) 

  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef} >
        {apiData.map((card, index) => {
           return <Link to={`/player/${card.id}`} key={index} className='card'>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
           </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
