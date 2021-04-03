import React from "react";
import AlertDialog from "../AlertDialog/AlertDialog";
import "./Footer.css";

export default function Footer() {
  const [dialog, setDialog] = React.useState<"about" | "contact" | null>(null);

  const handleClose = () => {
    setDialog(null);
  };
  const a = <>a</>;
  return (
    <footer>
      <a href="https://github.com/flamincome">Code</a>&nbsp;·&nbsp;
      <a href="https://docs.flamincome.finance">
        Docs
      </a>
      &nbsp;·&nbsp;
      <button
        type="button"
        className="link-button"
        onClick={() => setDialog("about")}
      >
        About
      </button>
      &nbsp;·&nbsp;
      <button
        type="button"
        className="link-button"
        onClick={() => setDialog("contact")}
      >
        Contact us
      </button>
      <AlertDialog
        title={dialog === "about" ? "About" : "Contact us"}
        open={dialog !== null}
        handleClose={handleClose}
      >
        {dialog === "about" ? (
          <>
            FlamIncome is a yield farming aggregator.
            <br />
            <br />
            If you'd like to learn more about how everything works check out our{" "}
            <a href="https://docs.flamincome.finance">
              our docs
            </a>
            .
          </>
        ) : (
          <>
            Just open an issue on one of the github repos
          </>
        )}
      </AlertDialog>
    </footer>
  );
}
