import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch, Link, useHistory } from "react-router-dom/";
import { readCard, readDeck, updateCard } from "../../utils/api";

function EditCard(){
    const [deck, setDeck] = useState([])
    const [card, setCard] = useState([])
    const [error, setError] = useState(undefined)
    const {deckId} = useParams()
    const {cardId} = useParams()
    const {url} = useRouteMatch()
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

    const initialFormState = {
        front: "cardFront",
        back: "cardBack",
    }

    const [formData, setFormData] = useState({...initialFormState})

    const handleChange = ({target}) => {
        const value = target.value
        setFormData({
            ...formData,
            [target.name]: value
        })
    }

    //FIX THIS
    const handleSubmit = (event) => {
        event.preventDefault()
        updateCard(formData)
        history.goBack()
    }



    return(
        <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active"><Link to={`/decks/`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
            </ol>
        </nav>
        <h2>{deck.name}: Edit Card {card.id}</h2>
        <form name="create" onSubmit={handleSubmit} className="d-flex-column align-items-stretch">
            <div className="form-group">
                <label htmlFor="name">
                    Name
                    <textarea
                        id="front"
                        type="text"
                        name="front"
                        rows="5"
                        className="form-control p-2"
                        onChange={handleChange}
                        value={formData.front}
                    />
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="description">
                    Description
                    <textarea
                        id="back"
                        type="text"
                        name="back"
                        rows="5"
                        className="form-control p-2 align"
                        onChange={handleChange}
                        value={formData.back}
                    />
                </label>
            </div>
            <button type="submit" className="btn btn-info">Save</button>
                <Link to={url}>
                    <button type="button" className="btn btn-secondary ml-2">
                        Cancel
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default EditCard