import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";


function CreateNewCard(){

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

    const initialFormState = {
        front: "",
        back: "",
    }

    const [formData, setFormData] = useState({...initialFormState})

    const handleChange = ({target}) => {
        const value = target.value
        setFormData({
            ...formData,
            [target.name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createCard(deckId, formData)
        setFormData(initialFormState)
    }

    return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active"><Link to={`/decks/`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <form name="create" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">
                        Name
                        <textarea
                            id="front"
                            type="text"
                            name="front"
                            placeholder="Front side of card."
                            rows="5"
                            className="form-control"
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
                            placeholder="Back side of card."
                            rows="5"
                            className="form-control"
                            onChange={handleChange}
                            value={formData.back}
                        />
                    </label>
                </div>
                <button type="submit" className="btn btn-info">Submit</button>
                <Link to={`/decks/${deck.id}`}>
                    <button type="button" className="btn btn-secondary ml-2">
                        Done
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default CreateNewCard