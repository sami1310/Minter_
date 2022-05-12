// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Nftmarketplace is ReentrancyGuard {

    address payable public immutable artistAccount;//immutable for assiging the value only once 
    uint public itemCount;
    uint public immutable feePercentOnSale;

    constructor(uint _feePercentOnSale) {
        artistAccount = payable(msg.sender);
        feePercentOnSale = _feePercentOnSale;
    }

    struct Item{
        uint itemId;
        address payable artist;
        uint tokenId;
        uint price;
        bool sold;
        IERC721 nft;
    }

    event listing (
        uint itemId,
        uint tokenId,
        uint price,
        address indexed nft,
        address indexed artist
    );

    mapping(uint => Item) public items;

    function uploadItems(uint _tokenId, uint _price, IERC721 _nft) external nonReentrant {
        require( _price > 0, "Price shouldn't be zero!!");
        
        _nft.transferFrom(msg.sender, address(this), _tokenId);

        itemCount++;

        //for listing items of the site 
        items[itemCount] = Item (
            itemCount,
            payable(msg.sender),
            _tokenId,
            _price,
             false,
             _nft
        );

        emit listing(itemCount, _tokenId, _price, address(_nft), msg.sender);

    }



}