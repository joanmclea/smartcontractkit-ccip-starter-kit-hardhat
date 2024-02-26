import {expect} from "chai";
import hre from "hardhat";
import {Event} from "ethers";
const {loadFixture, mine, time} = require("@nomicfoundation/hardhat-network-helpers");

import {
  MockCCIPRouter,
  MockCCIPRouter__factory,
  MockBnMToken__factory,
  MockBnMToken,
  ProgrammableTokenTransfers,
  ProgrammableTokenTransfers__factory,
} from "../typechain-types";
import {buildEVM2AnyMessage} from "../tasks/ccip-mock/mock-utils";

describe("CCIP Mock Router", function () {
  async function setupMocksFixture() {
    const mocks = await setup();
    return mocks;
  }

  it("EOA to EOA: Token Only => OK", async function () {
    const destinationChainSelector = 0;
    const tokenAmountUnits = "987";

    const {mockRouter, mockBnMToken, wallet2}: SetupMocksFixture = await loadFixture(setupMocksFixture);
    // approve Router directly for EOA initiated CCIP sends
    await mockBnMToken.approve(mockRouter.address, 1000);

    const receiverStartBal = await mockBnMToken.balanceOf(wallet2);

    const message = buildEVM2AnyMessage({
      receiver: wallet2,
      data: "",
      tokenAmounts: [{token: mockBnMToken.address, amount: tokenAmountUnits}],
      feeToken: undefined,
    });

    const sendTx = await mockRouter.ccipSend(destinationChainSelector, message);
    const receipt = await sendTx.wait();
    await time.increase(600); //10 minute jump

    const receiverUpdatedBal = await mockBnMToken.balanceOf(wallet2);
    expect(receiverUpdatedBal.sub(receiverStartBal).toString()).to.equal(tokenAmountUnits);
  });

  it("EOA to Contract: Token + Message => OK", async function () {
    const destinationChainSelector = 0;
    const tokenAmountUnits = "123";
    const message = "Hello, CCIP";
    const anyValPredicate = () => true; // https://hardhat.org/hardhat-chai-matchers/docs/overview#events-with-arguments

    const {
      mockRouter,
      receiver,
      mockBnMToken,
      deployer: sender,
    }: SetupMocksFixture = await loadFixture(setupMocksFixture);

    // approve Router directly for EOA initiated CCIP sends
    await mockBnMToken.approve(mockRouter.address, 1000);

    const receiverStartBal = await mockBnMToken.balanceOf(receiver.address);

    const messageWithTokenAndData = buildEVM2AnyMessage({
      receiver: receiver.address,
      data: message,
      tokenAmounts: [{token: mockBnMToken.address, amount: tokenAmountUnits}],
      feeToken: undefined,
    });

    await expect(mockRouter.ccipSend(destinationChainSelector, messageWithTokenAndData))
      .to.emit(mockRouter, "MsgExecuted")
      .withArgs(true, "0x", anyValPredicate);

    const {
      messageId,
      sourceChainSelector,
      sender: senderAddress,
      message: messageText,
      token: tokenAddress,
      amount: tokenUnits,
    } = await receiver.getLastReceivedMessageDetails();

    expect(sourceChainSelector.toString()).to.equal("16015286601757825753"); // Hard coded in Mock Router
    expect(senderAddress).to.equal(sender); // In this test, message and token sent by EOA. Can be tested with Programmable Transfer sender contract too.
    expect(messageText).to.equal(message);
    expect(tokenAddress).to.equal(mockBnMToken.address);
    expect(tokenUnits.toString()).to.equal(tokenAmountUnits);
    await expect(await mockBnMToken.balanceOf(receiver.address)).to.equal(receiverStartBal.add(tokenAmountUnits));
  });

  it("Contract to Contract: Message + Token => OK", async function () {
    const destinationChainSelector = 0;
    const tokenAmountUnits = "987";
    const message = "Contract-To-Contract!";
    const anyValPredicate = () => true; // https://hardhat.org/hardhat-chai-matchers/docs/overview#events-with-arguments

    const {mockRouter, sender, receiver, mockBnMToken}: SetupMocksFixture = await loadFixture(setupMocksFixture);

    // approve CCIP Client Sender contract for Contract-initiated CCIP sends
    await mockBnMToken.transfer(sender.address, 1000);

    const receiverStartBal = await mockBnMToken.balanceOf(receiver.address);

    await expect(
      await sender.sendMessage(
        destinationChainSelector,
        receiver.address,
        message,
        mockBnMToken.address,
        tokenAmountUnits
      )
    )
      .to.emit(mockRouter, "MsgExecuted")
      .withArgs(true, "0x", anyValPredicate);

    const {
      messageId,
      sourceChainSelector,
      sender: senderAddress,
      message: messageText,
      token: tokenAddress,
      amount: tokenUnits,
    } = await receiver.getLastReceivedMessageDetails();

    expect(sourceChainSelector.toString()).to.equal("16015286601757825753"); // Hard coded in Mock Router
    expect(senderAddress).to.equal(sender.address); // In this test, message and token sent by EOA. Can be tested with Programmable Transfer sender contract too.
    expect(messageText).to.equal(message);
    expect(tokenAddress).to.equal(mockBnMToken.address);
    expect(tokenUnits.toString()).to.equal(tokenAmountUnits);

    await expect(await mockBnMToken.balanceOf(receiver.address)).to.equal(receiverStartBal.add(tokenAmountUnits));
  });

  it.todo = function todo(descString: string, callback: Function) {};
  it.todo("EOA to Contract: Token only => OK", async function () {});
  it.todo("Contract to Contract: Token only => OK", async function () {});
  it.todo("Contract to Contract: Message only => OK", async function () {});
});

