import React, { Component } from "react";
import {
  View,
  Image,
  BackHandler,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";

import WebView from "react-native-webview";
import analytics from "@segment/analytics-react-native";
import SafeAreaView from "react-native-safe-area-view";

import { LinearGradient } from "expo-linear-gradient";
import Axios from "axios";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
// import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";
import Pen from "../../../assets/SVGs/Pen";
import CopyIcon from "../../../assets/SVGs/CopyIcon";

// Style
import styles from "./styles";
import myWebsiteStyles from "./myWebsiteStyles";

import Header from "../../MiniComponents/Header";
import Website from "../../MiniComponents/InputFieldNew/Website";
import ProductSelect from "./ProductSelect";
import { globalColors } from "../../../GlobalStyles";
import LoadingModal from "../CampaignCreate/AdDesign/LoadingModal";
import Loading from "../../MiniComponents/LoadingScreen";

import { _pickImage } from "./PickImage";
import { heightPercentageToDP } from "react-native-responsive-screen";

class MyWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signal: null,
      loaded: 0,
      isVisible: false,
      viewLoader: false,
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
  hideLoader = () => {
    this.setState({ viewLoader: false });
  };
  componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`Screen Viewed`, {
      screen_name: "MyWebsite",
      source,
      source_action,
      business_id:
        this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  goToManageProducts = () => {
    this.props.navigation.navigate("ManageProducts");
  };
  topRightButtonFunction = () => {
    // const { mainBusiness } = this.props;
    // if (Platform.OS === "ios") {
    this.props.navigation.navigate("WebsiteSetting", {
      source: "open_my_website",
      source_action: "a_open_my_website_detail",
    });
    // }
    // if (Platform.OS === "android") {
    //   this.props.navigation.navigate("WebView", {
    //     url: `https://www.optimizeapp.com/mywebsite?edit=true&businessid=${mainBusiness.businessid}&insta_handle=${mainBusiness.insta_handle}&snapchat_handle=${mainBusiness.snapchat_handle}&callnumber=${mainBusiness.callnumber}&whatsappnumber=${mainBusiness.whatsappnumber}&googlemaplink=${mainBusiness.googlemaplink}&businessname=${mainBusiness.businessname}`,
    //     title: "My Website",
    //     source: "open_my_website",
    //     source_action: "a_open_my_website_detail",
    //   });
    // }
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
    _pickImage(
      "Images",
      this.props.screenProps,
      this.startUpload,
      this.props.mainBusiness
    );
  };
  onToggleModal = (visibile) => {
    this.setState({ isVisible: visibile });
  };
  componentDidUpdate(prevProps) {
    const { mainBusiness } = this.props;
    // check if navigation params contain updated info then update locally
    const updateInfoLocally =
      !prevProps.navigation.getParam("updateInfo", false) &&
      this.props.navigation.getParam("updateInfo", false);
    if (updateInfoLocally) {
      this.props.updateBusinessInfoLocally({
        insta_handle: this.props.navigation.getParam(
          "insta_handle",
          mainBusiness.insta_handle
        ),
        callnumber: this.props.navigation.getParam(
          "callnumber",
          mainBusiness.callnumber
        ),
        whatsappnumber: this.props.navigation.getParam(
          "whatsappnumber",
          mainBusiness.whatsappnumber
        ),
        googlemaplink: this.props.navigation.getParam(
          "googlemaplink",
          mainBusiness.googlemaplink
        ),
      });
    }
  }
  render() {
    const { translate } = this.props.screenProps;
    const { mainBusiness } = this.props;
    let website = mainBusiness.weburl;
    if (website && !website.includes(".com")) {
      website = `https://${mainBusiness.weburl}.optimizeapp.com`;
    }
    return (
      <View>
        <SafeAreaView
          style={myWebsiteStyles.safeAreaViewContainer}
          forceInset={{ bottom: "never", top: "always" }}
        />
        <LinearGradient
          colors={["#9300FF", "#5600CB"]}
          locations={[0, 0.35]}
          style={styles.gradient}
        />
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
        />
        <ScrollView
          contentContainerStyle={{ paddingBottom: heightPercentageToDP(15) }}
        >
          <View style={styles.businesslogoView}>
            <Image
              style={{
                width: 95,
                height: 95,
              }}
              source={{
                uri: mainBusiness.businesslogo || this.props.businessLogo,
              }}
            />
          </View>
          <Text style={styles.bsnNameText}>
            {this.props.mainBusiness.businessname}
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              marginBottom: 13,
            }}
            onPress={this.uploadPhoto}
          >
            <Pen width={15} fill={globalColors.orange} />
            <Text style={styles.changeLogoText}>
              {translate("Change Logo")}
            </Text>
          </TouchableOpacity>
          <View style={styles.weburlView}>
            <Website
              website={website}
              disabled={true}
              screenProps={this.props.screenProps}
              iconFill={globalColors.white}
              labelColor={globalColors.white}
            />
            <TouchableOpacity
              style={styles.copyIcon2}
              onPress={() => {
                analytics.track(`Button Pressed`, {
                  button_type: "Copy Website URL",
                  button_content: website,
                  source: "MyWebsite",
                  business_id:
                    this.props.mainBusiness &&
                    this.props.mainBusiness.businessid,
                });
                Clipboard.setString(website);
              }}
            >
              <CopyIcon fill={"#FFF"} style={styles.copyIcon} />
            </TouchableOpacity>
          </View>

          <ProductSelect
            source={"open_my_website"}
            edit={true}
            screenProps={this.props.screenProps}
          />
        </ScrollView>

        <LoadingModal
          videoUrlLoading={false}
          loading={this.props.loading}
          isVisible={this.state.isVisible}
          onToggleModal={this.onToggleModal}
          cancelUpload={this.cancelUpload}
          loaded={this.state.loaded}
          screenProps={this.props.screenProps}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.account.loading,
  mainBusiness: state.account.mainBusiness,
  businessLogo: state.website.businessLogo,
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
  updateBusinessInfoLocally: (data) =>
    dispatch(actionCreators.updateBusinessConnectedToFacebook(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyWebsite);
