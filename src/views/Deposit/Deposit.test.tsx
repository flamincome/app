import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Deposit from "./ListVaults";

test("snapshot of initial state", () => {
  expect(render(<Deposit deposit={true} web3={null} connectWallet={async ()=>{}} />).baseElement).toMatchSnapshot();
});
