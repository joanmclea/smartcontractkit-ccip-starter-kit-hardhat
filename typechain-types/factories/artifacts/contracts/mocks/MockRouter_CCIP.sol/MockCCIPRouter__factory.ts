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
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
  {
    inputs: [],
    name: "test_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550612241806100606000396000f3fe60806040526004361061007b5760003560e01c8063a48a90581161004e578063a48a905814610157578063d6be695a14610194578063ee18e0d3146101bf578063fbca3b74146101ea5761007b565b806320487ded146100805780633cf97983146100bd5780637a8062ee146100fc57806396f4e9f914610127575b600080fd5b34801561008c57600080fd5b506100a760048036038101906100a291906110a7565b610227565b6040516100b49190611112565b60405180910390f35b3480156100c957600080fd5b506100e460048036038101906100df919061118b565b61022f565b6040516100f3939291906112a8565b60405180910390f35b34801561010857600080fd5b5061011161025a565b60405161011e91906112f5565b60405180910390f35b610141600480360381019061013c919061132f565b61027e565b60405161014e91906113a4565b60405180910390f35b34801561016357600080fd5b5061017e600480360381019061017991906113bf565b6105b4565b60405161018b91906113ec565b60405180910390f35b3480156101a057600080fd5b506101a96105bf565b6040516101b69190611416565b60405180910390f35b3480156101cb57600080fd5b506101d46105c6565b6040516101e19190611440565b60405180910390f35b3480156101f657600080fd5b50610211600480360381019061020c91906113bf565b6105cc565b60405161021e9190611519565b60405180910390f35b600092915050565b60006060600061024a8761024290611647565b87878761061f565b9250925092509450945094915050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060208280600001906102929190611669565b9050146102e6578180600001906102a99190611669565b6040517f370d875f0000000000000000000000000000000000000000000000000000000081526004016102dd9291906116f9565b60405180910390fd5b60008280600001906102f89190611669565b810190610305919061171d565b905073ffffffffffffffffffffffffffffffffffffffff801681118061032b5750600a81105b1561037d578280600001906103409190611669565b6040517f370d875f0000000000000000000000000000000000000000000000000000000081526004016103749291906116f9565b60405180910390fd5b6000819050600061039c8580608001906103979190611669565b61070f565b6000015190506000856040516020016103b59190611a3c565b60405160208183030381529060405280519060200120905060006040518060a00160405280838152602001600067ffffffffffffffff1681526020013360405160200161040291906112f5565b60405160208183030381529060405281526020018880602001906104269190611669565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050815260200188806040019061047e9190611a5e565b808060200260200160405190810160405280939291908181526020016000905b828210156104ce578484839050604002018036038101906104bf9190611ac1565b8152602001906001019061049e565b5050505050815250905060005b8780604001906104eb9190611a5e565b90508110156105945761058333868a80604001906105099190611a5e565b8581811061051a57610519611aee565b5b905060400201602001358b80604001906105349190611a5e565b8681811061054557610544611aee565b5b905060400201600001602081019061055d9190611b1d565b73ffffffffffffffffffffffffffffffffffffffff166107f8909392919063ffffffff16565b8061058d90611b79565b90506104db565b506105a381611388858761061f565b505050819550505050505092915050565b600060019050919050565b62030d4081565b61138881565b6060600067ffffffffffffffff8111156105e9576105e8610cc5565b5b6040519080825280602002602001820160405280156106175781602001602082028036833780820191505090505b509050919050565b600060606000806385572ffb60e01b8860405160240161063f9190611d69565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505090506106ac8186888a6084610881565b8094508195508296505050507f9b877de93ea9895756e337442c657f95a34fc68e7eb988bdfa693d5be83016b6886000015189602001513384805190602001206040516106fc9493929190611d8b565b60405180910390a1509450945094915050565b610717610c48565b6000838390500361074557604051806020016040528062030d4067ffffffffffffffff1681525090506107f2565b6397a657c960e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168383906107799190611e14565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146107cf576040517f5247fdce00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b828260049080926107e293929190611e7d565b8101906107ef9190611ef4565b90505b92915050565b61087b846323b872dd60e01b85858560405160240161081993929190611f21565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506109b4565b50505050565b6000606060008361ffff1667ffffffffffffffff8111156108a5576108a4610cc5565b5b6040519080825280601f01601f1916602001820160405280156108d75781602001600182028036833780820191505090505b509150863b61090a577f0c3b563c0000000000000000000000000000000000000000000000000000000060005260046000fd5b5a8581101561093d577fafa32a2c0000000000000000000000000000000000000000000000000000000060005260046000fd5b85810390508660408204820311610978577f37c3be290000000000000000000000000000000000000000000000000000000060005260046000fd5b5a6000808b5160208d0160008d8df194505a810392503d8681111561099b578690505b808552806000602087013e505050955095509592505050565b6000610a16826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff16610a7b9092919063ffffffff16565b9050600081511115610a765780806020019051810190610a369190611f84565b610a75576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6c90612034565b60405180910390fd5b5b505050565b6060610a8a8484600085610a93565b90509392505050565b606082471015610ad8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610acf906120c6565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051610b019190612122565b60006040518083038185875af1925050503d8060008114610b3e576040519150601f19603f3d011682016040523d82523d6000602084013e610b43565b606091505b5091509150610b5487838387610b60565b92505050949350505050565b60608315610bc2576000835103610bba57610b7a85610bd5565b610bb9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bb090612185565b60405180910390fd5b5b829050610bcd565b610bcc8383610bf8565b5b949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600082511115610c0b5781518083602001fd5b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3f91906121e9565b60405180910390fd5b6040518060200160405280600081525090565b6000604051905090565b600080fd5b600080fd5b600067ffffffffffffffff82169050919050565b610c8c81610c6f565b8114610c9757600080fd5b50565b600081359050610ca981610c83565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610cfd82610cb4565b810181811067ffffffffffffffff82111715610d1c57610d1b610cc5565b5b80604052505050565b6000610d2f610c5b565b9050610d3b8282610cf4565b919050565b600080fd5b600080fd5b600080fd5b600067ffffffffffffffff821115610d6a57610d69610cc5565b5b610d7382610cb4565b9050602081019050919050565b82818337600083830152505050565b6000610da2610d9d84610d4f565b610d25565b905082815260208101848484011115610dbe57610dbd610d4a565b5b610dc9848285610d80565b509392505050565b600082601f830112610de657610de5610d45565b5b8135610df6848260208601610d8f565b91505092915050565b600067ffffffffffffffff821115610e1a57610e19610cc5565b5b602082029050602081019050919050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e5b82610e30565b9050919050565b610e6b81610e50565b8114610e7657600080fd5b50565b600081359050610e8881610e62565b92915050565b6000819050919050565b610ea181610e8e565b8114610eac57600080fd5b50565b600081359050610ebe81610e98565b92915050565b600060408284031215610eda57610ed9610caf565b5b610ee46040610d25565b90506000610ef484828501610e79565b6000830152506020610f0884828501610eaf565b60208301525092915050565b6000610f27610f2284610dff565b610d25565b90508083825260208201905060408402830185811115610f4a57610f49610e2b565b5b835b81811015610f735780610f5f8882610ec4565b845260208401935050604081019050610f4c565b5050509392505050565b600082601f830112610f9257610f91610d45565b5b8135610fa2848260208601610f14565b91505092915050565b600060a08284031215610fc157610fc0610caf565b5b610fcb60a0610d25565b9050600082013567ffffffffffffffff811115610feb57610fea610d40565b5b610ff784828501610dd1565b600083015250602082013567ffffffffffffffff81111561101b5761101a610d40565b5b61102784828501610dd1565b602083015250604082013567ffffffffffffffff81111561104b5761104a610d40565b5b61105784828501610f7d565b604083015250606061106b84828501610e79565b606083015250608082013567ffffffffffffffff81111561108f5761108e610d40565b5b61109b84828501610dd1565b60808301525092915050565b600080604083850312156110be576110bd610c65565b5b60006110cc85828601610c9a565b925050602083013567ffffffffffffffff8111156110ed576110ec610c6a565b5b6110f985828601610fab565b9150509250929050565b61110c81610e8e565b82525050565b60006020820190506111276000830184611103565b92915050565b600080fd5b600060a082840312156111485761114761112d565b5b81905092915050565b600061ffff82169050919050565b61116881611151565b811461117357600080fd5b50565b6000813590506111858161115f565b92915050565b600080600080608085870312156111a5576111a4610c65565b5b600085013567ffffffffffffffff8111156111c3576111c2610c6a565b5b6111cf87828801611132565b94505060206111e087828801611176565b93505060406111f187828801610eaf565b925050606061120287828801610e79565b91505092959194509250565b60008115159050919050565b6112238161120e565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611263578082015181840152602081019050611248565b60008484015250505050565b600061127a82611229565b6112848185611234565b9350611294818560208601611245565b61129d81610cb4565b840191505092915050565b60006060820190506112bd600083018661121a565b81810360208301526112cf818561126f565b90506112de6040830184611103565b949350505050565b6112ef81610e50565b82525050565b600060208201905061130a60008301846112e6565b92915050565b600060a082840312156113265761132561112d565b5b81905092915050565b6000806040838503121561134657611345610c65565b5b600061135485828601610c9a565b925050602083013567ffffffffffffffff81111561137557611374610c6a565b5b61138185828601611310565b9150509250929050565b6000819050919050565b61139e8161138b565b82525050565b60006020820190506113b96000830184611395565b92915050565b6000602082840312156113d5576113d4610c65565b5b60006113e384828501610c9a565b91505092915050565b6000602082019050611401600083018461121a565b92915050565b61141081610c6f565b82525050565b600060208201905061142b6000830184611407565b92915050565b61143a81611151565b82525050565b60006020820190506114556000830184611431565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61149081610e50565b82525050565b60006114a28383611487565b60208301905092915050565b6000602082019050919050565b60006114c68261145b565b6114d08185611466565b93506114db83611477565b8060005b8381101561150c5781516114f38882611496565b97506114fe836114ae565b9250506001810190506114df565b5085935050505092915050565b6000602082019050818103600083015261153381846114bb565b905092915050565b6115448161138b565b811461154f57600080fd5b50565b6000813590506115618161153b565b92915050565b600060a0828403121561157d5761157c610caf565b5b61158760a0610d25565b9050600061159784828501611552565b60008301525060206115ab84828501610c9a565b602083015250604082013567ffffffffffffffff8111156115cf576115ce610d40565b5b6115db84828501610dd1565b604083015250606082013567ffffffffffffffff8111156115ff576115fe610d40565b5b61160b84828501610dd1565b606083015250608082013567ffffffffffffffff81111561162f5761162e610d40565b5b61163b84828501610f7d565b60808301525092915050565b60006116533683611567565b9050919050565b600080fd5b600080fd5b600080fd5b600080833560016020038436030381126116865761168561165a565b5b80840192508235915067ffffffffffffffff8211156116a8576116a761165f565b5b6020830192506001820236038313156116c4576116c3611664565b5b509250929050565b60006116d88385611234565b93506116e5838584610d80565b6116ee83610cb4565b840190509392505050565b600060208201905081810360008301526117148184866116cc565b90509392505050565b60006020828403121561173357611732610c65565b5b600061174184828501610eaf565b91505092915050565b600080fd5b600080fd5b600080fd5b6000808335600160200384360303811261177657611775611754565b5b83810192508235915060208301925067ffffffffffffffff82111561179e5761179d61174a565b5b6001820236038313156117b4576117b361174f565b5b509250929050565b600082825260208201905092915050565b60006117d983856117bc565b93506117e6838584610d80565b6117ef83610cb4565b840190509392505050565b6000808335600160200384360303811261181757611816611754565b5b83810192508235915060208301925067ffffffffffffffff82111561183f5761183e61174a565b5b6040820236038313156118555761185461174f565b5b509250929050565b600082825260208201905092915050565b6000819050919050565b60006118876020840184610e79565b905092915050565b600061189e6020840184610eaf565b905092915050565b6118af81610e8e565b82525050565b604082016118c66000830183611878565b6118d36000850182611487565b506118e1602083018361188f565b6118ee60208501826118a6565b50505050565b600061190083836118b5565b60408301905092915050565b600082905092915050565b6000604082019050919050565b6000611930838561185d565b935061193b8261186e565b8060005b8581101561197457611951828461190c565b61195b88826118f4565b975061196683611917565b92505060018101905061193f565b5085925050509392505050565b600060a083016119946000840184611759565b85830360008701526119a78382846117cd565b925050506119b86020840184611759565b85830360208701526119cb8382846117cd565b925050506119dc60408401846117fa565b85830360408701526119ef838284611924565b92505050611a006060840184611878565b611a0d6060860182611487565b50611a1b6080840184611759565b8583036080870152611a2e8382846117cd565b925050508091505092915050565b60006020820190508181036000830152611a568184611981565b905092915050565b60008083356001602003843603038112611a7b57611a7a61165a565b5b80840192508235915067ffffffffffffffff821115611a9d57611a9c61165f565b5b602083019250604082023603831315611ab957611ab8611664565b5b509250929050565b600060408284031215611ad757611ad6610c65565b5b6000611ae584828501610ec4565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215611b3357611b32610c65565b5b6000611b4184828501610e79565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611b8482610e8e565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611bb657611bb5611b4a565b5b600182019050919050565b611bca8161138b565b82525050565b611bd981610c6f565b82525050565b6000611bea82611229565b611bf481856117bc565b9350611c04818560208601611245565b611c0d81610cb4565b840191505092915050565b600081519050919050565b6000819050602082019050919050565b604082016000820151611c496000850182611487565b506020820151611c5c60208501826118a6565b50505050565b6000611c6e8383611c33565b60408301905092915050565b6000602082019050919050565b6000611c9282611c18565b611c9c818561185d565b9350611ca783611c23565b8060005b83811015611cd8578151611cbf8882611c62565b9750611cca83611c7a565b925050600181019050611cab565b5085935050505092915050565b600060a083016000830151611cfd6000860182611bc1565b506020830151611d106020860182611bd0565b5060408301518482036040860152611d288282611bdf565b91505060608301518482036060860152611d428282611bdf565b91505060808301518482036080860152611d5c8282611c87565b9150508091505092915050565b60006020820190508181036000830152611d838184611ce5565b905092915050565b6000608082019050611da06000830187611395565b611dad6020830186611407565b611dba60408301856112e6565b611dc76060830184611395565b95945050505050565b600082905092915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600082821b905092915050565b6000611e208383611dd0565b82611e2b8135611ddb565b92506004821015611e6b57611e667fffffffff0000000000000000000000000000000000000000000000000000000083600403600802611e07565b831692505b505092915050565b600080fd5b600080fd5b60008085851115611e9157611e90611e73565b5b83861115611ea257611ea1611e78565b5b6001850283019150848603905094509492505050565b600060208284031215611ece57611ecd610caf565b5b611ed86020610d25565b90506000611ee884828501610eaf565b60008301525092915050565b600060208284031215611f0a57611f09610c65565b5b6000611f1884828501611eb8565b91505092915050565b6000606082019050611f3660008301866112e6565b611f4360208301856112e6565b611f506040830184611103565b949350505050565b611f618161120e565b8114611f6c57600080fd5b50565b600081519050611f7e81611f58565b92915050565b600060208284031215611f9a57611f99610c65565b5b6000611fa884828501611f6f565b91505092915050565b600082825260208201905092915050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b600061201e602a83611fb1565b915061202982611fc2565b604082019050919050565b6000602082019050818103600083015261204d81612011565b9050919050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b60006120b0602683611fb1565b91506120bb82612054565b604082019050919050565b600060208201905081810360008301526120df816120a3565b9050919050565b600081905092915050565b60006120fc82611229565b61210681856120e6565b9350612116818560208601611245565b80840191505092915050565b600061212e82846120f1565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b600061216f601d83611fb1565b915061217a82612139565b602082019050919050565b6000602082019050818103600083015261219e81612162565b9050919050565b600081519050919050565b60006121bb826121a5565b6121c58185611fb1565b93506121d5818560208601611245565b6121de81610cb4565b840191505092915050565b6000602082019050818103600083015261220381846121b0565b90509291505056fea264697066735822122035b544079402c959c7fbf0ab14b8f70477efe3edcea85d8eda0a1f4149ae3f4d64736f6c63430008130033";

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
