import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Deck from "./Deck";
import { listDecks } from "../../utils/api";
import ErrorMessage from "../ErrorMessage";

function DeckList(){
    const [decks, setDecks] = useState([])
    const [error, setError] = useState(undefined)

    useEffect(() => {
        const abortController = new AbortController()
        listDecks(abortController.signal).then(setDecks).catch(setError)
        return () => abortController.abort()
    }, [])

    if (error) {
        return <ErrorMessage error={error} />
    }

    const deckList = decks.map((deck) => <Deck key={deck.id} deck={deck} />)
    //console.log(listDecks())

    return (
        <div>
            <Link to="/decks/new">
            <button type="button" className="btn btn-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-file-plus mr-1" viewBox="0 0 16 16">
                <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"/>
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
            </svg>
            Create New Deck
            </button>
        </Link>
            <main className="container">
                <section>{deckList}</section>
            </main>
        </div>
    )
}

export default DeckList