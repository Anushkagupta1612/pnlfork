// SPDX-License-Identifier: MIT

pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./auction.sol";

contract pnl is ERC721URIStorage {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;

    constructor() ERC721("ProNFTLeague", "PNL") {}

    function mintToken(string memory tokenURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(address(this), true);
        return newItemId;
    }

    function nftTransfer(address seller, uint tokenId, uint price) public payable{
        require(msg.value <= price, "Not enough balance");
        payable(seller).transfer(msg.value);
        safeTransferFrom(seller, msg.sender, tokenId);
    }

    function deployed () pure public returns (string memory){
        return "I am deployed";
    }
}