type SetupMocksFixture = {
  mockRouter: MockCCIPRouter;
  mockBnMToken: MockBnMToken;
  receiver: ProgrammableTokenTransfers;
  sender: ProgrammableTokenTransfers;
  deployerUpdatedBal: string;
  deployer: string;
  wallet2: string;
};

async function setup(): Promise<SetupMocksFixture> {
  await hre.run("compile");

  const [deployer, wallet2] = await hre.ethers.getSigners();

  const routerFactory: MockCCIPRouter__factory = await hre.ethers.getContractFactory("MockCCIPRouter");
  const mockRouter: MockCCIPRouter = await routerFactory.deploy();
  await mockRouter.deployed();

  const mockBnMContractFactory: MockBnMToken__factory = await hre.ethers.getContractFactory("MockBnMToken");
  const mockBnMToken: MockBnMToken = await mockBnMContractFactory.deploy();
  await mockBnMToken.deployed();

  await mockBnMToken.grantMintAndBurnRoles(deployer.address);
  const deployerStartBal = await mockBnMToken.balanceOf(deployer.address);

  const totalTestBudget = hre.ethers.utils.parseUnits("1200", "ether");

  await mockBnMToken.mint(deployer.address, totalTestBudget);
  const deployerUpdatedBal = await mockBnMToken.balanceOf(deployer.address);
  console.log(
    `\nℹ️ (Test Setup): Minted ${hre.ethers.utils.formatUnits(
      deployerUpdatedBal.sub(deployerStartBal),
      "ether"
    )} BnM tokens to deployer ${deployer.address} `
  );

  const senderFactory: ProgrammableTokenTransfers__factory = await hre.ethers.getContractFactory(
    "ProgrammableTokenTransfers"
  );
  const receiverFactory: ProgrammableTokenTransfers__factory = await hre.ethers.getContractFactory(
    "ProgrammableTokenTransfers"
  );

  const senderContract: ProgrammableTokenTransfers = await senderFactory.deploy(mockRouter.address);
  await senderContract.deployed();

  const receiverContract: ProgrammableTokenTransfers = await receiverFactory.deploy(mockRouter.address);
  await receiverContract.deployed();

  console.table({
    router: mockRouter.address,
    token: mockBnMToken.address,
    "sender (contract)": senderContract.address,
    "receiver (contract)": receiverContract.address,
    "sender (EOA)": deployer.address,
    "receiver (EOA)": wallet2.address,
  });

  return {
    mockRouter,
    mockBnMToken,
    receiver: receiverContract,
    sender: senderContract,
    deployerUpdatedBal: deployerUpdatedBal.toString(),
    deployer: deployer.address,
    wallet2: wallet2.address,
  };
}
