import React from "react";
import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text, Container, Content } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { showMessage } from "react-native-flash-message";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import { connect } from "react-redux";

import * as actionCreators from "../../../../../store/actions";

import CustomeHeader from "../../../../MiniComponents/Header";
import LowerButton from "../../../../MiniComponents/LowerButton";
import styles from "./styles";

class SelectInstagramPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      cartList: [],
      errorImage: false
    };
  }
  componentDidMount() {
    // console.log("campaignData", this.props.data);
    const insta_handle = this.props.navigation.getParam("insta_handle", "");
    this.props.getInstagramPost(insta_handle);
    this.props.getWebProducts(this.props.data.campaign_id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.getWebProductsLoading &&
      !this.props.getWebProductsLoading &&
      !this.props.savingWebProducts
    ) {
      this.setState({
        cartList: this.props.selectedInstagramProducts,
        counter: this.props.selectedInstagramProducts.length + 1
      });
    }
  }

  _handleSubmission = () => {
    if (this.state.counter <= 3) {
      showMessage({
        message: "Select minimum 3 post",
        duration: 2000,
        type: "warning"
      });
    } else {
      // console.log('cartList', this.state.cartList);
      this.props.navigation.navigate("SelectedInstagramProductsList", {
        selectetedItems: this.state.cartList
      });
    }
  };
  addToList = item => {
    const newCartList = [...this.state.cartList];
    const checkifALreadyExist = find(
      this.state.cartList,
      it => it.imageId === item.imageId
    );
    // console.log('checkifALreadyExist', checkifALreadyExist);
    if (this.state.counter >= 7 && !checkifALreadyExist) {
      showMessage({
        message: "Maximum 6 Selected",
        duration: 2000,
        type: "warning"
      });
      this.setState({
        errorImage: true
      });
    } else if (!checkifALreadyExist) {
      newCartList.push(item);
      const counterNew = this.state.counter;
      this.setState({
        cartList: newCartList,
        counter: counterNew + 1,
        errorImage: false
      });
    } else {
      const index = newCartList.indexOf(checkifALreadyExist);
      // console.log('index', index);
      const counterNew = this.state.counter;

      newCartList.splice(index, 1);
      this.setState({
        cartList: newCartList,
        counter: counterNew - 1,
        errorImage: false
      });
    }
  };
  render() {
    // console.log('this.state.cartList', this.state.cartList);
    // console.log('instagramPostList', this.props.instagramPostList);

    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        {/* <NavigationEvents
					onDidFocus={() => {
						// if (
						// 	// !isEqual(prevProps.selectedInstagramProducts, this.props.selectedInstagramProducts) &&
						// 	// isEmpty(this.state.cartList) &&
						// 	isEmpty(this.props.selectedInstagramProducts)
						// ) {
						// console.log('prevProps', prevProps.selectedInstagramProducts);
						// this.setState(
						// 	{
						// 		cartList: this.props.selectedInstagramProducts,
						// 		counter: this.props.selectedInstagramProducts.length + 1,
						// 	},
						// 	() => {
						// 		console.log('update to ondidfocus', this.state.cartList.length);
						// 	}
						// );
						// }
					}}
				/> */}
        <Container style={styles.container}>
          <CustomeHeader
            title={"Whatsapp Campaign"}
            closeButton={false}
            navigation={this.props.navigation}
          />
          <Content
            style={{
              paddingTop: 20,
              paddingHorizontal: 20,
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
                paddingHorizontal: 60
              }}
            >
              Select the products you want to promote on your campaign
            </Text>
            <Content
              contentContainerStyle={{
                flex: 1,
                paddingTop: 20,
                flexDirection: "row",
                flexWrap: "wrap",
                flexGrow: 1,
                justifyContent: "space-around"
              }}
            >
              {this.props.instagramPostLoading && (
                <ActivityIndicator color="#FF9D00" size="large" />
              )}
              {!this.props.instagramPostLoading &&
                this.props.instagramPostList &&
                this.props.instagramPostList.map(item => {
                  // console.log('insta item', item);

                  if (item) {
                    const itemFound = findIndex(
                      this.state.cartList,
                      it => it.imageId === item.imageId
                    );
                    // console.log('itemFound', itemFound);

                    return (
                      <TouchableOpacity
                        key={item.imageId}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingVertical: 4
                        }}
                        onPress={() => this.addToList(item)}
                      >
                        {itemFound + 1 >= 1 ? (
                          <View
                            style={{
                              width: 40,
                              backgroundColor: "#FF9D00",
                              borderRadius: 40,
                              height: 40,
                              marginBottom: -25,
                              zIndex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "center",

                                color: "#FFF"
                              }}
                            >
                              {itemFound + 1}
                            </Text>
                          </View>
                        ) : (
                          <View
                            style={{
                              width: 40,
                              //   backgroundColor: "#FF9D00",
                              borderRadius: 40,
                              height: 40,
                              marginBottom: -25,
                              zIndex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          ></View>
                        )}
                        <Image
                          source={{
                            uri: item.imageUrl
                          }}
                          width={95}
                          height={95}
                          style={[
                            { width: 95, height: 95, borderRadius: 20 },
                            itemFound + 1 >= 1
                              ? {
                                  borderWidth: 4,
                                  borderColor: "#FF9D00"
                                }
                              : {}
                          ]}
                        />
                      </TouchableOpacity>
                    );
                  }
                })}
            </Content>
            {!this.props.instagramPostLoading &&
              !isEmpty(this.props.instagramPostList) && (
                <Text
                  style={{
                    fontFamily: "montserrat-regular",
                    color: "#FFF",
                    fontSize: 14,
                    lineHeight: 18,
                    paddingVertical: 25,
                    textAlign: "center"
                  }}
                >
                  Select 3-6 Products
                </Text>
              )}
            {!this.props.instagramPostLoading &&
              !isEmpty(this.props.instagramPostList) && (
                <View style={styles.bottonViewWebsite}>
                  <LowerButton
                    checkmark={true}
                    bottom={0}
                    function={this._handleSubmission}
                  />
                </View>
              )}
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.campaignC.data,
  weburlAvalible: state.campaignC.weburlAvalible,
  mainBusiness: state.account.mainBusiness,
  instagramPostList: state.campaignC.instagramPostList,
  instagramPostLoading: state.campaignC.instagramPostLoading,
  selectedInstagramProducts: state.campaignC.selectedInstagramProducts,
  getWebProductsLoading: state.campaignC.getWebProductsLoading,
  savingWebProducts: state.campaignC.savingWebProducts
});

const mapDispatchToProps = dispatch => ({
  verifyBusinessUrl: weburl =>
    dispatch(actionCreators.verifyBusinessUrl(weburl)),
  getWebProducts: campaign_id =>
    dispatch(actionCreators.getWebProducts(campaign_id)),
  getInstagramPost: insta_handle =>
    dispatch(actionCreators.getInstagramPost(insta_handle))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectInstagramPost);
