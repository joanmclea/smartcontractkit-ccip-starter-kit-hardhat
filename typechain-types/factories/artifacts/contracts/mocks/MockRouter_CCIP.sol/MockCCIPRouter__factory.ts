/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  MockCCIPRouter,
  MockCCIPRouterInterface,
} from "../../../../../artifacts/contracts/mocks/MockRouter_CCIP.sol/MockCCIPRouter";

const _abi = [
  {
    inputs: [],
    name: "InsufficientFeeTokenAmount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encodedAddress",
        type: "bytes",
      },
    ],
    name: "InvalidAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidExtraArgsTag",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidMsgValue",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyOffRamp",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "error",
        type: "bytes",
      },
    ],
    name: "ReceiverError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "destChainSelector",
        type: "uint64",
      },
    ],
    name: "UnsupportedDestinationChain",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "messageId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint64",
        name: "sourceChainSelector",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "address",
        name: "offRamp",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "calldataHash",
        type: "bytes32",
      },
    ],
    name: "MessageExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "retData",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gasUsed",
        type: "uint256",
      },
    ],
    name: "MsgExecuted",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_GAS_LIMIT",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "GAS_FOR_CALL_EXACT_CHECK",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "receiver",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "tokenAmounts",
            type: "tuple[]",
          },
          {
            internalType: "address",
            name: "feeToken",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "extraArgs",
            type: "bytes",
          },
        ],
        internalType: "struct Client.EVM2AnyMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "ccipSend",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "receiver",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "tokenAmounts",
            type: "tuple[]",
          },
          {
            internalType: "address",
            name: "feeToken",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "extraArgs",
            type: "bytes",
          },
        ],
        internalType: "struct Client.EVM2AnyMessage",
        name: "",
        type: "tuple",
      },
    ],
    name: "getFee",
    outputs: [
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    name: "getOnRamp",
    outputs: [
      {
        internalType: "address",
        name: "onRampAddress",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    name: "getSupportedTokens",
    outputs: [
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    name: "isChainSupported",
    outputs: [
      {
        internalType: "bool",
        name: "supported",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isOffRamp",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "sender",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "destTokenAmounts",
            type: "tuple[]",
          },
        ],
        internalType: "struct Client.Any2EVMMessage",
        name: "message",
        type: "tuple",
      },
      {
        internalType: "uint16",
        name: "gasForCallExactCheck",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "gasLimit",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "routeMessage",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "retData",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "gasUsed",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061256b806100206000396000f3fe6080604052600436106100865760003560e01c8063a48a905811610059578063a48a905814610174578063a8d87a3b146101b1578063d6be695a146101ee578063ee18e0d314610219578063fbca3b741461024457610086565b806320487ded1461008b5780633cf97983146100c857806383826b2b1461010757806396f4e9f914610144575b600080fd5b34801561009757600080fd5b506100b260048036038101906100ad9190611345565b610281565b6040516100bf91906113b0565b60405180910390f35b3480156100d457600080fd5b506100ef60048036038101906100ea9190611429565b610289565b6040516100fe93929190611546565b60405180910390f35b34801561011357600080fd5b5061012e60048036038101906101299190611584565b6102b4565b60405161013b91906115c4565b60405180910390f35b61015e600480360381019061015991906115fe565b6102c0565b60405161016b9190611673565b60405180910390f35b34801561018057600080fd5b5061019b6004803603810190610196919061168e565b610646565b6040516101a891906115c4565b60405180910390f35b3480156101bd57600080fd5b506101d860048036038101906101d3919061168e565b610651565b6040516101e591906116ca565b60405180910390f35b3480156101fa57600080fd5b5061020361065f565b60405161021091906116f4565b60405180910390f35b34801561022557600080fd5b5061022e610666565b60405161023b919061171e565b60405180910390f35b34801561025057600080fd5b5061026b6004803603810190610266919061168e565b61066c565b60405161027891906117f7565b60405180910390f35b600092915050565b6000606060006102a48761029c90611925565b8787876106bf565b9250925092509450945094915050565b60006001905092915050565b600060208280600001906102d49190611947565b905014610328578180600001906102eb9190611947565b6040517f370d875f00000000000000000000000000000000000000000000000000000000815260040161031f9291906119d7565b60405180910390fd5b600082806000019061033a9190611947565b81019061034791906119fb565b905073ffffffffffffffffffffffffffffffffffffffff801681118061036d5750600a81105b156103bf578280600001906103829190611947565b6040517f370d875f0000000000000000000000000000000000000000000000000000000081526004016103b69291906119d7565b60405180910390fd5b600081905060006103de8580608001906103d99190611947565b61087c565b6000015190506000856040516020016103f79190611d1a565b60405160208183030381529060405280519060200120905060006040518060a0016040528083815260200167de41ba4fc9d91ad967ffffffffffffffff1681526020013360405160200161044b91906116ca565b604051602081830303815290604052815260200188806020019061046f9190611947565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505081526020018880604001906104c79190611d3c565b808060200260200160405190810160405280939291908181526020016000905b82821015610517578484839050604002018036038101906105089190611d9f565b815260200190600101906104e7565b5050505050815250905060005b8780604001906105349190611d3c565b90508110156105dd576105cc33868a80604001906105529190611d3c565b8581811061056357610562611dcc565b5b905060400201602001358b806040019061057d9190611d3c565b8681811061058e5761058d611dcc565b5b90506040020160000160208101906105a69190611dfb565b73ffffffffffffffffffffffffffffffffffffffff16610965909392919063ffffffff16565b806105d690611e57565b9050610524565b506000806105ef8361138887896106bf565b50915091508161063657806040517f0a8d6e8c00000000000000000000000000000000000000000000000000000000815260040161062d9190611e9f565b60405180910390fd5b8397505050505050505092915050565b600060019050919050565b600063499602d29050919050565b62030d4081565b61138881565b6060600067ffffffffffffffff81111561068957610688610f63565b5b6040519080825280602002602001820160405280156106b75781602001602082028036833780820191505090505b509050919050565b600060606000808473ffffffffffffffffffffffffffffffffffffffff163b1480610730575061072e7f85572ffb000000000000000000000000000000000000000000000000000000008573ffffffffffffffffffffffffffffffffffffffff166109ee90919063ffffffff16565b155b1561075557600160006040518060200160405280600081525090925092509250610872565b60006385572ffb60e01b886040516024016107709190612069565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090506107dd8186888a6084610a13565b8094508195508296505050507fa8b0355886b5b7a28bb97e4f0a24feb172618407402721c4012d8b7c6433102f84848460405161081c93929190611546565b60405180910390a17f9b877de93ea9895756e337442c657f95a34fc68e7eb988bdfa693d5be83016b688600001518960200151338480519060200120604051610868949392919061208b565b60405180910390a1505b9450945094915050565b610884610ee6565b600083839050036108b257604051806020016040528062030d4067ffffffffffffffff16815250905061095f565b6397a657c960e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168383906108e69190612114565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461093c576040517f5247fdce00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8282600490809261094f9392919061217d565b81019061095c91906121f4565b90505b92915050565b6109e8846323b872dd60e01b85858560405160240161098693929190612221565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610b46565b50505050565b60006109f983610c0d565b8015610a0b5750610a0a8383610c5a565b5b905092915050565b6000606060008361ffff1667ffffffffffffffff811115610a3757610a36610f63565b5b6040519080825280601f01601f191660200182016040528015610a695781602001600182028036833780820191505090505b509150863b610a9c577f0c3b563c0000000000000000000000000000000000000000000000000000000060005260046000fd5b5a85811015610acf577fafa32a2c0000000000000000000000000000000000000000000000000000000060005260046000fd5b85810390508660408204820311610b0a577f37c3be290000000000000000000000000000000000000000000000000000000060005260046000fd5b5a6000808b5160208d0160008d8df194505a810392503d86811115610b2d578690505b808552806000602087013e505050955095509592505050565b6000610ba8826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16610d199092919063ffffffff16565b9050600081511115610c085780806020019051810190610bc89190612284565b610c07576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bfe90612334565b60405180910390fd5b5b505050565b6000610c39827f01ffc9a700000000000000000000000000000000000000000000000000000000610c5a565b8015610c535750610c518263ffffffff60e01b610c5a565b155b9050919050565b6000806301ffc9a760e01b83604051602401610c769190612363565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090506000806000602060008551602087018a617530fa92503d91506000519050828015610d01575060208210155b8015610d0d5750600081115b94505050505092915050565b6060610d288484600085610d31565b90509392505050565b606082471015610d76576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d6d906123f0565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051610d9f919061244c565b60006040518083038185875af1925050503d8060008114610ddc576040519150601f19603f3d011682016040523d82523d6000602084013e610de1565b606091505b5091509150610df287838387610dfe565b92505050949350505050565b60608315610e60576000835103610e5857610e1885610e73565b610e57576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e4e906124af565b60405180910390fd5b5b829050610e6b565b610e6a8383610e96565b5b949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600082511115610ea95781518083602001fd5b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610edd9190612513565b60405180910390fd5b6040518060200160405280600081525090565b6000604051905090565b600080fd5b600080fd5b600067ffffffffffffffff82169050919050565b610f2a81610f0d565b8114610f3557600080fd5b50565b600081359050610f4781610f21565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610f9b82610f52565b810181811067ffffffffffffffff82111715610fba57610fb9610f63565b5b80604052505050565b6000610fcd610ef9565b9050610fd98282610f92565b919050565b600080fd5b600080fd5b600080fd5b600067ffffffffffffffff82111561100857611007610f63565b5b61101182610f52565b9050602081019050919050565b82818337600083830152505050565b600061104061103b84610fed565b610fc3565b90508281526020810184848401111561105c5761105b610fe8565b5b61106784828561101e565b509392505050565b600082601f83011261108457611083610fe3565b5b813561109484826020860161102d565b91505092915050565b600067ffffffffffffffff8211156110b8576110b7610f63565b5b602082029050602081019050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006110f9826110ce565b9050919050565b611109816110ee565b811461111457600080fd5b50565b60008135905061112681611100565b92915050565b6000819050919050565b61113f8161112c565b811461114a57600080fd5b50565b60008135905061115c81611136565b92915050565b60006040828403121561117857611177610f4d565b5b6111826040610fc3565b9050600061119284828501611117565b60008301525060206111a68482850161114d565b60208301525092915050565b60006111c56111c08461109d565b610fc3565b905080838252602082019050604084028301858111156111e8576111e76110c9565b5b835b8181101561121157806111fd8882611162565b8452602084019350506040810190506111ea565b5050509392505050565b600082601f8301126112305761122f610fe3565b5b81356112408482602086016111b2565b91505092915050565b600060a0828403121561125f5761125e610f4d565b5b61126960a0610fc3565b9050600082013567ffffffffffffffff81111561128957611288610fde565b5b6112958482850161106f565b600083015250602082013567ffffffffffffffff8111156112b9576112b8610fde565b5b6112c58482850161106f565b602083015250604082013567ffffffffffffffff8111156112e9576112e8610fde565b5b6112f58482850161121b565b604083015250606061130984828501611117565b606083015250608082013567ffffffffffffffff81111561132d5761132c610fde565b5b6113398482850161106f565b60808301525092915050565b6000806040838503121561135c5761135b610f03565b5b600061136a85828601610f38565b925050602083013567ffffffffffffffff81111561138b5761138a610f08565b5b61139785828601611249565b9150509250929050565b6113aa8161112c565b82525050565b60006020820190506113c560008301846113a1565b92915050565b600080fd5b600060a082840312156113e6576113e56113cb565b5b81905092915050565b600061ffff82169050919050565b611406816113ef565b811461141157600080fd5b50565b600081359050611423816113fd565b92915050565b6000806000806080858703121561144357611442610f03565b5b600085013567ffffffffffffffff81111561146157611460610f08565b5b61146d878288016113d0565b945050602061147e87828801611414565b935050604061148f8782880161114d565b92505060606114a087828801611117565b91505092959194509250565b60008115159050919050565b6114c1816114ac565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b838110156115015780820151818401526020810190506114e6565b60008484015250505050565b6000611518826114c7565b61152281856114d2565b93506115328185602086016114e3565b61153b81610f52565b840191505092915050565b600060608201905061155b60008301866114b8565b818103602083015261156d818561150d565b905061157c60408301846113a1565b949350505050565b6000806040838503121561159b5761159a610f03565b5b60006115a985828601610f38565b92505060206115ba85828601611117565b9150509250929050565b60006020820190506115d960008301846114b8565b92915050565b600060a082840312156115f5576115f46113cb565b5b81905092915050565b6000806040838503121561161557611614610f03565b5b600061162385828601610f38565b925050602083013567ffffffffffffffff81111561164457611643610f08565b5b611650858286016115df565b9150509250929050565b6000819050919050565b61166d8161165a565b82525050565b60006020820190506116886000830184611664565b92915050565b6000602082840312156116a4576116a3610f03565b5b60006116b284828501610f38565b91505092915050565b6116c4816110ee565b82525050565b60006020820190506116df60008301846116bb565b92915050565b6116ee81610f0d565b82525050565b600060208201905061170960008301846116e5565b92915050565b611718816113ef565b82525050565b6000602082019050611733600083018461170f565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61176e816110ee565b82525050565b60006117808383611765565b60208301905092915050565b6000602082019050919050565b60006117a482611739565b6117ae8185611744565b93506117b983611755565b8060005b838110156117ea5781516117d18882611774565b97506117dc8361178c565b9250506001810190506117bd565b5085935050505092915050565b600060208201905081810360008301526118118184611799565b905092915050565b6118228161165a565b811461182d57600080fd5b50565b60008135905061183f81611819565b92915050565b600060a0828403121561185b5761185a610f4d565b5b61186560a0610fc3565b9050600061187584828501611830565b600083015250602061188984828501610f38565b602083015250604082013567ffffffffffffffff8111156118ad576118ac610fde565b5b6118b98482850161106f565b604083015250606082013567ffffffffffffffff8111156118dd576118dc610fde565b5b6118e98482850161106f565b606083015250608082013567ffffffffffffffff81111561190d5761190c610fde565b5b6119198482850161121b565b60808301525092915050565b60006119313683611845565b9050919050565b600080fd5b600080fd5b600080fd5b6000808335600160200384360303811261196457611963611938565b5b80840192508235915067ffffffffffffffff8211156119865761198561193d565b5b6020830192506001820236038313156119a2576119a1611942565b5b509250929050565b60006119b683856114d2565b93506119c383858461101e565b6119cc83610f52565b840190509392505050565b600060208201905081810360008301526119f28184866119aa565b90509392505050565b600060208284031215611a1157611a10610f03565b5b6000611a1f8482850161114d565b91505092915050565b600080fd5b600080fd5b600080fd5b60008083356001602003843603038112611a5457611a53611a32565b5b83810192508235915060208301925067ffffffffffffffff821115611a7c57611a7b611a28565b5b600182023603831315611a9257611a91611a2d565b5b509250929050565b600082825260208201905092915050565b6000611ab78385611a9a565b9350611ac483858461101e565b611acd83610f52565b840190509392505050565b60008083356001602003843603038112611af557611af4611a32565b5b83810192508235915060208301925067ffffffffffffffff821115611b1d57611b1c611a28565b5b604082023603831315611b3357611b32611a2d565b5b509250929050565b600082825260208201905092915050565b6000819050919050565b6000611b656020840184611117565b905092915050565b6000611b7c602084018461114d565b905092915050565b611b8d8161112c565b82525050565b60408201611ba46000830183611b56565b611bb16000850182611765565b50611bbf6020830183611b6d565b611bcc6020850182611b84565b50505050565b6000611bde8383611b93565b60408301905092915050565b600082905092915050565b6000604082019050919050565b6000611c0e8385611b3b565b9350611c1982611b4c565b8060005b85811015611c5257611c2f8284611bea565b611c398882611bd2565b9750611c4483611bf5565b925050600181019050611c1d565b5085925050509392505050565b600060a08301611c726000840184611a37565b8583036000870152611c85838284611aab565b92505050611c966020840184611a37565b8583036020870152611ca9838284611aab565b92505050611cba6040840184611ad8565b8583036040870152611ccd838284611c02565b92505050611cde6060840184611b56565b611ceb6060860182611765565b50611cf96080840184611a37565b8583036080870152611d0c838284611aab565b925050508091505092915050565b60006020820190508181036000830152611d348184611c5f565b905092915050565b60008083356001602003843603038112611d5957611d58611938565b5b80840192508235915067ffffffffffffffff821115611d7b57611d7a61193d565b5b602083019250604082023603831315611d9757611d96611942565b5b509250929050565b600060408284031215611db557611db4610f03565b5b6000611dc384828501611162565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215611e1157611e10610f03565b5b6000611e1f84828501611117565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611e628261112c565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611e9457611e93611e28565b5b600182019050919050565b60006020820190508181036000830152611eb9818461150d565b905092915050565b611eca8161165a565b82525050565b611ed981610f0d565b82525050565b6000611eea826114c7565b611ef48185611a9a565b9350611f048185602086016114e3565b611f0d81610f52565b840191505092915050565b600081519050919050565b6000819050602082019050919050565b604082016000820151611f496000850182611765565b506020820151611f5c6020850182611b84565b50505050565b6000611f6e8383611f33565b60408301905092915050565b6000602082019050919050565b6000611f9282611f18565b611f9c8185611b3b565b9350611fa783611f23565b8060005b83811015611fd8578151611fbf8882611f62565b9750611fca83611f7a565b925050600181019050611fab565b5085935050505092915050565b600060a083016000830151611ffd6000860182611ec1565b5060208301516120106020860182611ed0565b50604083015184820360408601526120288282611edf565b915050606083015184820360608601526120428282611edf565b9150506080830151848203608086015261205c8282611f87565b9150508091505092915050565b600060208201905081810360008301526120838184611fe5565b905092915050565b60006080820190506120a06000830187611664565b6120ad60208301866116e5565b6120ba60408301856116bb565b6120c76060830184611664565b95945050505050565b600082905092915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600082821b905092915050565b600061212083836120d0565b8261212b81356120db565b9250600482101561216b576121667fffffffff0000000000000000000000000000000000000000000000000000000083600403600802612107565b831692505b505092915050565b600080fd5b600080fd5b6000808585111561219157612190612173565b5b838611156121a2576121a1612178565b5b6001850283019150848603905094509492505050565b6000602082840312156121ce576121cd610f4d565b5b6121d86020610fc3565b905060006121e88482850161114d565b60008301525092915050565b60006020828403121561220a57612209610f03565b5b6000612218848285016121b8565b91505092915050565b600060608201905061223660008301866116bb565b61224360208301856116bb565b61225060408301846113a1565b949350505050565b612261816114ac565b811461226c57600080fd5b50565b60008151905061227e81612258565b92915050565b60006020828403121561229a57612299610f03565b5b60006122a88482850161226f565b91505092915050565b600082825260208201905092915050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b600061231e602a836122b1565b9150612329826122c2565b604082019050919050565b6000602082019050818103600083015261234d81612311565b9050919050565b61235d816120db565b82525050565b60006020820190506123786000830184612354565b92915050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b60006123da6026836122b1565b91506123e58261237e565b604082019050919050565b60006020820190508181036000830152612409816123cd565b9050919050565b600081905092915050565b6000612426826114c7565b6124308185612410565b93506124408185602086016114e3565b80840191505092915050565b6000612458828461241b565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b6000612499601d836122b1565b91506124a482612463565b602082019050919050565b600060208201905081810360008301526124c88161248c565b9050919050565b600081519050919050565b60006124e5826124cf565b6124ef81856122b1565b93506124ff8185602086016114e3565b61250881610f52565b840191505092915050565b6000602082019050818103600083015261252d81846124da565b90509291505056fea2646970667358221220be5bb2747f2988f5e71a77b78ed2f4461f9fee524cd5f8c7004c507c97e9a94a64736f6c63430008130033";

type MockCCIPRouterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockCCIPRouterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockCCIPRouter__factory extends ContractFactory {
  constructor(...args: MockCCIPRouterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockCCIPRouter> {
    return super.deploy(overrides || {}) as Promise<MockCCIPRouter>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockCCIPRouter {
    return super.attach(address) as MockCCIPRouter;
  }
  override connect(signer: Signer): MockCCIPRouter__factory {
    return super.connect(signer) as MockCCIPRouter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockCCIPRouterInterface {
    return new utils.Interface(_abi) as MockCCIPRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockCCIPRouter {
    return new Contract(address, _abi, signerOrProvider) as MockCCIPRouter;
  }
}
