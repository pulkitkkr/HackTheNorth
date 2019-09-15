export const ADD_CUSTOMER_DETAILS = "ADD_CUSTOMER_DETAILS";
export const ADD_CUSTOMER_WALLET_DETAILS = "ADD_CUSTOMER_WALLET_DETAILS";
export const RESET_CUSTOMER_DETAILS = "RESET_CUSTOMER_DETAILS";
export const ADD_CUSTOMER_TRANSACTIONS = "ADD_CUSTOMER_TRANSACTIONS";
export const UPDATE_WALLET_BALANCES = "UPDATE_WALLET_BALANCES";
export const ADD_AVAILABLE_COUPONS = "ADD_AVAILABLE_COUPONS";

export const INITIAL_STATE = {
  wallets: {
    etheriumId: null,
    tdBankId: null
  },
  userType: null,
  userDetails: null,
  userTransactions: [],
  userBalance: {
    token: 0,
    bank: 0,
    loyality: 0
  },
  availableCoupons: []
};

export const addCustomerDetail = (state, payload) => ({
  ...state,
  userDetails: payload
});

export const addCustomerWalletDetails = (state, payload) => ({
  ...state,
  ...payload
});

export const addCustomerTransactions = (state, payload) => ({
  ...state,
  userTransactions: payload
});

export const addAvailableCoupons = (state, payload) => ({
  ...state,
  availableCoupons: payload
});

export const updateBalances = (state, payload) => ({
  ...state,
  userBalance: { ...state.userBalance, ...payload }
});

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CUSTOMER_WALLET_DETAILS:
      return addCustomerWalletDetails(state, action.payload);

    case RESET_CUSTOMER_DETAILS:
      return INITIAL_STATE;

    case ADD_CUSTOMER_DETAILS:
      return addCustomerDetail(state, action.payload);

    case ADD_CUSTOMER_TRANSACTIONS:
      return addCustomerTransactions(state, action.payload);

    case UPDATE_WALLET_BALANCES:
      return updateBalances(state, action.payload);

    case ADD_AVAILABLE_COUPONS:
      return addAvailableCoupons(state, action.payload);

    default:
      return state;
  }
};
