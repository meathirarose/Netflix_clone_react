import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = () => {

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft+=e.deltaY;
  }

  const cardsRef = useRef();
  useEffect(()=>{
    cardsRef.current.addEventListener('wheel', handleWheel)
  },[]) 

  return (
    <div className='titlecards'>
      <h2>Popular on Netflix</h2>
      <div className="card-list" ref={cardsRef} >
        {cards_data.map((card, index) => {
           return <div key={index} className='card'>
            <img src={card.image} alt="" />
            <p>{card.name}</p>
           </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards
