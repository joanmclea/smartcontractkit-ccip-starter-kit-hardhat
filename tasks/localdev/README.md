

1. Fire up a standalone local Hardhat node on port 8545 and keep the terminal window open
`npx hardhat node --port 8545`


2. In a new terminal window:

    - deploy the mock CCIP router: `npx hardhat deploy-mock-router --network localhost`
    - deploy the ccip clients (sender and receiver) on to the same network `npx hardhat deploy-client --network localhost --mockrouter <<MOCK ROUTER ADDRESS>> --contract-name <<<BasicMessageSender OR BasicMessageReceiver>>>`

    - send a message : `npx hardhat mock-send-message --sender <<SENDER CLIENT ADDRESS>> --receiver <<RECEIVER CLIENT ADDRESS>>  --network localhost`
