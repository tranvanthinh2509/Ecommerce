import { getNumbers } from "./getNumbers";

export const getCode = (totals) => {
  let arr = [];
  return totals?.map((item) => {
    let arrMaxMin = getNumbers(item.value);
    if (arrMaxMin.length === 1) arr.push(arrMaxMin[0]);
    let sortedArr = arr.sort();
    return {
      ...item,
      min: sortedArr.indexOf(arrMaxMin[0]) === 0 ? 0 : arrMaxMin[0],
      max:
        sortedArr.indexOf(arrMaxMin[0]) === 0
          ? arrMaxMin[0]
          : sortedArr.indexOf(arrMaxMin[0]) === 1
          ? 9999999
          : arrMaxMin[1],
    };
  });
};

export const getCodes = (arrMinMax, prices) => {
  const pricesWithMinMax = getCode(prices);
  return pricesWithMinMax.filter(
    (item) =>
      (item.min >= arrMinMax[0] && item.min <= arrMinMax[1]) ||
      (item.max >= arrMinMax[0] && item.max <= arrMinMax[1])
  );
};

export const getCode1 = (totals, min, max) => {
  let arr = [];
  return totals?.map((item) => {
    let arrMaxMin = getNumbers(item.value);
    return {
      ...item,
      min:
        arrMaxMin.length === 2
          ? arrMaxMin[0]
          : arrMaxMin[0] === min
          ? 0
          : arrMaxMin[0],
      max:
        arrMaxMin.length === 2
          ? arrMaxMin[1]
          : arrMaxMin[0] === max
          ? 9999999
          : arrMaxMin[0],
    };
  });
};

export const getCodes1 = (entry, prices, min, max) => {
  const pricesWithMinMax = getCode1(prices, min, max);
  return pricesWithMinMax?.filter(
    (item) => item.min <= entry && entry < item.max
  );
};
