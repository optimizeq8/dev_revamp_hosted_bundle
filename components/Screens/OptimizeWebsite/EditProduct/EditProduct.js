import React, { Component } from "react";
import {
  View,
  Image,
  BackHandler,
  Text,
  Clipboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import analytics from "@segment/analytics-react-native";
import { SafeAreaView } from "react-navigation";
import { Modal } from "react-native-paper";

import Axios from "axios";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//icons
import PlusIcon from "../../../../assets/SVGs/Plus";
import CrossIcon from "../../../../assets/SVGs/Close";
import CameraCircleOutlineIcon from "../../../../assets/SVGs/CameraCircleOutlinePurple";

// Style
import editProductStyles from "./editProductStyles";

import Header from "../../../MiniComponents/Header";
import { globalColors } from "../../../../GlobalStyles";
import LoadingModal from "../../CampaignCreate/AdDesign/LoadingModal";

import { _pickImage } from "../PickImage";
import GradientButton from "../../../MiniComponents/GradientButton";
import { Input } from "native-base";

const country = [
  {
    currency: "KW",
    country: "Kuwait",
    flag: require("../../../../assets/images/Flags/Kuwait.png"),
  },
  {
    currency: "SR",
    country: "KSA",
    flag: require("../../../../assets/images/Flags/KSA.png"),
  },
  {
    currency: "BD",
    country: "Bahrain",
    flag: require("../../../../assets/images/Flags/Bahrain.png"),
  },
  {
    currency: "AED",
    country: "UAE",
    flag: require("../../../../assets/images/Flags/UAE.png"),
  },
];

class MyWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signal: null,
      loaded: 0,
      isVisible: false,
      showPriceModal: false,
      product: {},
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
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    const product = this.props.navigation.getParam("product", {});
    console.log("product", product);
    this.setState({ product });
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
    console.log("delete");
  };
  goBack = () => {
    this.props.navigation.goBack();
    // this.props.navigation.navigate("Dashboard", {
    //   source: "open_my_website",
    //   source_action: "a_go_back",
    // });
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

  goToPreview = () => {
    this.props.navigation.navigate("ReviewProductDetail", {
      product: this.state.product,
    });
  };
  closePriceModal = () => {
    this.setState({
      showPriceModal: false,
    });
  };
  openPriceModal = () => {
    this.setState({
      showPriceModal: true,
    });
  };
  render() {
    const { translate } = this.props.screenProps;

    return (
      <View style={editProductStyles.outerView}>
        <SafeAreaView forceInset={{ bottom: "never", top: "always" }} />
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
          title={"Edit Product"}
          titleStyle={{
            color: "#75647C",
          }}
          iconColor={"#75647C"}
          showTopRightButtonIcon={"delete"}
        />
        <ScrollView
          horizontal
          contentContainerStyle={editProductStyles.imageViewContainer}
        >
          <Image
            style={editProductStyles.image}
            source={{
              uri:
                this.state.product.media &&
                this.state.product.media[0].media_path,
            }}
          />
          <View style={editProductStyles.placeholderView}>
            <Image
              style={editProductStyles.imagePlaceholder}
              source={{
                uri:
                  this.state.product.media &&
                  this.state.product.media[1] &&
                  this.state.product.media[1].media_path,
              }}
            />
            <TouchableOpacity>
              <CameraCircleOutlineIcon width={70} height={70} />
              <Text style={editProductStyles.addMediaText}>
                {translate("Add Media")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={editProductStyles.placeholderView}>
            <Image
              style={editProductStyles.imagePlaceholder}
              source={{
                uri:
                  this.state.product.media &&
                  this.state.product.media[2] &&
                  this.state.product.media[2].media_path,
              }}
            />
            <TouchableOpacity>
              <CameraCircleOutlineIcon width={70} height={70} />
              <Text style={editProductStyles.addMediaText}>
                {translate("Add Media")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
        >
          <View style={editProductStyles.feildView}>
            <View style={editProductStyles.plusIconView}>
              <PlusIcon width={7} fill={globalColors.purple} />
            </View>
            <View style={editProductStyles.fieldTextView}>
              <Text style={editProductStyles.subHeading}>
                {translate("Product Name")}
              </Text>
              <Text style={editProductStyles.subText}>
                {translate("Add Name")}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={this.openPriceModal}
            style={editProductStyles.feildView}
          >
            <View style={editProductStyles.plusIconView}>
              <PlusIcon width={7} fill={globalColors.purple} />
            </View>
            <View style={editProductStyles.fieldTextView}>
              <Text style={editProductStyles.subHeading}>
                {translate("price")}
              </Text>
              <Text style={editProductStyles.subText}>
                {translate("Add Price")}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={editProductStyles.feildView}>
            <View style={editProductStyles.plusIconView}>
              <PlusIcon width={7} fill={globalColors.purple} />
            </View>
            <View style={editProductStyles.fieldTextView}>
              <Text style={editProductStyles.subHeading}>
                {translate("Description")}
              </Text>
              <Text style={editProductStyles.subText}>
                {this.state.product.description_en}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginVertical: 20,
          }}
        >
          <GradientButton
            text={"Preview"}
            screenProps={this.props.screenProps}
            transparent
            style={editProductStyles.previewBtn}
            uppercase
            textStyle={editProductStyles.previewText}
            onPressAction={this.goToPreview}
          />
          <GradientButton
            text={"Save"}
            screenProps={this.props.screenProps}
            purpleViolet
            style={editProductStyles.saveBtn}
            uppercase
            // textStyle={editProductStyles.previewText}
          />
        </View>

        <LoadingModal
          videoUrlLoading={false}
          loading={this.props.loading}
          isVisible={this.state.isVisible}
          onToggleModal={this.onToggleModal}
          cancelUpload={this.cancelUpload}
          loaded={this.state.loaded}
          screenProps={this.props.screenProps}
        />
        <Modal
          visible={this.state.showPriceModal}
          onDismiss={this.closePriceModal}
        >
          <View style={editProductStyles.priceCard}>
            <View style={editProductStyles.priceHeaderCard}>
              <TouchableOpacity onPress={this.closePriceModal}>
                <CrossIcon width={10} stroke={globalColors.purple} />
              </TouchableOpacity>
              <View>
                <Text style={editProductStyles.priceText}>
                  {translate("price")}
                </Text>
                <Text style={editProductStyles.priceSubText}>
                  {translate("Prices will show based on users location")}
                </Text>
              </View>
            </View>

            <View style={editProductStyles.countryOuterView}>
              {country.map((ctr) => (
                <TouchableOpacity
                  style={editProductStyles.countryEachView}
                  key={ctr.country}
                >
                  <Image
                    source={ctr.flag}
                    style={editProductStyles.flagImage}
                  />
                  <Text style={editProductStyles.countryText}>
                    {ctr.country}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={editProductStyles.bottomView}>
              <Input
                style={editProductStyles.inputView}
                placeholder={translate("Enter Price")}
                placeholderTextColor={"#75647C"}
                keyboardType={"numeric"}
              />

              <GradientButton
                style={editProductStyles.saveButton}
                purpleViolet
                text={"SAVE"}
              />
            </View>
          </View>
        </Modal>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(MyWebsite);
