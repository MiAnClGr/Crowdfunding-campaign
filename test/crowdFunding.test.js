const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Crowdfunding Contract', async () => {

    let crowdFundingContract
    let crowdFundingInstance
    let admin
    let contributor
    
    beforeEach(async () => {

        [admin, contributor1, contributor2, contributor3, recipient1, recipient2, recipient3] = await ethers.getSigners()
    
        crowdFundingContract = await ethers.getContractFactory("crowdFunding");
        
        crowdFundingInstance = await crowdFundingContract.deploy(10, 100);
  
    
        await crowdFundingInstance.deployed()

    })

    describe( 'Crowdfunding Contract', async () => {

        beforeEach(async () => {

            await crowdFundingInstance.connect(admin).createRequest('a', recipient1.address, 5)
            await crowdFundingInstance.connect(admin).createRequest('b', recipient2.address, 10)
            await crowdFundingInstance.connect(admin).createRequest('c', recipient3.address, 15)

        })

        it('The admin creates some requests', async () => {

            const request1 = await crowdFundingInstance.requests(0)
            const request2 = await crowdFundingInstance.requests(1)
            const request3 = await crowdFundingInstance.requests(2)

            expect(request1.description).to.equal('a')
            expect(request1.recipient).to.equal(recipient1.address)
            expect(request1.value).to.equal(5)

            expect(request2.description).to.equal('b')
            expect(request2.recipient).to.equal(recipient2.address)
            expect(request2.value).to.equal(10)

            expect(request3.description).to.equal('c')
            expect(request3.recipient).to.equal(recipient3.address)
            expect(request3.value).to.equal(15)
        })
         



        it('contribution from multiple addresses', async () => {

            const tx1 = {value: ethers.utils.parseEther('10')}
            const tx2 = {value: ethers.utils.parseEther('400')}
            const tx3 = {value: ethers.utils.parseEther('150')}


            await crowdFundingInstance.connect(contributor1).contribute(tx1)
            await crowdFundingInstance.connect(contributor2).contribute(tx2)
            await crowdFundingInstance.connect(contributor3).contribute(tx3)

            const contractBalance = await crowdFundingInstance.getBalance()

            expect(contractBalance).to.equal(ethers.utils.parseEther('560'))

            
        })

        it('all contributors vote and admin makes payment ', async () => {

            const request1 = await crowdFundingInstance.requests(0)
            const request2 = await crowdFundingInstance.requests(1)
            const request3 = await crowdFundingInstance.requests(2)
            
            const tx1 = {value: ethers.utils.parseEther('10')}
            const tx2 = {value: ethers.utils.parseEther('400')}
            const tx3 = {value: ethers.utils.parseEther('150')}

            const beforeBalance = await recipient2.getBalance()


            await crowdFundingInstance.connect(contributor1).contribute(tx1)
            await crowdFundingInstance.connect(contributor2).contribute(tx2)
            await crowdFundingInstance.connect(contributor3).contribute(tx3)

            await crowdFundingInstance.connect(contributor2).voteRequest(1)
            await crowdFundingInstance.connect(contributor3).voteRequest(1)
            await crowdFundingInstance.connect(contributor1).voteRequest(0)

            await crowdFundingInstance.connect(admin).makePayment(1)

            const afterBalance = await recipient2.getBalance()

            // request b (request[1]) has a value of 10 so if the payment was successfull recipient2 should have 10 more ether than before the payment

            expect(afterBalance).to.equal(beforeBalance.add(10))

        })

    })  
         
})