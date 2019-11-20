import React from "react";
import { View, TouchableOpacity, Image, BackHandler } from "react-native";
import { Text, Container, Content } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { connect } from "react-redux";
import includes from "lodash/includes";
import { showMessage } from "react-native-flash-message";
import styles from "./styles";
import CustomeHeader from "../../../../MiniComponents/Header";
import LowerButton from "../../../../MiniComponents/LowerButton";
import CheckMarkLoading from "../../../../MiniComponents/CheckMarkLoading";

import * as actionCreators from "../.././../../../store/actions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import PenIcon from "../../../../../assets/SVGs/Pen";
import isStringArabic from "../../../../isStringArabic";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: [],
      disable: true
    };
  }
  componentDidMount() {
    const list = this.props.navigation.getParam("selectetedItems", []);
    // console.log('list', list);
    this.setState({
      cartList: list
    });
    // console.log('data', this.props.data);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  editItem = item => {
    this.props.navigation.navigate("EditProductDetailInstagramPost", {
      cartList: this.state.cartList,
      item: item
    });
  };
  _handleSubmission = () => {
    this.props.navigation.getParam("_changeDestination")();
    this.props.saveWebProducts(
      this.state.cartList,
      //added checking for a rejected campaign to send the campaign id
      this.props.rejCampaign
        ? this.props.rejCampaign.campaign_id
        : this.props.data.campaign_id,
      this.props.productInfoId,
      this.props.navigation,
      this.props.businessLogo,
      "fromUpdateProductList"
    );
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <NavigationEvents
          onDidFocus={() => {
            const list = this.props.navigation.getParam("selectetedItems", []);
            // const checkIfHasKeyProductName = list.map(item =>
            //   item.hasOwnProperty("productName")
            // );
            // // console.log('checkIfHasKeyProductName', checkIfHasKeyProductName);
            // // console.log(' disable', includes(checkIfHasKeyProductName, false));

            this.setState({
              cartList: list
              // disable: includes(checkIfHasKeyProductName, false)
            });
          }}
        />
        <Container style={styles.container}>
          <CustomeHeader
            screenProps={this.props.screenProps}
            title={"WhatsApp Campaign"}
            closeButton={false}
            navigation={this.props.navigation}
          />
          <Content
            style={{
              paddingTop: 20,
              // paddingHorizontal: 20,
              flexGrow: 1
              // marginBottom: heightPercentageToDP(30),
            }}
          >
            <Text
              style={{
                color: "#FFF",
                fontSize: 14,
                fontFamily: "montserrat-regular",
                textAlign: "center",
                lineHeight: 18,
                paddingHorizontal: 40
              }}
            >
              {translate("Add product names and prices for each product")}
            </Text>
            <Content
              contentContainerStyle={{
                flex: 1,
                paddingHorizontal: 40,
                paddingTop: 20,
                flexDirection: "row",
                flexWrap: "wrap",
                flexGrow: 1
                // justifyContent: "space-around"
              }}
            >
              {this.state.cartList.map(item => {
                // const itemFound = findIndex(this.state.cartList, it => it.id === item.id);
                // console.log('itemFound', itemFound);

                return (
                  <View
                    key={item.imageId}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-between",
                      // paddingVertical: 12,
                      marginVertical: 5,
                      width: "43%",
                      borderRadius: 20,
                      marginHorizontal: 10,
                      backgroundColor: "rgba(0,0,0,0.3)"
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center"
                      }}
                    >
                      <Image
                        source={{
                          uri: item.imageUrl
                        }}
                        width={"100%"}
                        height={"100%"}
                        style={[
                          {
                            width: wp(34),
                            height: 135,
                            borderRadius: 20,
                            // backgroundColor: "rgba(0,0,0,0.2)",
                            opacity: 0.9
                          }
                        ]}
                      />
                    </View>
                    <Text
                      uppercase
                      style={{
                        fontFamily: isStringArabic(
                          item.productName
                            ? item.productName
                            : translate("Product Name")
                        )
                          ? "montserrat-semibold"
                          : "montserrat-bold-english",
                        color: "#fff",
                        fontSize: 14,
                        lineHeight: 17,
                        paddingTop: 15,
                        textAlign: "left",
                        alignSelf: "flex-start",
                        marginLeft: 12
                      }}
                    >
                      {item.productName
                        ? item.productName
                        : translate("Product Name")}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                        alignSelf: "flex-start",
                        marginLeft: 12
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "montserrat-bold-english",
                          color: "#FF9D00",
                          fontSize: 12,
                          lineHeight: 22,
                          paddingBottom: 5
                        }}
                      >
                        KD
                      </Text>
                      <Text
                        style={{
                          fontFamily: "montserrat-bold-english",
                          color: "#FF9D00",
                          fontSize: 17,
                          lineHeight: 22,
                          paddingBottom: 5
                        }}
                      >
                        {" "}
                        {item.price ? item.price : "0"}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: 20,
                        height: 20,
                        alignSelf: "flex-end",
                        marginRight: 10,
                        marginBottom: 10
                      }}
                      onPress={() => this.editItem(item)}
                    >
                      <PenIcon
                        style={{
                          width: 20,
                          height: 20
                        }}
                        width={20}
                        height={20}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </Content>

            <TouchableOpacity style={styles.bottonViewWebsite}>
              {this.props.savingWebProducts ? (
                <CheckMarkLoading
                  mainViewStyle={{ width: wp(7), height: hp(7) }}
                  bottom={hp(1)}
                  style={{ width: wp(7), height: hp(7) }}
                />
              ) : (
                <LowerButton
                  // disabled={this.state.disable}
                  checkmark={true}
                  bottom={0}
                  function={this._handleSubmission}
                />
              )}
            </TouchableOpacity>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  data: state.campaignC.data,
  savingWebProducts: state.campaignC.savingWebProducts,
  productInfoId: state.campaignC.productInfoId,
  businessLogo: state.campaignC.businessLogo,
  rejCampaign: state.dashboard.rejCampaign
  // weburlAvalible: state.campaignC.weburlAvalible,
  // mainBusiness: state.account.mainBusiness,
  // errorInstaHandle: state.campaignC.errorInstaHandle,
  // errorInstaHandleMessage: state.campaignC.errorInstaHandleMessage,
});
const mapDispatchToProps = dispatch => ({
  verifyBusinessUrl: weburl =>
    dispatch(actionCreators.verifyBusinessUrl(weburl)),
  verifyInstagramHandle: insta_handle =>
    dispatch(actionCreators.verifyInstagramHandle(insta_handle)),
  saveWebProducts: (
    cartList,
    campaign_id,
    productInfoId,
    navigation,
    businessLogo,
    from
  ) =>
    dispatch(
      actionCreators.saveWebProducts(
        cartList,
        campaign_id,
        productInfoId,
        navigation,
        businessLogo,
        from
      )
    )
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
