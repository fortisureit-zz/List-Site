import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navigation from './components/Navigation'
import List from './components/List';
import Home from './components/Home';
import Footer from "./components/Footer"


import './index.css';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'

ReactDOM.render((

    <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/list" component={List} />
          </Switch>
          <Footer></Footer>
        </div>
      </BrowserRouter>

), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
