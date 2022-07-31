import React from 'react'
import { ethers } from 'ethers'

const Request = ({ contract }) => {


    const [request, setRequest] = React.useState({
        description: '',
        recipient: '',
        value: ''
        
      })

    const submitRequest = async () => {
        await contract.createRequest(
          request.description, request.recipient, ethers.utils.parseEther(request.value))
          console.log('request')
      }

    const handleChange = (event) => {
        setRequest(prevFormData => {
          return {
          ...prevFormData,
          [event.target.name] : event.target.value  
          }  
        })
      }

    const handleSubmit = () => {
        submitRequest()
    }

    React.useEffect(() => {
        handleSubmit()
    }, [])

    return(
       <div className= 'Request'>
        <h2 className= 'Titles'>Create Spending Request</h2>
        <textarea
            className= 'DescriptionInput'
            placeholder= 'Description' 
            onChange= {handleChange}
            name= 'description'
            >
        </textarea>
        <br></br>
        <input
            className= 'Inputs'
            placeholder= 'Recipient'
            onChange= {handleChange}
            name= 'recipient'
            >
        </input>
        <br></br>
        <input
            className= 'Inputs'
            placeholder= 'Value'
            onChange= {handleChange}
            name= 'value'
            >
        </input>
        <br></br>
        <br></br>
        <button 
            className= 'SubmitForm' 
            onClick= {handleSubmit}
            value= {request}
            >
                Submit
            </button>
        
       </div>     

    )
}

export default Request