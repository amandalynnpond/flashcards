import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DeckList from "../components/deck/DeckList";
import CreateNewDeck from "../components/deck/CreateNewDeck";
import Study from "../components/study/Study";
import CreateNewCard from "../components/card/CreateNewCard";
import Header from "./Header";
import NotFound from "./NotFound";
import ViewDeck from "../components/deck/ViewDeck";

function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route path="/decks/new">
            <CreateNewDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CreateNewCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
