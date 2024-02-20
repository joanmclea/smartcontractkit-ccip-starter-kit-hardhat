# TODOs

1. Tests on the mock
2. mock Link and mock paying fee with LINK

# Using Tasks inside the `../ccip-mock` directory

## Contract to Contract OR contract to EOA (universal sender/receiver contract on both sides)

1. Fire up a standalone local Hardhat node on port 8545 and keep this terminal window open
   `npx hardhat node --port 8545`

2. Run the following Hardhat commands in sequence.
   > **TIP** for each command you can add the `--help` flag after each command (e.g. `npx hardhat mock-send-message --help`). This will print out the options that the CLI command accepts and the types of data for each option argument.

Note that the setup steps include deploying contracts to your local Hardhat network, those contract addresses are written to `<project-root>/mocks.env` which is gitignored. This is where you can find your contract addresses if you clear your console.

3. In a new terminal window:

   - Set up the local test hardhat node by deploying the mock CCIP router contract and the mock Burn&Mint ERC20 token `npx hardhat setup-mocks --network localhost`

   - deploy the ccip "universal" clients (sender and receiver are identical "programmable token" CCIP contracts that can handle bi-directional operations) on to the same network `npx hardhat mock-deploy-universal-clients --mockrouter 0xcbEAF3BDe82155F56486Fb5a1072cb8baAf547cc --network localhost`

   - send messages and/or tokens from to the receiving contract `npx hardhat mock-send-receive --network localhost --amount <<<OPTIONAl : units of wei>>> --message <<Optional>> --sender <<optional>> --receiver <<optional>> --tokenAddress <<optional-token to transfer>>`. This task will also fund your deployer wallet and the sender CCIP client with the mock transfer tokens.

     - <i> If you dont specify the `--sender`, `--receiver` or `--tokenAddress` it will pick this up from the `mocks.nev` file that is dynamically created when doing the `setup-mocks` and `mock-deploy-universal-clients` tasks. </i>
     - <i>If you want to send to a mock EOA print out your hardhat accounts with `npx hardhat accounts` and any one except the first one. Then pass it in as the `--sender` argument </i>

# Using Existing Tasks Outside the `../ccip-mock` folder

## Tokens from EOA to EOA ✅

This uses the task at `../../tasks/ccip-token-transfer.ts`

```
npx hardhat ccip-token-transfer \
--source-blockchain localhost \
--destination-blockchain localhost \
--receiver <<USE_HARDHAT_EOA#20 AS EXAMPLE>> \
--token-address 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 \
--amount 10000 \
--router 0x5FbDB2315678afecb367f032d93F642f64180aa3 # not optional for mock
```

## Tokens from EOA to Smart Contract ✅

```
npx hardhat ccip-token-transfer \
--source-blockchain localhost \
--destination-blockchain localhost \
--receiver <<RECEIVER__CONTRACT__ADDRESS>> \
--token-address <<MOCK__BnM__TOKEN__ADDRESS>> \
--amount 10000 \
--router <<MOCK__ROUTER__ADDRESS>> # not optional for mock
```

## Tokens & Message from Smart Contract to Smart Contract ✅

### Pre requisites

- transfer BnM token to the smart contract
- if paying CCIP fees with LINK, transfer LINK to smart contract

This uses the task at `../../tasks/send-token-and-data.ts`

```
npx hardhat send-token-and-data \
--source-blockchain localhost \
--sender <addressOfProgrammableTokenTransfersOnSourceBlockchain> \
--destination-blockchain localhost \
--receiver <ddressOfProgrammableTokenTransfersOnDestinationBlockchain> \
--message <messageToSend> \
--token-address <tokenToSendAddressOnSourceBlockchain> \
--amount <amountToSend> \
--router <<MOCK__ROUTER__ADDRESS>> # not optional for mocks
```
