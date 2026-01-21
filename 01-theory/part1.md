# Part 1 — Theory
## 1) Web3.js vs Ethers.js
### 1.1 Purpose and philosophy
Web3.js and Ethers.js are JavaScript libraries designed to enable web applications to interact with the Ethereum blockchain. They provide developers with tools for reading blockchain data, sending transactions, and interacting with smart contracts directly from JavaScript environments.
The primary purpose of these libraries is to abstract low-level JSON-RPC communication with Ethereum nodes and expose a more convenient and developer-friendly API. Instead of manually constructing RPC requests, developers can work with higher-level concepts such as providers, accounts, and contract instances.
### 1.2 Package structure and developer experience
Both Web3.js and Ethers.js provide modular package structures that are designed to simplify blockchain development in JavaScript environments. Web3.js historically exposes a broader API surface, grouping many functionalities under the main `web3` object, including modules for accounts, contracts, and network interaction.
Ethers.js, on the other hand, focuses on a more minimalistic and opinionated design. It emphasizes smaller, well-defined components such as providers, signers, and contract instances. This approach often results in clearer separation of concerns and improved readability of application code, especially in larger projects.
From a developer experience perspective, Ethers.js is frequently praised for its concise syntax, strong documentation, and predictable behavior. Web3.js remains widely used due to its maturity, extensive ecosystem, and compatibility with legacy projects, making both libraries suitable depending on project requirements and developer preferences.
### 1.3 Providers & Signers
In Ethereum-based applications, the concepts of providers and signers define how an application interacts with the blockchain. A provider represents a connection to an Ethereum network and is responsible for reading blockchain data such as blocks, balances, and contract state.
A signer, in contrast, is an entity that is capable of signing transactions using a private key. Signers are required whenever an application needs to perform state-changing operations, such as transferring tokens or calling smart contract functions that modify storage.
Ethers.js explicitly separates these two concepts, which improves clarity and security. Developers can safely use providers for read-only operations while restricting signers to actions that require user authorization. In Web3.js, similar functionality exists but is often accessed through a unified interface, making the distinction less explicit but functionally equivalent.
### 1.4 Contract interaction: call vs send
Smart contract interaction in Ethereum can be divided into two main categories: read-only calls and state-changing transactions. A call operation is used to read data from a smart contract without modifying the blockchain state. Such operations do not require gas fees because they are executed locally by the node as a simulation.
In contrast, a send operation creates a transaction that modifies the blockchain state. This includes transferring tokens, updating contract storage, or invoking functions that change variables. Send operations must be signed by a signer and require gas fees, as they are executed by validators and included in a block.
Understanding the difference between call and send operations is essential for efficient and secure dApp development. Developers should use call for querying contract state and reserve send operations only for actions that intentionally modify on-chain data.
### 1.5 Error handling and debugging
Both Web3.js and Ethers.js provide mechanisms for handling common blockchain-related errors, such as transaction reverts, invalid parameters, and user-rejected transactions. Errors may occur due to insufficient gas, failed require statements in smart contracts, or network issues.
Effective error handling allows developers to display meaningful feedback to users and simplify debugging during development. Modern tooling and clear error messages improve reliability and user experience in decentralized applications.
### 1.6 Ecosystem and use-cases
Web3.js and Ethers.js are widely used in decentralized application development and supported by a large ecosystem of tools and frameworks. Web3.js is commonly found in legacy projects and applications requiring broad compatibility.
Ethers.js is frequently preferred in modern projects due to its lightweight design, clear abstractions, and strong documentation. Both libraries are suitable for interacting with smart contracts, wallets, and Ethereum-based networks.
### 1.7 Conclusion
Both Web3.js and Ethers.js serve the same fundamental purpose of enabling interaction with the Ethereum blockchain. The choice between them depends on project requirements, existing infrastructure, and developer preference rather than technical limitations.
### 1.8 Code examples
#### Ethers.js example
'''javascript
import { ethers } from "ethers";
// Create a provider using an injected wallet (e.g. MetaMask)
const provider = new ethers.BrowserProvider(window.ethereum);
// Request access to user accounts
await provider.send("eth_requestAccounts", []);
// Get a signer for sending transactions
const signer = await provider.getSigner();
// Create a contract instance
const contract = new ethers.Contract(
  "0xContractAddress",
  contractAbi,
  signer
);
// Read data from the blockchain (no gas required)
const balance = await contract.balanceOf(await signer.getAddress());

## 2) Connecting to an Ethereum network

### 2.1 What it means to connect
Connecting to an Ethereum network means allowing a decentralized application to communicate with a blockchain node. Through this connection, a dApp can read blockchain data and submit transactions to the network.
### 2.2 JSON-RPC and wallet provider
Ethereum communication is based on the JSON-RPC protocol, which defines a standard set of methods for interacting with blockchain nodes. Wallets such as MetaMask act as providers by injecting a JSON-RPC interface into the browser environment.
### 2.3 Requesting accounts
Before sending transactions, a dApp must request permission to access user accounts. This is typically done using the `eth_requestAccounts` method, which prompts the user to approve account access in their wallet.
### 2.4 Provider vs Signer
A provider allows read-only access to the blockchain, while a signer is required to sign and send state-changing transactions. Separating these roles improves security and clarity in decentralized applications.
### 2.5 Networks
Ethereum applications can connect to different networks, including local development networks, public testnets, and the main Ethereum network. Each network serves a different purpose during development, testing, and production deployment.
### 2.6 Security basics
Decentralized applications should never handle private keys directly in the frontend. Using wallet providers helps protect user credentials and ensures that sensitive operations require explicit user approval.

## 3) Transaction lifecycle

### 3.1 Transaction creation
A transaction is created when a user initiates an action that changes blockchain state. It contains fields such as recipient address, data payload, value, gas limit, and nonce.
### 3.2 Signing
Before being sent to the network, a transaction must be signed using the sender’s private key. Wallets handle this process securely and never expose private keys to the application.
### 3.3 Broadcasting
After signing, the transaction is broadcast to the Ethereum network via a connected node. The transaction is then propagated to other nodes for validation.
### 3.4 Mempool
Once broadcast, the transaction enters the mempool, where it waits to be included in a block. Validators select transactions from the mempool based on fee priority and network conditions.
### 3.5 Fees (EIP-1559)
Ethereum uses the EIP-1559 fee mechanism, which separates base fees from priority fees. This model improves fee predictability and burns the base fee to reduce token supply.
### 3.6 Execution and receipt
When included in a block, the transaction is executed by the Ethereum Virtual Machine. A transaction receipt is generated, containing execution status, gas usage, and emitted events.
### 3.7 Confirmations and finality
After inclusion in a block, a transaction gains confirmations as new blocks are added. In proof-of-stake Ethereum, finality provides strong guarantees that transactions cannot be reverted.
### 3.8 Lifecycle diagram
User → Wallet → Network → Mempool → Block → Execution → Receipt → Finality