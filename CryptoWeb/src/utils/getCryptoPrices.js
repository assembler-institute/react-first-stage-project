import axios from "axios";

const KEY = process.env.REACT_APP_COINMARKET_KEY;

export default async function getCryptoPrices(array) {
  try {
    const response = await axios.all(
      array.map(async (crypto) => {
        const res = await axios.get(
          `/tools/price-conversion?id=${crypto.id}&amount=${crypto.amount}`,
          {
            headers: {
              "X-CMC_PRO_API_KEY": KEY,
            },
          }
        );
        return res;
      })
    );
    return response;
  } catch (err) {
    return err;
  }
}
