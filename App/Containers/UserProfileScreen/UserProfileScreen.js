import React from "react";
import { ScrollView, View, Text } from "react-native";
import { connect } from "react-redux";
import { SectionWithHeading } from "../../Components/shared";
import Icon from "react-native-vector-icons/AntDesign";

const UserProfileScreen = props => {
  const { givenName, age } = props.customerDetails.userDetails;

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
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
                detail:
              </Text>
              <Text style={{ fontSize: 16, flex: 1 }}>kljlkhlhjlkh</Text>
            </View>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text style={{ flex: 1, fontSize: 16, fontWeight: "600" }}>
                detail:
              </Text>
              <Text style={{ fontSize: 16, flex: 1 }}>kljlkhlhjlkh</Text>
            </View>
          </View>
        </SectionWithHeading>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  customerDetails: state.customerDetails
});

export default connect(
  mapStateToProps,
  null
)(UserProfileScreen);
