import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { getPrivateKey, getProviderRpcUrl, getRouterConfig } from "./utils";
import { Wallet, providers } from "ethers";
import {
  IRouterClient,
  IRouterClient__factory,
  ProgrammableTokenTransfers,
  ProgrammableTokenTransfers__factory,
  IERC20,
  IERC20__factory,
} from "../typechain-types";
import { Spinner } from "../utils/spinner";

task(
  `send-token-and-data`,
  `Sends token and data using ProgrammableTokenTransfers.sol`
)
  .addParam(
    `sourceBlockchain`,
    `The name of the source blockchain (for example ethereumSepolia)`
  )
  .addParam(
    `destinationBlockchain`,
    `The name of the destination blockchain (for example polygonMumbai)`
  )
  .addParam(
    `sender`,
    `The address of the sender ProgrammableTokenTransfers.sol on the source blockchain`
  )
  .addParam(
    `receiver`,
    `The address of the receiver ProgrammableTokenTransfers.sol on the destination blockchain`
  )
  .addParam(
    `message`,
    `The string message to be sent (for example "Hello, World")`
  )
  .addParam(
    `tokenAddress`,
    `The address of a token to be sent on the source blockchain`
  )
  .addParam(`amount`, `The amount of token to be sent`)
  .addOptionalParam(
    "router",
    `The address of the Router contract on the source blockchain`
  )
  .setAction(async (taskArguments: TaskArguments, hre) => {
    const {
      sourceBlockchain,
      sender,
      destinationBlockchain,
      receiver,
      message,
      tokenAddress,
      amount,
    } = taskArguments;

    let privateKey,
      sourceProvider,
      sourceRpcProviderUrl,
      usingMock = false;

    if (
      sourceBlockchain === "localhost" &&
      sourceBlockchain === destinationBlockchain
    ) {
      console.log("\nℹ️ Setting up to run mocks on local devnet...");
      usingMock = true;
      privateKey =
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Hardhat default Account #1.
      sourceProvider = new providers.JsonRpcProvider(
        getProviderRpcUrl(sourceBlockchain)
      );

      if (!taskArguments.router) {
        throw Error(
          "To run on local devnet, you must provide the mock CCIP router's address."
        );
      }
    } else {
      privateKey = getPrivateKey();
      sourceRpcProviderUrl = getProviderRpcUrl(sourceBlockchain);
      sourceProvider = new providers.JsonRpcProvider(sourceRpcProviderUrl);
    }

    const wallet = new Wallet(privateKey);
    const signer = wallet.connect(sourceProvider);

    const senderContract: ProgrammableTokenTransfers =
      ProgrammableTokenTransfers__factory.connect(sender, signer);

    const routerAddress = taskArguments.router
      ? taskArguments.router
      : getRouterConfig(sourceBlockchain).address;
    const destinationChainSelector = getRouterConfig(
      destinationBlockchain
    ).chainSelector;

    const router: IRouterClient = IRouterClient__factory.connect(
      routerAddress,
      signer
    );
    const supportedTokens = await router.getSupportedTokens(
      destinationChainSelector
    );

    if (!usingMock && !supportedTokens.includes(tokenAddress)) {
      throw Error(
        `Token address ${tokenAddress} not in the list of supportedTokens ${supportedTokens}`
      );
    }

    const spinner: Spinner = new Spinner();

    // tokenToSend will only be the same as received token address
    // when using the mock as both run on the same local devnet.
    const tokenToSend: IERC20 = IERC20__factory.connect(tokenAddress, signer);
    let receiverStartingBal;
    if (usingMock) {
      receiverStartingBal = await tokenToSend.balanceOf(receiver);
      const senderStartingBal = await tokenToSend.balanceOf(sender);
      if (senderStartingBal.eq(0)) {
        console.log(
          "\n⚠️ Sender has 0 of the transfer tokens...funding sender... "
        );
        await tokenToSend.transfer(sender, amount);
        console.log(
          "\nℹ️💰Funding complete. Sender's balance is: ",
          await tokenToSend.balanceOf(sender).toString()
        );
      }

      console.log(
        `ℹ️  Attempting to approve Router smart contract (${routerAddress}) to spend ${amount} tokens on behalf of ${signer.address}`
      );

      const approvalTx = await tokenToSend.approve(routerAddress, amount);
      await approvalTx.wait();

      console.log(
        `✅ Approved successfully, transaction hash: ${approvalTx.hash}`
      );
    }

    console.log(
      `ℹ️  Attempting to call the sendMessage function of ProgrammableTokenTransfers smart contract on the ${sourceBlockchain} blockchain using ${signer.address} address`
    );
    spinner.start();

    const tx = await senderContract.sendMessage(
      destinationChainSelector,
      receiver,
      message,
      tokenAddress,
      amount
    );

    await tx.wait();

    spinner.stop();
    console.log(`✅ Message sent, transaction hash: ${tx.hash}`);

    if (usingMock) {
      const updatedBal = await tokenToSend.balanceOf(receiver);
      console.log(
        `\nℹ️ Receiver's ${receiver}  balance updated from ${receiverStartingBal} to ${updatedBal} units of MockBnMToken on ${destinationBlockchain} blockchain`
      );

      console.log(
        await hre.run("get-received-message-details", {
          contractAddress: receiver,
          blockchain: destinationBlockchain
        })
      );
    }
  });

task(
  `get-received-message-details`,
  `Gets details of any CCIP message received by the ProgrammableTokenTransfers.sol smart contract`
)
  .addParam(
    `contractAddress`,
    `The address of the ProgrammableTokenTransfers.sol smart contract`
  )
  .addParam(
    `blockchain`,
    `The name of the blockchain where the contract is (for example ethereumSepolia)`
  )
  .setAction(async (taskArguments: TaskArguments) => {
    const { contractAddress, blockchain } = taskArguments;

    const rpcProviderUrl = getProviderRpcUrl(blockchain);
    const provider = new providers.JsonRpcProvider(rpcProviderUrl);

    const receiverContract: ProgrammableTokenTransfers =
      ProgrammableTokenTransfers__factory.connect(contractAddress, provider);

    console.log("Received Message: \n", await receiverContract.getLastReceivedMessageDetails());
  });
