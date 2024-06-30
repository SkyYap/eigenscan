import Web3 from "web3"
import PufferModuleManagerABI from "./abi/puffer/PufferModuleManagerABI.json" assert { type: "json" }
import PufferProtocolABI from "./abi/puffer/PufferProtocolABI.json" assert { type: "json" }
import PufferVaultABI from "./abi/puffer/PufferVaultABI.json" assert { type: "json" }
import ValidatorTicketABI from "./abi/puffer/ValidatorTicketABI.json" assert { type: "json" }

class PufferEvents {
    /**
     * Initializes a new instance of the PufferEvents library.
     * @param {string} providerUrl - The URL of the Ethereum provider.
     * @param {string} [connectionType="http"] - The type of connection to use (http or ws).
     */
    constructor(providerUrl, connectionType = "http", onReconnectCallback = null) {
        this.providerUrl = providerUrl
        this.connectionType = connectionType
        this.initializeConnection()
        this.contracts = this._loadContracts()
    }

    initializeConnection() {
        if (this.connectionType === "ws") {
            const options = {
                reconnect: {
                    auto: true,
                    delay: 5000,
                    maxAttempts: 5,
                    onTimeout: false,
                },
            }
            const provider = new Web3.providers.WebsocketProvider(this.providerUrl, options)
            this.web3 = new Web3(provider)

            provider.on("end", () => {
                console.error("WebSocket disconnected...")
                this.initializeConnection()
            })

            provider.on("connect", () => {
                console.log("WebSocket connected...")
                if (this.onReconnectCallback) {
                    this.onReconnectCallback()
                }
            })
        } else {
            this.web3 = new Web3(this.providerUrl)
        }
    }

    /*
    ===========================================
    Use these functions to query for event data
    ===========================================
    */

    /**
     * All functions are have the same params & return structure
     * @param {number|string} fromBlock - Starting block number to fetch events.
     * @param {number|string} toBlock - Ending block number to fetch events.
     * @param {boolean} realTime - Whether to listen to events in real-time.
     * @param {Function|null} callback - Optional callback to handle the events.
     * @returns {Promise|undefined} Returns a promise if fetching past events, otherwise undefined.
     */

