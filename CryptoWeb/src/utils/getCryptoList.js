import axios from "axios";

const KEY = process.env.REACT_APP_COINMARKET_KEY;

export default async function getCryptoList() {
  try {
    const res = await axios.get(`/cryptocurrency/listings/latest?limit=10`, {
      headers: {
        "X-CMC_PRO_API_KEY": KEY,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
}
