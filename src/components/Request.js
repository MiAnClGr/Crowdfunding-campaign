import React from 'react'
import { ethers } from 'ethers'

const Request = ({ description, address, value, voted }) => {

    const [selected, setSelected] = React.useState(false)

    const handleClick = () => {
        console.log('clicked')
        setSelected(!selected)
    }
    
    console.log(selected)

    const isSelected = selected ? 'DisplayRequestSelected' : 'DisplayRequest'

    return(
        <div 
        className= {isSelected}
        onClick= {handleClick}
        >
            
            <br></br>
            <h4>Description: {description}</h4>
            <h4>Address: {address}</h4>
            <h4>Value: {ethers.utils.formatEther(value)}</h4>
            <h4>Number of Votes: {voted.toNumber()}</h4>
            <br></br>
            
        </div>

    )
}  

export default Request