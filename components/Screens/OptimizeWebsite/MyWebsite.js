import React, { Component } from "react";
import {
  View,
  Image,
  BackHandler,
  Text,
  Clipboard,
  TouchableOpacity
} from "react-native";

import { SafeAreaView } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";
import Axios from "axios";

import * as Segment from "expo-analytics-segment";

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
import ProductSelect from "./ProductSelect";
import { globalColors } from "../../../GlobalStyles";
import LoadingModal from "../CampaignCreate/AdDesign/LoadingModal";

import { _pickImage } from "./PickImage";
import segmentEventTrack from "../../segmentEventTrack";

class MyWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signal: null,
      loaded: 0,
      isVisible: false
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  _getUploadState = loading => {
    this.setState({
      loaded: loading
    });
  };
  componentDidMount() {
    Segment.screenWithProperties("My Website", {
      businessid: this.props.mainBusiness.businessid,
      businessname: this.props.mainBusiness.businessname
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  goToManageProducts = () => {
    this.props.navigation.navigate("ManageProducts");
  };
  topRightButtonFunction = () => {
    this.props.navigation.navigate("WebsiteSetting");
  };
  goBack = () => {
    this.props.navigation.navigate("Dashboard");
  };
  startUpload = media => {
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
    segmentEventTrack("Button clicked to change business logo");
    _pickImage("Images", this.props.screenProps, this.startUpload);
  };
  onToggleModal = visibile => {
    this.setState({ isVisible: visibile });
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
            obj: { businessname: this.props.mainBusiness.businessname }
          }}
          showTopRightButtonIcon={"settings"}
          // navigation={this.props.navigation}
          actionButton={this.goBack}
          topRightButtonFunction={this.topRightButtonFunction}
          title={"My Website"}
        />

        <View style={styles.businesslogoView}>
          <Image
            style={{
              width: 95,
              height: 95
            }}
            source={{
              uri: mainBusiness.businesslogo || this.props.businessLogo
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
            marginBottom: 13
          }}
          onPress={this.uploadPhoto}
        >
          <Pen width={15} fill={globalColors.orange} />
          <Text style={styles.changeLogoText}>{translate("Change Logo")}</Text>
        </TouchableOpacity>

        <View style={styles.labelView}>
          <Text style={styles.yourUrlText}>{translate("Your URL")}</Text>
        </View>
        <View style={styles.weburlView}>
          <Text selectable style={styles.weburl}>
            {website}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Clipboard.setString(website);
            }}
          >
            <CopyIcon style={styles.copyIcon} />
          </TouchableOpacity>
        </View>

        <ProductSelect edit={true} screenProps={this.props.screenProps} />
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
const mapStateToProps = state => ({
  loading: state.account.loading,
  mainBusiness: state.account.mainBusiness,
  businessLogo: state.website.businessLogo
});

const mapDispatchToProps = dispatch => ({
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
    )
});
export default connect(mapStateToProps, mapDispatchToProps)(MyWebsite);
