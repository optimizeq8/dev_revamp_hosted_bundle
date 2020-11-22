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
import SafeAreaView from "react-native-safe-area-view";

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
import editProductStyles from "./addProductsStyles";

import Header from "../../../MiniComponents/Header";
import Picker from "../../../MiniComponents/Picker";
import { globalColors } from "../../../../GlobalStyles";
import LoadingModal from "../../CampaignCreate/AdDesign/LoadingModal";

// Data
import country from "../../../Data/countries.billingAddress";
import { _pickImageMedia } from "../PickImage";
import GradientButton from "../../../MiniComponents/GradientButton";
import styles from "../../../MiniComponents/InputFieldNew/styles";
import { showMessage } from "react-native-flash-message";

const sizes = [
  {
    size: "XS",
    id: "XS",
  },
  {
    size: "S",
    id: "S",
  },
  {
    size: "M",
    id: "M",
  },
  {
    size: "L",
    id: "L",
  },
  {
    size: "XL",
    id: "XL",
  },
  {
    size: "One Size",
    id: "One Size",
  },
];

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signal: null,
      loaded: 0,
      isVisible: false,
      showPriceModal: false,
      showCategoryModal: false,
      product: {
        prices: [],
        media: [],
        sizes: [],
        categories: [],
        is_featured: 0,
      },
      sizes: [],
      prices: [],
      activeCountryCurrency: "KWD",
      activeUploadMediaPos: 0,
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
    analytics.track(`open_add_product`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
    });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

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
      source: "open_add_product",
      source_action: "a_preview_product",
      product_id: this.state.product.id,
      product_name: this.state.product.name,
      product_price: this.state.product.prices,
      product_description: this.state.product.description_en,
    });
    this.props.navigation.navigate("ReviewProductDetail", {
      product: this.state.product,
      source: "open_add_product",
      source_action: "a_preview_product",
    });
  };
  closePriceModal = () => {
    analytics.track(`open_currency_modal`, {
      source: "open_add_product",
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
      source: "open_add_product",
      source_action: "a_toggle_price_modal",
      product_id: this.state.product.id,
      open: true,
    });
    this.setState({
      showPriceModal: true,
    });
  };
  closeSizesModal = () => {
    analytics.track(`open_sizes_modal`, {
      source: "open_edit_product",
      source_action: "a_toggle_sizes_modal",
      product_id: this.state.product.id,
      open: false,
    });
    this.setState({
      showSizeModal: false,
    });
  };
  openSizeModal = () => {
    analytics.track(`open_sizes_modal`, {
      source: "open_edit_product",
      source_action: "a_toggle_sizes_modal",
      product_id: this.state.product.id,
      open: true,
    });
    this.setState({
      showSizeModal: true,
    });
  };
  closeCategoriesModal = () => {
    analytics.track(`open_categories_modal`, {
      source: "open_edit_product",
      source_action: "a_toggle_categories_modal",
      product_id: this.state.product.id,
      open: false,
    });

    this.setState({
      showCategoryModal: false,
    });
  };
  openCategoriesModal = () => {
    analytics.track(`open_categories_modal`, {
      source: "open_edit_product",
      source_action: "a_toggle_categories_modal",
      product_id: this.state.product.id,
      open: true,
    });
    this.setState({
      showCategoryModal: true,
    });
  };
  savePrice = () => {
    analytics.track(`a_toggle_price_modal`, {
      source: "open_add_product",
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
  saveSize = () => {
    analytics.track(`a_toggle_price_modal`, {
      source: "open_add_product",
      source_action: "a_toggle_price_modal",
      product_id: this.state.product.id,
      open: false,
      product_sizes: this.state.sizes,
    });
    this.setState({
      showSizeModal: false,
      product: {
        ...this.state.product,
        sizes: this.state.sizes,
      },
    });
  };
  saveProduct = () => {
    if (this.state.product.media && this.state.product.media.length === 0) {
      showMessage({
        type: "warning",
        message: "Please add atleast 1 product image",
      });
    } else if (
      this.state.product.name &&
      this.state.product.name.length === 0
    ) {
      showMessage({
        type: "warning",
        message: "Please add name for your product",
      });
    } else {
      let info = {
        name: this.state.product.name,
        prices: this.state.product.prices,
        business_id: this.props.mainBusiness.businessid,
        description_en: this.state.product.description_en,
        description_ar: this.state.product.description_ar,
        instagram_pid: 0,
        media:
          this.state.product.media &&
          this.state.product.media.map((md) => md.media_path),
        is_featured: this.state.product.is_featured,
      };
      this.props.addNewProduct(info);
    }
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
      source: "open_add_product",
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
  onSelectedCategoriesItemsChange = (item) => {
    this.setState({
      categories: [...item],
    });
  };
  onSelectedItemCategoriesObjectsChange = (itemObj) => {
    this.setState({
      product: {
        ...this.state.product,
        categories: [...itemObj],
      },
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
            str: "Add Product Back Button",
            obj: { businessname: this.props.mainBusiness.businessname },
            source: "open_add_product",
            source_action: "a_go_back",
          }}
          // navigation={this.props.navigation}
          actionButton={this.goBack}
          title={"Add Product"}
          titleStyle={{
            color: "#75647C",
          }}
          iconColor={"#75647C"}
        />
        <ScrollView contentContainerStyle={styles.inputScrollViewStyle}>
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
              <View style={editProductStyles.imageHolderView}>
                {this.state.product.media &&
                  this.state.product.media[0] &&
                  this.state.product.media[0].url && (
                    <TouchableOpacity
                      style={editProductStyles.deleteMediaView}
                      onPress={() => this.deleteMedia(0)}
                    >
                      <Text style={editProductStyles.crossButtonText}>X</Text>
                    </TouchableOpacity>
                  )}
                <TouchableOpacity
                  style={editProductStyles.placeholderView}
                  onPress={() => this.uploadPhoto(0)}
                  disabled={this.props.saving}
                >
                  <Image
                    style={editProductStyles.imagePlaceholder}
                    source={{
                      uri:
                        this.state.product.media &&
                        this.state.product.media[0] &&
                        this.state.product.media[0].url,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => this.uploadPhoto(0)}
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
                        source: "open_add_product",
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
                        source: "open_add_product",
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
                disabled={this.props.saving}
                onPress={this.openSizeModal}
                style={editProductStyles.feildView}
              >
                <View style={editProductStyles.plusIconView}>
                  <PlusIcon width={7} fill={globalColors.purple} />
                </View>
                <View style={editProductStyles.fieldTextView}>
                  <Text style={editProductStyles.subHeading}>{"Sizes"}</Text>

                  <Text style={[editProductStyles.subText]}>
                    {this.state.product &&
                    this.state.product.sizes &&
                    this.state.product.sizes.length > 0
                      ? this.state.product.sizes.join(", ")
                      : "Add Sizes"}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={this.props.saving}
                onPress={this.openCategoriesModal}
                style={editProductStyles.feildView}
              >
                <View style={editProductStyles.plusIconView}>
                  <PlusIcon width={7} fill={globalColors.purple} />
                </View>
                <View style={editProductStyles.fieldTextView}>
                  <Text style={editProductStyles.subHeading}>
                    {"Categories"}
                  </Text>

                  <Text style={[editProductStyles.subText]}>
                    {this.state.product &&
                    this.state.product.categories &&
                    this.state.product.categories.length > 0
                      ? this.state.product.categories
                          .map((cat) => cat.name)
                          .join(", ")
                      : "Add Categories"}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={editProductStyles.feildView}
                onPress={() => {
                  analytics.track(`a_toggle_is_featured`, {
                    source: "open_add_product",
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
                      source: "open_add_product",
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
                  <Text style={styles.uploadText}>
                    {translate("Uploading")}
                  </Text>
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
          </InputScrollView>
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
                      source: "open_add_product",
                      source_action: "a_switch_country",
                      product_country: ctr.country,
                    });
                    // check if the value for that field is empty then clean the input field
                    const priceExist =
                      this.state.prices &&
                      this.state.prices.find(
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
                      this.state.prices &&
                        this.state.prices.find(
                          (pr) => pr.currency === ctr.currency
                        ) &&
                        editProductStyles.flagActiveImage,
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
                    {((this.state.prices &&
                      this.state.prices.find(
                        (pr) => pr.currency === ctr.currency
                      )) ||
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
                    source: "open_add_product",
                    source_action: "a_product_price",
                    product_country: this.state.activeCountryCurrency,
                    product_price: text,
                  });
                  const elementsIndex =
                    this.state.prices &&
                    this.state.prices.findIndex(
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

        <Modal
          visible={this.state.showSizeModal}
          onDismiss={this.closeSizesModal}
        >
          <View style={editProductStyles.priceCard}>
            <View style={editProductStyles.priceHeaderCard}>
              <TouchableOpacity onPress={this.closeSizesModal}>
                <CrossIcon width={10} stroke={globalColors.purple} />
              </TouchableOpacity>
              <View>
                <Text style={editProductStyles.priceText}>Sizes</Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: 15,
              }}
            >
              {sizes.map((size) => {
                const sizeFound =
                  this.state.sizes &&
                  this.state.sizes.length > 0 &&
                  this.state.sizes.find((sz) => sz === size.size);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      let newSizesArray = [...this.state.sizes];

                      if (newSizesArray.length === 0) {
                        newSizesArray.push(size.size);
                      } else {
                        let elemIndex = this.state.sizes.findIndex(
                          (element) => element === size.size
                        );
                        if (elemIndex === -1) {
                          newSizesArray.push(size.size);
                        } else {
                          newSizesArray.splice(elemIndex, 1);
                        }
                      }
                      this.setState({
                        sizes: newSizesArray,
                      });
                    }}
                    style={[
                      {
                        borderColor: globalColors.rum,
                        borderWidth: 1,
                        width: size.size === "One Size" ? 70 : 30,
                        height: 30,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                      },
                      sizeFound && {
                        borderColor: globalColors.purple,
                        borderWidth: 2,
                      },
                    ]}
                    key={size.size}
                  >
                    <Text
                      style={[
                        {
                          fontFamily: "montserrat-bold",
                          fontSize: 12,
                          color: globalColors.rum,
                        },
                        sizeFound && {
                          color: globalColors.purple,
                        },
                      ]}
                    >
                      {size.size}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={[
                editProductStyles.bottomView,
                { justifyContent: "flex-end" },
              ]}
            >
              <GradientButton
                style={editProductStyles.saveButton}
                purpleViolet
                text={translate("Save")}
                uppercase
                onPressAction={this.saveSize}
              />
            </View>
          </View>
        </Modal>
        <Picker
          screenProps={this.props.screenProps}
          uniqueKey={"id"}
          displayKey={"name"}
          single={false}
          open={this.state.showCategoryModal}
          data={[
            { id: "20", name: "Category 1" },
            { id: "21", name: "Category 2" },
            { id: "22", name: "Category 3" },
            { id: "23", name: "Category 4" },
          ]}
          onSelectedItemsChange={this.onSelectedCategoriesItemsChange}
          onSelectedItemObjectsChange={
            this.onSelectedItemCategoriesObjectsChange
          }
          selectedItems={this.state.categories}
          showIcon={true}
          closeCategoryModal={this.closeCategoriesModal}
        />
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
  addNewProduct: (info) => dispatch(actionCreators.addNewProduct(info)),
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
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
