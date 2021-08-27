import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from 'react-google-charts'

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
            setAnswers(['Answer', 'Votes'])
            data.answers.map((answer) => {
                answers.push([answer.title, answer.count])
            })
            console.log(answers)
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
                <React.Fragment>
                    <h1>{ poll.title }</h1>
                    <Chart
                        chartType="PieChart"
                        loader={<div>Loading chart...</div>}
                        data={
                            answers
                        }
                        options={{
                            title: 'Votes'
                        }}
                        rootProps={{
                            'data-testid': '1'
                        }}
                    />
                </React.Fragment>
                
            }
        </div>
    )
}
 
export default PollDetails;