import React from "react";
import { Link } from "react-router-dom";

function NotEnoughCards({deck, cards}){
    return(
        <div>
        <h2>Study {deck.name}</h2>
        <h3>Not enough cards</h3>
        You must have at least three cards to study. Currently you have {cards.length} cards.
        <br />
        <Link to={`/decks/${deck.id}/cards/new`}>
            <button type="button" className="btn btn-info mt-4">Add Card</button>
        </Link>
    </div>
    )
}

export default NotEnoughCards