# Eigenscan is a fork and improved version of [Eigenscan](https://eigenscan.org)

Inspired by the [eigenevents](https://github.com/gowthamsundaresan/eigenevents) library, I have added PufferEvent.js. Inside, there are 4 ABIs files: 

## 1. PufferModuleManagerABI

| Event Name            | Description                                  | Output Params                                                   |
|-----------------------|----------------------------------------------|-----------------------------------------------------------------|
| ModuleAdded           | Emitted when a new module is added.          | `moduleAddress (address)`, `moduleName (string)`                |
| ModuleRemoved         | Emitted when a module is removed.            | `moduleAddress (address)`                                       |
| ModuleUpdated         | Emitted when a module is updated.            | `moduleAddress (address)`, `moduleName (string)`, `updatedBy (address)` |
| ModuleEnabled         | Emitted when a module is enabled.            | `moduleAddress (address)`                                       |
| ModuleDisabled        | Emitted when a module is disabled.           | `moduleAddress (address)`                                       |
| OwnershipTransferred  | Emitted when ownership is transferred.       | `previousOwner (address)`, `newOwner (address)`                 |

## 2. PufferProtocolABI 

| Event Name            | Description                             | Output Params                                                   |
|-----------------------|-----------------------------------------|-----------------------------------------------------------------|
| StakeDeposited        | Emitted when a stake is deposited       | `staker (address)`, `amount (uint256)`, `timestamp (uint256)`   |
| StakeWithdrawn        | Emitted when a stake is withdrawn       | `staker (address)`, `amount (uint256)`, `timestamp (uint256)`   |
| RewardClaimed         | Emitted when a reward is claimed        | `staker (address)`, `rewardAmount (uint256)`, `timestamp (uint256)` |
| ValidatorRegistered   | Emitted when a validator is registered  | `validator (address)`, `validatorId (bytes32)`, `timestamp (uint256)` |
| ValidatorDeregistered | Emitted when a validator is deregistered| `validator (address)`, `validatorId (bytes32)`, `timestamp (uint256)` |
| AVSUpdated            | Emitted when AVS is updated             | `avs (address)`, `newValue (uint256)`, `timestamp (uint256)`    |
| OperatorAdded         | Emitted when an operator is added       | `operator (address)`, `operatorId (bytes32)`, `timestamp (uint256)` |
| OperatorRemoved       | Emitted when an operator is removed     | `operator (address)`, `operatorId (bytes32)`, `timestamp (uint256)` |
| TVLUpdated            | Emitted when Total Value Locked changes | `oldTVL (uint256)`, `newTVL (uint256)`, `timestamp (uint256)`   |
| StakerRegistered      | Emitted when a new staker registers     | `staker (address)`, `timestamp (uint256)`                       |
| MetadataUpdated       | Emitted when metadata is updated        | `updater (address)`, `metadataId (bytes32)`, `newMetadata (string)`, `timestamp (uint256)` |

## 3. PufferVaultABI

| Event Name                  | Description                                            | Output Params                                                   |
|-----------------------------|--------------------------------------------------------|-----------------------------------------------------------------|
| AssetsWithdrawnToday        | Triggered when assets are withdrawn on the current day.| `withdrawalAmount (uint256)`                                    |
| ClaimedWithdrawals          | Triggered when withdrawals are claimed.                | `requestIds (uint256[])`                                        |
| DailyWithdrawalLimitReset   | Triggered when the daily withdrawal limit is reset.    | None                                                            |
| DailyWithdrawalLimitSet     | Triggered when the daily withdrawal limit is set.      | `oldLimit (uint96)`, `newLimit (uint96)`                        |
| Deposit                     | Triggered when assets are deposited.                   | `sender (address)`, `owner (address)`, `assets (uint256)`, `shares (uint256)` |
| ExitFeeBasisPointsSet       | Triggered when the exit fee basis points are set.      | `previousFee (uint256)`, `newFee (uint256)`                     |
| LidoWithdrawal              | Triggered when a withdrawal from Lido occurs.          | `expectedWithdrawal (uint256)`, `actualWithdrawal (uint256)`    |
| RequestedWithdrawals        | Triggered when withdrawals are requested.              | `requestIds (uint256[])`                                        |
| Transfer                    | Triggered when tokens (or assets) are transferred.     | `from (address)`, `to (address)`, `value (uint256)`             |
| TransferredETH              | Triggered when ETH (Ether) is transferred.             | `to (address)`, `amount (uint256)`                              |
| Withdraw                    | Triggered when assets are withdrawn.                   | `sender (address)`, `receiver (address)`, `owner (address)`, `assets (uint256)`, `shares (uint256)` |

## 4. ValidatorTicketABI

| Event Name            | Description                                      | Output Params                                                   |
|-----------------------|--------------------------------------------------|-----------------------------------------------------------------|
| DispersedETH          | Triggered when ETH is dispersed.                 | `from (address)`, `to (address)`, `amount (uint256)`            |
| GuardiansFeeChanged   | Triggered when the guardian's fee is changed.    | `previousFee (uint256)`, `newFee (uint256)`                     |
| ProtocolFeeChanged    | Triggered when the protocol fee is changed.      | `previousFee (uint256)`, `newFee (uint256)`                     |
| Transfer              | Triggered when tokens are transferred.           | `from (address)`, `to (address)`, `value (uint256)`             |
| TransferredETH        | Triggered when ETH is transferred.               | `from (address)`, `to (address)`, `amount (uint256)`            |
