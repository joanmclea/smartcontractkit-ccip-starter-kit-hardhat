import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { task, types } from "hardhat/config";
import { Spinner } from "../../utils/spinner";

import {
  ProgrammableTokenTransfers,
  ProgrammableTokenTransfers__factory,
  IERC20,
  IERC20__factory,
} from "../../typechain-types";
import { addressIsContract, readMocksDoc } from "./mock-utils";
import { getProviderRpcUrl } from "../utils";

task(
  `mock-send-receive`,
  `sends message to CCIP receiver on your local dev chain`
)
  .addOptionalParam(
    "sender",
    "The address of the CCIP sender contract on your stand-alone Hardhat node",
    readMocksDoc()["ProgrammableTokenTransfers-sender"]
  )
  .addOptionalParam(
    "receiver",
    "The CCIP receiver contract on your stand-alone Hardhat node",
    readMocksDoc()["ProgrammableTokenTransfers-receiver"]
  )
  .addOptionalParam(
    "message",
    "The text message to send via CCIP",
    "",
    types.string
  )
  .addOptionalParam(
    `tokenAddress`,
    `The address of a token to be sent on the source blockchain`,
    readMocksDoc()["bnmToken"]
  )
  // TODO @zeuslawyer refactor for batch token transfers.
  .addOptionalParam(
    `amount`,
    `The amount of token to be transferred in units (eg wei, satoshi, etc))`,
    "0"
  )
  .addOptionalParam(
    `feeTokenAddress`,
    `The address of LINK for paying fees. If not provided, the source blockchain's native token will be used`
  )
  .setAction(
    async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      if (hre.network.name !== "localhost") {
        throw new Error(
          `This task can only be run on a local hardhat node running on "localhost". Current network is '${hre.network.name}'.`
        );
      }

      const [deployer] = await hre.ethers.getSigners();
      const message = "Hello CCIP";
      const tokenToSend: IERC20 = IERC20__factory.connect(
        taskArgs.tokenAddress,
        deployer
      );
      const DESTINATION_IS_CONTRACT = addressIsContract(taskArgs.receiver);

      const senderContract: ProgrammableTokenTransfers =
        ProgrammableTokenTransfers__factory.connect(taskArgs.sender, deployer);

      const MESSAGE = {
        destinationChainSelector: 0,
        receiver: taskArgs.receiver,
        messageText: taskArgs.message,
        transferToken:
          taskArgs.tokenAddress || hre.ethers.constants.AddressZero,
        transferAmount: taskArgs.amount.toString(),
        feeTokenAddress:
          taskArgs.feeTokenAddress || hre.ethers.constants.AddressZero,
      };

      const receiverStartingBal = await tokenToSend.balanceOf(
        taskArgs.receiver
      );
      const senderTokenBal = await tokenToSend.balanceOf(taskArgs.sender);
      if (taskArgs.amount > senderTokenBal) {
        console.log(
          `\nℹ️ 💰 Funding Sender ${taskArgs.sender} with ${taskArgs.amount} units of mockBnM as it has insufficient balance.`
        );
        await tokenToSend.transfer(taskArgs.sender, taskArgs.amount);
      }

      console.log(
        `\nℹ️  Attempting to send the ${message} message from the Sender Contract (${taskArgs.sender}) on the ${hre.network.name} blockchain to the Receiver Contract at ${taskArgs.receiver} on the same blockchain...`
      );
      const spinner: Spinner = new Spinner();
      spinner.start();

      const sendTx = await senderContract.sendMessage(
        MESSAGE.destinationChainSelector,
        MESSAGE.receiver,
        MESSAGE.messageText,
        MESSAGE.transferToken,
        MESSAGE.transferAmount
      );
      await sendTx.wait();
      spinner.stop();

      console.log(
        `\n✅ Message sent, transaction hash: ${sendTx.hash}. Message Details: \n`
      );
      console.table(MESSAGE);

      spinner.start();
      console.log("\nChecking if message received...");

      if (!DESTINATION_IS_CONTRACT) {
        // TODO @zeuslawyer for when sending to EOA is supported by mock.
        const updatedEOABal = await tokenToSend.balanceOf(taskArgs.receiver);
        console.log(
          `\n⚠️ The receiver address ${taskArgs.receiver} is an EOA. Starting Balance was ${receiverStartingBal}.  Balance updated to ${updatedEOABal} units of ${taskArgs.tokenAddress}.`
        );
        return; // Messages cannot be sent to EOA.
      }

      const receiverContract: ProgrammableTokenTransfers =
        ProgrammableTokenTransfers__factory.connect(
          taskArgs.receiver,
          deployer
        );

      try {
        const [
          lastestMessageIdBytes32,
          sourceChainSelector,
          senderAddress,
          messageString,
          tokenAddress,
          transferredAmount,
        ] = await receiverContract.getLastReceivedMessageDetails();

        console.log(
          `\n✅ Message received in Receiver Contract ${receiverContract.address}. Details: \n`
        );

        console.table({
          messageId: lastestMessageIdBytes32,
          sourceChainSelector: sourceChainSelector.toString(),
          sender: senderAddress,
          message: messageString,
          transferredToken: tokenAddress,
          transferredAmount: transferredAmount.toString(),
        });

        const receiverUpdatedBal = await tokenToSend.balanceOf(
          taskArgs.receiver
        );
        console.log(
          `Receiver's starting balance: ${receiverStartingBal}. Ending balance: ${receiverUpdatedBal}.`
        );
      } catch (error: any) {
        console.log(error);
        console.table({ errorName: error.errorName, method: error.method });
      }

      spinner.stop();
    }
  );
