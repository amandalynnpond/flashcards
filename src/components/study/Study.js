import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import NotEnoughCards from "./NotEnoughCards";
import FlashcardStudy from "./FlashcardStudy"

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
    let result = ""

    if (cards) {
        if (cards.length < 3) {
        result = <NotEnoughCards cards={cards} deck={deck} />
        } else {
            result = <FlashcardStudy cards={cards} deck={deck} />
        }
    } else {
        result = <p>Loading...</p>
    }

            return (
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Study</li>
                        </ol>
                    </nav>
                    {result}
                </div>
            )
    }

export default Study