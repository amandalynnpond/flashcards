import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateNewDeck(){

    const initialFormState = {
        name: "",
        description: "",
    }

    const [formData, setFormData] = useState({...initialFormState})

    const handleChange = ({target}) => {
        const value = target.value
        setFormData({
            ...formData,
            [target.name]: value
        })
    }

    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()
        await createDeck(formData)
        history.push("/")
    }


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            <form name="create" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" style={{"width": "90%"}}>
                        Name
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Deck Name"
                            className="form-control"
                            onChange={handleChange}
                            value={formData.name}
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
                            placeholder="Write a brief description here."
                            rows="5"
                            className="form-control"
                            onChange={handleChange}
                            value={formData.description}
                        />
                    </label>
                </div>
                <button type="submit" className="btn btn-info">Submit</button>
                <Link to="/">
                    <button type="button" className="btn btn-secondary ml-2">
                        Cancel
                    </button>
                </Link>
            </form>
        </div>
    )
}

export default CreateNewDeck