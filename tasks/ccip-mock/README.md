
# TODO
1.  BurnMintERC677 token owner invokesfunction grantMintAndBurnRoles(address burnAndMinter) on itself
2. isMinter() and isBurner() check
3. send 20 tokens to senderContract
4. send tokens to receiver


# Steps
1. Fire up a standalone local Hardhat node on port 8545 and keep this terminal window open
`npx hardhat node --port 8545`


2. Run the following Hardhat commands in sequence.
> **TIP** for  each command you can add the `--help` flag after each command (e.g. `npx hardhat mock-send-message --help`). This will print out the options that the CLI command accepts and the types of data for each option argument.

Note that the setup steps include deploying contracts to your local Hardhat network, those contract addresses are written to `<project-root>/mocks.env` which is gitignored. This is where you can find your contract addresses if you clear your console.

3. In a new terminal window:

    - Set up the local test hardhat node by deploying the mock CCIP router contract and the mock Burn&Mint ERC20 token `npx hardhat setup-mocks --network localhost`

    - deploy the ccip clients (sender and receiver) on to the same network `npx hardhat mock-deploy-client --network localhost --mockrouter <<MOCK ROUTER ADDRESS>> --contract-name <<<BasicMessageSender OR BasicMessageReceiver>>> --contract-type <<sender>> OR <<receiver>>`

    - send a message : `npx hardhat mock-send-message --sender <<SENDER CLIENT ADDRESS>> --receiver <<RECEIVER CLIENT ADDRESS>>  --message "let's GO!!" --network localhost`    [note that `--message` is an optional param]



# Using Existing Tasks
## EOA to EOA
```
npx hardhat ccip-token-transfer \
--source-blockchain hardhat \
--destination-blockchain hardhat \
--receiver 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9 \
--token-address 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 \
--amount 10000 \
--router 0x5FbDB2315678afecb367f032d93F642f64180aa3
```