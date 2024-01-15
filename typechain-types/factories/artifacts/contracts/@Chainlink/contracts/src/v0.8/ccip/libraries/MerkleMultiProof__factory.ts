/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../../../../common";
import type {
  MerkleMultiProof,
  MerkleMultiProofInterface,
} from "../../../../../../../../../artifacts/contracts/@Chainlink/contracts/src/v0.8/ccip/libraries/MerkleMultiProof";

const _abi = [
  {
    inputs: [],
    name: "InvalidProof",
    type: "error",
  },
  {
    inputs: [],
    name: "LeavesCannotBeEmpty",
    type: "error",
  },
] as const;

const _bytecode =
  "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212205ec534a136e2f76ddde279535b56561484b0667a433485575352a044045f7a3a64736f6c63430008130033";

type MerkleMultiProofConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MerkleMultiProofConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MerkleMultiProof__factory extends ContractFactory {
  constructor(...args: MerkleMultiProofConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MerkleMultiProof> {
    return super.deploy(overrides || {}) as Promise<MerkleMultiProof>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MerkleMultiProof {
    return super.attach(address) as MerkleMultiProof;
  }
  override connect(signer: Signer): MerkleMultiProof__factory {
    return super.connect(signer) as MerkleMultiProof__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MerkleMultiProofInterface {
    return new utils.Interface(_abi) as MerkleMultiProofInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MerkleMultiProof {
    return new Contract(address, _abi, signerOrProvider) as MerkleMultiProof;
  }
}
