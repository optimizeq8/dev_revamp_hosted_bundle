import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  BackHandler
} from "react-native";
import { Text, Container, Content } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { showMessage } from "react-native-flash-message";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";

import * as actionCreators from "../../../../../store/actions";

import CustomeHeader from "../../../../MiniComponents/Header";
import LowerButton from "../../../../MiniComponents/LowerButton";
import styles from "./styles";
import filter from "lodash/filter";

class SelectInstagramPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      cartList: [],
      errorImage: false,
      posts: []
    };
  }
  componentDidMount() {
    // console.log("campaignData", this.props.data);
    const insta_handle = this.props.navigation.getParam("insta_handle", "");
    this.props.getInstagramPostInitial(insta_handle);
    // console.log("campaign_id", this.props.data.campaign_id);
    this.props.getWebProducts(this.props.data.campaign_id);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

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

    // set updating new list
    if (
      prevProps.instagramPostList.length !== this.props.instagramPostList.length
    ) {
      // check if selectedInstagramProducts empty

      if (this.props.selectedInstagramProducts.length === 0) {
        const list = this.props.instagramPostList;
        this.setState({
          posts: list
        });
      } else {
        const newRecords = [];
        for (var i = 0; i < this.props.selectedInstagramProducts.length; i++) {
          newRecords.push(this.props.selectedInstagramProducts[i]);
        }

        // check if already in post

        for (var i = 0; i < this.props.instagramPostList.length; i++) {
          if (
            newRecords.findIndex(
              img => img.imageId === this.props.instagramPostList[i].imageId
            ) === -1
          ) {
            newRecords.push(this.props.instagramPostList[i]);
          }
        }

        this.setState({
          posts: [...newRecords]
        });
      }
    }
  }

  _handleSubmission = () => {
    const { translate } = this.props.screenProps;
    if (this.state.counter <= 3) {
      showMessage({
        message: translate("Select minimum 3 post"),
        duration: 2000,
        type: "warning"
      });
    } else {
      // console.log('cartList', this.state.cartList);
      this.props.navigation.navigate("SelectedInstagramProductsList", {
        selectetedItems: this.state.cartList,
        _changeDestination: this.props.navigation.getParam(
          "_changeDestination",
          () => {}
        )
      });
    }
  };
  addToList = item => {
    const { translate } = this.props.screenProps;
    const newCartList = [...this.state.cartList];
    const checkifALreadyExist = find(
      this.state.cartList,
      it => it.imageId === item.imageId
    );
    // console.log('checkifALreadyExist', checkifALreadyExist);
    if (this.state.counter >= 7 && !checkifALreadyExist) {
      showMessage({
        message: translate("Maximum 6 Selected"),
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

  onScrollHandler = () => {
    this.props.loadMoreInstagramPost(
      this.props.instaHandleId,
      this.props.instaEndCursor
    );
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
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
                paddingHorizontal: 60
              }}
            >
              {translate(
                "Select the products you want to promote on your campaign"
              )}
            </Text>

            {this.props.instagramPostLoading && (
              <ActivityIndicator color="#FF9D00" size="large" />
            )}
            {!this.props.instagramPostLoading && this.props.instagramPostList && (
              <FlatList
                contentContainerStyle={{
                  flex: 1,
                  paddingTop: 20,
                  display: "flex",
                  // flexDirection: "row",
                  // flexWrap: "wrap",
                  flexGrow: 1,
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
                initialNumToRender={12}
                numColumns={3}
                horizontal={false}
                data={this.state.posts}
                keyExtractor={(item, index) => {
                  if (item) {
                    return item.imageId;
                  }
                  return index;
                }}
                renderItem={({ item }) => {
                  if (item) {
                    const itemFound = findIndex(
                      this.state.cartList,
                      it => it.imageId === item.imageId
                    );
                    // console.log("itemFound", itemFound);

                    return (
                      <TouchableOpacity
                        key={item.imageId}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingVertical: 4,
                          // marginHorizontal: "auto",
                          paddingHorizontal: 8,
                          alignSelf: "flex-start"
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
                }}
              />
            )}
            {this.props.loadingMoreInstaPost && (
              <ActivityIndicator color="#FF9D00" size="large" />
            )}
            {!this.props.instagramPostLoading &&
              !this.props.loadingMoreInstaPost &&
              this.props.instagramPostList && (
                // !isEmpty(this.props.instagramPostList) &&
                <Text
                  style={{
                    fontFamily: "montserrat-regular",
                    color: "#FFF",
                    fontSize: 14,
                    lineHeight: 18,
                    paddingVertical: 10,
                    textAlign: "center"
                  }}
                >
                  {translate("(Select 3-6 Products)")}
                </Text>
              )}
            {!this.props.instagramPostLoading &&
              !this.props.loadingMoreInstaPost &&
              this.props.instagramPostList &&
              // !isEmpty(this.props.instagramPostList) &&
              this.props.instaHasNextPage && (
                <Text
                  style={{
                    fontFamily: "montserrat-bold",
                    color: "#FFF",
                    fontSize: 14,
                    lineHeight: 18,
                    paddingVertical: 10,
                    textAlign: "center",
                    borderWidth: 1,
                    borderColor: "#FFF",
                    borderRadius: 20,
                    marginHorizontal: 60,
                    marginBottom: 20
                  }}
                  onPress={this.onScrollHandler}
                >
                  {translate("VIEW MORE")}
                </Text>
              )}
            {!this.props.instagramPostLoading &&
              !this.props.loadingMoreInstaPost &&
              this.props.instagramPostList && (
                // !isEmpty(this.props.instagramPostList) &&
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
  savingWebProducts: state.campaignC.savingWebProducts,
  instaHandleId: state.campaignC.instaHandleId,
  instaEndCursor: state.campaignC.instaEndCursor,
  instaHasNextPage: state.campaignC.instaHasNextPage,
  loadingMoreInstaPost: state.campaignC.loadingMoreInstaPost
});

const mapDispatchToProps = dispatch => ({
  verifyBusinessUrl: weburl =>
    dispatch(actionCreators.verifyBusinessUrl(weburl)),
  getWebProducts: campaign_id =>
    dispatch(actionCreators.getWebProducts(campaign_id)),
  getInstagramPostInitial: insta_handle =>
    dispatch(actionCreators.getInstagramPostInitial(insta_handle)),
  loadMoreInstagramPost: (instaHandleId, instaEndCursor) =>
    dispatch(
      actionCreators.loadMoreInstagramPost(instaHandleId, instaEndCursor)
    )
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectInstagramPost);