import React, { Component } from "react";
import { View, Image, BackHandler, Text } from "react-native";

import { SafeAreaView } from "react-navigation";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";
import Axios from "axios";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";
import Pen from "../../../assets/SVGs/Pen";
// Style
import styles from "./styles";
import myWebsiteStyles from "./myWebsiteStyles";

import Header from "../../MiniComponents/Header";
import ProductSelect from "./ProductSelect";
import GradientButton from "../../MiniComponents/GradientButton";
import { TouchableOpacity } from "react-native";
import { globalColors } from "../../../GlobalStyles";
import LoadingModal from "../CampaignCreate/AdDesign/LoadingModal";

import { _pickImage } from "./PickImage";
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
    // Segment.screenWithProperties("Personal Info", {
    //   category: "User Menu"
    // });
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
    _pickImage("Images", this.props.screenProps, this.startUpload);
  };
  onToggleModal = visibile => {
    this.setState({ isVisible: visibile });
  };

  render() {
    const { translate } = this.props.screenProps;
    const { mainBusiness } = this.props;
    console.log("render mainBusiness", mainBusiness);

    return (
      <SafeAreaView
        style={myWebsiteStyles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Header
          screenProps={this.props.screenProps}
          closeButton={false}
          // segment={{
          //   str: "Ad Design Back Button",
          //   obj: { businessname: this.props.mainBusiness.businessname }
          // }}
          showTopRightButtonIcon={"settings"}
          // navigation={this.props.navigation}
          actionButton={this.goBack}
          topRightButtonFunction={this.topRightButtonFunction}
          title={"My Website"}
        />

        <View
          style={{
            width: 140,
            height: 140,
            alignSelf: "center",
            backgroundColor: "rgba(0,0,0,0.16)",
            marginVertical: 10,
            borderRadius: 140,
            overflow: "hidden"
          }}
        >
          <Image
            style={{
              width: 140,
              height: 140
            }}
            source={{ uri: mainBusiness.businesslogo }}
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            marginBottom: 20
          }}
          onPress={this.uploadPhoto}
        >
          <Pen width={15} fill={globalColors.orange} />
          <Text style={styles.changeLogoText}>{translate("Change Logo")}</Text>
        </TouchableOpacity>

        <GradientButton
          style={styles.submitProducts}
          uppercase
          text={"Manage Products"}
          onPressAction={this.goToManageProducts}
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
const mapStateToProps = state => ({
  loading: state.account.loading,
  mainBusiness: state.account.mainBusiness
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
