// a library to wrap and simplify api calls
import apisauce from "apisauce";
import Secrets from "react-native-config";

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

  const getTdCustomerById = customerId => {
    const TD_Request = new Request(
      TD_BASE_URL + "/customers/" + customerId,
      TD_INIT
    );

    return fetch(TD_Request).then(response => response.json());
  };

  return {
    getCustomerSecrets,
    getTdCustomerById
  };
};

export default {
  create
};
