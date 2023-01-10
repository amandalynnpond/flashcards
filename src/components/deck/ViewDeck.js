import React, {useState, useEffect} from "react";
import { Link, useParams, useRouteMatch, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api";
import CardList from "../card/CardList";

function ViewDeck(){
    const [deck, setDeck] = useState([])
    const [error, setError] = useState(undefined)
    const {deckId} = useParams()
    const {url} = useRouteMatch()

    useEffect(() => {
        const abortController = new AbortController()
        readDeck(deckId, abortController.signal)
        .then(setDeck)
        .catch(setError)
        return () => abortController.abort()
    }, [deckId])

    const history = useHistory()

    const handleDelete = () => {
        const result = window.confirm(`Are you use you want to delete the deck: ${deck.name}? \n \n You will not be able to recover it.`)
        if (result) {
            deleteDeck(deck.id).then(() => {
                history.push("/")
            })
        }
    }

    return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <h4>{deck.name}</h4>
            <p>{deck.description}</p>
            <div className="d-flex flex-row bd-highlight mb-1">
                <Link to={`${url}/edit`}>
                    <button type="button" className="ml-2 btn btn-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2 bi bi-pen-fill" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                        </svg>    
                        Edit
                    </button>
                </Link>
                <Link to={`${url}/study`}>
                    <button type="button" className="ml-2 btn btn-secondary mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-book mr-1" viewBox="0 0 16 16">
                            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                        </svg>    
                        Study
                    </button>
                </Link>
                <Link to={`${url}/cards/new`}>
                        <button type="button" className="btn btn-info mr-2">Add Card</button>
                    </Link>
                <button type="button" className="ml-auto p-2 bd-highlight btn btn-outline-danger" onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="currentColor" className="bi bi-trash-fill mr-1" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                    Delete
                </button>
            </div>
            <br />
            <h3>Cards</h3>
            <CardList />
        </div>
    )
}

export default ViewDeck