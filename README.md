# Conflux DevKit HardHat Ignition Viem

## Description

This project enhances Hardhat's viem sample project with Hardhat Ignition for Conflux eSpace. It is based on the Conflux DevKit devcontainer. For more details, refer to the [Conflux Devkit README](https://github.com/SPCFXDA/conflux-devkit/blob/main/README.md). You can use this repository in GitHub Codespaces or with VS Code devcontainer support.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Local Chain](#local-chain)
  - [Deploy to eSpace](#deploy-to-espace)
  - [Deploy to Core](#deploy-to-core)

## Installation

On the first execution the system will guide the user in the creation of a mnemonic key to use during development, and will auto configure the first 10 accounts in the node to be ready to be used, this is a one time operation because the local node will persist the blockchain data, so at any time you can continue your development where you left, without the need to reinitialize the accounts or deployed smart contracts.

Once the system is ready to install the package, use npm:

```bash
npm install
```


## Usage

### Local Chain

To start the development node, use:

```bash
hh node
```

To get the balance of the configured keys:

```bash
hh balance --network <network>
```

NOTE: the autocompletion is active, you can use <tab><tab> to complete or list the available options, like the available network name

To list all available signer adresses:

```bash
hh accounts
```

### Deploy to eSpace

To deploy a contract on the local eSpace using Ignition, use:

```bash
hh ignition deploy ignition/modules/Lock.ts --network confluxESpaceLocal
```
