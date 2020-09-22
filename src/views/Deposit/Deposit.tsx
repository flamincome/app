import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Web3Provider, Operator, Ln2tbtcContract } from "../../ethereum";
import Web3 from "web3";
import type { AbiItem } from 'web3-utils';
import Invoice from './Invoice';
import "./Deposit.css";

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
  type: "number",
  variant: "outlined" as const,
  InputLabelProps: {
    shrink: true,
  },
};

export default function Deposit(props: { web3: Web3Provider }) {
  const classes = useStyles();
  const [stage, setStage] = React.useState<'initial' | 'invoice'>('initial');
  const [fromAmount, setFromAmount] = React.useState<number | null>(null);
  let error = false;
  if (stage === 'initial') {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <form className={classes.root} noValidate autoComplete="off">
              {/*
              <TextField
                label="From"
                {...sharedInputProps}
                className={classes.wideTextField}
                error={error}
                helperText={error ? "No operator provides enough liquidity to swap this much" : undefined}
                onChange={(event) => setFromAmount(Number(event.target.value))}
                inputProps={{
                  step: 0.001,
                  min: 0,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={'TODO'}
                        height={getLogoSize(fromLN)}
                        alt="coin logo"
                      />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="To"
                {...sharedInputProps}
                className={classes.wideTextField}
                value={1}
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={'TODO'}
                        height={getLogoSize(!fromLN)}
                        alt="coin logo"
                      />
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  step: 0.001,
                  min: 0,
                }}
              />
              */}
            </form>
          </Grid>
          <Grid item xs={3}>
          </Grid>
        </Grid>
        {props.web3 === null ? undefined : (
          <Button variant="contained" color="primary" size="large" disabled={error} onClick={() => {
            if (error === false) {
              setStage('invoice')
            }
          }}>
            Swap
          </Button>
        )}
      </>
    );
  } else if (stage === 'invoice' && props.web3 !== null) {
    return <Grid container spacing={3}>
    <Grid item xs={12}><Invoice web3={props.web3} operatorAddress={'0xCD8dD5596b8c83A6a98C9A8Cf33d2565d4c43A9A'} tBTCAmount={String(fromAmount!*10**8)}/></Grid></Grid>
  } else {
    return <></>
  }
}
