import {ethers} from "ethers";

export function makeEVMToAnyMessage() {
    const decoder = ethers.utils.defaultAbiCoder;
    const ADDRESS_ZERO = ethers.constants.AddressZero;
    const receiver = decoder.encode(["address"], [ADDRESS_ZERO]);
    const data = decoder.encode(["string"], ["Hello World"]);
    const tokenAmounts = [
      {
        token: ADDRESS_ZERO,
        amount: "100",
      },
    ];
    const feeToken = ADDRESS_ZERO;
    const extraArgs = "0x97a657c9";
    return {
      receiver,
      data,
      tokenAmounts,
      feeToken,
      extraArgs,
    };
  }