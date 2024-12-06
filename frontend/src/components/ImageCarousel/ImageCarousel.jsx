/* eslint-disable react/prop-types */
import { useState, useContext, useEffect, useRef } from 'react';
import CardDataContext from '../context/cardDataContext.jsx';

import './image-carousel.css';


const CardCarousel = ( {onSelectedCard} ) => {
  var cardList = useContext(CardDataContext)
  const [activeCard, setActiveCard] = useState(0);

  //auto-scrolling of the carousel
  //clicking once on active card disables auto-scrolling until next card change (rotation)
  /*
  let idleTimer;
  let resetIdleTimer = () => {
    clearTimeout(idleTimer);
  };
  useEffect( () => {
    idleTimer = setTimeout( () => {
      setActiveCard((prevCard) => (prevCard + 1) % cardList.length);}, 10000); //10 second delay
    return () => { clearTimeout(idleTimer); }
  }, [activeCard]);
  */

  let idleTimerRef = useRef(null);
  let resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
  };

  useEffect( () => {
    resetIdleTimer();
    idleTimerRef.current = setTimeout( () => {
      setActiveCard( (prevCard) => (prevCard + 1) % cardList.length); }, 10000); //10 second delay
    return () => { resetIdleTimer(); };
    }, [activeCard, cardList.length]);


  //rotate carousel on click
  const handleClick = (newActivePos) => { setActiveCard(newActivePos); resetIdleTimer();}

  let getPosition = (currentIndex, activeIndex, length) => {
    let halfLength = Math.floor(length/2);
    let relativePosition = currentIndex - activeIndex;
    if (Math.abs(relativePosition) > halfLength) { return relativePosition < 0 ? relativePosition + length : relativePosition - length}
    return relativePosition;
  }

  return (
    <div className="card-carousel">
      <ul className="card-carousel-list">
        {cardList.map((card, index) => {
          let cardPos = getPosition(index, activeCard, cardList.length);
            return (
              <li key={index} id={index+1}
              className={`carousel-item ${cardPos === 0 ? 'active' : ''}`}
              data-pos={cardPos}
              onClick={() => handleClick(index)}
              onDoubleClick={() => onSelectedCard(card)}>
                <img alt={card.name} src={card.image_uris.normal} />
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}

export default CardCarousel;