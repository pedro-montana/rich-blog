import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import UpButton from "./components/UpButton";

import Homepage from "./Homepage";
import Article from "./components/Article";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/article" component={Article} exact />
        </Switch>
        <UpButton />
      </div>
    </Router>
  );
}

export default App;
