async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  //sending contracts to deploy
  const NFT = await ethers.getContractFactory("NFT");
  //to fetch the copy of deployed contract for frontend
  const nft = await NFT.deploy();

  //sending contracts to deploy
  const Nftmarketplace = await ethers.getContractFactory("Nftmarketplace");
  //to fetch the copy of deployed contract for frontend
  const nftmarketplace = await Nftmarketplace.deploy(1);
  
  
  console.log("NFT contract address", nft.address)
  console.log("marketplace contract address", nftmarketplace.address)
  // For each contract, pass the deployed contract and name to this function to save a copy of the contract ABI and address to the front end.
  saveFrontendFiles(nft,"NFT");
  saveFrontendFiles(nftmarketplace,"Nftmarketplace");


}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
