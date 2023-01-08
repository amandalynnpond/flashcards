import React, {useState, useEffect} from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api";

function Study(){
    const [deck, setDeck] = useState([])
    const [error, setError] = useState(undefined)
    const {deckId} = useParams()

    useEffect(() => {
        const abortController = new AbortController()
        readDeck(deckId, abortController.signal)
        .then(setDeck)
        .catch(setError)
        return () => abortController.abort()
    }, [deckId])


    const cards = deck.cards

            return (
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Study</li>
                        </ol>
                    </nav>
                    {cards ? (
                    <div>
                    <h2>Study {deck.name}</h2>
                    <h3>Not enough cards</h3>
                    You must have at least three cards to study. Currently you have {cards.length} cards.
                    <br />
                    <Link to={`/decks/${deck.id}/cards/new`}>
                        <button type="button" className="btn btn-info mt-4">Add Card</button>
                    </Link>
                </div>
                    ) : (
                        <div className="p-4 border border-top-0">
                        <p>Loading...</p>
                      </div>
                    )}
                </div>
            )
    }

export default Study