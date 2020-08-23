import React, { Component } from "react";
import {
  View,
  Image,
  BackHandler,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import analytics from "@segment/analytics-react-native";
import { SafeAreaView } from "react-navigation";
import { Modal } from "react-native-paper";
import InputScrollView from "react-native-input-scroll-view";
import Axios from "axios";
import isEmpty from "lodash/isEmpty";

import CheckBox from "@react-native-community/checkbox";
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
import styles from "../../../MiniComponents/InputFieldNew/styles";

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
        // is_featured: true,
      },
      prices: [{ currency: "KWD", price: null, id: "" }],
      activeCountryCurrency: "KWD",
      activeUploadMediaPos: 1,
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
    const product = this.props.navigation.getParam("product", {});
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`open_edit_product`, {
      source,
      source_action,
      product_id: product.id,
      timestamp: new Date().getTime(),
    });
    // console.log("product1", product);
    this.setState({
      product: { ...product },
      prices: product && product.prices,
    });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  topRightButtonFunction = () => {
    this.createButtonAlert();
  };
  goBack = () => {
    this.props.navigation.goBack();
  };
  startUpload = (media) => {
    var body = new FormData();
    // body.append("businessid", this.props.mainBusiness.businessid);
    body.append("media", media, media.name);

    // console.log("media", media);
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

  uploadPhoto = (index) => {
    this.setState({
      activeUploadMediaPos: index,
    });
    _pickImageMedia("Images", this.props.screenProps, this.startUpload);
  };
  onToggleModal = (visibile) => {
    this.setState({ isVisible: visibile });
  };

  goToPreview = () => {
    analytics.track(`a_preview_product`, {
      source: "open_edit_product",
      source_action: "a_preview_product",
      product_id: this.state.product.id,
      product_name: this.state.product.name,
      product_price: this.state.product.prices,
      product_description: this.state.product.description_en,
    });
    this.props.navigation.navigate("ReviewProductDetail", {
      product: this.state.product,
      source: "open_edit_product",
      source_action: "a_preview_product",
    });
  };
  closePriceModal = () => {
    analytics.track(`open_currency_modal`, {
      source: "open_edit_product",
      source_action: "a_toggle_price_modal",
      product_id: this.state.product.id,
      open: false,
    });
    this.setState({
      showPriceModal: false,
    });
  };
  openPriceModal = () => {
    analytics.track(`open_currency_modal`, {
      source: "open_edit_product",
      source_action: "a_toggle_price_modal",
      product_id: this.state.product.id,
      open: true,
    });
    this.setState({
      showPriceModal: true,
    });
  };

  savePrice = () => {
    analytics.track(`a_toggle_price_modal`, {
      source: "open_edit_product",
      source_action: "a_toggle_price_modal",
      product_id: this.state.product.id,
      open: false,
      product_prices: this.state.prices,
    });
    this.setState({
      showPriceModal: false,
      product: {
        ...this.state.product,
        prices: this.state.prices,
      },
    });
  };
  saveProduct = () => {
    let info = {
      name: this.state.product.name,
      prices: this.state.product.prices,
      business_id: this.state.product.business_id,
      description_en: this.state.product.description_en,
      description_ar: this.state.product.description_ar,
      instagram_pid: this.state.product.instagram_pid,
      media: this.state.product.media.map((md) => md.media_path),
      is_featured: this.state.product.is_featured,
    };
    // console.log("info", info);
    this.props.saveSingleWebProduct(this.state.product.id, info);
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.media !== this.props.media &&
      this.props.media &&
      !isEmpty(this.props.media)
    ) {
      let media = this.state.product.media;
      media[this.state.activeUploadMediaPos] = this.props.media;
      // console.log("did update media", media);
      this.setState({
        product: {
          ...this.state.product,
          media,
        },
      });
    }
  }
  deleteMedia = (index) => {
    const media = [...this.state.product.media];
    analytics.track(`a_delete_single_media`, {
      source: "open_edit_product",
      source_action: "a_delete_single_media",
      product_id: this.state.product.id,
      media_id: media[index].id,
    });
    media.splice(index, 1);
    this.setState({
      product: {
        ...this.state.product,
        media,
      },
    });
  };
  createButtonAlert = () => {
    const { translate } = this.props.screenProps;
    analytics.track(`open_delete_product_prompt`, {
      source: "open_edit_product",
      source_action: "a_delete_product",
      product_id: this.state.product.id,
    });
    return Alert.alert(
      translate("Delete Product"),
      translate("Are you sure you want to delete this product ?"),
      [
        {
          text: translate("YES"),
          onPress: () => this.props.deleteWebProduct(this.state.product.id),
        },
        {
          text: translate("Cancel"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
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
            str: "Edit Product Back Button",
            obj: { businessname: this.props.mainBusiness.businessname },
            source: "open_edit_product",
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
          showsVerticalScrollIndicator={false}
          {...ScrollView.props}
          contentContainerStyle={styles.inputScrollViewStyle}
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
            <View style={editProductStyles.imageHolderView}>
              {this.state.product.media &&
                this.state.product.media[1] &&
                this.state.product.media[1].url && (
                  <TouchableOpacity
                    style={editProductStyles.deleteMediaView}
                    onPress={() => this.deleteMedia(1)}
                  >
                    <Text style={editProductStyles.crossButtonText}>X</Text>
                  </TouchableOpacity>
                )}
              <TouchableOpacity
                style={editProductStyles.placeholderView}
                onPress={() => this.uploadPhoto(1)}
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
                  onPress={() => this.uploadPhoto(1)}
                  disabled={this.props.saving}
                  disabled={this.props.saving}
                >
                  <CameraCircleOutlineIcon width={70} height={70} />
                  <Text style={editProductStyles.addMediaText}>
                    {translate("Add Media")}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            <View style={editProductStyles.imageHolderView}>
              {this.state.product.media &&
                this.state.product.media[2] &&
                this.state.product.media[2].url && (
                  <TouchableOpacity
                    style={editProductStyles.deleteMediaView}
                    onPress={() => this.deleteMedia(2)}
                  >
                    <Text style={editProductStyles.crossButtonText}>X</Text>
                  </TouchableOpacity>
                )}
              <TouchableOpacity
                style={editProductStyles.placeholderView}
                onPress={() => this.uploadPhoto(2)}
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
                  onPress={() => this.uploadPhoto(2)}
                >
                  <CameraCircleOutlineIcon width={70} height={70} />
                  <Text style={editProductStyles.addMediaText}>
                    {translate("Add Media")}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <TouchableOpacity
              onPress={() => {
                this.state.productNameInput.focus();
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
                    this.state.productNameInput = input;
                  }}
                  onChangeText={(text) => {
                    analytics.track(`a_product_name`, {
                      source: "open_edit_product",
                      source_action: "a_product_name",
                      product_id: this.state.product.id,
                      product_name: text,
                    });
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
                <Text
                  style={[
                    editProductStyles.subText,
                    this.state.product &&
                      this.state.product.prices &&
                      this.state.product.prices.length > 0 && {
                        fontFamily: "montserrat-regular-english",
                      },
                  ]}
                >
                  {this.state.product &&
                  this.state.product.prices &&
                  this.state.product.prices.length > 0
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
                this.state.productDescInput.focus();
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
                    this.state.productDescInput = input;
                  }}
                  onChangeText={(text) => {
                    analytics.track(`a_product_description`, {
                      source: "open_edit_product",
                      source_action: "a_product_description",
                      product_id: this.state.product.id,
                      product_description: text,
                    });
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
            <TouchableOpacity
              style={editProductStyles.feildView}
              onPress={() => {
                analytics.track(`a_toggle_is_featured`, {
                  source: "open_edit_product",
                  source_action: `a_toggle_is_featured`,
                  product_id: this.state.product.id,
                  product_is_featured:
                    this.state.product.is_featured === 0 ? 1 : 0,
                });
                this.setState({
                  product: {
                    ...this.state.product,
                    is_featured: this.state.product.is_featured === 0 ? 1 : 0,
                  },
                });
              }}
            >
              <CheckBox
                value={this.state.product.is_featured === 1}
                onValueChange={(newValue) => {
                  analytics.track(`a_toggle_is_featured`, {
                    source: "open_edit_product",
                    source_action: `a_toggle_is_featured`,
                    product_id: this.state.product.id,
                    product_is_featured: newValue ? 1 : 0,
                  });
                  this.setState({
                    product: {
                      ...this.state.product,
                      is_featured: newValue ? 1 : 0,
                    },
                  });
                }}
                tintColors={{
                  true: globalColors.purple,
                  false: globalColors.rum,
                }}
                tintColor={globalColors.rum}
                onCheckColor={globalColors.purple}
                onTintColor={globalColors.purple}
                onFillColor={"#9300FF29"}
                lineWidth={1}
                style={editProductStyles.checkBox}
              />
              <Text
                style={[
                  editProductStyles.fieldTextView,
                  editProductStyles.subHeading,
                ]}
              >
                {translate("FEATURED")}
              </Text>
            </TouchableOpacity>
          </View>
        </InputScrollView>

        <View style={editProductStyles.bottomBtns}>
          <GradientButton
            text={translate("Preview")}
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
          {this.props.saving && (
            <View style={editProductStyles.uploadingView}>
              <Text style={styles.uploadText}>{translate("Uploading")}</Text>
              <AnimatedCircularProgress
                size={50}
                width={5}
                fill={100}
                tintColor={globalColors.purple}
                backgroundColor={"#9300FF99"}
              />
            </View>
          )}

          {!this.props.saving && (
            <GradientButton
              text={translate("Save")}
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
          )}
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
                    analytics.track(`a_switch_country`, {
                      source: "open_edit_product",
                      source_action: "a_switch_country",
                      product_country: ctr.country,
                    });
                    // check if the value for that field is empty then clean the input field
                    const priceExist = this.state.prices.find(
                      (pr) => pr.currency === ctr.currency
                    );
                    if (!priceExist || priceExist.price === "") {
                      this.inputPrice.clear();
                    }
                    this.setState({
                      activeCountryCurrency: ctr.currency,
                    });
                  }}
                >
                  <Image
                    source={ctr.flag}
                    style={[
                      editProductStyles.flagImage,
                      this.state.prices.find(
                        (pr) => pr.currency === ctr.currency
                      ) && editProductStyles.flagActiveImage,
                      this.state.activeCountryCurrency === ctr.currency && {
                        borderColor: globalColors.orange,
                        borderWidth: 2,
                      },
                    ]}
                  />
                  <Text
                    style={[
                      editProductStyles.countryText,
                      this.state.activeCountryCurrency === ctr.currency && {
                        color: globalColors.orange,
                      },
                    ]}
                  >
                    {(this.state.prices.find(
                      (pr) => pr.currency === ctr.currency
                    ) ||
                      this.state.activeCountryCurrency === ctr.currency) &&
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
                ref={(inputField) => (this.inputPrice = inputField)}
                value={
                  this.state.prices &&
                  this.state.prices.find(
                    (pr) => pr.currency === this.state.activeCountryCurrency
                  ) &&
                  this.state.prices.find(
                    (pr) => pr.currency === this.state.activeCountryCurrency
                  ).price &&
                  this.state.prices
                    .find(
                      (pr) => pr.currency === this.state.activeCountryCurrency
                    )
                    .price.toString()
                }
                onChangeText={(text) => {
                  analytics.track(`a_product_price`, {
                    source: "open_edit_product",
                    source_action: "a_product_price",
                    product_country: this.state.activeCountryCurrency,
                    product_price: text,
                  });
                  const elementsIndex = this.state.prices.findIndex(
                    (element) =>
                      element.currency === this.state.activeCountryCurrency
                  );

                  let newArray = [...this.state.prices];
                  if (elementsIndex === -1) {
                    newArray.push({
                      currency: this.state.activeCountryCurrency,
                      price: text.toString(),
                      id: "",
                    });
                  }
                  // To remove that country
                  else if (text === "") {
                    newArray.splice(elementsIndex, 1);
                  } else {
                    newArray[elementsIndex] = {
                      currency: newArray[elementsIndex].currency,
                      price: text.toString(),
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
                text={translate("Save")}
                uppercase
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
