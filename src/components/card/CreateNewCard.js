import React, {useState, useEffect} from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";


function CreateNewCard(){

    const [deck, setDeck] = useState([])
    const [error, setError] = useState(undefined)
    const [card, setCard] = useState({})
    const {deckId} = useParams()
    const history = useHistory()

    useEffect(() => {
        const abortController = new AbortController()
        readDeck(deckId, abortController.signal)
        .then(setDeck)
        .catch(setError)
        return () => abortController.abort()
    }, [deckId])

    const handleChange = ({target}) => {
        const value = target.value
        setCard({
            ...card,
            [target.name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createCard(deckId, card)
        history.go(0)
    }

    return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <CardForm handleSubmit={handleSubmit} handleChange={handleChange} card={card} deck={deck} />
        </div>
    )
}

export default CreateNewCard