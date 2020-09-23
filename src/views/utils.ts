export default function displayTokenValue(amount: string, tokenDecimals:number): string {
    const padded = amount.padStart(tokenDecimals + 1, '0');
    const decimals = padded.substr(-tokenDecimals).replace(/0+$/, '')
    const int = padded.substr(0, padded.length - tokenDecimals);
    return `${int}.${decimals}`
}