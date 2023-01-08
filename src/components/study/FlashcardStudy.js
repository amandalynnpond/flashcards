import React, {useState, useEffect} from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api";

function FlashcardStudy(){
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

    console.log(deck.cards)

    return (
        <div>
            Study study with my buddy.
        </div>
    )
}

export default FlashcardStudy