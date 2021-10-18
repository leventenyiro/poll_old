import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chart } from "react-google-charts"

const PollDetails = () => {
    const { id } = useParams()
    const [poll, setPoll] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const [answers, setAnswers] = useState([])

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
            //setAnswers(['Answer', 'Votes'])
            //setAnswers(answers, ['Jó', '2'])
            //setAnswers(answers, ['Rossz', '1'])
            let tempAnswers = [['Answer', 'Votes']]
            data.answers.map((answer) => {
                //answers.push([answer.title, answer.count])
                //setAnswers([answers, [answer.title, answer.count]])
                //console.log([answers, [answer.title, answer.count]])
                tempAnswers.push([answer.title, answer.count])
            })
            setAnswers(tempAnswers)
            //console.log(tempAnswers)
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
        <div className="pollDetails">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { poll &&
                <div>
                    <h1>{poll.title}</h1>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={
                            answers
                        }
                    />
                </div>
                
            }
            <button>Valami</button>
        </div>
    )
}
 
export default PollDetails;