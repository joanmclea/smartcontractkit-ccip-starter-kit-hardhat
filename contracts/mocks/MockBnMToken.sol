pragma solidity ^0.8.0;

import {BurnMintERC677} from "../@Chainlink/contracts/src/v0.8/shared/token/ERC677/BurnMintERC677.sol";


contract MockBnMToken is BurnMintERC677("MockBnM", "MBM", 18, 1e33) {
}
