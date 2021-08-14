import './App.css';
import { useEffect, useState } from "react"

function App() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch("/question/")
    .then(res => {
      return res.json()
    })
    .then(inputData => {
      setData(inputData[0])
    })
  }, [])
  
  return (
    <div className="App">
      <h1>{ data.title }</h1>
    </div>
  );
}

export default App;
