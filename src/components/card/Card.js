import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../utils/api";

function Card({card}){
    const history = useHistory()
    const {url} = useRouteMatch()

    const handleDelete = () => {
        const result = window.confirm(`Are you use you want to delete this card? \n \n You will not be able to recover it.`)
        if (result) {
            deleteCard(card.id).then(() => {
                history.go(0)
            })
        }
    }

    return(
        <div className="border border-dark my-4 mx-5 rounded p-4 bg-light">
            <table>
                <tbody>
                    <tr className="text-center">
                        <th className="col-md-4">Front</th>
                        <th className="col-md-4">Back</th>
                    </tr>
                    <tr className="m-2 text-center">
                        <td className="col-md-4 m-2">{card.front}</td>
                        <td className="col-md-4 m-2">{card.back}</td>
                    </tr>
                </tbody>
            </table>
            <div className="d-flex justify-content-end">
                <Link to={`${url}/cards/${card.id}/edit`}>
                    <button type="button" className="p-2 btn btn-secondary mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-2 bi bi-pen-fill" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                        </svg>    
                        Edit
                    </button>
                </Link>
                <button type="button" className="ml-3 p-2 bd-highlight btn btn-outline-danger mt-4" onClick={handleDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill m-1" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Card