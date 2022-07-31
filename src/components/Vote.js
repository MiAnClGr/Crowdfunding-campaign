import React from 'react'
import Split from 'react-split'
import RequestList from './RequestList'

const Vote = ({ contract, requests, getAdmin, getRequests, connectWallet }) => {

    const [requestNum, setRequestNum] = React.useState('')

    const submitVote = async () => {
        await contract.voteRequest(requestNum, {gasLimit: 100000})
          console.log('request')
      }

    const handleChange = (event) => {
        setRequestNum(event.target.value)           
      }
    

    const handleSubmit = async () => {
        // submitVote()
        
    }

    React.useEffect(() => {
        getAdmin()
        getRequests()
        connectWallet()
      }, [])

    return(
        <Split
        sizes={[25, 75]}
        direction="horizontal"
        className= 'Flex'
        >
            <div>
                <RequestList
                contract= {contract}
                requests= {requests}
                />
            </div>

            <div>
            <h2>Vote</h2>

            <input
            className= 'Inputs'
            placeholder= 'Request Number'
            onChange= {handleChange}
            name= 'RequestNum'
            >
            </input>
            <br></br>
            <br></br>
            <button 
            className= 'SubmitForm' 
            onClick= {handleSubmit}
            // value= {request}
            >
                Submit
            </button>
        
            </div>     

        </Split>

    )
}

export default Vote