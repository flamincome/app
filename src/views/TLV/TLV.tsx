import React from "react";
import Web3 from 'web3';
import { ERC20Contract, Web3Provider } from "../../ethereum";
import vaults from '../../contracts/vaults'
import type { AbiItem } from 'web3-utils'
import vaultABI from '../../contracts/ABIs/vault.json'
import tokens from '../../contracts/tokens'
import Typography from '@material-ui/core/Typography';
import './TLV.css';

type CoingeckoAPIResponse = { [adress: string]: { usd: number } }

function getContracts(web3: Web3) {
  return Object.entries(vaults).map(([token, { address }]) => {
    const vaultContract = new web3.eth.Contract(vaultABI as AbiItem[], address) as ERC20Contract;
    const decimals = vaultContract.methods.decimals().call();
    const tokenAddress = tokens[token].address;
    //const decimals = Promise.resolve(tokens[token].decimals);
    const getPrice = async () => {
      if (token === 'yDAI') {
        return Promise.resolve(1);
      } else {
        return fetch(`https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddress}&vs_currencies=usd`)
          .then(res => res.json())
          .then((res: CoingeckoAPIResponse) => Object.values(res)[0]['usd'])
      }
    }

    return {
      getPrice,
      vaultContract,
      decimals,
      token
    }
  })
}

type Contract = ReturnType<typeof getContracts>[0]

async function getVaultTLV(contract: Contract) {
  const totalSupply = contract.vaultContract.methods.totalSupply().call().then(res => Number(res))
  const price = contract.getPrice();
  const decimals = contract.decimals.then(res => Number(res));
  const normalizedSupply = (await totalSupply) / (10 ** (await decimals)) // Integer division, we are losing the decimals
  console.log(contract.token, await totalSupply, normalizedSupply)
  return normalizedSupply * (await price);
}

async function setTotalTLV(contracts: Contract[]) {
  const tlvs = await Promise.all(contracts.map(getVaultTLV))
  return tlvs.reduce((totalTLV, vaultTLV) => totalTLV + vaultTLV)
}

function formatNumber(x: number) {
  return Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function TLVCounter(props: {web3: Web3Provider}) {
  const [tlv, setTlv] = React.useState<null | number>(null);
  React.useEffect(() => {
    const web3 = props.web3 ?? new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/52ad5d0ae18d4d9dbf2f53b94e3907c7'))
    const contracts = getContracts(web3);
    const update = ()=> setTotalTLV(contracts).then(setTlv)
    update()
    setInterval(update,10*1000) // 10 secs
  }, [props]);
  if (tlv === null) {
    return <></>
  } else {
    return <Typography variant="h4" className="tlv">
      TLV: {formatNumber(tlv)} USD
  </Typography>
  }
}
