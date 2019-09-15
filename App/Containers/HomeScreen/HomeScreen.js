import React from "react";
import { ScrollView, Text } from "react-native";
import { TextHero } from "../../Components/shared";
import { connect } from "react-redux";

const HomeScreen = props => {
  console.log(props);

  return (
    <ScrollView>
      <TextHero
        title={`Welcome ${props.customerDetails.userDetails.givenName}`}
        subtitle={"Explore TD Canada Trust products and services"}
      />
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  customerDetails: state.customerDetails
});

export default connect(
  mapStateToProps,
  null
)(HomeScreen);
