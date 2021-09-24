import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Layout from "./container/layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Layout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
