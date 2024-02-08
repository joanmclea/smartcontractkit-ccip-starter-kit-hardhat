import { buildEVM2AnyMessage } from "./mock-utils";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { task, types } from "hardhat/config";
import { Spinner } from "../../utils/spinner";

import {
  BasicMessageSender__factory,
  BasicMessageReceiver__factory,
  BasicMessageSender,
  BasicMessageReceiver,
} from "../../typechain-types";

import { Client } from "../../typechain-types/IRouterClient";

task(
  `mock-send-message`,
  `sends message to CCIP receiver on your local dev chain`
)
  .addParam(
    "sender",
    "The address of the CCIP sender contract on your stand-alone Hardhat node"
  )
  .addParam(
    "receiver",
    "The CCIP receiver contract on your stand-alone Hardhat node"
  )
  .addOptionalParam(
    "message",
    "The text message to send via CCIP",
    'Hello CCIP',
    types.string
  )
  .setAction(
    async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      if (hre.network.name !== "localhost") {
        throw new Error(
          `This task can only be run on a local hardhat node running on "localhost". Current network is '${hre.network.name}'.`
        );
      }

      const message = "Hello CCIP";

      const [deployer] = await hre.ethers.getSigners();
      const senderContract: BasicMessageSender =
        BasicMessageSender__factory.connect(taskArgs.sender, deployer);

      const MESSAGE = {
        destinationChainSelector: 0,
        receiver: taskArgs.receiver,
        messageText: taskArgs.message,
        feeTokenAddress: hre.ethers.constants.AddressZero,
      };

      // const builtMessage = buildEVM2AnyMessage(EVM2AnyMessage);

      console.log(
        `\nℹ️  Attempting to send the ${message} message from the BasicMessageSender smart contract (${taskArgs.sender}) on the ${hre.network.name} blockchain to the BasiceMessageReceiver smart contract at ${taskArgs.receiver}} on the same blockchain...`
      );
      const spinner: Spinner = new Spinner();
      spinner.start();

      const sendTx = await senderContract.send(
        MESSAGE.destinationChainSelector,
        MESSAGE.receiver,
        MESSAGE.messageText,
        MESSAGE.feeTokenAddress
      );
      await sendTx.wait();

      spinner.stop();
      console.log(
        `\n✅ Message sent, transaction hash: ${sendTx.hash}. Message Details: \n`
      );
      console.table(MESSAGE);

      spinner.start();
      console.log("\nChecking if message received...");
      const receiverContract: BasicMessageReceiver =
        BasicMessageReceiver__factory.connect(taskArgs.receiver, deployer);

      const [
        lastestMessageIdBytes32,
        latestSourceChainSelectorBigNum,
        senderAddress,
        messageString,
      ] = await receiverContract.getLatestMessageDetails();
      spinner.stop();

      console.log("\n✅ Message received. Details: \n");

      console.table({
        messageId: lastestMessageIdBytes32,
        sourceChainSelector: latestSourceChainSelectorBigNum.toNumber(),
        sender: senderAddress,
        message: messageString,
      });
    }
  );
