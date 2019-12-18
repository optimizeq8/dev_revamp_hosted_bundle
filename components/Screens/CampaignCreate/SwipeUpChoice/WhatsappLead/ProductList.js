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
import * as Segment from "expo-analytics-segment";
import segmentEventTrack from "../../../../segmentEventTrack";

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartList: [],
      disable: true
    };
  }
  componentDidMount() {
    Segment.screen("Selected Products List");
    const list = this.props.navigation.getParam("selectetedItems", []);
    // console.log("list", list);
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
    segmentEventTrack("Clicked on edit item details", {
      campaign_sme_product_item: {
        ...item
      }
    });
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
            Segment.screen("Selected Products List");
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
            title={["SME Growth", "Campaign"]}
            closeButton={false}
            navigation={this.props.navigation}
            segment={{
              str: "Products List Back Button"
            }}
          />
          <Content style={styles.contentStyle}>
            <Text style={styles.addProductPriceText}>
              {translate("Add product names and prices for each product")}
            </Text>
            <Content contentContainerStyle={styles.contentContainerStyle}>
              {this.state.cartList.map(item => {
                // const itemFound = findIndex(this.state.cartList, it => it.id === item.id);
                // console.log('itemFound', itemFound);

                return (
                  <View key={item.imageId} style={styles.productView}>
                    <View style={styles.productImageView}>
                      <Image
                        source={{
                          uri: item.imageUrl
                        }}
                        width={"100%"}
                        height={"100%"}
                        style={[styles.imageView]}
                      />
                    </View>
                    <Text
                      uppercase
                      style={[
                        {
                          fontFamily: isStringArabic(
                            item.productName
                              ? item.productName
                              : translate("Product Name")
                          )
                            ? "montserrat-semibold"
                            : "montserrat-bold-english"
                        },
                        styles.productNameText
                      ]}
                    >
                      {item.productName
                        ? item.productName
                        : translate("Product Name")}
                    </Text>
                    <View style={styles.priceView}>
                      <Text style={styles.kdText}>KD</Text>
                      <Text style={styles.priceText}>
                        {" "}
                        {item.price ? item.price : "0"}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.editTouchView}
                      onPress={() => this.editItem(item)}
                    >
                      <PenIcon style={styles.penIcon} width={20} height={20} />
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
  businessLogo: state.campaignC.businessLogo

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
