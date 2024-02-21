import {expect} from "chai";
import hre from "hardhat";
import {MockCCIPRouter, MockCCIPRouter__factory, MockBnMToken__factory, MockBnMToken} from "../typechain-types";

describe("CCIP Mock Router", function () {
  it("isChainSupported => true", async function () {
    const alwaysTrue = true;

    const mocks = await setup();

    // assert that the value is correct
    expect(await mocks.mockRouter.isChainSupported(0)).to.equal(alwaysTrue);
  });
});

async function setup() {
  await hre.run("compile");

  const routerFactory: MockCCIPRouter__factory = await hre.ethers.getContractFactory("MockCCIPRouter");
  const mockRouter: MockCCIPRouter = await routerFactory.deploy();
  await mockRouter.deployed();

  const mockBnMContractFactory: MockBnMToken__factory = await hre.ethers.getContractFactory("MockBnMToken");
  const mockBnMToken: MockBnMToken = await mockBnMContractFactory.deploy();
  await mockBnMToken.deployed();

  return {mockRouter, mockBnMToken};
}
