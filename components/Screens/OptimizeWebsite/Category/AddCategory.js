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
import { AnimatedCircularProgress } from "react-native-circular-progress";
import analytics from "@segment/analytics-react-native";
import { SafeAreaView } from "react-navigation";
import { Modal } from "react-native-paper";
import InputScrollView from "react-native-input-scroll-view";
import Axios from "axios";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//icons
import PlusIcon from "../../../../assets/SVGs/Plus";
import CameraCircleOutlineIcon from "../../../../assets/SVGs/CameraCircleOutlinePurple";

// Style
import editProductStyles from "./styles";

import Header from "../../../MiniComponents/Header";
import Picker from "../../../MiniComponents/Picker";

import { globalColors } from "../../../../GlobalStyles";
import LoadingModal from "../../CampaignCreate/AdDesign/LoadingModal";

// Data
import { _pickImageMedia } from "../PickImage";
import GradientButton from "../../../MiniComponents/GradientButton";
import styles from "../../../MiniComponents/InputFieldNew/styles";
import { showMessage } from "react-native-flash-message";

class AddCategory extends Component {
  state = {
    signal: null,
    loaded: 0,
    isVisible: false,
    showProductModal: false,
    category: {
      name: "",
      media: { uri: "" },
      products: [],
    },
    products: [],
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
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`open_add_category`, {
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
    // var body = new FormData();
    // // body.append("businessid", this.props.mainBusiness.businessid);
    // body.append("media", media, media.name);
    this.setState({
      category: {
        ...this.state.category,
        media,
      },
    });

    // this.props.saveSingleMedia(
    //   body,
    //   this._getUploadState,
    //   this.cancelUpload,
    //   this.onToggleModal
    // );
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

  saveCategory = () => {
    if (this.state.category.name && this.state.category.name.length === 0) {
      showMessage({
        type: "warning",
        message: "Please add name for your category",
      });
    } else if (
      this.state.category.media &&
      this.state.category.media.uri === ""
    ) {
      showMessage({
        type: "warning",
        message: "Please add category image",
      });
    } else {
      var body = new FormData();
      body.append("businessid", this.props.mainBusiness.businessid);
      body.append(
        "media",
        this.state.category.media,
        this.state.category.media.name
      );
      body.append("name", this.state.category.name);

      // This is to add a new category
      this.props.addCategory(body, this._getUploadState, this.cancelUpload);
    }
  };

  deleteMedia = (index) => {
    const media = [...this.state.category.media];
    analytics.track(`a_delete_single_media`, {
      source: "open_add_category",
      source_action: "a_delete_single_media",
      category_id: this.state.category.id,
      media_id: media[index].id,
    });
    media.splice(index, 1);
    this.setState({
      category: {
        ...this.state.category,
        media,
      },
    });
  };

  closeProductsModal = () => {
    analytics.track(`open_products_modal`, {
      source: "open_add_category",
      source_action: "a_toggle_products_modal",
      category_id: this.state.category.id,
      open: false,
    });

    this.setState({
      showProductModal: false,
    });
  };
  openProductsModal = () => {
    analytics.track(`open_products_modal`, {
      source: "open_add_category",
      source_action: "a_toggle_products_modal",
      category_id: this.state.category.id,
      open: true,
    });
    this.setState({
      showProductModal: true,
    });
  };

  onSelectedCategoriesItemsChange = (item) => {
    this.setState({
      products: [...item],
    });
  };
  onSelectedItemCategoriesObjectsChange = (itemObj) => {
    this.setState({
      category: {
        ...this.state.category,
        products: [...itemObj],
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
            source: "open_add_category",
            source_action: "a_go_back",
          }}
          navigation={this.props.navigation}
          // actionButton={this.goBack}
          title={"Add Category"}
          titleStyle={{
            color: "#75647C",
          }}
          iconColor={"#75647C"}
        />
        <InputScrollView
          showsVerticalScrollIndicator={false}
          {...ScrollView.props}
          contentContainerStyle={[
            styles.inputScrollViewStyle,
            { alignItems: "flex-start" },
          ]}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={editProductStyles.imageViewContainer}
          >
            <View style={editProductStyles.imageHolderView}>
              {this.state.category.media &&
                this.state.category.media[0] &&
                this.state.category.media[0].url && (
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
                      this.state.category.media &&
                      this.state.category.media[0] &&
                      this.state.category.media[0].url
                        ? this.state.category.media[0].url
                        : this.state.category.media &&
                          this.state.category.media &&
                          this.state.category.media.uri
                        ? this.state.category.media.uri
                        : "",
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
          </ScrollView>
          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <TouchableOpacity
              onPress={() => {
                this.state.categoryNameInput.focus();
              }}
              style={editProductStyles.feildView}
              disabled={this.props.saving}
            >
              <View style={editProductStyles.plusIconView}>
                <PlusIcon width={7} fill={globalColors.purple} />
              </View>
              <View style={editProductStyles.fieldTextView}>
                <Text style={editProductStyles.subHeading}>
                  {"Category Name"}
                </Text>
                <TextInput
                  editable={!this.props.saving}
                  placeholder={translate("Add Name")}
                  style={editProductStyles.subText}
                  value={this.state.category.name}
                  ref={(input) => {
                    this.state.categoryNameInput = input;
                  }}
                  onChangeText={(text) => {
                    analytics.track(`a_category_name`, {
                      source: "open_add_category",
                      source_action: "a_category_name",
                      category_id: this.state.category.id,
                      category_name: text,
                    });
                    this.setState({
                      category: {
                        ...this.state.category,
                        name: text,
                      },
                    });
                  }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.openProductsModal}
              style={editProductStyles.feildView}
              disabled={this.props.saving}
            >
              <View style={editProductStyles.plusIconView}>
                <PlusIcon width={7} fill={globalColors.purple} />
              </View>
              <View style={editProductStyles.fieldTextView}>
                <Text style={editProductStyles.subHeading}>{"Products"}</Text>
                <Text style={editProductStyles.subText}>
                  {this.state.category.products &&
                  this.state.category.products.length > 0
                    ? this.state.category.products
                        .map((pr) => pr.name)
                        .join(", ")
                    : "Add Products"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </InputScrollView>

        <View style={editProductStyles.bottomBtns}>
          {this.props.saving && (
            <View style={editProductStyles.uploadingView}>
              <Text style={styles.uploadText}>
                {translate("Uploading") + "\n" + this.state.loaded + "%"}
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
              onPressAction={this.saveCategory}
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
        <Picker
          screenProps={this.props.screenProps}
          uniqueKey={"id"}
          displayKey={"name"}
          single={false}
          open={this.state.showProductModal}
          data={this.props.webproducts}
          onSelectedItemsChange={this.onSelectedCategoriesItemsChange}
          onSelectedItemObjectsChange={
            this.onSelectedItemCategoriesObjectsChange
          }
          selectedItems={this.state.products}
          showIcon={true}
          closeCategoryModal={this.closeProductsModal}
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
  webproducts: state.website.webproducts,
});

const mapDispatchToProps = (dispatch) => ({
  addCategory: (info, loading, cancelToken) =>
    dispatch(actionCreators.addCategory(info, loading, cancelToken)),
  setSavingToInitial: () => dispatch(actionCreators.setSavingToInitial()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);