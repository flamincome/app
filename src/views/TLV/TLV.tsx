import React from "react";
import Typography from '@material-ui/core/Typography';
import Odometer from 'react-odometerjs';
import './TLV.css';
import './odometer-theme-default.css'

function formatNumber(x: number) {
  return Math.floor(x) //.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function TLVCounter() {
  const [tlv, setTlv] = React.useState<null | number>(null);
  React.useEffect(() => {
    const ws = new WebSocket("wss://flamincome-tlv-pubsub.herokuapp.com/");
    ws.onmessage=message=>{
      setTlv(Number(message.data))
    }
  });
  if (tlv === null) {
    return <></>
  } else {
    return <Typography variant="h4" className="tlv">
      TLV: <Odometer value={formatNumber(tlv)} format="(.ddd),dd" /> USD
  </Typography>
  }
}
