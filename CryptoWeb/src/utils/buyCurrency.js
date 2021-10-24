import getCryptoPrices from "./getCryptoPrices";

export default function buyCurrency({ crypto, cryptoAmount, USDSpent }, user) {
  const currentUSD = user.USD - USDSpent;
  const cryptoRecord = user.cryptos.find(({ id }) => id === crypto.id);
  const newCryptos = () => {
    if (cryptoRecord === undefined) {
      return [
        ...user.cryptos,
        {
          id: crypto.id,
          amount: cryptoAmount,
        },
      ];
    } else {
      return user.cryptos.map((c) => {
        if (c.id === crypto.id) {
          c.amount += cryptoAmount;
          return c;
        }
      });
    }
  };

  function updateLocal(res) {
    const local = JSON.parse(localStorage.getItem("Users"));
    const updatedUsers = local.map((u) => {
      if (u.username === user.username) {
        u = { ...user, cryptos: res, USD: currentUSD };
      }
      return u;
    });
    localStorage.Users = JSON.stringify(updatedUsers, null, 2);
  }

  const values = (res) => {
    return { ...user, cryptos: res, USD: currentUSD };
  };

  getCryptoPrices(newCryptos()).then((res) => {
    const cryptoList = res.map((crypto) => crypto.data.data);
    updateLocal(cryptoList);
    values(cryptoList);
  });

  return values();
}
