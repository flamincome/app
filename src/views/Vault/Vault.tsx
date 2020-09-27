import React from "react";
import Grid from "@material-ui/core/Grid";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import IconButton from "@material-ui/core/IconButton";
import vaultABI from '../../contracts/ABIs/vault.json'
import { ERC20Contract, Web3Provider } from "../../ethereum";
import vaults from '../../contracts/vaults'
import type { AbiItem } from 'web3-utils'
import Web3 from "web3";
import displayTokenValue from '../utils'
import "./Vault.css";

async function getBalance(asset:string, web3: Web3, vaultAddress:string){
    const vaultContract = new web3.eth.Contract(vaultABI as AbiItem[], vaultAddress) as ERC20Contract;
    const tokenDecimals = vaultContract.methods.decimals().call() 
    const userAddress = (web3.currentProvider as any).selectedAddress;
    const balance = await vaultContract.methods.balanceOf(userAddress).call()
    return displayTokenValue(balance, Number(await tokenDecimals));
}

export default function Vault(props: { asset: string, apy:number|null, web3:Web3Provider, deposit:boolean, onClick: ()=>void }) {
    const { logo, address } = vaults[props.asset];
    const [balance, setBalance] = React.useState('0');
    if(props.web3!==null && props.deposit === false){
        getBalance(props.asset, props.web3, address).then(setBalance);
    }
    const APYlabel = props.apy===null?'':`APY: ${props.apy}%`
    return <Grid container spacing={3} className="vault">
        <Grid item xs={2}>
            <img src={logo} alt="coin logo"/>
        </Grid>
        <Grid item xs={4}>
            {props.asset}
        </Grid>
        <Grid item xs={3}>
            {props.deposit?APYlabel:`Balance: ${balance}`}
        </Grid> 
        <Grid item xs={3}>
        <IconButton
              aria-label="deposit"
              onClick={props.onClick}
              className="iconButton"
            >
              <AccountBalanceWalletIcon/>
            </IconButton>
        </Grid>
    </Grid>;
}
