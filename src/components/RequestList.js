import React from 'react'
import Request from './Request'

const RequestList = ({ contract, requests }) => {

   
        
  
    return(

        <div>
            {requests.map(request => (
            <Request
            contract= {contract}
            key= {contract.numRequests()}
            description= {request[0]}
            address= {request[2]}
            value= {request[1]}
            voted= {request[4]}
            />))}
        </div>
    )
    


   

}

export default RequestList