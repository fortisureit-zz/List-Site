import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import List from "./components/List";
import Footer from "./components/Footer";

import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import "./CSS/Grid.css";
import "./CSS/Style.css";
import "./CSS/MediaQ.css";

ReactDOM.render(
  <BrowserRouter>
    <div id="index">
      <Switch>
        <Route path="/" component={List} />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
