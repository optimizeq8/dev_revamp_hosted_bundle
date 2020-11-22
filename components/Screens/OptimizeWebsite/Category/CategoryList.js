import React, { Component } from "react";
import {
  View,
  Image,
  BackHandler,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import analytics from "@segment/analytics-react-native";
import SafeAreaView from "react-native-safe-area-view";

import Axios from "axios";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//icons
// import OnlineStoreHome from "../../../../assets/SVGs/OnlineStoreHome";
import Pen from "../../../../assets/SVGs/Pen";

// Style
import styles from "./styles";
import myWebsiteStyles from "../myWebsiteEcommerceStyle";

import Header from "../../../MiniComponents/Header";
import { globalColors } from "../../../../GlobalStyles";
import LoadingModal from "../../CampaignCreate/AdDesign/LoadingModal";

import { _pickImage } from "../PickImage";

class MyWebsite extends Component {
  state = {
    signal: null,
    loaded: 0,
    isVisible: false,
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  _getUploadState = (loading) => {
    this.setState({
      loaded: loading,
    });
  };
  componentDidMount() {
    this.props.getWebProductsList(this.props.mainBusiness.businessid);
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`open_my_category`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  goBack = () => {
    this.props.navigation.navigate("Dashboard", {
      source: "open_my_category",
      source_action: "a_go_back",
    });
  };
  startUpload = (media) => {
    var body = new FormData();
    body.append("businessid", this.props.mainBusiness.businessid);
    body.append("businesslogo", media);
    this.props.changeBusinessLogo(
      body,
      this._getUploadState,
      this.cancelUpload,
      this.onToggleModal
    );
  };
  handleUpload = () => {
    this.setState({ signal: Axios.CancelToken.source() });
  };
  cancelUpload = () => {
    if (this.state.signal) this.state.signal.cancel("Upload Cancelled");
  };

  uploadPhoto = () => {
    _pickImage("Images", this.props.screenProps, this.startUpload);
  };
  onToggleModal = (visibile) => {
    this.setState({ isVisible: visibile });
  };
  goToSelectProduct = () => {
    analytics.track(`a_add_more_categories`, {
      source: "open_my_category",
      source_action: "a_add_more_categories",
    });
    // MyWebsiteSelectProducts
    this.props.navigation.navigate("AddCategory", {
      source: "open_my_category",
      source_action: "a_add_more_categories",
    });
  };

  renderEachProduct = (item) => {
    const { translate } = this.props.screenProps;
    const prices =
      item.prices && item.prices.length > 0
        ? item.prices
            .map((pr) => {
              return pr.currency + " " + pr.price;
            })
            .join(", ")
        : translate("Unavailable");

    return (
      <TouchableOpacity
        onPress={() => {
          analytics.track(`a_select_category_to_edit`, {
            source: "open_my_category",
            source_action: "a_select_category_to_edit",
            product_id: item.id,
          });
          this.props.navigation.navigate("EditCategory", {
            product: item,
            source: "open_my_category",
            source_action: "a_select_category_to_edit",
          });
        }}
        style={myWebsiteStyles.productCard}
        key={item.id}
      >
        <Image
          style={myWebsiteStyles.productImage}
          source={{
            uri: item.media && item.media[0] && item.media[0].url,
          }}
        />
        <View style={myWebsiteStyles.productDetailView}>
          <Text style={myWebsiteStyles.productNamesubhead}>
            {translate("Category Name")}
          </Text>
          <Text style={myWebsiteStyles.productNameText}>
            {item.name ? item.name : translate("Untitled")}
          </Text>
        </View>
        <Pen
          style={myWebsiteStyles.penIcon}
          width={15}
          fill={globalColors.purple}
        />
      </TouchableOpacity>
    );
  };
  render() {
    const { translate } = this.props.screenProps;
    const { mainBusiness } = this.props;
    let website = mainBusiness.weburl;
    if (website && !website.includes(".com")) {
      website = `https://${mainBusiness.weburl}.optimizeapp.com`;
    }
    return (
      <SafeAreaView
        style={myWebsiteStyles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Header
          screenProps={this.props.screenProps}
          closeButton={false}
          segment={{
            str: "MyWebsite Back Button",
            obj: { businessname: this.props.mainBusiness.businessname },
            source: "open_my_category",
            source_action: "a_go_back",
          }}
          navigation={this.props.navigation}
          showTopRightButton={true}
          topRightButtonText={"Create Category"}
          topRightButtonFunction={this.goToSelectProduct}
          title={"My Categories"}
          titleStyle={{
            color: "#75647C",
          }}
          iconColor={"#75647C"}
        />

        <FlatList
          contentContainerStyle={styles.list}
          initialNumToRender={12}
          horizontal={false}
          data={this.props.webcategories}
          keyExtractor={(item, index) => {
            if (item && item.id) {
              return item.id.toString();
            }
            return index;
          }}
          renderItem={({ item }) => this.renderEachProduct(item)}
          showsVerticalScrollIndicator={false}
        />
        <LoadingModal
          videoUrlLoading={false}
          loading={this.props.loading}
          isVisible={this.state.isVisible}
          onToggleModal={this.onToggleModal}
          cancelUpload={this.cancelUpload}
          loaded={this.state.loaded}
          screenProps={this.props.screenProps}
        />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.account.loading,
  mainBusiness: state.account.mainBusiness,
  businessLogo: state.website.businessLogo,
  webproducts: state.website.webproducts,
  getWebCategoriesLoading: state.website.getWebCategoriesLoading,
  webcategories: state.website.webcategories,
});

const mapDispatchToProps = (dispatch) => ({
  getWebProductsList: (businessid) =>
    dispatch(actionCreators.getWebProductsList(businessid)),
  getAllCategories: () => dispatch(actionCreators.getAllCategories()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyWebsite);
