import React from "react";
import { ScrollView, Text, View } from "react-native";
import {
  TextHero,
  SectionWithHeading,
  CustomButton
} from "../../Components/shared";
import { connect } from "react-redux";
import ApiServices from "../../Services/Api";
import { ADD_CUSTOMER_TRANSACTIONS } from "../../Redux/CustomerDetailRedux";

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
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { customerDetails } = this.props;

    Service.getTdTransactions(customerDetails.wallets.tdBankId).then(
      response => {
        if (response.result.length > 0)
          this.props.setCustomerTransactions(response.result);
      }
    );
  }

  render() {
    const { userTransactions } = this.props.customerDetails;
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
          <View style={{ paddingLeft: 15, paddingRight: 15 }}></View>
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
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
