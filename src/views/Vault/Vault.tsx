import React from "react";
import vaults from '../../contracts/vaults'

export default function Vault(props: {asset:string}) {
    const {address, logo, name} = vaults[props.asset];
    return <>
        <img src={logo} />
    </>;
}