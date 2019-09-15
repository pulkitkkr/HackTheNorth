// a library to wrap and simplify api calls
import apisauce from "apisauce";

const fetch = require("node-fetch");
const { link } = require("@blockmason/link-sdk");
// Link credentials
const rewardService = link(
  {
    clientId: "yLxa5qY1CSn1xdorU0kK0CT1BGI-torb_vTop21WFEQ",
    clientSecret:
      "P54PHxYRDlUcWNvVGSe2u4dv7YD6FRDu/l4dABLNZ24w44BU3WFgdnBlxi5sbHx"
  },
  {
    fetch
  }
);

const loyalityService = link(
  {
    clientId: "nJ757T383uUFe9vGywuGmMNCwv1U6wdnaugoBHP-uAk",
    clientSecret:
      "WB3+9GCFwzlLnvOGpeN6OSRZPlkU//dlmRhW7mmCpIxj8D1qql4RpAc2Ea0ZTwu"
  },
  {
    fetch
  }
);

export const seeApprovals = () => {
  // const transferBody = {
  //   _tokenholder: "0x1c0d4ff2c4214c96df01bd05268dd1588d770891",
  //   _spender: "0xc4dc80d7455bd538ad637f2e33a7a39ecf33d376"
  // };
  rewardService.get("/events/Approval").then(resp => console.log(resp));
};

export const getTDR = ethAddress => {
  const transferBody = {
    _tokenholder: ethAddress
  };

  return rewardService.get("/balanceOf", transferBody);
};

export const approveFunds = (senderId, value) => {
  const funds = (value * Math.pow(10, 18)).toString(16);
  const transferBody = {
    _spender: senderId,
    _value: funds
  };

  return rewardService.post("/approve", transferBody);
};
export const transferFund = (sender, amount) => {
  const funds = (amount * Math.pow(10, 18)).toString(16);

  console.table({ sender, funds });

  const transferBody = {
    _from: sender,
    _to: "0x1c0d4ff2c4214c96df01bd05268dd1588d770891",
    _value: funds
  };

  return rewardService.post("/transferFrom", transferBody);
};

export const getLoyality = ethAddress => {
  const transferBody = {
    customer: ethAddress
  };
  return loyalityService.get("/getScore", transferBody);
};

export const setLoyality = (
  ethAddress,
  timeEnrolled,
  noOfTransactions,
  numberOfDonations
) => {
  numberOfDonations = (numberOfDonations * Math.pow(10, 18)).toString(16);
  timeEnrolled = (timeEnrolled * Math.pow(10, 18)).toString(16);
  noOfTransactions = (noOfTransactions * Math.pow(10, 18)).toString(16);
  const transferBody = {
    customer: ethAddress,
    timeEnrolled: timeEnrolled,
    noOfTransactions: noOfTransactions,
    donations: numberOfDonations
  };

  return loyalityService.post("/setScore", transferBody);
};

const TD_API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiYWMwY2RlYzAtNDhiZC0zNGI3LWE3NWQtNjhiMmVlYjZhODYxIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiIwYjVmZDhhYS0xNmQzLTQzMWEtOTMxZi0yYzljZjNkOGFkYWEifQ.Q4vqhfoWmmuivjOHzGCo-cEOxV0mdLzCfay7Q5dY6hk";

const TD_INIT = {
  method: "GET",
  headers: {
    Authorization: TD_API_KEY
  }
};

const TD_BASE_URL = "https://api.td-davinci.com/api";

// our "constructor"
const create = (baseURL = "https://stark-escarpment-52232.herokuapp.com") => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      "Cache-Control": "no-cache"
    },
    // 10 second timeout...
    timeout: 10000
  });

  const getCustomerSecrets = customerId =>
    api.get("/customer_data", { customer_id: customerId });

  const getCoupons = () => api.get("/customer_coupons");

  const getTdCustomerById = customerId => {
    const TD_Request = new Request(
      TD_BASE_URL + "/customers/" + customerId,
      TD_INIT
    );

    return fetch(TD_Request).then(response => response.json());
  };

  const getTdTransactions = customerId => {
    const TD_Request = new Request(
      TD_BASE_URL + "/customers/" + customerId + "/transactions",
      TD_INIT
    );

    return fetch(TD_Request).then(response => response.json());
  };

  const getAccountById = customerId => {
    const TD_Request = new Request(
      TD_BASE_URL + `/customers/${customerId}/accounts`,
      TD_INIT
    );

    return fetch(TD_Request).then(response => response.json());
  };

  return {
    getCustomerSecrets,
    getTdCustomerById,
    getTdTransactions,
    getAccountById,
    getCoupons
  };
};

export default {
  create
};
