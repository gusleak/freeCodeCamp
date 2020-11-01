function checkCashRegister(price, cash, cid) {
  let change = {
    status: "OPEN",
    change: []
  }
  const corr = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
  }
  let toReturn = cash - price;
  let returnedChange = [];
  let available = cid.filter(amount => {
    if (toReturn >= corr[amount[0]]) {
      return amount;
    }
  }).reverse();
  let sum;
  for (let i = 0; i < available.length; i++) {
    sum = 0;
    while (available[i][1] > 0 && toReturn >= corr[available[i][0]]) {
      sum += corr[available[i][0]];
      toReturn -= corr[available[i][0]];
      toReturn = Math.round(toReturn * 100) / 100;
      available[i][1] -= corr[available[i][0]];
    }
    sum = Math.round(sum * 100) / 100;
    if (sum > 0) {
      returnedChange.push([available[i][0], sum]);
    }
    if (toReturn === 0) { break; }
  }
  if (toReturn > 0) {
    change.status = "INSUFFICIENT_FUNDS";
    change.change = [];
    return change;
  }
  let remaining = available.filter(amount => {
    if (amount[1] > 0) {
      return amount;
    }
  })
  if (remaining.length === 0) {
    change.status = "CLOSED";
    change.change = cid.map(amount => {
      if (amount[0] === returnedChange[0][0]) {
        amount[1] = returnedChange[0][1];
        return amount;
      } else {
        return amount;
      }
    });
    return change;
  }
  change.change = returnedChange;
  return change;
}
