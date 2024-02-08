

1. Fire up a standalone local Hardhat node on port 8545 and keep the terminal window open
`npx hardhat node --port 8545`



2. In a new terminal window:
**TIP** for  each command you can add the `--help` flag after each command (e.g. `npx hardhat mock-send-message --help`). This will print out the options that the CLI command accepts and the types of data for each option argument.

    1. Setsup the local test hardhat note by deploying the mock CCIP router contract and the mock Burn&Mint ERC20 token: `npx hardhat mock-deploy-contracts --network localhost`
    2. deploy the ccip clients (sender and receiver) on to the same network `npx hardhat mock-deploy-client --network localhost --mockrouter <<MOCK ROUTER ADDRESS>> --contract-name <<<BasicMessageSender OR BasicMessageReceiver>>>`

    3. send a message : `npx hardhat mock-send-message --sender <<SENDER CLIENT ADDRESS>> --receiver <<RECEIVER CLIENT ADDRESS>>  --message "let's GO!!" --network localhost`    [note that `--message` is an optional param]
