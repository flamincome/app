import deployedAddresses from './deployedAddresses';
import icons from 'base64-cryptocurrency-icons';

const tokens = [
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
    let tokenDetails = icons[token.toUpperCase()];
    if(token === "wETH"){
        tokenDetails = {
            name: 'wETH',
            icon: icons['ETH']?.icon!
        }
    } else if(token === "yCRV" || token === "yDAI" || token === "crvBTC"){
        tokenDetails = {
            name: token,
            icon: icons[token.substr(-3)]?.icon!
        }
    }
    acc[token]={
        address: deployedAddresses[`VaultBaseline${token}`],
        logo: tokenDetails?.icon!,
        name:tokenDetails?.name!
    };
    return acc;
}, {} as {
    [token:string]:{
        address: string,
        logo: string,
        name: string
    }
});

export default vaults;