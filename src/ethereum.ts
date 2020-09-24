import Web3 from "web3";
import type { SendOptions } from 'web3-eth-contract'

type NumericalString = string;
type Address = string;

export type Web3Provider = Web3 | null;
type ContractMethod<ReturnType> = {
    call: () => Promise<ReturnType>;
    send: (options:SendOptions) => Promise<ReturnType>;
}

export interface ERC20Contract {
    methods: {
        decimals: () => ContractMethod<NumericalString>,
        totalSupply: () => ContractMethod<NumericalString>,
        allowance: (owner: Address, spender: Address) => ContractMethod<NumericalString>,
        approve: (address:Address,amount:NumericalString) => ContractMethod<void>,
        balanceOf: (address:Address) => ContractMethod<NumericalString>
    }
}

export interface VaultContract {
    methods: {
        balanceOf: (address:Address) => ContractMethod<NumericalString>,
        balance: () => ContractMethod<NumericalString>,
        deposit: (amount: NumericalString) => ContractMethod<void>,
        depositAll: () => ContractMethod<void>,
        withdraw: (amount: NumericalString) => ContractMethod<void>,
        withdrawAll: () => ContractMethod<void>,
        token: () => ContractMethod<Address>
    }
}