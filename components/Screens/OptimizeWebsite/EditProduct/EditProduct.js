import React, { Component } from "react";
import {
  View,
  Image,
  BackHandler,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import analytics from "@segment/analytics-react-native";
import { SafeAreaView } from "react-navigation";
import { Modal } from "react-native-paper";
import InputScrollView from "react-native-input-scroll-view";
import Axios from "axios";
import isEmpty from "lodash/isEmpty";

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

// Data
import country from "../../../Data/countries.billingAddress";
import { _pickImageMedia } from "../PickImage";
import GradientButton from "../../../MiniComponents/GradientButton";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signal: null,
      loaded: 0,
      isVisible: false,
      showPriceModal: false,
      product: {
        prices: [],
      },
      prices: [{ currency: "KWD", price: null, id: "" }],
      activeCountryCurrency: "KWD",
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
    console.log("product1", product);
    this.setState({
      product: { ...product },
      prices: [...product.prices],
    });

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
    this.props.deleteWebProduct(this.state.product.id);
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
    // body.append("businessid", this.props.mainBusiness.businessid);
    body.append("media", media, media.name);
    // this.props.changeBusinessLogo(
    //   body,
    //   this._getUploadState,
    //   this.cancelUpload,
    //   this.onToggleModal
    // );
    console.log("media", media);
    this.props.saveSingleMedia(
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
    _pickImageMedia("Images", this.props.screenProps, this.startUpload);
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

  savePrice = () => {
    this.setState({
      showPriceModal: false,
      product: {
        ...this.state.product,
        prices: this.state.prices,
      },
    });
  };
  saveProduct = () => {
    console.log("product to save", this.state.product);
    let info = {
      name: this.state.product.name,
      prices: this.state.product.prices,
      business_id: this.state.product.business_id,
      description_en: this.state.product.description_en,
      description_ar: this.state.product.description_ar,
      instagram_pid: this.state.product.instagram_pid,
      media: this.state.product.media.map((md) => md.media_path),
    };
    console.log("info", info);
    this.props.saveSingleWebProduct(this.state.product.id, info);
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.media !== this.props.media &&
      this.props.media &&
      !isEmpty(this.props.media)
    ) {
      let product = this.state.product;
      product = {
        ...product,
        media: [...product.media, this.props.media],
      };

      console.log("did update prod", product);
      this.setState({
        product,
      });
    }
  }
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
        <InputScrollView
          {...ScrollView.props}
          contentContainerStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // height: "100%",
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={editProductStyles.imageViewContainer}
          >
            <Image
              style={editProductStyles.image}
              source={{
                uri:
                  this.state.product.media &&
                  this.state.product.media[0] &&
                  this.state.product.media[0].url,
              }}
            />
            <TouchableOpacity
              style={editProductStyles.placeholderView}
              onPress={this.uploadPhoto}
              disabled={this.props.saving}
            >
              <Image
                style={editProductStyles.imagePlaceholder}
                source={{
                  uri:
                    this.state.product.media &&
                    this.state.product.media[1] &&
                    this.state.product.media[1].url,
                }}
              />
              <TouchableOpacity
                onPress={this.uploadPhoto}
                disabled={this.props.saving}
                disabled={this.props.saving}
              >
                <CameraCircleOutlineIcon width={70} height={70} />
                <Text style={editProductStyles.addMediaText}>
                  {translate("Add Media")}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
              style={editProductStyles.placeholderView}
              onPress={this.uploadPhoto}
              disabled={this.props.saving}
            >
              <Image
                style={editProductStyles.imagePlaceholder}
                source={{
                  uri:
                    this.state.product.media &&
                    this.state.product.media[2] &&
                    this.state.product.media[2].url,
                }}
              />
              <TouchableOpacity
                disabled={this.props.saving}
                onPress={this.uploadPhoto}
              >
                <CameraCircleOutlineIcon width={70} height={70} />
                <Text style={editProductStyles.addMediaText}>
                  {translate("Add Media")}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </ScrollView>
          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <TouchableOpacity
              onPress={() => {
                this.productNameInput.focus();
              }}
              style={editProductStyles.feildView}
              disabled={this.props.saving}
            >
              <View style={editProductStyles.plusIconView}>
                <PlusIcon width={7} fill={globalColors.purple} />
              </View>
              <View style={editProductStyles.fieldTextView}>
                <Text style={editProductStyles.subHeading}>
                  {translate("Product Name")}
                </Text>
                {/* <Text style={editProductStyles.subText}>
                {translate("Add Name")}
              </Text> */}
                <TextInput
                  editable={!this.props.saving}
                  placeholder={translate("Add Name")}
                  style={editProductStyles.subText}
                  value={this.state.product.name}
                  ref={(input) => {
                    this.productNameInput = input;
                  }}
                  onChangeText={(text) => {
                    this.setState({
                      product: {
                        ...this.state.product,
                        name: text,
                      },
                    });
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.props.saving}
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
                  {this.state.product.prices.length > 0
                    ? this.state.product.prices
                        .map((pr) => pr.currency + " " + pr.price)
                        .join(", ")
                    : translate("Add Price")}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={this.props.saving}
              onPress={() => {
                this.productDescInput.focus();
              }}
              style={editProductStyles.feildView}
            >
              <View style={editProductStyles.plusIconView}>
                <PlusIcon width={7} fill={globalColors.purple} />
              </View>
              <View style={editProductStyles.fieldTextView}>
                <Text style={editProductStyles.subHeading}>
                  {translate("Description")}
                </Text>

                <TextInput
                  editable={!this.props.saving}
                  style={[editProductStyles.subText]}
                  multiline={true}
                  value={this.state.product.description_en}
                  ref={(input) => {
                    this.productDescInput = input;
                  }}
                  onChangeText={(text) => {
                    this.setState({
                      product: {
                        ...this.state.product,
                        description_en: text,
                      },
                    });
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </InputScrollView>

        <View style={editProductStyles.bottomBtns}>
          <GradientButton
            text={"Preview"}
            screenProps={this.props.screenProps}
            transparent
            style={editProductStyles.previewBtn}
            uppercase
            textStyle={editProductStyles.previewText}
            onPressAction={this.goToPreview}
            disabled={this.props.saving}
            disabledGradientBegin={"#0000"}
            disabledGradientEnd={"#0000"}
          />
          <GradientButton
            text={"Save"}
            screenProps={this.props.screenProps}
            purpleViolet
            style={editProductStyles.saveBtn}
            uppercase
            onPressAction={this.saveProduct}
            disabled={this.props.saving}
            disabledGradientBegin={"#9300FF"}
            disabledGradientEnd={"#9300FF"}
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
                  onPress={() => {
                    this.setState({
                      activeCountryCurrency: ctr.currency,
                    });
                  }}
                >
                  <Image
                    source={ctr.flag}
                    style={[
                      editProductStyles.flagImage,
                      this.state.activeCountryCurrency === ctr.currency &&
                        editProductStyles.flagActiveImage,
                    ]}
                  />
                  <Text style={editProductStyles.countryText}>
                    {this.state.activeCountryCurrency === ctr.currency &&
                      translate(ctr.label)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={editProductStyles.bottomView}>
              <TextInput
                editable={!this.props.saving}
                style={editProductStyles.inputView}
                placeholder={translate("Enter Price")}
                placeholderTextColor={"#75647C"}
                keyboardType={"numeric"}
                value={
                  this.state.product.prices.find(
                    (pr) => pr.currency === this.state.activeCountryCurrency
                  ) &&
                  this.state.product.prices
                    .find(
                      (pr) => pr.currency === this.state.activeCountryCurrency
                    )
                    .price.toString()
                }
                onChangeText={(text) => {
                  console.log("text", text);
                  const elementsIndex = this.state.prices.findIndex(
                    (element) =>
                      element.currency === this.state.activeCountryCurrency
                  );

                  let newArray = [...this.state.prices];
                  console.log("elementsIndex", elementsIndex);
                  if (elementsIndex === -1) {
                    newArray.push({
                      currency: this.state.activeCountryCurrency,
                      price: text,
                      id: "",
                    });
                  } else {
                    newArray[elementsIndex] = {
                      currency: newArray[elementsIndex].currency,
                      price: text,
                      id: newArray[elementsIndex].id,
                    };
                  }

                  this.setState({
                    prices: [...newArray],
                  });
                }}
              />

              <GradientButton
                style={editProductStyles.saveButton}
                purpleViolet
                text={"SAVE"}
                onPressAction={this.savePrice}
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
  media: state.website.media,
  saving: state.website.saving,
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
  deleteWebProduct: (product_id) =>
    dispatch(actionCreators.deleteWebProduct(product_id)),
  saveSingleWebProduct: (product_id, info) =>
    dispatch(actionCreators.saveSingleWebProduct(product_id, info)),
  saveSingleMedia: (media, _getUploadState, cancelUpload, onToggleModal) =>
    dispatch(
      actionCreators.saveSingleMedia(
        media,
        _getUploadState,
        cancelUpload,
        onToggleModal
      )
    ),
  setSavingToInitial: () => dispatch(actionCreators.setSavingToInitial()),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
