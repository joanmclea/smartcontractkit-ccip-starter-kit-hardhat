import {ethers} from "ethers";
import fs from "fs";
import path from "path";
import {getProviderRpcUrl} from "../utils";

import {Client} from "../../typechain-types/IRouterClient";
import * as ReceiverInterface from "../../typechain-types/artifacts/@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IAny2EVMMessageReceiver";

const EVM_EXTRA_ARGS_V1_TAG_FUNCTION_SELECTOR = "0x97a657c9"; // 4bytes. See CCIP Client.sol
const NOTES_PATH = path.resolve(__dirname, "../../", "mocks.env");

type MessageContents = {
  receiver: string;
  data: string | ethers.utils.BytesLike;
  tokenAmounts: {token: string; amount: string}[] | undefined;
  feeToken: string | undefined;
};
export function buildEVM2AnyMessage(message: MessageContents): Client.EVM2AnyMessageStruct {
  const abiCoder = ethers.utils.defaultAbiCoder;
  const ADDRESS_ZERO = ethers.constants.AddressZero;

  const receiver = message?.receiver
    ? abiCoder.encode(["address"], [message.receiver])
    : abiCoder.encode(["address"], [ADDRESS_ZERO]);

  const data =
    message.data && message.data != ""
      ? abiCoder.encode(["string"], [message.data])
      : // Programmable Token Transfer contract expects string not bytes in ccipSend()
        abiCoder.encode(["string"], [""]);

  const tokenAmounts = message?.tokenAmounts?.length
    ? message?.tokenAmounts
    : [
        {
          token: ADDRESS_ZERO,
          amount: 0,
        },
      ];
  const feeToken = message.feeToken || ADDRESS_ZERO;

  const gasLimit = message.data ? 200_000 : 0; // defaults to gas limit 0, on assumption that not sending  data
  const extraArgs = abiCoder.encode(["uint256"], [gasLimit]);

  const taggedEncodedExtraArgs = EVM_EXTRA_ARGS_V1_TAG_FUNCTION_SELECTOR + extraArgs.slice(2);

  return {
    receiver,
    data,
    tokenAmounts,
    feeToken,
    extraArgs: taggedEncodedExtraArgs,
  };
}

function buildAny2EvmMessage(): ReceiverInterface.Client.Any2EVMMessageStruct {
  // TODO @zeuslawyer is this needed?
  return {
    messageId: ethers.constants.HashZero,
    sourceChainSelector: 0,
    sender: ethers.constants.HashZero,
    data: ethers.constants.HashZero,
    destTokenAmounts: [],
  };
}

/**
 * @notice This function reads the mocks.env file returns the data as JSON.
 * The data in notes.env must be in JSON format.
 * @returns {any} JSON object
 */
export function readMocksDoc(): any {
  if (fs.existsSync(NOTES_PATH)) {
  } else {
    // Create the file if it doesn't exist
    console.log("\n⚠️ Config details (gitignored) stored at", NOTES_PATH);
    fs.writeFileSync(NOTES_PATH, JSON.stringify({}));
  }

  let fileDataStr: string = fs.readFileSync(NOTES_PATH).toString();

  if (fileDataStr.length === 0) {
    console.log("\n⚠️  notes.env file is empty. File expected to contain JSON data....");
    return;
  }
  return JSON.parse(fileDataStr);
}

// typescript function that takes in an object with a key of string and values of string
/**
 * @notice This function writes the data to the mocks.env file.
 * @param {any} JSON data
 */
export function writeMocksDoc(data: {[key: string]: string}): void {
  let currentContents = readMocksDoc();
  let updatedContents = {...currentContents, ...data};
  return fs.writeFileSync(NOTES_PATH, JSON.stringify(updatedContents, null, 2));
}

export async function addressIsContract(address: string, network = "localhost"): Promise<boolean> {
  const provider = new ethers.providers.JsonRpcProvider(getProviderRpcUrl(network));
  console.log(provider.connection.url);
  const code = await provider.getCode(address);

  return code !== "0x";
}
