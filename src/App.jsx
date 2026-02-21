import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

function App() {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [winner, setWinner] = useState("");
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  const [currCards, setCurrCards] = useState([]);

  const dealCards = () => {
    if (cardDeck.length < 2) {
      if (player1Score > player2Score) {
        setWinner("Player 1 wins the game!");
      } else if (player2Score > player1Score) {
        setWinner("Player 2 wins the game!");
      } else {
        setWinner("It's a tie!");
      }
      return;
    }

    const newDeck = [...cardDeck];

    const card1 = newDeck.pop();
    const card2 = newDeck.pop();

    setCurrCards([card1, card2]);
    setCardDeck(newDeck);

    if (card1.rank > card2.rank) {
      setPlayer1Score(player1Score + 1);
    } else if (card2.rank > card1.rank) {
      setPlayer2Score(player2Score + 1);
    }
  };

  const restartGame = () => {
    setCardDeck(makeShuffledDeck());
    setPlayer1Score(0);
    setPlayer2Score(0);
    setWinner("");
    setCurrCards([]);
  };

  return (
    <div className="App">
      <h1>High Card Game 🎴</h1>

      <div className="players">
        {/* Player 1 */}
        <div className="player">
          <h2>Player 1</h2>

          <div className="card-box">
            {currCards[0] ? (
              <p>
                {currCards[0].name} of {currCards[0].suit}
              </p>
            ) : (
              <p>No card yet</p>
            )}
          </div>

          <p>Score: {player1Score}</p>
        </div>

        {/* Player 2 */}
        <div className="player">
          <h2>Player 2</h2>

          <div className="card-box">
            {currCards[1] ? (
              <p>
                {currCards[1].name} of {currCards[1].suit}
              </p>
            ) : (
              <p>No card yet</p>
            )}
          </div>

          <p>Score: {player2Score}</p>
        </div>
      </div>

      <div className="controls">
        <button onClick={dealCards} disabled={cardDeck.length < 2}>
          Deal Cards
        </button>
        <button onClick={restartGame}>Restart</button>
      </div>

      <h2>{winner}</h2>
    </div>
  );
}

export default App;
