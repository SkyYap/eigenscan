# Eigenscan is a fork and improved version of [Eigenscan](https://eigenscan.org)

Inspired by the [eigenevents](https://github.com/gowthamsundaresan/eigenevents) library, I have added PufferEvent.js. Inside, there are 4 ABIs file: 

1. PufferModuleManagerABI

| Event Name            | Description                                                            | Output Params                                 |
|-----------------------|------------------------------------------------------------------------|-----------------------------------------------|
| ModuleAdded           | Emitted when a new module is added.                                    | `moduleAddress (address)`, `moduleName (string)` |
| ModuleRemoved         | Emitted when a module is removed.                                      | `moduleAddress (address)`                     |
| ModuleUpdated         | Emitted when a module is updated.                                      | `moduleAddress (address)`, `moduleName (string)`, `updatedBy (address)` |
| ModuleEnabled         | Emitted when a module is enabled.                                      | `moduleAddress (address)`                     |
| ModuleDisabled        | Emitted when a module is disabled.                                     | `moduleAddress (address)`                     |
| OwnershipTransferred  | Emitted when ownership is transferred.                                 | `previousOwner (address)`, `newOwner (address)` |


2. PufferProtocolABI 

| Event Name            | Description                             | Output Params                                                                                                     |
|-----------------------|-----------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| StakeDeposited        | Emitted when a stake is deposited       | `address staker`, `uint256 amount`, `uint256 timestamp`                                                           |
| StakeWithdrawn        | Emitted when a stake is withdrawn       | `address staker`, `uint256 amount`, `uint256 timestamp`                                                           |
| RewardClaimed         | Emitted when a reward is claimed        | `address staker`, `uint256 rewardAmount`, `uint256 timestamp`                                                     |
| ValidatorRegistered   | Emitted when a validator is registered  | `address validator`, `bytes32 validatorId`, `uint256 timestamp`                                                   |
| ValidatorDeregistered | Emitted when a validator is deregistered| `address validator`, `bytes32 validatorId`, `uint256 timestamp`                                                   |
| AVSUpdated            | Emitted when AVS is updated             | `address avs`, `uint256 newValue`, `uint256 timestamp`                                                            |
| OperatorAdded         | Emitted when an operator is added       | `address operator`, `bytes32 operatorId`, `uint256 timestamp`                                                     |
| OperatorRemoved       | Emitted when an operator is removed     | `address operator`, `bytes32 operatorId`, `uint256 timestamp`                                                     |
| TVLUpdated            | Emitted when Total Value Locked changes | `uint256 oldTVL`, `uint256 newTVL`, `uint256 timestamp`                                                           |
| StakerRegistered      | Emitted when a new staker registers     | `address staker`, `uint256 timestamp`                                                                             |
| MetadataUpdated       | Emitted when metadata is updated        | `address updater`, `bytes32 metadataId`, `string newMetadata`, `uint256 timestamp`                                |


3. PufferVaultABI

| Event Name                  | Description                                            | Output Parameters                          |
|-----------------------------|--------------------------------------------------------|--------------------------------------------|
| AssetsWithdrawnToday        | Triggered when assets are withdrawn on the current day. | `withdrawalAmount` (uint256): The amount of assets withdrawn. |
| ClaimedWithdrawals          | Triggered when withdrawals are claimed.                | `requestIds` (uint256[]): Array of request IDs for claimed withdrawals. |
| DailyWithdrawalLimitReset   | Triggered when the daily withdrawal limit is reset.    | None                                       |
| DailyWithdrawalLimitSet     | Triggered when the daily withdrawal limit is set.      | `oldLimit` (uint96): Previous daily withdrawal limit. <br> `newLimit` (uint96): New daily withdrawal limit. |
| Deposit                     | Triggered when assets are deposited.                   | `sender` (address): Address of the sender who deposited assets. <br> `owner` (address): Owner address. <br> `assets` (uint256): Amount of assets deposited. <br> `shares` (uint256): Amount of shares issued for the deposit. |
| ExitFeeBasisPointsSet       | Triggered when the exit fee basis points are set.      | `previousFee` (uint256): Previous exit fee basis points. <br> `newFee` (uint256): New exit fee basis points. |
| LidoWithdrawal              | Triggered when a withdrawal from Lido occurs.           | `expectedWithdrawal` (uint256): Expected amount to be withdrawn. <br> `actualWithdrawal` (uint256): Actual amount withdrawn. |
| RequestedWithdrawals        | Triggered when withdrawals are requested.              | `requestIds` (uint256[]): Array of request IDs for requested withdrawals. |
| Transfer                    | Triggered when tokens (or assets) are transferred.      | `from` (address): Address from which the transfer occurred. <br> `to` (address): Address to which the transfer is made. <br> `value` (uint256): Amount of tokens (or assets) transferred. |
| TransferredETH              | Triggered when ETH (Ether) is transferred.             | `to` (address): Address to which the ETH is transferred. <br> `amount` (uint256): Amount of ETH transferred. |
| Withdraw                    | Triggered when assets are withdrawn.                    | `sender` (address): Address of the sender who initiated the withdrawal. <br> `receiver` (address): Address of the receiver who received the withdrawn assets. <br> `owner` (address): Owner address. <br> `assets` (uint256): Amount of assets withdrawn. <br> `shares` (uint256): Amount of shares affected by the withdrawal. |

4. ValidatorTicketABI
| Event Name            | Description                                      | Output Parameters                                         |
|-----------------------|--------------------------------------------------|-----------------------------------------------------------|
| DispersedETH          | Triggered when ETH is dispersed.                 | `from` (address): The address from which ETH is dispersed. <br> `to` (address): The address to which ETH is dispersed. <br> `amount` (uint256): The amount of ETH dispersed. |
| GuardiansFeeChanged   | Triggered when the guardian's fee is changed.    | `previousFee` (uint256): Previous guardian's fee. <br> `newFee` (uint256): New guardian's fee. |
| ProtocolFeeChanged    | Triggered when the protocol fee is changed.      | `previousFee` (uint256): Previous protocol fee. <br> `newFee` (uint256): New protocol fee. |
| Transfer              | Triggered when tokens are transferred.           | `from` (address): Address from which the transfer occurred. <br> `to` (address): Address to which the transfer is made. <br> `value` (uint256): Amount of tokens transferred. |
| TransferredETH        | Triggered when ETH is transferred.               | `from` (address): Address from which ETH is transferred. <br> `to` (address): Address to which ETH is transferred. <br> `amount` (uint256): Amount of ETH transferred. |



