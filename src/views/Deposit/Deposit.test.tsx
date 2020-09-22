import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Deposit from "./Deposit";

test("snapshot of initial state", () => {
  expect(render(<Deposit web3={null} />).baseElement).toMatchSnapshot();
});
