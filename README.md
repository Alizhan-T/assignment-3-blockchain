# Web3 DApp & Smart Contracts (Solidity + Hardhat)

A decentralized application (DApp) and smart-contract engineering repository featuring **Solidity** contracts, **Hardhat** deployment & test suites, a browser Web3 client, and architecture notes.

## Repository Structure

```text
assignment-3-blockchain/
├── 01-theory/            # Blockchain fundamentals & architecture notes (parts 1–7)
├── 02-minimal-dapp/      # Minimal Web3 browser client (index.html, app.js)
└── 04-hardhat/           # Solidity contracts (Counter.sol, SimpleToken.sol), deploy scripts & tests
```

## Quick Start (Hardhat)

```bash
cd 04-hardhat
npm install
npx hardhat compile
npx hardhat test
```

## Minimal DApp

Serve `02-minimal-dapp/` locally (e.g., `python3 -m http.server 8080`) and connect with MetaMask to interact with your deployed contract.
