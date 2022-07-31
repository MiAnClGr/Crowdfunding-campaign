// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

 contract crowdFunding {

// State Variables
    
    mapping(address => uint) public contributors;
    
    address public admin;
    
    uint public noOfContributors;
    uint public minimumContribution;
    uint public deadline; //timestamp
    uint public goal;
    uint public raisedAmount;
    
  
    
    struct Request {
        string description;
        address payable recipient;
        uint value;
        bool completed;
        uint noOfVoters;
        mapping(address => bool) voters;
    }
    

    mapping(uint => Request) public requests;
    uint public numRequests;
    
// Events

    event ContributeEvent(address _sender, uint _value);
    event CreateRequestEvent(string _description, address _recipient, uint _value);
    event MakePaymentEvent(address _recipient, uint _value);

// Modifiers

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can execute this");
        _;
    } 
    
// Constructor

    constructor(uint _goal, uint _deadline) {
        goal = _goal;
        deadline = block.timestamp + _deadline;
        admin = msg.sender;
        minimumContribution = 100 wei;
    }


// Receive fallback function

    receive() payable external {
        contribute();
    }
    
// Contribute to the campaign

    function contribute() public payable {
        require(block.timestamp < deadline, "The Deadline has passed!");
        require(msg.value >= minimumContribution, "The minimum Contribution was not met!");
        
        if(contributors[msg.sender] == 0) {
            noOfContributors++;
        }
        
        contributors[msg.sender] += msg.value;
        raisedAmount += msg.value;
        
        emit ContributeEvent(msg.sender, msg.value);
    }

// Issues a refund to a contributor providing the deadline has passed 
    
    function getRefund() public {
        require(block.timestamp > deadline, "Deadline has not passed.");
        require(raisedAmount < goal, "The goal was met");
        require(contributors[msg.sender] > 0);
        
        address payable recipient = payable(msg.sender);
        uint value = contributors[msg.sender];
        
        contributors[msg.sender] = 0;  
        recipient.transfer(value);
    }

// create a spending request
      
    function createRequest(string calldata _description, address payable _recipient, uint _value) public onlyAdmin {
        
        Request storage newRequest = requests[numRequests];
        numRequests++;
        
        newRequest.description = _description;
        newRequest.recipient = _recipient;
        newRequest.value = _value;
        newRequest.completed = false;
        newRequest.noOfVoters = 0;
        
        emit CreateRequestEvent(_description, _recipient, _value);
    }

// Vote for a particular spending request

    function voteRequest(uint _requestNo) public {
        require(contributors[msg.sender] > 0, "You must be a contributor to vote!");
        
        Request storage thisRequest = requests[_requestNo];
        require(thisRequest.voters[msg.sender] == false, "You have already voted!");
        
        thisRequest.voters[msg.sender] = true;
        thisRequest.noOfVoters++;
    }
    
// Completes the spending request given more than 50% of the votes
    function makePayment(uint _requestNo) public onlyAdmin {
        Request storage thisRequest = requests[_requestNo];
        require(thisRequest.completed == false, "The request has been already completed!");  
        require(thisRequest.noOfVoters > noOfContributors / 2, "The request needs more than 50% of the contributors.");
        
        thisRequest.completed = true;
        thisRequest.recipient.transfer(thisRequest.value);
        
        emit MakePaymentEvent(thisRequest.recipient, thisRequest.value);
    }  

// Returns the request as individual variables (for front end access)

    function getRequest(uint _requestNo) public view returns(
        string memory description,
        uint value,
        address recipient,
        bool completed,
        uint noOfVoters
        ) {
        
        Request storage thisRequest = requests[_requestNo];
    
        return (
                thisRequest.description,
                thisRequest.value,
                thisRequest.recipient,              
                thisRequest.completed,
                thisRequest.noOfVoters

                    );
    }

// Returns the balance of the contract

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
}