const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace", function(){
    let deployer, addr1, addr2, nft, nftmarketplace
    let feePercent = 1

    beforeEach(async function(){

        const NFT = await ethers.getContractFactory("NFT");
        const Nftmarketplace = await ethers.getContractFactory("Nftmarketplace");

        [deployer, addr1, addr2] = await ethers.getSigners()

         nft = await NFT.deploy();
         nftmarketplace = await Nftmarketplace.deploy(feePercent);
    });
    describe("Deployment", function(){
        it("will give name and symbol of the marketplace", async function(){

            expect(await nft.name()).to.equal("DApp NFT")
            expect(await nft.symbol()).to.equal("DAPP")
        })
    })
})