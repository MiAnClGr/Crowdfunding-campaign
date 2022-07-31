const { ethers } = require('hardhat');



async function main() {
    // We get the contract to deploy

   
    const CrowdFunding = await hre.ethers.getContractFactory("crowdFunding");
    const crowdFunding = await CrowdFunding.deploy(1000, 604800);
  
    await crowdFunding.deployed();

    console.log('The Contract is deployed at', crowdFunding.address);

    const contractAdmin = await crowdFunding.admin()
    console.log(contractAdmin)

    // [deployer, Contributor1, Contributor2, Contributor3, Recipient1, Recipient2, Recipient3] = await ethers.getSigners() 

    // //Admin creates request

    // await crowdFunding.connect(deployer).createRequest('requestOne', Recipient1.address, 5)

    // const request = await crowdFunding.requests('0')

    // console.log(request)







    // //Contribute

    // const tx = {value: ethers.utils.parseEther('1')}

    // await crowdFunding.connect(Contributor1).contribute(tx)

    // const balance = await crowdFunding.getBalance()
    // console.log(ethers.utils.formatEther(balance))


    // //Get a refund

    // const contributorBeforeBalance = await Contributor1.getBalance()
    // console.log(ethers.utils.formatEther(contributorBeforeBalance))

    // await crowdFunding.connect(Contributor1).getRefund()
    
    // const contributorAfterBalance = await Contributor1.getBalance()
    // console.log(ethers.utils.formatEther(contributorAfterBalance))

    // const admin = await crowdFunding.admin()
    // console.log(admin)

    // console.log(deployer.address)

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });