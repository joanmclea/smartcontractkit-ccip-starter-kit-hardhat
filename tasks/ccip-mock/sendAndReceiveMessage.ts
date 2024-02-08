import { buildEVM2AnyMessage } from "./localdev-utils";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { task } from "hardhat/config";
import { Spinner } from "../../utils/spinner";
import {
  BasicMessageSender__factory,
  BasicMessageReceiver__factory,
  BasicMessageSender,
  BasicMessageReceiver,
} from "../../typechain-types";


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
    "The CCCIP receiver contract on your stand-alone Hardhat node"
  )
  .setAction(
    async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      if (hre.network.name !== "localhost") {
        throw new Error(
          `This task can only be run on a local hardhat node running on "localhost". Current network is '${hre.network.name}'.`
        );
      }

      const message = "Hello CCIP"

      const [deployer] = await hre.ethers.getSigners();
      const senderContract: BasicMessageSender =
        BasicMessageSender__factory.connect(taskArgs.sender, deployer);

      // const EVM_EXTRA_ARGS_V1_TAG = "0x97a657c9";  
      // const msgData = hre.ethers.utils.formatBytes32String(message);

      // const EVM2AnyMessage: RouterClient.EVM2AnyMessageStruct = {
      //   receiver: taskArgs.receiver,
      //   data: msgData,
      //   feeToken: hre.ethers.constants.AddressZero,
      //   extraArgs: EVM_EXTRA_ARGS_V1_TAG,
      //   tokenAmounts: [],
      // };                                                       // TODO @zeuslawyer -- is this needed

      // const builtMessage = buildEVM2AnyMessage(EVM2AnyMessage); 

      console.log(
        `\nℹ️  Attempting to send the ${message} message from the BasicMessageSender smart contract (${taskArgs.sender}) on the ${hre.network.name} blockchain to the BasiceMessageReceiver smart contract at ${taskArgs.receiver}}`
      );
      const spinner: Spinner = new Spinner();
      spinner.start();

      const sendTx = await senderContract.send(
        0,
        taskArgs.receiver,
        "Hello CCIP",
        hre.ethers.constants.AddressZero
      );
      await sendTx.wait();

      spinner.stop();
      console.log(`\n✅ Message sent, transaction hash: ${sendTx.hash}. \n\nMessage details:`);


      spinner.start();
      console.log("\n Checking if message received...")
      const receiverContract: BasicMessageReceiver =
      BasicMessageReceiver__factory.connect(taskArgs.receiver, deployer);

      const receivedMessage =  await receiverContract.getLatestMessageDetails()
      spinner.stop();

      console.log("\n Received message:  ", receivedMessage) // TODO@zeuslawyer resume here and prettify logs.
    }
  );
