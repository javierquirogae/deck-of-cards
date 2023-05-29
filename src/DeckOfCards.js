import React, { useState, useEffect, useRef } from 'react';

const DeckOfCards = () => {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const remainingCardsRef = useRef(0);

  useEffect(() => {
    const fetchDeck = async () => {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await response.json();
      setDeckId(data.deck_id);
      remainingCardsRef.current = data.remaining;
    };

    fetchDeck();
  }, []);

  const drawCard = async () => {
    if (deckId) {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await response.json();

      if (data.cards.length === 0) {
        alert('Error: no cards remaining!');
      } else {
        setCards(prevCards => [...prevCards, data.cards[0]]);
        remainingCardsRef.current = data.remaining;
      }
    }
  };

  const handleClick = () => {
    if (remainingCardsRef.current > 0) {
      drawCard();
    } else {
      alert('Error: no cards remaining!');
    }
  };

  return (
    <div>
      <h1>Deck of Cards</h1>
      <button onClick={handleClick}>
        {remainingCardsRef.current > 0 ? 'Draw a card' : 'No cards remaining'}
      </button>
      {cards.map(card => (
        <img key={card.code} src={card.image} alt={card.code} />
      ))}
    </div>
  );
};

export default DeckOfCards;