    /**
     * ---------------------------------
     * Events from PufferModuleManager.sol
     * ---------------------------------
     */
    async getAVSRegistrationSignatureProofUpdated(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "AVSRegistrationSignatureProofUpdated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getCompletedQueuedWithdrawals(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "CompletedQueuedWithdrawals",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getNonBeaconChainETHBalanceWithdrawn(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "NonBeaconChainETHBalanceWithdrawn",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getPufferModuleDelegated(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "PufferModuleDelegated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getPufferModuleUndelegated(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "PufferModuleUndelegated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getRestakingOperatorAVSSocketUpdated(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "RestakingOperatorAVSSocketUpdated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getRestakingOperatorCreated(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "RestakingOperatorCreated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getRestakingOperatorDeregisteredFromAVS(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "RestakingOperatorDeregisteredFromAVS",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getRestakingOperatorMetadataURIUpdated(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "RestakingOperatorMetadataURIUpdated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getRestakingOperatorOptedInSlasher(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "RestakingOperatorOptedInSlasher",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getRestakingOperatorRegisteredToAVS(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "RestakingOperatorRegisteredToAVS",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getRestakingOperatorRegisteredToAVSWithChurn(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "RestakingOperatorRegisteredToAVSWithChurn",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getValidatorCredentialsVerified(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "ValidatorCredentialsVerified",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getVerifiedAndProcessedWithdrawals(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "VerifiedAndProcessedWithdrawals",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getWithdrawalsQueued(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferModuleManager",
            "WithdrawalsQueued",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    /**
     * -------------------------------
     * Events from PufferProtocol.sol
     * -------------------------------
     */
    async getMinimumVTAmountChanged(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferProtocol",
            "MinimumVTAmountChanged",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getModuleWeightsChanged(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferProtocol",
            "ModuleWeightsChanged",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getNewPufferModuleCreated(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferProtocol",
            "NewPufferModuleCreated",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getNumberOfRegisteredValidatorsChanged(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferProtocol",
            "NumberOfRegisteredValidatorsChanged",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getSuccessfullyProvisioned(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferProtocol",
            "SuccessfullyProvisioned",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getVTPenaltyChanged(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferProtocol",
            "VTPenaltyChanged",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getValidatorExited(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferProtocol",
            "ValidatorExited",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getValidatorKeyRegistered(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferProtocol",
            "ValidatorKeyRegistered",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getValidatorLimitPerModuleChanged(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferProtocol",
            "ValidatorLimitPerModuleChanged",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getValidatorSkipped(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferProtocol",
            "ValidatorSkipped",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getValidatorTicketsDeposited(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferProtocol",
            "ValidatorTicketsDeposited",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getValidatorTicketsWithdrawn(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferProtocol",
            "ValidatorTicketsWithdrawn",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    /**
     * -------------------------------
     * Events from PufferVault.sol
     * -------------------------------
     */
    async getAssetsWithdrawnToday(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferVault",
            "AssetsWithdrawnToday",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getClaimedWithdrawals(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferVault",
            "ClaimedWithdrawals",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getDailyWithdrawalLimitSet(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferVault",
            "DailyWithdrawalLimitSet",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getDeposit(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferVault",
            "Deposit",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getExitFeeBasisPointsSet(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferVault",
            "ExitFeeBasisPointsSet",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getLidoWithdrawal(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferVault",
            "LidoWithdrawal",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getRequestedWithdrawals(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferVault",
            "RequestedWithdrawals",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getTransfer(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferVault",
            "Transfer",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getTransferredETH(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferVault",
            "TransferredETH",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getWithdraw(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "PufferVault",
            "Withdraw",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    /**
     * ----------------------------
     * Events from ValidatorTicket.sol
     * ----------------------------
     */
    async getDispersedETH(
        fromBlock,
        toBlock,
        realTime = false,
        callback = null,
    ) {
        return this.getEvents(
            "ValidatorTicket",
            "DispersedETH",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getGuardiansFeeChanged(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "ValidatorTicket",
            "GuardiansFeeChanged",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getProtocolFeeChanged(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "ValidatorTicket",
            "ProtocolFeeChanged",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getTransfer(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "ValidatorTicket",
            "Transfer",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    async getTransferredETH(fromBlock, toBlock, realTime = false, callback = null) {
        return this.getEvents(
            "ValidatorTicket",
            "TransferredETH",
            fromBlock,
            toBlock,
            realTime,
            callback,
        )
    }

    /*
     ==================
     Internal functions
     ==================
    */

    /**
     * Internal method to load smart contracts using their ABIs and addresses.
     * @returns {Object} A dictionary of contract instances.
     */
    _loadContracts() {
        return {
            PufferModuleManager: new this.web3.eth.Contract(
                PufferModuleManagerABI,
                "0x9E1E4fCb49931df5743e659ad910d331735C3860",
            ),
            PufferProtocol: new this.web3.eth.Contract(
                PufferProtocolABI,
                "0xf7b6B32492c2e13799D921E84202450131bd238B",
            ),
            PufferVault: new this.web3.eth.Contract(
                PufferVaultABI,
                "0xD9A442856C234a39a81a089C06451EBAa4306a72",
            ),
            ValidatorTicket: new this.web3.eth.Contract(
                ValidatorTicketABI,
                "0x7D26AD6F6BA9D6bA1de0218Ae5e20CD3a273a55A",
            ),
        }
    }

    /**
     * Fetches or listens for events depending on the realTime parameter.
     * @param {string} contractName - Name of the contract.
     * @param {string} eventName - Name of the event.
     * @param {number|string} fromBlock - The block number to start fetching events from.
     * @param {number|string} toBlock - The block number to stop fetching events at.
     * @param {boolean} realTime - Whether to listen to events in real-time.
     * @param {Function|null} callback - Optional callback to handle the events.
     * @returns {Promise|undefined} Returns a promise if fetching past events, otherwise undefined.
     */
    async getEvents(
        contractName,
        eventName,
        fromBlock = 19492759,
        toBlock = "latest",
        realTime = false,
        callback = null,
    ) {
        if (realTime) {
            this._listenToEvents(contractName, eventName, callback)
        } else {
            return this._fetchPastEvents(contractName, eventName, fromBlock, toBlock, callback)
        }
    }

    /**
     * Internal method to fetch past events from a specified contract.
     * @param {string} contractName - The name of the contract.
     * @param {string} eventName - The event name.
     * @param {number|string} fromBlock - Starting block number to fetch events.
     * @param {number|string} toBlock - Ending block number to fetch events.
     * @param {Function|null} callback - Optional callback to process each event.
     * @returns {Promise<Array>} Returns a promise that resolves with an array of formatted event data.
     */
    async _fetchPastEvents(contractName, eventName, fromBlock, toBlock, callback) {
        const contract = this.contracts[contractName]
        const events = await contract.getPastEvents(eventName, { fromBlock, toBlock })
        if (callback) {
            return Promise.all(
                events.map((event) =>
                    callback(this._formatEventOutput(event, contract, eventName)),
                ),
            )
        } else {
            return Promise.all(
                events.map((event) => this._formatEventOutput(event, contract, eventName)),
            )
        }
    }

    /**
     * Internal method to listen to real-time events from a specified contract.
     * @param {string} contractName - The name of the contract.
     * @param {string} eventName - The name of the event to subscribe to.
     * @param {Function|null} callback - Callback to handle the event data.
     * @returns {Promise} Returns a subscription object for managing the real-time event listening.
     */
    async _listenToEvents(contractName, eventName, callback) {
        const contract = this.contracts[contractName]
        const eventSignature = this._getEventSignature(contract, eventName)

        if (!eventSignature) {
            console.error(`Event signature for ${eventName} not found in contract ${contractName}`)
            return
        }

        try {
            const subscription = await this.web3.eth.subscribe("logs", {
                address: contract.options.address,
                topics: [eventSignature],
            })

            subscription.on("data", async (event) => {
                const formattedData = await this._formatEventOutput(event, contract, eventName)
                if (callback) {
                    callback(formattedData)
                } else {
                    console.log(formattedData)
                }
            })

            return subscription
        } catch (error) {
            console.error("Error subscribing to events:", error)
        }
    }

    /**
     * Internal method to format the output of an event log.
     * @param {Object} event - The event log object.
     * @param {Object} contract - The contract instance from which the event originated.
     * @param {string} eventName - The name of the event.
     * @returns {Object} Returns a formatted event object including decoded parameters and a custom message.
     */
    async _formatEventOutput(event, contract, eventName) {
        if (!contract || !contract.options || !contract.options.jsonInterface) {
            console.error("Invalid contract object:", contract)
            throw new Error("The contract object is not properly initialized.")
        }

        const eventABI = contract.options.jsonInterface.find(
            (e) => e.type === "event" && e.name === eventName,
        )

        if (!eventABI) {
            console.error(`No ABI entry found for event name: ${eventName}`)
            return
        }

        const decodedParams = this.web3.eth.abi.decodeLog(
            eventABI.inputs,
            event.data,
            event.topics.slice(1),
        )

        let returnValues = {}
        eventABI.inputs.forEach((input) => {
            if (!input.name) return

            if (input.type.includes("tuple")) {
                returnValues[input.name] = this._decodeTuple(
                    decodedParams[input.name],
                    input.components,
                )
            } else {
                returnValues[input.name] = decodedParams[input.name]
            }
        })

        const messageTemplate = this._getMessageTemplate(eventName)
        const message = messageTemplate ? messageTemplate(returnValues) : ""

        return {
            transactionHash: event.transactionHash,
            blockNumber: event.blockNumber,
            event: eventABI.name,
            returnValues: returnValues,
            message: message,
        }
    }

    /**
     * Internal method to decode tuple parameters from event logs.
     * @param {Object} tupleData - The raw tuple data from the log.
     * @param {Array} components - The components of the tuple as described in the ABI.
     * @returns {Object} Returns a decoded tuple object.
     */
    _decodeTuple(tupleData, components) {
        let result = {}
        components.forEach((component) => {
            let value = tupleData[component.name]
            if (component.type.includes("tuple")) {
                value = this._decodeTuple(value, component.components)
            }
            result[component.name] = value
        })
        return result
    }

    /**
     * Internal method to retrieve a message template for a specific event.
     * @param {string} eventName - The name of the event.
     * @returns {Function} Returns a function that formats the event's parameters into a string message.
     */
    _getMessageTemplate(eventName) {
        const strategyMapping = {
            "0x54945180dB7943c0ed0FEE7EdaB2Bd24620256bc": "cbETH",
            "0x93c4b944D05dfe6df7645A86cd2206016c51564D": "stETH",
            "0x1BeE69b7dFFfA4E2d53C2a2Df135C388AD25dCD2": "rETH",
            "0x9d7eD45EE2E8FC5482fa2428f15C971e6369011d": "ETHx",
            "0x13760F50a9d7377e4F20CB8CF9e4c26586c658ff": "ankrETH",
            "0xa4C637e0F704745D182e4D38cAb7E7485321d059": "OETH",
            "0x57ba429517c3473B6d34CA9aCd56c0e735b94c02": "osETH",
            "0x0Fe4F44beE93503346A3Ac9EE5A26b130a5796d6": "swETH",
            "0x7CA911E83dabf90C90dD3De5411a10F1A6112184": "wBETH",
            "0x8CA7A5d6f3acd3A7A8bC468a8CD0FB14B6BD28b6": "sfrxETH",
            "0xAe60d8180437b5C34bB956822ac2710972584473": "lsETH",
            "0x298aFB19A105D59E74658C4C334Ff360BadE6dd2": "mETH",
            "0xbeaC0eeEeeeeEEeEeEEEEeeEEeEeeeEeeEEBEaC0": "Beacon Chain ETH",
        }

        const tokenMapping = {
            "0xBe9895146f7AF43049ca1c1AE358B0541Ea49704": "cbETH",
            "0xae7ab96520de3a18e5e111b5eaab095312d7fe84": "stETH",
            "0xae78736cd615f374d3085123a210448e74fc6393": "rETH",
            "0xA35b1B31Ce002FBF2058D22F30f95D405200A15b": "ETHx",
            "0xE95A203B1a91a908F9B9CE46459d101078c2c3cb": "ankrETH",
            "0x856c4Efb76C1D1AE02e20CEB03A2A6a08b0b8dC3": "OETH",
            "0xf1c9acdc66974dfb6decb12aa385b9cd01190e38": "osETH",
            "0xf951E335afb289353dc249e82926178EaC7DEd78": "swETH",
            "0xa2e3356610840701bdf5611a53974510ae27e2e1": "wBETH",
            "0xac3e018457b222d93114458476f3e3416abbe38f": "sfrxETH",
            "0x8c1BEd5b9a0928467c9B1341Da1D7BD5e10b6549": "lsETH",
            "0xd5f7838f5c461feff7fe49ea5ebaf7728bb0adfa": "mETH",
            "0xbeaC0eeEeeeeEEeEeEEEEeeEEeEeeeEeeEEBEaC0": "Beacon Chain ETH",
        }

        const templates = {
            // Events from PufferModuleManager.sol
            AVSRegistrationSignatureProofUpdated: (params) =>
                `Signature proof for AVS registration updated: ${params.signatureProof}`,
            CompletedQueuedWithdrawals: (params) =>
                `Completed queued withdrawals: withdrawalRoots (${params.withdrawalRoots}), earnings (${params.earnings}), staker (${params.staker})`,
            NonBeaconChainETHBalanceWithdrawn: (params) =>
                `ETH balance (${params.amount}) withdrawn from non-beacon chain to receiver (${params.receiver})`,
            PufferModuleDelegated: (params) =>
                `Puffer module (${params.module}) delegated to delegatee (${params.delegatee})`,
            PufferModuleUndelegated: (params) =>
                `Puffer module (${params.module}) undelegated from undelegatee (${params.undelegatee})`,
            RestakingOperatorAVSSocketUpdated: (params) =>
                `AVS socket updated for restaking operator (${params.operator}): AVS socket (${params.avsSocket})`,
            RestakingOperatorCreated: (params) =>
                `Restaking operator (${params.operator}) created`,
            RestakingOperatorDeregisteredFromAVS: (params) =>
                `Restaking operator (${params.operator}) deregistered from AVS`,
            RestakingOperatorMetadataURIUpdated: (params) =>
                `Metadata URI updated for restaking operator (${params.operator}): Metadata URI (${params.metadataURI})`,
            RestakingOperatorOptedInSlasher: (params) =>
                `Restaking operator (${params.operator}) opted in for slasher`,
            RestakingOperatorRegisteredToAVS: (params) =>
                `Restaking operator (${params.operator}) registered to AVS: Operator details (${JSON.stringify(params.operatorDetails)})`,
            RestakingOperatorRegisteredToAVSWithChurn: (params) =>
                `Restaking operator (${params.operator}) registered to AVS with churn: Operator details (${JSON.stringify(params.operatorDetails)})`,
            ValidatorCredentialsVerified: (params) =>
                `Validator (${params.validator}) credentials verified: Token (${params.token})`,
            VerifiedAndProcessedWithdrawals: (params) =>
                `Verified and processed withdrawals for operator (${params.operator}): Amount (${params.amount})`,
            WithdrawalsQueued: (params) =>
                `Withdrawals queued for operator (${params.operator}): Withdrawals (${params.withdrawals})`,
            
            // Events from PufferProtocol.sol
            MinimumVTAmountChanged: (params) =>
                `Minimum VT amount changed: Old minimum number of days (${params.oldMinimumNumberOfDays}), New minimum number of days (${params.newMinimumNumberOfDays})`,
            ModuleWeightsChanged: (params) =>
                `Module weights changed: Old weights (${params.oldWeights}), New weights (${params.newWeights})`,
            NewPufferModuleCreated: (params) =>
                `New Puffer module created: Module (${params.module}), Module name (${params.moduleName}), Withdrawal credentials (${params.withdrawalCredentials})`,
            NumberOfRegisteredValidatorsChanged: (params) =>
                `Number of registered validators changed: Module name (${params.moduleName}), New number of registered validators (${params.newNumberOfRegisteredValidators})`,
            SuccessfullyProvisioned: (params) =>
                `Successfully provisioned: PubKey (${params.pubKey}), Puffer module index (${params.pufferModuleIndex}), Module name (${params.moduleName})`,
            VTPenaltyChanged: (params) =>
                `VT penalty changed: Old penalty (${params.oldPenalty}), New penalty (${params.newPenalty})`,
            ValidatorExited: (params) =>
                `Validator exited: PubKey (${params.pubKey}), Puffer module index (${params.pufferModuleIndex}), Module name (${params.moduleName}), PufETH burn amount (${params.pufETHBurnAmount}), VT burn amount (${params.vtBurnAmount})`,
            ValidatorKeyRegistered: (params) =>
                `Validator key registered: PubKey (${params.pubKey}), Puffer module index (${params.pufferModuleIndex}), Module name (${params.moduleName}), Using enclave (${params.usingEnclave})`,
            ValidatorLimitPerModuleChanged: (params) =>
                `Validator limit per module changed: Old limit (${params.oldLimit}), New limit (${params.newLimit})`,
            ValidatorSkipped: (params) =>
                `Validator skipped: PubKey (${params.pubKey}), Puffer module index (${params.pufferModuleIndex}), Module name (${params.moduleName})`,
            ValidatorTicketsDeposited: (params) =>
                `Validator tickets deposited: Node (${params.node}), Depositor (${params.depositor}), Amount (${params.amount})`,
            ValidatorTicketsWithdrawn: (params) =>
                `Validator tickets withdrawn: Node (${params.node}), Recipient (${params.recipient}), Amount (${params.amount})`,
            
            // Events from PufferVault.sol
            AssetsWithdrawnToday: (params) =>
                `Assets withdrawn today: Withdrawal amount (${params.withdrawalAmount})`,
            ClaimedWithdrawals: (params) =>
                `Claimed withdrawals: Request IDs (${params.requestIds})`,
            DailyWithdrawalLimitSet: (params) =>
                `Daily withdrawal limit set: Old limit (${params.oldLimit}), New limit (${params.newLimit})`,
            Deposit: (params) =>
                `Deposit: Sender (${params.sender}), Owner (${params.owner}), Assets (${params.assets}), Shares (${params.shares})`,
            ExitFeeBasisPointsSet: (params) =>
                `Exit fee basis points set: Previous fee (${params.previousFee}), New fee (${params.newFee})`,
            LidoWithdrawal: (params) =>
                `Lido withdrawal: Expected withdrawal (${params.expectedWithdrawal}), Actual withdrawal (${params.actualWithdrawal})`,
            RequestedWithdrawals: (params) =>
                `Requested withdrawals: Request IDs (${params.requestIds})`,
            Transfer: (params) =>
                `Transfer: From (${params.from}), To (${params.to}), Value (${params.value})`,
            TransferredETH: (params) =>
                `Transferred ETH: To (${params.to}), Amount (${params.amount})`,
            Withdraw: (params) =>
                `Withdraw: Sender (${params.sender}), Receiver (${params.receiver}), Owner (${params.owner}), Assets (${params.assets}), Shares (${params.shares})`,
            
            // Events from ValidatorTicket.sol
            DispersedETH: (params) =>
                `Dispersed ETH: Amount (${params.amount}), Recipient (${params.recipient})`,
            GuardiansFeeChanged: (params) =>
                `Guardians fee changed: Previous fee (${params.previousFee}), New fee (${params.newFee})`,
            ProtocolFeeChanged: (params) =>
                `Protocol fee changed: Previous fee (${params.previousFee}), New fee (${params.newFee})`,
            Transfer: (params) =>
                `Transfer: From (${params.from}), To (${params.to}), Value (${params.value})`,
            TransferredETH: (params) =>
                `Transferred ETH: To (${params.to}), Amount (${params.amount})`
        };
        return templates[eventName]
    }

    /**
     * Internal method to retreive signature of an event from its contract ABI.
     * @param {Object} contract
     * @param {String} eventName
     * @returns
     */
    _getEventSignature(contract, eventName) {
        const eventABI = contract.options.jsonInterface.find(
            (e) => e.name === eventName && e.type === "event",
        )
        if (!eventABI) return null

        const signature = `${eventName}(${eventABI.inputs.map((input) => input.type).join(",")})`
        return this.web3.utils.sha3(signature)
    }
}

export default PufferEvents
