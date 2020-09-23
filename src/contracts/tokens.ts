// Addresses extracted from the `token` property of the deployed vaults

const contractAddresses = {
    "USDT": {
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        decimals: 6
    },
    "wBTC": {
        address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        decimals: 8
    },
    "renBTC": {
        address: "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
        decimals: 8
    },
    "wETH": {
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        decimals: 18
    },
    "TUSD": {
        address: "0x0000000000085d4780b73119b644ae5ecd22b376",
        decimals: 18
    },
    "yCRV": {
        address: "0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8",
        decimals: 18
    },
    "sBTC": {
        address: "0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6",
        decimals: 18
    },
    "USDC": {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        decimals: 6
    },
    "yDAI": {
        address: "0x16de59092dae5ccf4a1e6439d611fd0653f0bd01",
        decimals: 18
    },
    "crvBTC": {
        address: "0x075b1bb99792c9e1041ba13afef80c91a1e70fb3",
        decimals: 18
    },
    "DAI": {
        address: "0x6b175474e89094c44da98b954eedeac495271d0f",
        decimals: 18
    },
} as {
    [token: string]: { address: string, decimals: number }
}

    export default contractAddresses;