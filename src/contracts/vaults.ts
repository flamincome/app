import deployedAddresses from './deployedAddresses';
import icons from 'base64-cryptocurrency-icons';

export const tokens = [
    "USDT",
    "wBTC",
    "renBTC",
    "wETH",
    "TUSD",
    "yCRV",
    "sBTC",
    "USDC",
    "yDAI",
    "crvBTC",
    "DAI",
]

const vaults = tokens.reduce((acc, token)=>{
    let icon = icons[token.toUpperCase()]?.icon;
    if(token === "wETH"){
        icon =  icons['ETH']!.icon;
    } else if(token === "yCRV" || token === "yDAI" || token === "crvBTC"){
        icon = icons[token.substr(-3)]!.icon
    }
    acc[token]={
        address: deployedAddresses[`VaultBaseline${token}`],
        logo: icon!,
    };
    return acc;
}, {} as {
    [token:string]:{
        address: string,
        logo: string,
    }
});

export default vaults;