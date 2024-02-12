// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IRouter} from "../@Chainlink/contracts/src/v0.8/ccip/interfaces/IRouter.sol";
import {IRouterClient} from "../@Chainlink/contracts/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {IAny2EVMMessageReceiver} from "../@Chainlink/contracts/src/v0.8/ccip/interfaces/IAny2EVMMessageReceiver.sol";

import {Client} from "../@Chainlink/contracts/src/v0.8/ccip/libraries/Client.sol";
import {CallWithExactGas} from "../@Chainlink/contracts/src/v0.8/shared/call/CallWithExactGas.sol";
import {Internal} from "../@Chainlink/contracts/src/v0.8/ccip/libraries/Internal.sol";

import {SafeERC20} from "../@Chainlink/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "../@Chainlink/contracts/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";

import "hardhat/console.sol";

contract MockCCIPRouter is IRouter, IRouterClient {
    using SafeERC20 for IERC20;

    error InvalidAddress(bytes encodedAddress);
    error InvalidExtraArgsTag();

    event MessageExecuted(
        bytes32 messageId,
        uint64 sourceChainSelector,
        address offRamp,
        bytes32 calldataHash
    );

    uint16 public constant GAS_FOR_CALL_EXACT_CHECK = 5_000;
    uint64 public constant DEFAULT_GAS_LIMIT = 200_000;

    address public test_owner;

    constructor() {
        test_owner = msg.sender;
    }

    function routeMessage(
        Client.Any2EVMMessage calldata message,
        uint16 gasForCallExactCheck,
        uint256 gasLimit,
        address receiver
    ) external returns (bool success, bytes memory retBytes, uint256 gasUsed) {
        (success,) =   _routeMessage(message, gasForCallExactCheck, gasLimit, receiver);
        return (success, retBytes, gasUsed);
    }

    function _routeMessage(
        Client.Any2EVMMessage memory message,
        uint16 gasForCallExactCheck,
        uint256 gasLimit,
        address receiver
    ) internal returns (bool success, bool sufficientGas) { 
        bytes memory data = abi.encodeWithSelector(
            IAny2EVMMessageReceiver.ccipReceive.selector,
            message
        );

        (success, sufficientGas) = CallWithExactGas
            ._callWithExactGasEvenIfTargetIsNoContract(
                data,
                receiver,
                gasLimit,
                gasForCallExactCheck// Internal.MAX_RET_BYTES
            );

        emit MessageExecuted(
            message.messageId,
            message.sourceChainSelector,
            msg.sender,
            keccak256(data)
        );
        return (success, sufficientGas);
    }

    function ccipSend(
        uint64, // destinationChainSelector
        Client.EVM2AnyMessage calldata message
    ) external payable returns (bytes32) {
        if (message.receiver.length != 32)
            revert InvalidAddress(message.receiver);
        uint256 decodedReceiver = abi.decode(message.receiver, (uint256));
        // We want to disallow sending to address(0) and to precompiles, which exist on address(1) through address(9).
        if (decodedReceiver > type(uint160).max || decodedReceiver < 10)
            revert InvalidAddress(message.receiver);

        address receiver = address(uint160(decodedReceiver));
        uint256 gasLimit = _fromBytes(message.extraArgs).gasLimit;
        bytes32 mockMsgId = keccak256(abi.encode(message));

        Client.Any2EVMMessage memory executableMsg = Client.Any2EVMMessage({
            messageId: mockMsgId,
            sourceChainSelector: 0,
            sender: abi.encode(msg.sender),
            data: message.data,
            destTokenAmounts: message.tokenAmounts
        });

        for (uint256 i = 0; i < message.tokenAmounts.length; ++i) {
            IERC20(message.tokenAmounts[i].token).safeTransferFrom(
                msg.sender,
                receiver,
                message.tokenAmounts[i].amount
            );
        }

        _routeMessage(
            executableMsg,
            GAS_FOR_CALL_EXACT_CHECK,
            gasLimit,
            receiver
        );

        // @dev development only
        console.log("DEV:  ccipSend() called with msgId: ");
        console.logBytes32(mockMsgId);

        return mockMsgId;
    }

    function _fromBytes(
        bytes calldata extraArgs
    ) internal pure returns (Client.EVMExtraArgsV1 memory) {
        if (extraArgs.length == 0) {
            return Client.EVMExtraArgsV1({gasLimit: DEFAULT_GAS_LIMIT});
        }
        if (bytes4(extraArgs) != Client.EVM_EXTRA_ARGS_V1_TAG)
            revert InvalidExtraArgsTag();
        return abi.decode(extraArgs[4:], (Client.EVMExtraArgsV1));
    }

    function isChainSupported(uint64) external pure returns (bool supported) {
        return true;
    }

    function getSupportedTokens(
        uint64
    ) external pure returns (address[] memory tokens) {
        return new address[](0);
    }

    function getFee(
        uint64,
        Client.EVM2AnyMessage memory
    ) external pure returns (uint256 fee) {
        return 0;
    }
}
