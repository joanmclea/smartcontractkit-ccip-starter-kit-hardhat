import { ethers } from "ethers";
import fs from "fs";
import path from "path";

import { Client } from "../../typechain-types/IRouterClient";
import * as ReceiverInterface from "../../typechain-types/artifacts/@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IAny2EVMMessageReceiver";

const EVM_EXTRA_ARGS_V1_TAG = "0x97a657c9";
const NOTES_PATH = path.resolve(__dirname, "../../", "notes.env");

export function buildEVM2AnyMessage(
  message?: Partial<Client.EVM2AnyMessageStruct>
): Client.EVM2AnyMessageStruct {
  const abiCoder = ethers.utils.defaultAbiCoder;
  const ADDRESS_ZERO = ethers.constants.AddressZero;
  const receiver =
    message?.receiver || abiCoder.encode(["address"], [ADDRESS_ZERO]);
  const data = message?.data || abiCoder.encode(["string"], ["Hello World"]);
  const tokenAmounts = message?.tokenAmounts || [
    {
      token: ADDRESS_ZERO,
      amount: "100",
    },
  ];
  const feeToken = message?.feeToken || ADDRESS_ZERO;
  const extraArgs = message?.extraArgs || EVM_EXTRA_ARGS_V1_TAG;
  return {
    receiver,
    data,
    tokenAmounts,
    feeToken,
    extraArgs,
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
 * @notice This function reads the notes.env file returns the data as JSON.
 * The data in notes.env must be in JSON format.
 * @returns {any} JSON object
 */
export function readNotesDoc(): any {
  if (fs.existsSync(NOTES_PATH)) {
  } else {
    // Create the file if it doesn't exist
    console.log("\n⚠️ Config details (gitignored) stored at", NOTES_PATH);
    fs.writeFileSync(NOTES_PATH, JSON.stringify({}));
  }

  let fileDataStr: string = fs.readFileSync(NOTES_PATH).toString();

  if (fileDataStr.length === 0) {
    console.log(
      "\n⚠️  notes.env file is empty. File expected to contain JSON data...."
    );
    return;
  }
  return JSON.parse(fileDataStr);
}

// typescript function that takes in an object with a key of string and values of string
/**
 * @notice This function writes the data to the notes.env file.
 * @param {any} JSON data
 */
export function writeNotesDoc(data: { [key: string]: string }): void {
  let currentContents = readNotesDoc();
  let updatedContents = { ...currentContents, ...data };
  return fs.writeFileSync(NOTES_PATH, JSON.stringify(updatedContents, null, 2));
}
