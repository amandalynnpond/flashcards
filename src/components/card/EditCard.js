import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom/";
import { readCard, readDeck, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

function EditCard(){
    const [deck, setDeck] = useState([])
    const [card, setCard] = useState([])
    const [error, setError] = useState(undefined)
    const {deckId} = useParams()
    const {cardId} = useParams()
    const history = useHistory()

    useEffect(() => {
        const abortController = new AbortController()
        readDeck(deckId, abortController.signal)
        .then(setDeck)
        .catch(setError)
        return () => abortController.abort()
    }, [deckId])

    useEffect(() => {
        const abortController = new AbortController()
        readCard(cardId, abortController.signal)
        .then(setCard)
        .catch(setError)
        return() => abortController.abort()
    }, [cardId])

    const handleChange = ({target}) => {
        const value = target.value
        setCard({
            ...card,
            [target.name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await updateCard(card)
        history.push(`/decks/${deck.id}`)
    }

    return(
        <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
            </ol>
        </nav>
        {card.id ? (
            <div>
                <h2>{deck.name}: Edit Card {card.id}</h2>
                <CardForm handleSubmit={handleSubmit} handleChange={handleChange} card={card} deck={deck} />
                </div>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    )
}

export default EditCard