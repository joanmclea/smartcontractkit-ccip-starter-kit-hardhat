import { ethers } from "ethers";

import {Client} from "../../typechain-types/artifacts/@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient";

// export type EVMTokenAmountStruct = {
//   token: string | undefined;
//   amount: string | number | undefined;
// };

// export type EVM2AnyMessageStruct = {
//   receiver: string;
//   data: string;
//   tokenAmounts: EVMTokenAmountStruct[];
//   feeToken: string;
//   extraArgs: string;
// };

export function makeEVMToAnyMessage(
  message?: Partial<Client.EVM2AnyMessageStruct>
): Client.EVM2AnyMessageStruct {

  const decoder = ethers.utils.defaultAbiCoder;
  // TODO @zeuslawyer resume here
  const ADDRESS_ZERO = ethers.constants.AddressZero;
  const receiver = message?.receiver || decoder.encode(["address"], [ADDRESS_ZERO]);
  const data = message?.data || decoder.encode(["string"], ["Hello World"]);
  const tokenAmounts = message?.tokenAmounts || [
    {
      token: ADDRESS_ZERO,
      amount: "100",
    },
  ];
  const feeToken = message?.feeToken || ADDRESS_ZERO;
  const extraArgs = message?.extraArgs || "0x97a657c9";
  return {
    receiver,
    data,
    tokenAmounts,
    feeToken,
    extraArgs,
  };
}
