import React from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  View,
  Text,
  Image,
  Modal,
  ActivityIndicator
} from "react-native";
import ApiServices, {
  transferFund,
  approveFunds,
  seeApprovals
} from "../../Services/Api";
import { ADD_AVAILABLE_COUPONS } from "../../Redux/CustomerDetailRedux";
import { CustomButton } from "../../Components/shared";
import { Dimensions } from "react-native";
const screenWidth = Math.round(Dimensions.get("window").width);

const Service = ApiServices.create();

const CouponImages = {
  BurgerKing: require("../../Images/coupons/BurgerKing.png"),
  CanadianTire: require("../../Images/coupons/CanadianTire.png"),
  Cineplex: require("../../Images/coupons/Cineplex.png"),
  FoodBasics: require("../../Images/coupons/FoodBasics.png"),
  HudsonBay: require("../../Images/coupons/HudsonBay.png"),
  PizzaPizza: require("../../Images/coupons/PizzaPizza.png"),
  Shein: require("../../Images/coupons/Shein.png"),
  TimHorton: require("../../Images/coupons/TimHorton.png"),
  Uber: require("../../Images/coupons/Uber.png"),
  Walmart: require("../../Images/coupons/Walmart.png"),
  Wonderland: require("../../Images/coupons/Wonderland.png"),
  Zara: require("../../Images/coupons/Zara.png"),
  Lyft: require("../../Images/coupons/Lyft.png"),
  careNGO: require("../../Images/careNGO.png")
};

const Coupon = ({ item, tokenBalance, toggleModal }) => (
  <View
    style={{
      width: "100%",
      minHeight: 120,
      backgroundColor: "#ffffff",
      marginTop: 10,
      padding: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start"
    }}
    elevation={3}
  >
    <Image
      style={{ width: 120, height: 120 }}
      source={CouponImages[item.imageName]}
    />
    <View style={{ flex: 1, padding: 10, paddingLeft: 20 }}>
      <Text
        style={{
          fontSize: 16,
          color: "#12422A",
          flex: 2,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{
          fontSize: 16,
          flex: 2,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {item.description}
      </Text>
      <CustomButton
        size={"SM"}
        style={{}}
        onPress={() => {
          if (parseFloat(tokenBalance, 10) < parseFloat(item.price, 10)) {
            alert("Sorry, You don't have enough TDR Reward points");
          } else {
            toggleModal(true);
          }
        }}
        disabled={parseFloat(tokenBalance, 10) < parseFloat(item.price, 10)}
        title={`Buy for ${item.price} TDR`}
      />
    </View>
  </View>
);

class CouponsScreen extends React.Component {
  componentWillMount() {
    Service.getCoupons().then(response => {
      this.props.setAvailableCoupons(response.data);
    });
  }
  state = {
    isModalShown: false,
    selectedCoupon: null,
    showNavigator: false
  };
  render() {
    const {
      userBalance,
      availableCoupons,
      wallets
    } = this.props.customerDetails;
    const { isModalShown } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalShown}
          onRequestClose={() => {
            this.setState({ isModalShown: false, selectedCoupon: null });
          }}
        >
          <View>
            <View
              elevation={3}
              style={{
                backgroundColor: "#12422A",
                width: "100%",
                padding: 10,
                height: 50,
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Text style={{ color: "#fff", flex: 4, fontSize: 20 }}>
                Checkout
              </Text>
              <View
                style={{
                  backgroundColor: "#fff",
                  height: 50,
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{ color: "#12422A", fontSize: 18, fontWeight: "600" }}
                >
                  {userBalance.token} TDR
                </Text>
              </View>
            </View>
            <Image
              style={{ maxWidth: screenWidth, height: 256 }}
              source={CouponImages.careNGO}
            />
            <View style={{ padding: 15, justifyContent: "space-between" }}>
              <View
                style={{
                  backgroundColor: "#fff"
                }}
                elevation={3}
              >
                <Text style={{ color: "#12422A", fontSize: 20, padding: 10 }}>
                  Care helps children in developing countries to lift themselves
                  and their families out of poverty and out of crisis.
                </Text>
              </View>
              {this.state.selectedCoupon && (
                <>
                  <CustomButton
                    size={"MD"}
                    title={`Pay ${this.state.selectedCoupon.price} TDR and Donate 1 TDR`}
                  />
                  <CustomButton
                    size={"MD"}
                    title={`Pay ${this.state.selectedCoupon.price} TDR  without Donation`}
                    onPress={() => {
                      this.setState({ showNavigator: true }, () => {
                        transferFund(
                          wallets.etheriumId,
                          this.state.selectedCoupon.price
                        )
                          .then(resp => {
                            this.setState(
                              {
                                isModalShown: false,
                                selectedCoupon: null,
                                showNavigator: false
                              },
                              () => {
                                alert(
                                  "Congrats Go In store and just tell you customer ID"
                                );
                              }
                            );
                          })
                          .catch(e => {
                            this.setState(
                              {
                                isModalShown: false,
                                selectedCoupon: null,
                                showNavigator: false
                              },
                              () => {
                                alert("thanks for buying");
                              }
                            );
                          });
                      });
                    }}
                  />
                  {this.state.showNavigator && (
                    <ActivityIndicator size="large" color="#00ff00" />
                  )}
                </>
              )}
            </View>
          </View>
        </Modal>
        <View
          elevation={3}
          style={{
            backgroundColor: "#12422A",
            width: "100%",
            padding: 10,
            height: 50,
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Text style={{ color: "#fff", flex: 4, fontSize: 20 }}>
            Loyality Offers
          </Text>
          <View
            style={{
              backgroundColor: "#fff",
              height: 50,
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#12422A", fontSize: 18, fontWeight: "600" }}>
              {userBalance.token} TDR
            </Text>
          </View>
        </View>
        <ScrollView style={{ padding: 15 }}>
          {availableCoupons.length < 0 ? (
            <View style={{ flex: 1 }}>
              <Text>Sorry !! We are out of rewards as of now</Text>
            </View>
          ) : (
            availableCoupons.map(item => (
              <Coupon
                toggleModal={() =>
                  this.setState({ isModalShown: true, selectedCoupon: item })
                }
                item={item}
                tokenBalance={userBalance.token}
              />
            ))
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  customerDetails: state.customerDetails
});

const mapDispatchToProps = dispatch => ({
  setAvailableCoupons: couponArray =>
    dispatch({
      type: ADD_AVAILABLE_COUPONS,
      payload: couponArray
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CouponsScreen);
