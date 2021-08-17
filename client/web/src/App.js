import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/question")
    .then((res) => res.json())
    .then((data) => setData(data))
  })
  
  return (
    <div className="App">
      <header className="App-header">
        <p>{ !data ? "Loading..." : data[0].title }</p>
      </header>
    </div>
  );
}

export default App;