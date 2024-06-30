# Eigenscan is a fork and improved version of [Eigenscan](https://eigenscan.org)

Inspired by the [eigenevents](https://github.com/gowthamsundaresan/eigenevents) library, I have added PufferEvent.js. Inside, there are 4 ABIs file: 

1. PufferModuleManagerABI
2. PufferProtocolABI 
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


