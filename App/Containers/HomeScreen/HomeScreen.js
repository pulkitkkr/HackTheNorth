import React from "react";
import { ScrollView, Text, View } from "react-native";
import {
  TextHero,
  SectionWithHeading,
  CustomButton
} from "../../Components/shared";
import { connect } from "react-redux";
import ApiServices, {
  getTDR,
  setLoyality,
  getLoyality
} from "../../Services/Api";
import {
  ADD_CUSTOMER_TRANSACTIONS,
  UPDATE_WALLET_BALANCES
} from "../../Redux/CustomerDetailRedux";

const Service = ApiServices.create();

const TransactionItem = ({ item }) => (
  <View
    style={{
      width: "100%",
      minHeight: 80,
      backgroundColor: "#ffffff",
      marginTop: 10,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }}
    elevation={3}
  >
    <Text
      style={{
        fontSize: 24,
        color: "#12422A",
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {item.currencyAmount > 0 ? "" : "- "}$
      {parseFloat(Math.abs(item.currencyAmount)).toFixed(1)}
    </Text>
    <View style={{ flex: 3 }}>
      <Text>{item.description}</Text>
    </View>
    <CustomButton
      title={`${(Math.abs(item.currencyAmount) / 100).toFixed(2)} TDR`}
      style={{ flex: 1 }}
      textStyles={{ fontSize: 15, marginLeft: 10 }}
    />
  </View>
);

const parseInt16Price = price => parseInt(price, 16) / Math.pow(10, 18);

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { customerDetails } = this.props;
    console.log(customerDetails);

    getTDR(customerDetails.wallets.etheriumId).then(response => {
      const tdTokens = parseInt16Price(response.balance);

      this.props.updateBalances({
        token: tdTokens
      });
    });
    Service.getAccountById(customerDetails.wallets.tdBankId).then(response => {
      this.props.updateBalances({
        bank: response.result.bankAccounts[0].balance
      });
    });
    Service.getTdTransactions(customerDetails.wallets.tdBankId).then(
      response => {
        if (response.result.length > 0)
          this.props.setCustomerTransactions(response.result);
        setLoyality(
          customerDetails.wallets.etheriumId,
          1000,
          response.result.length,
          0
        ).then(() => {
          getLoyality(customerDetails.wallets.etheriumId).then(response => {
            this.props.updateBalances({
              loyality: parseInt16Price(response.score)
            });
          });
        });
      }
    );
  }

  generateTile = (title, price) => {
    return (
      <View
        style={{
          height: 90,
          width: 90,
          backgroundColor: "#fff",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center"
        }}
        elevation={3}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#12422A"
          }}
        >
          {price}
        </Text>
        <Text
          style={{
            fontSize: 14
          }}
        >
          {title}
        </Text>
      </View>
    );
  };

  render() {
    const { userTransactions, userBalance } = this.props.customerDetails;
    return (
      <ScrollView>
        <TextHero
          title={`Welcome ${this.props.customerDetails.userDetails.givenName}`}
          subtitle={"Explore TD Canada Trust products and services"}
        />
        <SectionWithHeading
          title={"My Attributes"}
          textStyle={{ marginLeft: 15 }}
        >
          <View
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              flexDirection: "row",
              alignItems: "space-around",
              justifyContent: "space-around"
            }}
          >
            {this.generateTile("TDR", userBalance.token)}
            {this.generateTile("Loyality", userBalance.loyality)}
            {this.generateTile("Balance", "$" + userBalance.bank)}
          </View>
        </SectionWithHeading>
        <SectionWithHeading
          title={"Last 10 transactions"}
          textStyle={{ marginLeft: 15 }}
        >
          <View style={{ paddingLeft: 15, paddingRight: 15 }}>
            {userTransactions
              .filter((_item, index) => index < 10)
              .map((item, index) => (
                <TransactionItem item={item} key={`transact-home-${index}`} />
              ))}
          </View>
        </SectionWithHeading>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  customerDetails: state.customerDetails
});

const mapDispatchToProps = dispatch => ({
  setCustomerTransactions: transactionsData =>
    dispatch({
      type: ADD_CUSTOMER_TRANSACTIONS,
      payload: transactionsData
    }),
  updateBalances: newBalances =>
    dispatch({
      type: UPDATE_WALLET_BALANCES,
      payload: newBalances
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
