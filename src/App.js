import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Events from "./Components/Events";
import EventDetails from "./Components/EventDetails";

export default function App() {
  return (
    <Router basename="/ShyftPlan-CS-Task">
      <div>
        <Switch>
          <Route exact path="/events/:id" component={EventDetails} />
          <Route
            exact
            path="/"
            render={() => {
              return (
                <Redirect to="/events" /> 
              )
            }}
          />
          <Route exact path="/events" component={Events} />
        </Switch>
      </div>
    </Router>
  );
}