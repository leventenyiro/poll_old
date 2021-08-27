import logo from './logo.svg';
import './App.css';
import PollDetails from './PollDetails';
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  /*const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/question")
    .then((res) => res.json())
    .then((data) => setData(data))
  })*/
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <div>Home</div>
          </Route>

          <Route path="/:id">
            <PollDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;