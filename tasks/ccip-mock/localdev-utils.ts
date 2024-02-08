import { ethers } from "ethers";

import {Client as RouterClient} from "../../typechain-types/IRouterClient";
import * as ReceiverInterface from "../../typechain-types/artifacts/@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IAny2EVMMessageReceiver"


const EVM_EXTRA_ARGS_V1_TAG = "0x97a657c9";

export function buildEVM2AnyMessage(
  message?: Partial<RouterClient.EVM2AnyMessageStruct>
): RouterClient.EVM2AnyMessageStruct   {

  const abiCoder = ethers.utils.defaultAbiCoder;
  const ADDRESS_ZERO = ethers.constants.AddressZero;
  const receiver = message?.receiver || abiCoder.encode(["address"], [ADDRESS_ZERO]);
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
  // TODO @zeuslawyer
  return {
    messageId: ethers.constants.HashZero,
    sourceChainSelector: 0,
    sender: ethers.constants.HashZero,
    data: ethers.constants.HashZero,
    destTokenAmounts: [],
  };
}
