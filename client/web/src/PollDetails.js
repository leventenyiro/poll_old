import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PollDetails = () => {
    const { id } = useParams()
    const [poll, setPoll] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    //const [answers, setAnswers] = useState([])

    const fetchData = () => {
        fetch(`http://localhost:3001/question/${id}`)
        .then(res => {
            if (!res.ok)
                throw Error("Server error!")
            return res.json()
        })
        .then(data => {
            setPoll(data)
            //console.log(data.answers)
            /*setAnswers(['Answer', 'Votes'])
            data.answers.map((answer) => {
                answers.push([answer.title, answer.count])
            })*/
            //console.log(answers)
            //console.log(poll.answers[0].title)
            setIsPending(false)
            setError(null)
        })
        .catch(err => {
            setError(err.message)
            setIsPending(false)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <div>
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { poll &&
                <div>
                    <h1>{poll.title}</h1>
                    {
                        poll.answers.map(e => (
                            <p>{e.title} - {e.count}</p>
                        ))
                    }
                </div>
                
            }
        </div>
    )
}
 
export default PollDetails;