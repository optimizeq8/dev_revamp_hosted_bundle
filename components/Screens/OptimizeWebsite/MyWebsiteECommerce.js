import React, { Component } from "react";
import {
  View,
  Image,
  BackHandler,
  Text,
  Clipboard,
  TouchableOpacity,
  FlatList,
} from "react-native";
import analytics from "@segment/analytics-react-native";
import { SafeAreaView } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";
import Axios from "axios";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
// import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";
import Pen from "../../../assets/SVGs/Pen";
import CopyIcon from "../../../assets/SVGs/CopyIcon";
import PlusIcon from "../../../assets/SVGs/Plus";

// Style
import styles from "./styles";
import myWebsiteStyles from "./myWebsiteEcommerceStyle";

import Header from "../../MiniComponents/Header";
import Website from "../../MiniComponents/InputFieldNew/Website";
import ProductSelect from "./ProductSelect";
import { globalColors } from "../../../GlobalStyles";
import LoadingModal from "../CampaignCreate/AdDesign/LoadingModal";

import { _pickImage } from "./PickImage";

class MyWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signal: null,
      loaded: 0,
      isVisible: false,
    };
  }
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
    analytics.track(`open_my_website`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  goToManageProducts = () => {
    this.props.navigation.navigate("ManageProducts");
  };
  topRightButtonFunction = () => {
    this.props.navigation.navigate("WebsiteSetting", {
      source: "open_my_website",
      source_action: "a_open_my_website_detail",
    });
  };
  goBack = () => {
    this.props.navigation.navigate("Dashboard", {
      source: "open_my_website",
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
    analytics.track(`a_add_more_products`, {
      source: "open_my_website",
      source_action: "a_add_more_products",
    });
    this.props.navigation.navigate("MyWebsiteSelectProducts", {
      source: "open_my_website",
      source_action: "a_add_more_products",
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
          analytics.track(`a_select_product_to_edit`, {
            source: "open_my_website",
            source_action: "a_select_product_to_edit",
            product_id: item.id,
          });
          this.props.navigation.navigate("EditProduct", {
            product: item,
            source: "open_my_website",
            source_action: "a_select_product_to_edit",
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
            {translate("Product Name")}
          </Text>
          <Text style={myWebsiteStyles.productNameText}>
            {item.name ? item.name : translate("Untitled")}
          </Text>
          <Text style={myWebsiteStyles.pricesubhead}>{translate("price")}</Text>
          <Text style={myWebsiteStyles.priceText}>{prices}</Text>
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
            source: "open_my_website",
            source_action: "a_go_back",
          }}
          showTopRightButtonIcon={"settings"}
          // navigation={this.props.navigation}
          actionButton={this.goBack}
          topRightButtonFunction={this.topRightButtonFunction}
          title={"My Website"}
          titleStyle={{
            color: "#75647C",
          }}
          iconColor={"#75647C"}
        />

        <View style={styles.businesslogoView}>
          <Image
            style={styles.businessLogoImage}
            source={{
              uri: mainBusiness.businesslogo || this.props.businessLogo,
            }}
          />
        </View>
        {/* <Text style={styles.bsnNameText}>
            {this.props.mainBusiness.businessname}
          </Text> */}
        <TouchableOpacity
          style={styles.changeLogoView}
          onPress={this.uploadPhoto}
        >
          <Pen width={15} fill={globalColors.purple} />
          <Text style={[styles.changeLogoText, { color: globalColors.purple }]}>
            {translate("Change Logo")}
          </Text>
        </TouchableOpacity>
        <View style={styles.weburlView}>
          <Website
            label={"Your URL"}
            website={website}
            disabled={true}
            screenProps={this.props.screenProps}
            iconFill={"#75647C"}
            labelColor={"#75647C"}
            inputColor={"#75647C"}
            customStyle={{
              backgroundColor: globalColors.white,
            }}
          />
          <TouchableOpacity
            style={styles.copyIcon2}
            onPress={() => {
              analytics.track(`a_copy_my_website_url`, {
                source: "open_my_website",
                source_action: "a_copy_my_website_url",
                weburl: website,
              });
              Clipboard.setString(website);
            }}
          >
            <CopyIcon style={styles.copyIcon} fill={globalColors.purple} />
          </TouchableOpacity>
        </View>
        <View style={myWebsiteStyles.myproductsView}>
          <Text style={myWebsiteStyles.myproductsText}>
            {translate("MY PRODUCTS")}
          </Text>

          <TouchableOpacity
            onPress={this.goToSelectProduct}
            style={myWebsiteStyles.addProductsView}
          >
            <View style={myWebsiteStyles.plusIconView}>
              <PlusIcon width={7} fill={globalColors.purple} />
            </View>
            <Text style={myWebsiteStyles.addProductText}>
              {translate("Add Products")}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          initialNumToRender={12}
          horizontal={false}
          data={this.props.webproducts}
          keyExtractor={(item, index) => {
            if (item && item.id) {
              return item.id.toString();
            }
            return index;
          }}
          renderItem={({ item }) => this.renderEachProduct(item)}
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
});

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (info, navigation) =>
    dispatch(actionCreators.updateUserInfo(info, navigation)),
  changeBusinessLogo: (info, loading, cancelUpload, onToggleModal) =>
    dispatch(
      actionCreators.changeBusinessLogo(
        info,
        loading,
        cancelUpload,
        onToggleModal
      )
    ),
  getWebProductsList: (businessid) =>
    dispatch(actionCreators.getWebProductsList(businessid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyWebsite);
