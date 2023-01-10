import React from "react";
import { Link } from "react-router-dom";

function CardForm({deck, card, handleChange, handleSubmit}){
    return(
        <form name="create" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" style={{"width": "90%"}}>
                        Name
                        <textarea
                            id="front"
                            type="text"
                            name="front"
                            placeholder="Front side of card."
                            rows="5"
                            className="form-control"
                            onChange={handleChange}
                            value={card.front}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="description" style={{"width": "90%"}}>
                        Description
                        <textarea
                            id="back"
                            type="text"
                            name="back"
                            placeholder="Back side of card."
                            rows="5"
                            className="form-control"
                            onChange={handleChange}
                            value={card.back}
                        />
                    </label>
                </div>
                <button type="submit" className="btn btn-info">Save</button>
                <Link to={`/decks/${deck.id}`}>
                    <button type="button" className="btn btn-secondary ml-2">
                        Done
                    </button>
                </Link>
            </form>
    )
}

export default CardForm