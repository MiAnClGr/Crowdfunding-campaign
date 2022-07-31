import React from 'react'
import { useNavigate} from 'react-router-dom'

const Header = ({ user, balance, connect, contractBalance }) => {

    let navigate = useNavigate()

    return(
        <header className='Header'>

            <div className= 'User'>
                <text>Current User: {user} </text>
                <br></br>
                <br></br>
                <text>Current Eth Balance: {balance}</text>
                <br></br>
                <br></br>
                <text>Total Raised: {contractBalance}</text>
            </div>

            <button
                className= 'Connect'
                onClick= {connect}
                >
                Connect Wallet
            </button>  

            <button
                className= 'HomeLink'
                onClick= {() => {
                    navigate('/Home')
                }}
                >
                Home
            </button>  

            <button
                className= 'VoteLink'
                onClick= {() => {
                    navigate('/Vote')
                }}
                >
                Vote
            </button>  

            <button
                className= 'ContributeLink'
                onClick= {() => {
                    navigate('/Contribute')
                }}
                >
                Contribute
            </button>  
      
        </header>
    )
    
}

export default Header