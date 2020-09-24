import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import { VaultContract, ERC20Contract } from "../../ethereum";
import vaultABI from '../../contracts/ABIs/vault.json'
import erc20ABI from '../../contracts/ABIs/IERC20.json'
import vaults from '../../contracts/vaults'
import tokenAddresses from '../../contracts/tokens'
import Web3 from "web3";
import type { AbiItem } from 'web3-utils'
import displayTokenValue from '../utils'
import BN from 'bn.js'
import "./DepositPrompt.css"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > *": {
                margin: theme.spacing(1),
                //width: '25ch',
            },
        },
        wideTextField: {
            width: "100%",
        },
    })
);

const sharedInputProps = {
    variant: "outlined" as const,
    InputLabelProps: {
        shrink: true,
    },
};

function getMaxAmount(tokenContract: ERC20Contract, web3: Web3, deposit:boolean): Promise<string> {
    if(deposit){
        return tokenContract.methods.balanceOf(userAddress).call();
    } else {
        return vaultContract.methods.balanceOf(userAddress).call();
    }
}

function parseNumber(amount: string) {
    let [int, decimals] = amount.split('.');
    decimals = decimals ?? '';
    int = int.replace(/^0+/, '');
    decimals = decimals.padEnd(tokenDecimals, '0')
    return int + decimals;
}

async function depositToken(amount: string, web3: Web3, finish: () => void) {
    try {
        const allowanceResult = tokenContract.methods.allowance(userAddress, vaultContractAddress).call()
        const num = new BN(amount);
        const allowance = new BN(await allowanceResult)

        if (allowance.lt(num)) {
            if (allowance.gt(new BN(0))) {
                await tokenContract.methods.approve(vaultContractAddress, '0').send({ from: userAddress });
            }
            await tokenContract.methods.approve(vaultContractAddress, amount).send({ from: userAddress });
        }
        await vaultContract.methods.deposit(amount).send({ from: userAddress })
        finish();
    } catch (e) {
        finish();
    }
}

async function withdrawToken(amount: string, web3: Web3, finish: () => void) {
    try {
        await vaultContract.methods.withdraw(amount).send({ from: userAddress })
        finish();
    } catch (e) {
        finish();
    }
}

let currentAsset: string;
let tokenLogo: string;
let vaultContractAddress: string;
let vaultContract: VaultContract;
let tokenContract: ERC20Contract;
let tokenDecimals: number;
let userAddress: string;

interface Props { web3: Web3, asset: string, goBack: () => void, deposit:boolean }
function initializeValues(props: Props) {
    if (currentAsset === props.asset) {
        return; // Already initialized
    }
    currentAsset = props.asset;
    const { logo, address } = vaults[props.asset];
    vaultContractAddress = address;
    vaultContract = new props.web3.eth.Contract(vaultABI as AbiItem[], address) as VaultContract;
    const underlyingToken = tokenAddresses[props.asset];
    tokenDecimals = underlyingToken.decimals;
    tokenContract = new props.web3.eth.Contract(erc20ABI as AbiItem[], underlyingToken.address) as ERC20Contract;
    tokenLogo = logo;
    userAddress = (props.web3.currentProvider as any).selectedAddress;
}

async function checkAmount(rawAmount:string, deposit:boolean, setError:(error:null|string)=>void){
    const balance = new BN(await (deposit?tokenContract:vaultContract).methods.balanceOf(userAddress).call());
    const amount = new BN(parseNumber(rawAmount));
    if(amount.gt(balance)){
        setError("Your balance is too low")
    } else {
        setError(null)
    }
}

export default function DepositPrompt(props: Props) {
    const [amount, setAmount] = React.useState('0');
    const [error, setError] = React.useState<null|string>(null);
    const [depositInProgress, setDepositInProgress] = React.useState(false);
    initializeValues(props);

    const classes = useStyles();
    return <>
        <Grid container spacing={3} className="verticalCenter">
            <Grid item xs={9}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        label="Amount"
                        {...sharedInputProps}
                        error={error !== null}
                        helperText={error}
                        className={classes.wideTextField}
                        onChange={(event) => {
                            setAmount(event.target.value)
                            checkAmount(event.target.value, props.deposit, setError)
                        }}
                        value={amount}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <img
                                        src={tokenLogo}
                                        height={20}
                                        alt="coin logo"
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                </form>
            </Grid>
            <Grid item xs={3}>
                <Button variant="contained" color="default" size="large" onClick={async () => {
                    setAmount(displayTokenValue(await getMaxAmount(tokenContract, props.web3, props.deposit), tokenDecimals));
                }}>
                    Max
              </Button>
            </Grid>
            {
                depositInProgress ?
                    <Grid item xs={12}>
                        <CircularProgress />
                    </Grid> :
                    <>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={error!==null}
                            onClick={
                                () => {
                                    setDepositInProgress(true);
                                    if(props.deposit){
                                    depositToken(
                                        parseNumber(amount),
                                        props.web3,
                                        () => {
                                            setDepositInProgress(false)
                                        }
                                    )
                                    } else {
                                        withdrawToken(
                                            parseNumber(amount),
                                            props.web3,
                                            () => {
                                                setDepositInProgress(false)
                                            }
                                        )
                                    }
                                }
                            }>
                                {props.deposit?"Deposit":"Withdraw"}
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="default" size="large" onClick={props.goBack}>
                                Go back
                            </Button>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </>
            }
        </Grid>
    </>
}