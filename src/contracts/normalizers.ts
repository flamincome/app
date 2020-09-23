import deployedAddresses from './deployedAddresses';
import icons from 'base64-cryptocurrency-icons';

const tokens = [
    "sBTC",
    "TUSD",
    "wETH",
    "USDC",
    "USDT",
    "DAI",
    "renBTC",
    "wBTC",
];

const normalizers = tokens.reduce((acc, token) => {
    let tokenDetails = icons[token.toUpperCase()];
    if (token === "wETH") {
        tokenDetails = {
            name: 'wETH',
            icon: icons['ETH']!.icon
        }
    }
    acc[token] = {
        address: deployedAddresses[`NormalizerMethane${token}`],
        logo: tokenDetails!.icon,
        name: tokenDetails!.name
    };
    return acc;
}, {} as {
    [token: string]: {
        address: string,
        logo: string,
        name: string
    }
});

export default normalizers;