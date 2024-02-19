import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import {
  ProgrammableTokenTransfers,
  ProgrammableTokenTransfers__factory,
} from "../../typechain-types";
import { writeMocksDoc } from "./mock-utils";
import { Spinner } from "../../utils/spinner";

task(
  `mock-deploy-universal-clients`,
  `Deploys the programmable token transfer sender and receiver client contracts`
)
  .addParam(
    "mockrouter",
    "The address of the Router contract on your stand-alone Hardhat node"
  )
  .setAction(
    async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      if (hre.network.name !== "localhost") {
        throw new Error(
          `This task can only be run on a local hardhat node running on "localhost". Current network is '${hre.network.name}'.`
        );
      }

      await hre.run("compile");

      const CONTRACT_NAME = "ProgrammableTokenTransfers";
      const routerAddress: string = taskArguments.mockrouter;
      const [deployer] = await hre.ethers.getSigners();

      const spinner: Spinner = new Spinner();

      console.log(
        `\nℹ️  Attempting to deploy universal (programmable token) clients on the ${hre.network.name} blockchain from wallet address: ${deployer.address}, with the Router address ${routerAddress}.`
      );
      spinner.start();

      const clients = [`${CONTRACT_NAME}-sender`, `${CONTRACT_NAME}-receiver`];

      for (const client of clients) {
        const contractFactory: ProgrammableTokenTransfers__factory =
          await hre.ethers.getContractFactory(CONTRACT_NAME);

        const contract: ProgrammableTokenTransfers =
          await contractFactory.deploy(routerAddress);

        await contract.deployed();
        writeMocksDoc({ [client]: contract.address });
        console.log(
          `\n✅ ${client} deployed at address ${contract.address} on ${hre.network.name} blockchain`
        );
      }

      spinner.stop();
    }
  );
