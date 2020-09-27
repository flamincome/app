import React from "react";
import { Web3Provider } from "../../ethereum";
import "./Deposit.css";
import Divider from '@material-ui/core/Divider';
import { tokens } from '../../contracts/vaults'
import Vault from '../Vault/Vault'
import DepositPrompt from './DepositPrompt'

type APYResponse = {
  token: string,
  percentageAPY: number
}[]

function selectAPY(APYs: APYResponse, searchedToken: string) {
  return APYs.find(({ token }) => token === searchedToken)
}

export default function ListVaults(props: { web3: Web3Provider, connectWallet: () => Promise<void>, deposit: boolean }) {
  const [vaultToken, setVaultToken] = React.useState<string | null>(null);
  const [APYs, setAPYs] = React.useState<APYResponse>([]);
  React.useEffect(() => {
    fetch('https://flamincome-tlv-pubsub.herokuapp.com/apy')
      .then(res => res.json())
      .then(setAPYs)
  }, [])
  if (props.web3 === null && props.deposit === false) {
    return <></>
  }
  if (vaultToken === null) {
    return (
      <>
        {tokens.map(asset => <div key={asset}><Vault
          asset={asset}
          web3={props.web3}
          apy={selectAPY(APYs, asset)?.percentageAPY ?? null}
          deposit={props.deposit}
          onClick={async () => {
            if (props.web3 === null) {
              await props.connectWallet();
              setVaultToken(asset)
            } else {
              setVaultToken(asset)
            }
          }} />
          <Divider /></div>)
        }
      </>
    );
  } else if (vaultToken !== null) {
    if (props.web3 === null) {
      props.connectWallet();
      return <></> // Should never happen
    } else {
      return <DepositPrompt asset={vaultToken} deposit={props.deposit} web3={props.web3} goBack={() => { setVaultToken(null) }} />
    }
  } else {
    return <></>
  }
}
