import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { Spinner } from "../../utils/spinner";
import { BasicMessageSender__factory , BasicMessageReceiver__factory, CCIPReceiver__factory } from "../../typechain-types";

task(`mock-deploy-client`, `Deploys your sender smart contract to localhost`)
  .addParam(
    "mockrouter",
    "The address of the Router contract on your stand-alone Hardhat node"
  )
  .addParam("contractName", "The Contract name of the CCIP sender contract")
  .setAction(
    async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      if (hre.network.name !== "localhost") {
        throw new Error(
          `This task can only be run on a local hardhat node running on "localhost". Current network is '${hre.network.name}'.`
        );
      }
      const routerAddress = taskArguments.mockrouter;
      const LINK_ZERO_ADDRESS = hre.ethers.constants.AddressZero;
      const contractName = taskArguments.contractName;
      const [deployer1] = await hre.ethers.getSigners();

      const spinner: Spinner = new Spinner();

      console.log(
        `\nℹ️  Attempting to deploy ${contractName} on the ${hre.network.name} blockchain using ${deployer1.address} address, with the Router address ${routerAddress}.`
      );
      spinner.start();

      const contractFactory : CCIPReceiver__factory = await hre.ethers.getContractFactory(contractName)
      let contract
      
      if (contractName === "BasicMessageSender") {
        contract = await (contractFactory  as  BasicMessageSender__factory).deploy(routerAddress, LINK_ZERO_ADDRESS);
      } else {
        contract = await  (contractFactory as  BasicMessageReceiver__factory ).deploy(routerAddress);
      }
      await contract.deployed();

      spinner.stop();
      console.log(
        `\n✅ ${contractName} deployed at address ${contract.address} on ${hre.network.name} blockchain`
      );
    }
  );
