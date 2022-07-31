import React from 'react'
import './App.css';
import { ethers } from 'ethers'
import Split from "react-split";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Vote from './components/Vote'
import Contribute from './components/Contribute'
import MakeRequest from './components/MakeRequest'
import RequestList from './components/RequestList'
import abi from './crowd-Funding.json'


const contractABI = abi.output.abi

console.log(contractABI)
    
const contractAddress =     
        '0x5FbDB2315678afecb367f032d93F642f64180aa3'

const provider = 
        new ethers.providers.Web3Provider(window.ethereum)

const signer = provider.getSigner()   


const crowdFundingContract = 
      new ethers.Contract(contractAddress, contractABI, signer);



function App() {

  const [currentAccount, setCurrentAccount] = React.useState('Ox')
  const [userBalance, setUserBalance] = React.useState('')
  const [contractBalance, setContractBalance] = React.useState('')
  const [admin, setAdmin] = React.useState('')
  const [requests, setRequests] = React.useState([])



  //connecting wallet//

  const connectWallet = async () =>  {

    console.log('clicked')

    await provider.send("eth_requestAccounts", [])

    
    
    if(window.ethereum) {
    
    await console.log('Wallet')
    }

    const currentAddress = await signer.getAddress()
      await console.log(currentAddress)

    setCurrentAccount(currentAddress)
      await console.log(currentAccount)

    const balance = await provider.getBalance(currentAddress)
    await console.log(ethers.utils.formatEther(balance))
    

    setUserBalance(ethers.utils.formatEther(balance))

    const contractBalance = await crowdFundingContract.getBalance()

    setContractBalance(ethers.utils.formatEther(contractBalance))

    console.log(contractBalance)

  }


  //retrieving the admin//

  const getAdmin = async () => {
    const contractOwner = await crowdFundingContract.admin()
    
    setAdmin(ethers.utils.getAddress(contractOwner))
    await console.log(contractOwner)
  }

  console.log(getAdmin())


  //retrieving the requests//

  const getRequests = async () => {
    let requestsArray = []
    for(let i=0; i < 10; i++){
      const result = await crowdFundingContract.getRequest(i)

      if(result[2] !== '0x0000000000000000000000000000000000000000')
      requestsArray.push(result)
      
      setRequests(() => {
        return requestsArray
      })
    }
    
   
  }


  React.useEffect(() => {
    getAdmin()
    getRequests()
    connectWallet()
  }, [])

  console.log(requests)




  return (
    <Router>
      <>
      
        <Header
        contract= {crowdFundingContract}
        contractAddress= {contractAddress}
        provider= {provider}
        signer={signer}
        connect= {connectWallet}
        user= {currentAccount}
        balance= {userBalance}
        contractBalance= {contractBalance}
        />

        <Routes>
          <Route path="/Home" element={
          
            <Split
            sizes={[25, 75]}
            direction="horizontal"
            className= 'Flex'
            >
              <div>
                <RequestList
                contract= {crowdFundingContract}
                requests= {requests}
                />
              </div>
              <div>
                {currentAccount === admin &&
                  <MakeRequest
                  contract= {crowdFundingContract}
                  /> }
              </div>

            </Split>}
          />


        <Route path="/Vote" element={

            <Vote
            contract= {crowdFundingContract}
            getAdmin= {getAdmin}
            getRequests= {getRequests}
            connectWallet= {connectWallet}
            requests= {requests}
            />} 
          />

        <Route path="/Contribute" element={

           <Contribute
            contract= {crowdFundingContract}
            contractAddress= {contractAddress}
            getAdmin= {getAdmin}
            getRequests= {getRequests}
            connectWallet= {connectWallet}
            signer= {signer}
            requests= {requests}
            />} 
         />

        </Routes>

      </>
    </Router>
  );
}

export default App;
