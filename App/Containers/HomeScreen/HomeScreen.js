import React from "react";
import { ScrollView, Text } from "react-native";
import { TextHero } from "../../Components/shared";
import { connect } from "react-redux";
import StartupActions from "../../Redux/StartupRedux";

const HomeScreen = props => {
  console.log(props);

  return (
    <ScrollView>
      <TextHero
        title={"Welcome Username"}
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
