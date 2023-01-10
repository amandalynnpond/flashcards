import React, {useState} from "react";
import {useHistory} from "react-router-dom";


function FlashcardStudy({deck, cards}){
    const [cardCount, setCardCount] = useState(0)
    const [cardSide, setCardSide] = useState("front")
    const history = useHistory()

    //console.log(cards)

    let cardInfo = cards[cardCount].front
    
    if (cardSide === "front") {
        cardInfo = cards[cardCount].front
    } else {
        cardInfo = cards[cardCount].back
    }

    const handleFlip = (event) => {
        if (cardSide === "front") {
            setCardSide("back")
        } else {
            setCardSide("front")
        }
    }

    const handleNext = () => {
        if (cardCount + 1 < cards.length) {
            setCardCount((cardCount) + 1)
            setCardSide("front")
        } else {
            const result = window.confirm(`Reset cards for ${deck.name}? \n \n Clicking cancel will bring you back to the home page.`)
            if (result) {
                setCardSide("front")
                setCardCount(0)
            } else {
                history.push("/")
                }
        }
    }

    return (
        <div className="border border-dark my-4 mx-5 rounded p-4 bg-light">
            <h4>{deck.name}: Card {cardCount + 1} of {cards.length}</h4>
            <p>{cardInfo}</p>
            <button type="button" className="btn btn-secondary mr-2" onClick={handleFlip}>Flip</button>
            {cardSide === "back" ? (
                <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
            ) : ( <div></div> )}
        </div>
    )
}

export default FlashcardStudy