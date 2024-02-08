import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { MockCCIPRouter, MockCCIPRouter__factory, MockBnMToken__factory, MockBnMToken } from "../../typechain-types";
import { Spinner } from "../../utils/spinner";

task(
  "mock-deploy-contracts",
  "Deploys the Mock CCIP Router and the Mock BnM ERC20 Token"
).setAction(async (_: TaskArguments, hre: HardhatRuntimeEnvironment) => {
  if (hre.network.name !== "localhost") {
    throw new Error(
      `This task can only be run on a local hardhat node running on "localhost". Current network is '${hre.network.name}'.`
    );
  }

  const spinner: Spinner = new Spinner();
  const ROUTER_NAME = "MockCCIPRouter";

  console.log(
    `\n1️⃣  Deploying the ${ROUTER_NAME} Contract to the ${hre.network.name} development chain locally.`
  );
  spinner.start();

  const mockCCIPRouterFactory: MockCCIPRouter__factory =
    await hre.ethers.getContractFactory(ROUTER_NAME);

  const mockCCIPRouter: MockCCIPRouter = await mockCCIPRouterFactory.deploy();
  await mockCCIPRouter.deployed();

  const deployer = await mockCCIPRouter.test_owner();

 
  console.log(
    `\n✅ ${ROUTER_NAME} deployed at address ${mockCCIPRouter.address} on ${hre.network.name} blockchain using address ${deployer}`
  );


console.log("\n2️⃣  Deploying the Mock Burn&Mint ERC20 Token for CCIP transfers...")
const MOCK_BnM_NAME = "MockBnMToken"

const mockBnMContractFactory:MockBnMToken__factory  =
    await hre.ethers.getContractFactory(MOCK_BnM_NAME)

    const mockBnMToken: MockBnMToken = await mockBnMContractFactory.deploy();
    await mockBnMToken.deployed();

  const tokenOwner = await mockBnMToken.owner(); // same as deployer
  console.log(
    `\n✅ ${MOCK_BnM_NAME} deployed at address ${mockBnMToken.address} on ${hre.network.name} blockchain. Owner is ${tokenOwner}`
  );


  spinner.stop();
});
