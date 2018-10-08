import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./components/App";
import Root from "./Root";
import WorkerDetails from "./components/workerDetails";
import Header from "./components/Header";
import * as serviceWorker from "./serviceWorker";
import "./normalize.css";

ReactDOM.render(
  <Root>
    <Router>
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/:id" component={WorkerDetails} />
        </Switch>
      </>
    </Router>
  </Root>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
