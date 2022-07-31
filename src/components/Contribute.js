import React from 'react'
import { ethers } from 'ethers'
import Split from 'react-split'
import RequestList from './RequestList'

const Contribute = ( { contract, requests, getAdmin, getRequests, connectWallet, contractAddress, signer } ) => {

    const [contribution, setContribution] = React.useState('')

    const submitContribution = async () => {
        const tx = {
            to: contractAddress,
            value: ethers.utils.parseEther(contribution),
            gasLimit: 100000
        }

        await contract.contribute(
          await signer.sendTransaction(tx))
    }

    const handleChange = (event) => {
        setContribution(event.target.value)           
    }
    

    const handleSubmit = async () => {
        submitContribution()
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
            <h2>Contribute</h2>

            <input
            className= 'Inputs'
            placeholder= 'Contribute'
            onChange= {handleChange}
            name= ''
            >
            </input>
            <br></br>
            <br></br>
            <button 
            type= 'submit'
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

export default Contribute