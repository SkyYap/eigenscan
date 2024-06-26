# Eigenscan is a fork and improved version of [Eigenscan](https://eigenscan.org)
Inititially it contains only eigenevents library, socket and API to pull Eigenlayer mainnet contract for metric and event as well as showing metric and eigenlayer mainnet emitted events.

This improved version consists of frontend and backend. The backend consists of several functions: 

1. eigenevent (easily query eigenlayer mainnet contracts for emitted events (historical + real-time))
2. pufferevent (easily query Puffer Finance mainnet contracts for emitted events (historical + real-time))
3. integration of Dune and EigenExplorer API (can be tested using Swagger)
4. socket and API to pull Eigenlayer mainnet contract for metric and event
5. socket and API to pull Puffer Finance mainnet contract for metric and event
6. email notification to alert user based on grafana alerting

For the frontend, it consists of:
1. showing metric and eigenlayer mainnet emitted events
2. showing metric and puffer mainnet emitted events
3. embed grafana to check metrics (setup using node-exporter and prometheus)

Inspired by the [eigenevents](https://github.com/gowthamsundaresan/eigenevents) library, I have added PufferEvent.js in eigenscan-server. Inside, there are 4 ABIs files: 

## 1. PufferModuleManagerABI

| Event Name                             | Description                                                                           | Output Params                                                      |
|-----------------------------------------|---------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| getAVSRegistrationSignatureProofUpdated     | Emitted when AVS registration signature proof is updated.                               | `moduleName`: bytes32, `proof`: bytes                               |
| getCompletedQueuedWithdrawals              | Emitted when queued withdrawals are completed.                                          | `beneficiary`: address, `amount`: uint256                           |
| getNonBeaconChainETHBalanceWithdrawn       | Emitted when ETH balance is withdrawn from a non-beacon chain.                          | `recipient`: address, `amount`: uint256                             |
| getPufferModuleDelegated                   | Emitted when a Puffer module is delegated.                                              | `module`: address, `delegate`: address                              |
| getPufferModuleUndelegated                 | Emitted when a Puffer module is undelegated.                                            | `module`: address, `delegate`: address                              |
| getRestakingOperatorAVSSocketUpdated       | Emitted when the AVS socket of a restaking operator is updated.                         | `operator`: address, `socket`: bytes32                              |
| getRestakingOperatorCreated                | Emitted when a restaking operator is created.                                           | `operator`: address, `creator`: address                             |
| getRestakingOperatorDeregisteredFromAVS    | Emitted when a restaking operator is deregistered from AVS.                             | `operator`: address                                                |
| getRestakingOperatorMetadataURIUpdated     | Emitted when the metadata URI of a restaking operator is updated.                       | `operator`: address, `metadataURI`: string                         |
| getRestakingOperatorOptedInSlasher         | Emitted when a restaking operator opts in to the slasher.                                | `operator`: address                                                |
| getRestakingOperatorRegisteredToAVS        | Emitted when a restaking operator is registered to AVS.                                  | `operator`: address                                                |
| getRestakingOperatorRegisteredToAVSWithChurn| Emitted when a restaking operator is registered to AVS with churn.                      | `operator`: address, `churn`: uint256                              |
| getValidatorCredentialsVerified            | Emitted when validator credentials are verified.                                         | `validator`: address, `verified`: bool                              |
| getVerifiedAndProcessedWithdrawals         | Emitted when withdrawals are verified and processed.                                     | `beneficiary`: address, `amount`: uint256                           |
| getWithdrawalsQueued                       | Emitted when withdrawals are queued.                                                    | `beneficiary`: address, `amount`: uint256                           |


## 2. PufferProtocolABI 

| Event Name                               | Description                                                                      | Output Params                                                                                                                                                            |
|------------------------------------------|----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| getMinimumVTAmountChanged                   | Event emitted when the minimum number of days for VT changes.                     | `oldMinimumNumberOfDays`: uint256, `newMinimumNumberOfDays`: uint256                                                                                                       |
| getModuleWeightsChanged                     | Event emitted when the weights of modules change.                                 | `oldWeights`: bytes32[], `newWeights`: bytes32[]                                                                                                                           |
| getNewPufferModuleCreated                   | Event emitted when a new Puffer Module is created.                                | `module`: address, `moduleName`: bytes32, `withdrawalCredentials`: bytes32                                                                                                  |
| getNumberOfRegisteredValidatorsChanged      | Event emitted when the number of registered validators changes for a module.      | `moduleName`: bytes32, `newNumberOfRegisteredValidators`: uint256                                                                                                          |
| getSuccessfullyProvisioned                  | Event emitted when provisioning of a validator is successful.                     | `pubKey`: bytes, `pufferModuleIndex`: uint256, `moduleName`: bytes32                                                                                                        |
| getVTPenaltyChanged                         | Event emitted when the VT penalty amount changes.                                 | `oldPenalty`: uint256, `newPenalty`: uint256                                                                                                                               |
| getValidatorExited                          | Event emitted when a validator exits from a module.                               | `pubKey`: bytes, `pufferModuleIndex`: uint256, `moduleName`: bytes32, `pufETHBurnAmount`: uint256, `vtBurnAmount`: uint256                                                    |
| getValidatorKeyRegistered                   | Event emitted when a validator key is registered for a module.                    | `pubKey`: bytes, `pufferModuleIndex`: uint256, `moduleName`: bytes32, `usingEnclave`: bool                                                                                   |
| getValidatorLimitPerModuleChanged           | Event emitted when the limit of validators per module changes.                   | `oldLimit`: uint256, `newLimit`: uint256                                                                                                                                   |
| getValidatorSkipped                         | Event emitted when a validator is skipped during provisioning.                    | `pubKey`: bytes, `pufferModuleIndex`: uint256, `moduleName`: bytes32                                                                                                        |
| getValidatorTicketsDeposited                | Event emitted when validator tickets are deposited.                               | `node`: address, `depositor`: address, `amount`: uint256                                                                                                                    |
| getValidatorTicketsWithdrawn                | Event emitted when validator tickets are withdrawn.                               | `node`: address, `recipient`: address, `amount`: uint256                                                                                                                    |
                                                                                                                  |

## 3. PufferVaultABI

| Event Name                  | Description                                            | Output Params                                                   |
|-----------------------------|--------------------------------------------------------|-----------------------------------------------------------------|
| getAssetsWithdrawnToday        | Triggered when assets are withdrawn on the current day.| `withdrawalAmount`: uint256                                    |
| getClaimedWithdrawals          | Triggered when withdrawals are claimed.                | `requestIds`: uint256[]                                        |
| getDailyWithdrawalLimitSet     | Triggered when the daily withdrawal limit is set.      | `oldLimit`: uint96, `newLimit`: uint96                         |
| getDeposit                     | Triggered when assets are deposited.                   | `sender`: address, `owner`: address, `assets`: uint256, `shares`: uint256 |
| getExitFeeBasisPointsSet       | Triggered when the exit fee basis points are set.      | `previousFee`: uint256, `newFee`: uint256                     |
| getLidoWithdrawal              | Triggered when a withdrawal from Lido occurs.          | `expectedWithdrawal`: uint256, `actualWithdrawal`: uint256    |
| getRequestedWithdrawals        | Triggered when withdrawals are requested.              | `requestIds`: uint256[]                                        |
| getTransfer                    | Triggered when tokens (or assets) are transferred.     | `from`: address, `to`: address, `value`: uint256              |
| getTransferredETH              | Triggered when ETH (Ether) is transferred.             | `to`: address, `amount`: uint256                               |
| getWithdraw                    | Triggered when assets are withdrawn.                   | `sender`: address, `receiver`: address, `owner`: address, `assets`: uint256, `shares`: uint256 |

## 4. ValidatorTicketABI

| Event Name            | Description                                      | Output Params                                                   |
|-----------------------|--------------------------------------------------|-----------------------------------------------------------------|
| getDispersedETH        | Triggered when ETH is dispersed.                 | `from`: address, `to`: address, `amount`: uint256               |
| getGuardiansFeeChanged | Triggered when the guardian's fee is changed.    | `previousFee`: uint256, `newFee`: uint256                      |
| getProtocolFeeChanged  | Triggered when the protocol fee is changed.      | `previousFee`: uint256, `newFee`: uint256                      |
| getTransfer            | Triggered when tokens are transferred.           | `from`: address, `to`: address, `value`: uint256               |
| getTransferredETH      | Triggered when ETH is transferred.               | `from`: address, `to`: address, `amount`: uint256              |

## Setup frontend

1. `yarn install`

2. setup .env

3. `yarn run dev`

## Setup backend

1. `yarn install`

2. setup 4 supabase tables

3. setup .env

4. `yarn start`

## Supabase SQL Editor command:

```-- Create the deposits table
create table deposits (
  id serial primary key,
  transaction_hash text not null,
  block_number text not null,
  staker_addr text not null,
  token text not null,
  strategy_addr text not null,
  amount numeric not null,
  message text,
  created_at timestamp with time zone default now()
);

-- Create index on transaction_hash for faster queries
create index idx_transaction_hash on deposits(transaction_hash);

-- Create index on staker_addr for faster queries
create index idx_staker_addr on deposits(staker_addr);
```

```--- Create the eigendata table
CREATE TABLE public.eigendata (
    id int8 GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    tvl_eth text NOT NULL,
    number_avs text NOT NULL,
    number_operator text NOT NULL,
    number_staker text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
);
```

```--- Create the eigenevents table
CREATE TABLE public.eigenevents (
    id int8 GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    transactionHash text NOT NULL,
    blockNumber text NOT NULL,
    event text NOT NULL,
    returnValues jsonb NOT NULL,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc', now()) NOT NULL
);
```

```--- Create the pufferdata table
CREATE TABLE pufferdata (
    id SERIAL PRIMARY KEY,
    number_validators INTEGER
);

```
## Swagger screenshot integrating Dune API and EigenExplorer API

![Screenshot 2024-06-30 215448](https://github.com/SkyYap/eigenscan/assets/32660903/be848ef8-09d3-4d28-a229-cfcf6a8b5c53)
![Screenshot 2024-06-30 215514](https://github.com/SkyYap/eigenscan/assets/32660903/abfc8175-ce08-4f70-b6c5-778b88fc3e99)
![Screenshot 2024-06-30 215532](https://github.com/SkyYap/eigenscan/assets/32660903/4630ad22-eff8-4e21-a8f8-c109b39e0775)


## Further Improvement
1. Further filter and utilize events from eigenscan-server/PufferEvents.js
2. Improve frontend dashboard
3. Added email subscription for grafana alert

