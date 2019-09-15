import React from "react";
import { ScrollView, View, Text } from "react-native";
import { connect } from "react-redux";
import { SectionWithHeading } from "../../Components/shared";
import Icon from "react-native-vector-icons/AntDesign";
import { CustomButton } from "../../Components/shared";
import {
  RESET_CUSTOMER_DETAILS
} from "../../Redux/CustomerDetailRedux";
const UserProfileScreen = props => {
  const { givenName, age, birthDate, type, gender, relationshipStatus, totalIncome, workActivity } = props.customerDetails.userDetails;
  console.log(props.customerDetails.userDetails)
  return (
    <ScrollView>
      <View
        style={{
          width: "100%",
          height: 200,
          backgroundColor: "#12422A",
          alignItems: "center",
          paddingTop: 15
        }}
      >
        <Icon size={90} name="user" color="#ffffff" />
        <Text style={{ fontSize: 24, color: "#ffffff", marginTop: 20 }}>
          {givenName}, {age}
        </Text>
      </View>
      <View style={{ paddingLeft: 15, paddingRight: 15 }}>
        <SectionWithHeading title={"About Me"}>
          <View style={{ flexDirection: "row", paddingBottom: 20 }}>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
                Birth Date:
              </Text>
              <Text style={{ fontSize: 16, flex: 1 }}>{birthDate}</Text>
            </View>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
                Account Type:
              </Text>
              <Text style={{ fontSize: 16, flex: 1 }}>{type}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" , paddingBottom: 20}}>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
                Gender:
              </Text>
              <Text style={{ fontSize: 16, flex: 1 }}>{gender}</Text>
            </View>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
                Relationship Status:
              </Text>
              <Text style={{ fontSize: 16, flex: 1 }}>{relationshipStatus}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" , paddingBottom: 20}}>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
                Total Income:
              </Text>
              <Text style={{ fontSize: 16, flex: 1 }}>{totalIncome}</Text>
            </View>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
                Work Type:
              </Text>
              <Text style={{ fontSize: 16, flex: 1 }}>{workActivity}</Text>
            </View>
          </View>
        </SectionWithHeading>
        <CustomButton
        onPress={() => {
          props.resetState();
          props.navigation.replace("LaunchScreen");
          }}
          title={"Log Out"}
        />
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = dispatch => ({
  resetState: ()=>
    dispatch({
      type: RESET_CUSTOMER_DETAILS,
    })
});

const mapStateToProps = state => ({
  customerDetails: state.customerDetails
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(UserProfileScreen);
