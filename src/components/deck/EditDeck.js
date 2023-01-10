import React, {useEffect, useState} from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

function EditDeck(){
    const [deck, setDeck] = useState([])
    const [error, setError] = useState(undefined)
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
        setDeck({
            ...deck,
            [target.name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await updateDeck(deck)
        history.push(`/decks/${deck.id}`)
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            {deck.id ? (
                <div>
                    <h2>{deck.name}: Edit Deck</h2>
                    <form name="create" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" style={{"width": "90%"}}>
                                Name
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={deck.name}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description" style={{"width": "90%"}}>
                                Description
                                <textarea
                                    id="description"
                                    type="text"
                                    name="description"
                                    rows="5"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={deck.description}
                                />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-info">Save</button>
                        <Link to={`/decks/${deck.id}`}>
                            <button type="button" className="btn btn-secondary ml-2">
                                Cancel
                            </button>
                        </Link>
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default EditDeck