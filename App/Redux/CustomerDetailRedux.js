export const ADD_CUSTOMER_DETAILS = "ADD_CUSTOMER_DETAILS";
export const ADD_CUSTOMER_WALLET_DETAILS = "ADD_CUSTOMER_WALLET_DETAILS";
export const RESET_CUSTOMER_DETAILS = "RESET_CUSTOMER_DETAILS";

export const INITIAL_STATE = {
  wallets: {
    etheriumId: null,
    tdBankId: null
  },
  userType: null,
  userDetails: null
};

export const addCustomerDetail = (state, payload) => ({
  ...state,
  userDetails: payload
});

export const addCustomerWalletDetails = (state, payload) => ({
  ...state,
  ...payload
});

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CUSTOMER_WALLET_DETAILS:
      return addCustomerWalletDetails(state, action.payload);

    case RESET_CUSTOMER_DETAILS:
      return INITIAL_STATE;

    case ADD_CUSTOMER_DETAILS:
      return addCustomerDetail(state, action.payload);

    default:
      return state;
  }
};
