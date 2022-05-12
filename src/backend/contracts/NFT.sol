// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {

    uint public tokenCounter;

    constructor() ERC721("DApp NFT","DAPP"){

    }

//this function is for NFT minting,will be used externally from the frontent for tokens
    function mint(string memory _tokenURI) external returns(uint) {
        
        tokenCounter++;
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, _tokenURI);
        return(tokenCounter);

    }
}
