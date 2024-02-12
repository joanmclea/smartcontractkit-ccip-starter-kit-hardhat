import { task, subtask } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import {
  MockCCIPRouter,
  MockCCIPRouter__factory,
  MockBnMToken__factory,
  MockBnMToken,
} from "../../typechain-types";
import { Spinner } from "../../utils/spinner";
import { writeNotesDoc } from "./mock-utils";

let ROUTER_ADDRESS: string;
let BNM_ADDRESS: string;

task(
  "setup-mocks",
  "Deploys the Mock CCIP Router & the Mock BnM ERC20 Token"
).setAction(async (_: TaskArguments, hre: HardhatRuntimeEnvironment) => {
  if (hre.network.name !== "localhost") {
    throw new Error(
      `This task can only be run on a local hardhat node running on "localhost". Current network is '${hre.network.name}'.`
    );
  }

  // Subtasks at bottom of file.
  await hre.run("mock-deploy-router");
  await hre.run("mock-deploy-bnmtoken");

  if (!ROUTER_ADDRESS || !BNM_ADDRESS) {
    throw new Error(
      `Address for the Mock CCIP Router or the Mock BnM ERC20 Token is missing.`
    );
  }

  writeNotesDoc({
    router: ROUTER_ADDRESS,
    bnmToken: BNM_ADDRESS,
  });
});

subtask("mock-deploy-router", "Deploys the Mock CCIP Router ").setAction(
  async (_: TaskArguments, hre: HardhatRuntimeEnvironment) => {
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

    ROUTER_ADDRESS = mockCCIPRouter.address;
    console.log(
      `\n✅ ${ROUTER_NAME} deployed at address ${ROUTER_ADDRESS} on ${hre.network.name} blockchain using address ${deployer}`
    );
  }
);

subtask(
  "mock-deploy-bnmtoken",
  "Deploy the Mock BnM ERC20 Token and grant permissions and approvals"
).setAction(async (_: TaskArguments, hre: HardhatRuntimeEnvironment) => {
  const spinner: Spinner = new Spinner();

  console.log(
    "\n2️⃣  Deploying the Mock Burn&Mint ERC20 Token for CCIP transfers..."
  );
  const MOCK_BnM_NAME = "MockBnMToken";

  const mockBnMContractFactory: MockBnMToken__factory =
    await hre.ethers.getContractFactory(MOCK_BnM_NAME);

  const mockBnMToken: MockBnMToken = await mockBnMContractFactory.deploy();
  await mockBnMToken.deployed();

  BNM_ADDRESS = mockBnMToken.address;
  const tokenOwner = await mockBnMToken.owner(); // same as deployer
  console.log(
    `\n✅ ${MOCK_BnM_NAME} deployed at address ${BNM_ADDRESS} on ${hre.network.name} blockchain. Owner is ${tokenOwner}`
  );

  // grant deployer minter and burner permission.
  await mockBnMToken.grantMintAndBurnRoles(tokenOwner);
  const startingBal = await mockBnMToken.balanceOf(tokenOwner);
  
  await mockBnMToken.mint(
    tokenOwner,
    hre.ethers.utils.parseUnits("100", "ether")
  );
  const endingBal = await mockBnMToken.balanceOf(tokenOwner);
  console.log(
    `\n✅ Minted ${hre.ethers.utils.formatUnits(
      endingBal.sub(startingBal),
      "ether"
    )} BnM tokens to ${tokenOwner} `
  );

  // console.log(
  //   `\n3️⃣ Approving ${ROUTER_ADDRESS} to spend ${hre.ethers.utils.formatUnits(
  //     "100",
  //     "ether"
  //   )} of ${tokenOwner}'s tokens...`
  // );
  // await mockBnMToken.approve(
  //   ROUTER_ADDRESS,
  //   hre.ethers.utils.parseUnits("100", "ether")
  // );
  // const allowance = await mockBnMToken.allowance(tokenOwner, ROUTER_ADDRESS);

  // console.log(
  //   `\n✅ Approved ${ROUTER_ADDRESS} to spend ${hre.ethers.utils.formatUnits(allowance, "ether")} BnM tokens on behalf of ${tokenOwner}`
  // );
  spinner.stop();
});
