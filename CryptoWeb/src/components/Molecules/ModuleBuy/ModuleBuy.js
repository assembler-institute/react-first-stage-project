import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RegularButton from "../../Atoms/RegularButton/RegularButton";
import TextField from "@mui/material/TextField";
import { CryptoWebContext } from "../../../context/CryptoWeb/reducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const { typingInvestment, cryptoAmount, USDSpent, buyCurrency } =
    React.useContext(CryptoWebContext);
  const { crypto } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleInvestment(e) {
    let newCryptoAmount = e.target.value / crypto.quote.USD.price;
    typingInvestment(newCryptoAmount, e.target.value);
  }

  function handleBuy() {
    const buyInfo = {
      crypto: crypto,
      cryptoAmount: cryptoAmount,
      USDSpent: USDSpent,
    };
    buyCurrency(buyInfo);
  }

  return (
    <div>
      <Button onClick={handleOpen}>Buy</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {crypto && `${crypto.name} - ${crypto.symbol}`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {crypto &&
              `Your current amount: ${
                crypto.amount === undefined ? 0 : crypto.amount
              }`}
            <div style={{ marginTop: "1rem" }}>
              <TextField
                onChange={handleInvestment}
                id="outlined-number"
                label="$$$"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <p>{crypto && `${crypto.name} amount: ${cryptoAmount}`}</p>
            <RegularButton onClick={handleBuy}>Buy</RegularButton>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
