import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { MockCCIPRouter, MockCCIPRouter__factory } from "../../typechain-types";
import { Spinner } from "../../utils/spinner";

import { buildEVM2AnyMessage } from "./localdev-utils";

task(
  "mock-deploy-router",
  "Deploys the Mock CCIP Router smart contract"
).setAction(async (_: TaskArguments, hre: HardhatRuntimeEnvironment) => {
  if (hre.network.name !== "localhost") {
    throw new Error(
      `This task can only be run on a local hardhat node running on "localhost". Current network is '${hre.network.name}'.`
    );
  }

  const spinner: Spinner = new Spinner();
  const CONTRACT_NAME = "MockCCIPRouter";

  console.log(
    `\ndeploying the ${CONTRACT_NAME} Contract to the ${hre.network.name} development chain locally.`
  );
  spinner.start();

  const mockCCIPRouterFactory: MockCCIPRouter__factory =
    await hre.ethers.getContractFactory(CONTRACT_NAME);

  const mockCCIPRouter: MockCCIPRouter = await mockCCIPRouterFactory.deploy();
  await mockCCIPRouter.deployed();

  const deployer = await mockCCIPRouter.test_owner();

  spinner.stop();
  console.log(
    `\n✅ ${CONTRACT_NAME} deployed at address ${mockCCIPRouter.address} on ${hre.network.name} blockchain using address ${deployer}`
  );

});
