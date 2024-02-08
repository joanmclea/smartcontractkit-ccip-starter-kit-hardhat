

1. Fire up a standalone local Hardhat node on port 8545 and keep the terminal window open
`npx hardhat node --port 8545`


2. In a new terminal window:

    1. deploy the mock CCIP router: `npx hardhat mock-deploy-router --network localhost`
    2. deploy the ccip clients (sender and receiver) on to the same network `npx hardhat mock-deploy-client --network localhost --mockrouter <<MOCK ROUTER ADDRESS>> --contract-name <<<BasicMessageSender OR BasicMessageReceiver>>>`

    3. send a message : `npx hardhat mock-send-message --sender <<SENDER CLIENT ADDRESS>> --receiver <<RECEIVER CLIENT ADDRESS>>  --network localhost`
