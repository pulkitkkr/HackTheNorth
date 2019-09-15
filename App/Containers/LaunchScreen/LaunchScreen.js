import React, { useState } from "react";
import { Text, Image, View } from "react-native";
import { CustomInput, CustomButton } from "../../Components/shared";
import ApiServices from "../../Services/Api";
import {
  ADD_CUSTOMER_DETAILS,
  ADD_CUSTOMER_WALLET_DETAILS
} from "../../Redux/CustomerDetailRedux";
import { Images } from "../../Themes";
import { connect } from "react-redux";

// Styles
import styles from "./LaunchScreenStyles";
const Service = ApiServices.create();

const LaunchScreen = props => {
  const [custId, setCustId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.mainContainer}>
      <View style={styles.centered}>
        <Image source={Images.logo} style={styles.logo} />
        <Text style={styles.appNameText}>TD Bank</Text>
        <CustomInput
          placeholder={"Please enter your customer id"}
          value={custId}
          onChangeText={setCustId}
          autoCompleteType={"email"}
          style={{ marginTop: 40 }}
        />
        <CustomInput
          placeholder={"Please enter your password"}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <CustomButton
          onPress={() => {
            Service.getCustomerSecrets(custId)
              .then(response => {
                const etheriumId = response.data.address;
                const tdBankId = response.data.customer_id;
                const userType = response.data.userType;

                if (etheriumId && tdBankId) {
                  Service.getTdCustomerById(tdBankId).then(response => {
                    if (response.statusCode == 200) {
                      props.setCustomerDetails(response.result);
                      props.setCustomerWalletDetails(
                        etheriumId,
                        tdBankId,
                        userType
                      );
                      props.navigation.replace("HomeScreen");
                    } else {
                      alert(
                        "An unexpected error occurred while get details from TD "
                      );
                    }
                  });
                } else {
                  alert("The Customer Id is not correct");
                }
              })
              .catch(e => {
                console.log("Error While getting secrets", e);
              });
          }}
          title={"Sign In"}
        />
      </View>
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  setCustomerDetails: custDetailsFromTD =>
    dispatch({
      type: ADD_CUSTOMER_DETAILS,
      payload: custDetailsFromTD
    }),
  setCustomerWalletDetails: (etheriumId, tdBankId, userType) =>
    dispatch({
      type: ADD_CUSTOMER_WALLET_DETAILS,
      payload: { wallets: { tdBankId, etheriumId }, userType }
    })
});

export default connect(
  null,
  mapDispatchToProps
)(LaunchScreen);
