import React from "react";
import { View, Image, BackHandler } from "react-native";
import { Text, Container, Content, Item, Input } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import KeyBoardShift from "../../../../MiniComponents/KeyboardShift";
import CustomeHeader from "../../../../MiniComponents/Header";
import LowerButton from "../../../../MiniComponents/LowerButton";
import styles from "./styles";
import { globalColors } from "../../../../../GlobalStyles";
import findIndex from "lodash/findIndex";
import formatNumber from "../../../../formatNumber";
import { showMessage } from "react-native-flash-message";
import * as Segment from "expo-analytics-segment";
import segmentEventTrack from "../../../../segmentEventTrack";

export default class EditProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      cartList: [],
      productNameError: true,
      priceError: true,
    };
  }
  componentDidMount() {
    Segment.screen("Edit Product");
    const item = this.props.navigation.getParam("item", {});
    const list = this.props.navigation.getParam("cartList", []);
    // console.log('item', item);
    this.setState({
      item: item,
      cartList: list,
      productNameError:
        !item.productName ||
        (item.productName && item.productName.length === 0),
      priceError: !item.price || (item.price && item.price.length === 0),
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  _handleSubmission = () => {
    const { translate } = this.props.screenProps;

    if (
      this.state.item.price &&
      this.state.item.price !== "" &&
      !/^([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(\.[0-9]{3})?$/.test(
        this.state.item.price
      ) &&
      this.state.item.price !== 0
    ) {
      segmentEventTrack("Error Submit Edit SME Product Item", {
        campaign_error_sme_product_item: "Please enter a valid price",
        campaign_sme_product_item_price: this.state.item.price,
      });
      showMessage({
        message: translate("Please enter a valid price"),
        position: "top",
        description: translate("eg 1 1500  1000 10000500"),
        type: "warning",
      });
    } else {
      const newList = [...this.state.cartList];
      const index = findIndex(
        newList,
        (item) => item.imageId === this.state.item.imageId
      );
      newList[index] = this.state.item;
      // console.log('newList', newList);
      segmentEventTrack("Submitted Edit SME Product Item Success", {
        campaign_sme_product_item: { ...this.state.item },
      });
      this.props.navigation.navigate("SelectedInstagramProductsList", {
        selectetedItems: newList,
      });
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <NavigationEvents onDidFocus={() => Segment.screen("Edit Product")} />
        <Container style={styles.container}>
          <CustomeHeader
            screenProps={this.props.screenProps}
            title={["SME Growth", "Campaign"]}
            segment={{
              str: "Edit Product Detail Back Button",
            }}
            closeButton={false}
            navigation={this.props.navigation}
          />
          <Content style={styles.contentStyle}>
            <KeyBoardShift>
              {() => (
                <>
                  <View style={styles.mainProductView}>
                    <Image
                      style={styles.imageProductView}
                      source={{ uri: this.state.item.imageUrl }}
                    />
                    <View style={styles.inputContainer}>
                      <View style={styles.websiteView}>
                        <View style={[styles.websiteLabelView]}>
                          <Text uppercase style={[styles.inputLabel]}>
                            {translate("Product Name")}
                          </Text>
                        </View>
                        <Item
                          style={[
                            styles.input,
                            // this.state.urlError
                            //     ? GlobalStyles.redBorderColor
                            //     : GlobalStyles.transparentBorderColor
                          ]}
                        >
                          <Input
                            style={[styles.inputtext]}
                            placeholder={translate("Enter Product Name")}
                            placeholderTextColor={globalColors.white}
                            value={this.state.item.productName}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(value) => {
                              this.setState({
                                item: {
                                  ...this.state.item,
                                  productName: value,
                                },
                                productNameError: value.length === 0,
                              });
                            }}
                            onBlur={() => {
                              segmentEventTrack(
                                "Changed Product Name Sme Growth",
                                {
                                  campaign_sme_product_item_name: this.state
                                    .item.productName,
                                }
                              );
                            }}
                            // onBlur={() => this.validateUrl()}
                          />
                        </Item>
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <View style={styles.websiteView}>
                        <View style={[styles.websiteLabelView]}>
                          <Text uppercase style={[styles.inputLabel]}>
                            {translate("price")}
                          </Text>
                        </View>
                        <Item
                          style={[
                            styles.input,
                            // this.state.urlError
                            //     ? GlobalStyles.redBorderColor
                            //     : GlobalStyles.transparentBorderColor
                          ]}
                        >
                          <Input
                            keyboardType="numeric"
                            style={[styles.inputtext]}
                            placeholder={translate("Enter Price")}
                            placeholderTextColor={globalColors.white}
                            value={this.state.item.price}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(value) => {
                              this.setState({
                                item: {
                                  ...this.state.item,
                                  price: value,
                                },
                                priceError: value.length === 0,
                              });
                            }}
                            onBlur={() => {
                              segmentEventTrack(
                                "Changed Product Price Sme Growth",
                                {
                                  campaign_sme_product_item_price: this.state
                                    .item.price,
                                }
                              );
                            }}
                            // onBlur={() => this.validateUrl()}
                          />
                        </Item>
                      </View>
                    </View>
                  </View>
                  {/* {!this.state.productNameError && !this.state.priceError && ( */}
                  <View style={styles.bottonViewWebsite}>
                    <LowerButton
                      screenProps={this.props.screenProps}
                      checkmark={true}
                      bottom={0}
                      function={this._handleSubmission}
                    />
                  </View>
                  {/* )} */}
                </>
              )}
            </KeyBoardShift>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}
