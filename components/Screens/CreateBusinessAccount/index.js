//Components
import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  BackHandler,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import analytics from "@segment/analytics-react-native";
import CustomHeader from "../../MiniComponents/Header";
import SafeAreaView from "react-native-safe-area-view";

import InputScrollView from "react-native-input-scroll-view";

import isEmpty from "lodash/isEmpty";
import isEqual from "react-fast-compare";

import Picker from "../../MiniComponents/Picker";
import Website from "../../MiniComponents/InputFieldNew/Website";
import LowerButton from "../../MiniComponents/LowerButton";
import CheckMarkLoading from "../../MiniComponents/CheckMarkLoading";
import GradientButton from "../../MiniComponents/GradientButton";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import InputFeild from "../../MiniComponents/InputFieldNew";
import ModalField from "../../MiniComponents/InputFieldNew/ModalField";

//data
import businessCategoryList from "../../Data/businessCategoriesList.data";

// Style
import styles from "./styles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
import CorporateIcon from "../../../assets/SVGs/Corporate";
import LocationIcon from "../../../assets/SVGs/LocationOutline";
import BusinessIcon from "../../../assets/SVGs/Briefcase";
import InstagramIcon from "../../../assets/SVGs/Instagram";
//Validator
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { showMessage } from "react-native-flash-message";
import AppSearchModal from "../../MiniComponents/AppChoice/AppSearchModal";
import AppChoiceBusiness from "../../MiniComponents/AppChoiceBusiness";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../GradiantColors/colors";
import globalStyles from "../../../GlobalStyles";

class CreateBusinessAccount extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    const { translate } = this.props.screenProps;
    this.state = {
      businessAccount: {
        businessname: "",
        businesscategory: "",
        country: "",
        businesstype: "1",
        businessemail: "",
        brandname: "",
        websitelink: "",
        appstorelink: {
          app_name: "",
          ios_app_id: "",
          icon_media_url: "",
        },
        playstorelink: {
          app_name: "",
          icon_media_url: "",
          android_app_url: "",
        },
        insta_handle_for_review: "",
      },
      inputT: false,
      inputN: false,
      inputC: false,
      inputE: false,
      inputBN: false,
      inputBusinessCategoryOther: false,
      businessnameError: "",
      businessnameAvalible: false,
      brandNameError: "",
      businesscategoryError: "",
      businesscategoryOtherError: "",
      insta_handle_for_reviewError: "",
      countryError: "",
      websitelinkError: null,
      items: businessCategoryList(translate),
      countries: [
        {
          label: translate("Kuwait"),
          value: "Kuwait",
        },
        {
          label: translate("UAE"),
          value: "UAE",
        },
        {
          label: translate("KSA"),
          value: "KSA",
        },
        {
          label: translate("Bahrain"),
          value: "Bahrain",
        },
        {
          label: translate("Qatar"),
          value: "Qatar",
        },
        {
          label: translate("Oman"),
          value: "Oman",
        },
      ],
      editBusinessInfo: false,
      // networkString: "http://",
      isVisible: false,
      appSelection: "iOS",
      androidApp_name: "",
      iosApp_name: "",
      appValue: "",
      showList: false,
      loading: false,
      attachment: {},
      AppError: null,
      data: [],
      androidData: [],
      checkingBusinessNameSubmission: false,
      androidAppSelected: false,
      iosAppSelected: false,
      createNewBusiness: false,
    };
  }
  componentDidMount() {
    // to check if call is from menu to update business info
    const editBusinessInfo = this.props.navigation.getParam(
      "editBusinessInfo",
      false
    );
    const createNewBusiness = this.props.navigation.getParam(
      "createNewBusiness",
      false
    );
    this.setState({ createNewBusiness });
    if (!this.props.registering) {
      const source = this.props.navigation.getParam(
        "source",
        this.props.screenProps.prevAppState
      );
      const source_action = this.props.navigation.getParam(
        "source_action",
        false
      );
      analytics.track("Screen Viewed", {
        screen_name: "CreateBusinessAccount",
        source,
        source_action,
      });
    }

    // prefilling the values in case of updating business info
    if (this.props.mainBusiness && editBusinessInfo) {
      const website = this.props.mainBusiness.websitelink;
      // &&
      // this.props.mainBusiness.websitelink.split("//");
      // if (website) {
      //   // var networkString = website[0] + "//";
      //   // var websitelink = website[1];
      // }
      this.setState({
        businessAccount: {
          ...this.state.businessAccount,
          ...this.props.mainBusiness,
          websitelink: website ? website : "",
          insta_handle_for_review:
            this.props.mainBusiness &&
            this.props.mainBusiness.insta_handle_for_review
              ? this.props.mainBusiness.insta_handle_for_review
              : "",
        },
        editBusinessInfo,
        // networkString: networkString ? networkString : "http://",
        iosAppSelected:
          this.props.mainBusiness.appstorelink &&
          this.props.mainBusiness.appstorelink.ios_app_id !== "",
        androidAppSelected:
          this.props.mainBusiness.playstorelink &&
          this.props.mainBusiness.playstorelink.android_app_url !== "",
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  _handleBusinessCategories = async (type) => {
    await this.setState({
      businessAccount: {
        ...this.state.businessAccount,
        businesstype: type,
      },
    });
  };

  _verifyBusinessName = async (name, submision) => {
    if (name !== "") {
      if (submision) this.setState({ checkingBusinessNameSubmission: true });
      await this.props.verifyBusinessName(
        name,
        this._handleBusinessName,
        submision
      );
      return this.props.successName;
    }
  };
  _handleBusinessName = (value) => {
    this.setState({
      businessnameAvalible: value,
      checkingBusinessNameSubmission: false,
    });
  };

  _handleSubmission = async () => {
    const { translate } = this.props.screenProps;
    const businessnameError = validateWrapper(
      "mandatory",
      this.state.businessAccount.businessname
    );

    const businesscategoryError = validateWrapper(
      "mandatory",
      this.state.businessAccount.businesscategory
    );
    const countryError = validateWrapper(
      "mandatory",
      this.state.businessAccount.country
    );
    const insta_handle_for_reviewError = validateWrapper(
      "mandatory",
      this.state.businessAccount.insta_handle_for_review
    );
    const businesscategoryOtherError =
      this.state.businessAccount.businesscategory === "43" &&
      validateWrapper(
        "mandatory",
        this.state.businessAccount.otherBusinessCategory
      );
    const websitelinkError =
      this.state.businessAccount.websitelink !== "" &&
      validateWrapper(
        "website",
        // this.state.networkString +
        this.state.businessAccount.websitelink
      );

    this.setState({
      businessnameError,
      businesscategoryError,
      countryError,
      businesscategoryOtherError,
      websitelinkError,
      insta_handle_for_reviewError,
    });
    if (websitelinkError) {
      showMessage({
        message: translate("Please enter a valid URL"),
        type: "warning",
      });
    } else {
      if (
        !businessnameError &&
        !businesscategoryError &&
        !countryError &&
        !businesscategoryOtherError &&
        !websitelinkError &&
        !insta_handle_for_reviewError
      ) {
        if (this.state.businessAccount.brandname === "") {
          await this.setState({
            businessAccount: {
              ...this.state.businessAccount,
              brandname: this.state.businessAccount.businessname,
            },
          });
        }
        if (
          (
            this.state.editBusinessInfo
              ? this.state.businessAccount.businessname !==
                this.props.mainBusiness.businessname
              : true
          )
            ? await this._verifyBusinessName(
                this.state.businessAccount.businessname,
                true
              )
            : true
        ) {
          if (this.props.registering) {
            let businessAccount = this.state.businessAccount;
            if (!this.state.iosAppSelected) {
              let appstorelink = {
                app_name: "",
                ios_app_id: "",
                icon_media_url: "",
              };
              businessAccount = { ...businessAccount, appstorelink };
            }
            if (!this.state.androidAppSelected) {
              let playstorelink = {
                app_name: "",
                icon_media_url: "",
                android_app_url: "",
              };
              businessAccount = { ...businessAccount, playstorelink };
            }
            let { businessemail, ...business } = businessAccount;

            let websitelink = this.state.businessAccount.websitelink;
            if (websitelink !== "") {
              websitelink =
                // this.state.networkString +
                this.state.businessAccount.websitelink;
            }
            let userInfo = {
              ...this.props.userInfoR,
              ...business,
              websitelink,
            };
            this.props.registerUser(userInfo, this.props.navigation);
          }
          //  condition for updating business info
          else if (this.state.editBusinessInfo) {
            let businessAccount = this.state.businessAccount;
            if (!this.state.iosAppSelected) {
              let appstorelink = {
                app_name: "",
                ios_app_id: "",
                icon_media_url: "",
              };
              businessAccount = { ...businessAccount, appstorelink };
            }
            if (!this.state.androidAppSelected) {
              let playstorelink = {
                app_name: "",
                icon_media_url: "",
                android_app_url: "",
              };
              businessAccount = { ...businessAccount, playstorelink };
            }
            let { ...business } = businessAccount;
            let websitelink = this.state.businessAccount.websitelink;
            if (websitelink !== "") {
              websitelink =
                // this.state.networkString +
                this.state.businessAccount.websitelink;
            }
            // check if info changed then call api else showMessage for no change
            const changedInfo = !isEqual(
              {
                ...businessAccount,
                websitelink,
                otherBusinessCategory:
                  this.state.businessAccount.businesscategory !== "43"
                    ? null
                    : this.state.businessAccount.otherBusinessCategory, // to handle other business category field
              },
              this.props.mainBusiness
            );
            if (changedInfo) {
              this.props.updateBusinessInfo(
                this.props.userInfo.userid,
                {
                  ...business,
                  websitelink,
                  otherBusinessCategory:
                    this.state.businessAccount.businesscategory !== "43"
                      ? null
                      : this.state.businessAccount.otherBusinessCategory, // to handle other business category field
                },
                this.props.navigation,
                this.props.screenProps.translate
              );
            } else {
              analytics.track(`Form Error Made`, {
                source_action: "a_update_buisness_info",
                error_description: "No changes to update",
                source: "CreateBusinessAccount",
                business_id:
                  this.props.mainBusiness && this.props.mainBusiness.businessid,
              });
              showMessage({
                type: "warning",
                message: translate("No changes to update"),
                position: "top",
              });
            }
          } else {
            const businessAccountInfo = {
              businessname: this.state.businessAccount.businessname,
              businesscategory: this.state.businessAccount.businesscategory,
              otherBusinessCategory:
                this.state.businessAccount.businesscategory !== "43"
                  ? null
                  : this.state.businessAccount.otherBusinessCategory,
              country: this.state.businessAccount.country,
              insta_handle_for_review:
                this.state.businessAccount.insta_handle_for_review,
            };
            this.props.createBusinessAccount(
              businessAccountInfo,
              this.props.navigation
            );
          }
        }
      } else {
        analytics.track(`Form Error Made`, {
          source: "CreateBusinessAccount",
          error_description: this.state.editBusinessInfo
            ? `Error updating business info`
            : `Error creating busines info`,
          businessid:
            this.props.mainBusiness && this.props.mainBusiness.businessid,
        });
        showMessage({
          message: translate("Please complete all the required fields"),
          type: "warning",
        });
      }
    }
  };

  onSelectedBusinessCategoryIdChange = (value) => {
    // NOTE: compulsory to pass this function
    // console.log("businescatId", value);
  };
  closeCategoryModal = () => {
    this.setState({
      businesscategoryError: validateWrapper(
        "mandatory",
        this.state.businessAccount.businesscategory
      ),
      inputT: false,
    });
  };

  onSelectedBusinessCategoryChange = (value) => {
    if (value && !isEmpty(value)) {
      this.setState(
        {
          businessAccount: {
            ...this.state.businessAccount,
            businesscategory: value[0].value,
          },
        },
        () => {
          this.closeCategoryModal();
        }
      );
    }
  };

  onSelectedCountryIdChange = (value) => {
    // NOTE: compulsory to pass this function
    // console.log("country", value);
  };
  closeCountryModal = () => {
    this.setState({
      countryError: validateWrapper(
        "mandatory",
        this.state.businessAccount.country
      ),
      inputC: false,
    });
  };

  onSelectedCountryChange = (value) => {
    if (value && !isEmpty(value)) {
      this.setState(
        {
          businessAccount: {
            ...this.state.businessAccount,
            country: value[0].value,
          },
        },
        () => {
          this.closeCountryModal();
        }
      );
    }
  };
  focusTheField = (fieldName) => {
    this.inputs[fieldName]._root.focus();
  };
  inputs = {};

  setWebsiteValue = (value) => {
    const businessAccount = {
      ...this.state.businessAccount,
      websitelink: value,
    };
    this.setState({
      businessAccount,
    });
  };
  // setNetworkString = value => {
  //   this.setState({
  //     networkString: value
  //   });
  // };
  getValidInfo = (stateError, error) => {
    this.setState({
      [stateError]: error,
    });
  };

  setModalVisible = (isVisible, os) => {
    this.setState({ isVisible, appSelection: os });
  };

  toggleAppSelection = (android) => {
    this.setState(
      android
        ? { androidAppSelected: !this.state.androidAppSelected }
        : { iosAppSelected: !this.state.iosAppSelected }
    );
  };

  _getIosAppIds = (app) => {
    this.setState({
      ...this.state,
      businessAccount: {
        ...this.state.businessAccount,
        appstorelink: {
          app_name: app.name,
          ios_app_id: app.unique_id,
          icon_media_url: app.icon_url,
        },
      },
      attachment: {
        app_name: app.name,
        ios_app_id: app.unique_id,
        icon_media_url: app.icon_url,
      },
      iosAppSelected: true,
    });
  };

  _getAndroidAppIds = (app) => {
    this.setState({
      ...this.state,
      businessAccount: {
        ...this.state.businessAccount,
        playstorelink: {
          app_name: app.name,
          icon_media_url: app.icon,
          android_app_url: app.unique_id.includes("/store/apps/")
            ? app.unique_id.replace("/store/apps/details?id=", "")
            : app.unique_id,
        },
      },
      attachment: {
        app_name: app.name,
        icon_media_url: app.icon_url,
        android_app_url: app.unique_id.includes("/store/apps/")
          ? app.unique_id.replace("/store/apps/details?id=", "")
          : app.unique_id,
      },
      androidAppSelected: true,
    });
  };
  setTheState = (state) => {
    this.setState({
      ...state,
    });
  };
  //Doesn't do anything here but needed for campaign
  selectApp = (
    nameError = null,
    callActionError = null,
    attachment,
    callaction = null,
    appChoice = null,
    iosApp_name,
    androidApp_name
  ) => {};

  /**
   * returns categoryname to be displayed
   *
   */
  getBusinessCategory = () => {
    const { translate } = this.props.screenProps;
    let category = translate("Select Business Type");
    // if from registration  screen
    if (
      this.props.registering &&
      this.props.businessAccount &&
      this.props.businessAccount.businesscategory !== ""
    ) {
      category = this.state.items.find(
        (i) => i.value === this.props.businessAccount.businesscategory
      ).label;
    } else if (this.state.businessAccount.businesscategory !== "") {
      // if from create business account or edit screen
      category = this.state.items.find(
        (i) => i.value === this.state.businessAccount.businesscategory
      ).label;
    }
    return category;
  };
  getCountryName = () => {
    let country = "Select Country";
    if (this.props.registering && this.props.businessAccount.country !== "") {
      // From registration screen and country selcted
      country = this.props.businessAccount.country;
    } else if (this.state.businessAccount.country !== "") {
      // if from create business account or edit business info screen
      country = this.state.businessAccount.country;
    }
    return country;
  };

  setValue = (stateName, value) => {
    let state = {};
    state[stateName] =
      stateName === "businessname"
        ? value.replace(/[^ a-zA-Z0-9\u0621-\u064A\u0660-\u0669]/gi, "")
        : stateName === "insta_handle_for_review"
        ? value.replace("@", "")
        : value;

    let businessAccount = {
      ...this.state.businessAccount,
      ...state,
    };
    this.setState({ businessAccount });
  };

  getValidInfo = (stateError, validWrap) => {
    let state = {};
    if (stateError === "businessnameError") {
      this._verifyBusinessName(this.state.businessAccount.businessname, false);
    }

    state[stateError] = validWrap;
    this.setState({
      ...state,
    });
  };

  /**
   * open category modal
   */
  openCategoryModal = () => {
    this.setState({ inputT: true });
  };

  /**
   * Open country modal
   */

  openCountryModal = () => {
    this.setState({ inputC: true });
  };
  rejectionReasons = () => {
    let reasons = [];
    if (
      this.props.mainBusiness &&
      this.props.mainBusiness.approved &&
      this.props.mainBusiness.approved === "3" &&
      this.props.mainBusiness.reject_reason &&
      this.props.mainBusiness.reject_reason.length > 0
    ) {
      reasons = this.props.mainBusiness.reject_reason.map((reason) => {
        return { key: Object.keys(reason), value: reason[Object.keys(reason)] };
      });
    }
    return reasons;
  };
  showEditSubmitButton = () => {
    let reasons = this.rejectionReasons();
    let rejectedReason =
      reasons &&
      reasons.length > 0 &&
      reasons.filter((e) => e.key.includes("Submission of fake information"))
        .length > 0;
    let show =
      this.state.editBusinessInfo &&
      this.props.mainBusiness &&
      this.props.mainBusiness.approved &&
      (this.props.mainBusiness.approved === "0" ||
        this.props.mainBusiness.approved === "2" ||
        (this.props.mainBusiness.approved === "3" && rejectedReason));
    return show;
  };
  render() {
    const { translate } = this.props.screenProps;
    let { iosAppSelected, androidAppSelected } = this.state;
    const businessCategory = this.getBusinessCategory();
    const country = this.getCountryName();

    // Added disable(when updating business info loading ) and value ={having state value} props to input fields
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{
          bottom: "never",
          top: this.props.registering ? "never" : "always",
        }}
      >
        {/* {!this.props.registering && (
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[1, 0.3]}
            style={globalStyles.gradient}
          />
        )} */}
        {!this.props.registering && (
          <View>
            <CustomHeader
              screenProps={this.props.screenProps}
              navigation={this.props.navigation}
              title={
                this.state.editBusinessInfo ? "Business Info" : "New Business"
              }
              closeButton={!this.state.editBusinessInfo}
              segment={{
                source: "createBusinessAccount",
                source_action: "a_go_back",
              }}
            />
          </View>
        )}

        <InputScrollView
          showsVerticalScrollIndicator={false}
          {...ScrollView.props}
          contentContainerStyle={[
            !this.props.registering && styles.businessView,
          ]}
        >
          {!this.state.editBusinessInfo && (
            <View style={styles.subHeadView}>
              <BusinessIcon fill={"#FFF"} />
              {/* <UserProfile fill="#FFF" stroke={"#FFF"} /> */}
              <Text style={styles.subHeading}>
                {translate("BUSINESS DETAILS")}
              </Text>
            </View>
          )}
          <InputFeild
            // disabled={this.props.loadingUpdateInfo}
            incomplete={false}
            translate={this.props.screenProps.translate}
            stateName1="businessname"
            label="Business Name"
            placeholder1="Enter your business name"
            value={
              this.props.registering
                ? this.props.businessAccount.businessname
                : this.state.businessAccount.businessname
            }
            valueError1={
              this.props.registering
                ? this.props.businessnameError
                : this.state.businessnameError
            }
            icon={CorporateIcon}
            setValue={
              this.props.registering ? this.props.setValue : this.setValue
            }
            getValidInfo={
              this.props.registering
                ? this.props.getValidInfo
                : this.getValidInfo
            }
            key={"businessname"}
          />
          {/* Business category view starts here */}
          <Picker
            showIcon={true}
            screenProps={this.props.screenProps}
            searchPlaceholderText={translate("Search Business Category")}
            data={this.state.items}
            uniqueKey={"value"}
            displayKey={"label"}
            open={
              this.props.registering ? this.props.inputT : this.state.inputT
            }
            onSelectedItemsChange={
              this.props.registering
                ? this.props.onSelectedBusinessCategoryIdChange
                : this.onSelectedBusinessCategoryIdChange
            }
            onSelectedItemObjectsChange={
              this.props.registering
                ? this.props.onSelectedBusinessCategoryChange
                : this.onSelectedBusinessCategoryChange
            }
            selectedItems={
              this.props.registering
                ? [this.props.businessAccount.businesscategory]
                : [this.state.businessAccount.businesscategory]
            }
            single={true}
            screenName={
              this.state.editBusinessInfo
                ? "Business Info"
                : "Create Business Account"
            }
            closeCategoryModal={
              this.props.registering
                ? this.props.closeCategoryModal
                : this.closeCategoryModal
            }
          />
          <ModalField
            stateName={"businesscategory"}
            setModalVisible={
              this.props.registering
                ? this.props.openCategoryModal
                : this.openCategoryModal
            }
            modal={true}
            label={"Business Type"}
            valueError={this.state.businesscategoryError}
            getValidInfo={this.getValidInfo}
            disabled={
              (this.state.editBusinessInfo &&
                this.props.editBusinessInfoLoading) ||
              this.props.savingRegister
            }
            valueText={businessCategory}
            value={
              this.props.registering
                ? this.props.businessAccount.businesscategory
                : this.state.businessAccount.businesscategory
            }
            incomplete={false}
            translate={this.props.screenProps.translate}
            icon={BusinessIcon}
            isVisible={
              this.props.registering ? this.props.inputT : this.state.inputT
            }
            customStyle={{
              paddingRight: 15,
            }}
          />

          {/* Business category view ends here */}

          {((this.props.businessAccount &&
            this.props.businessAccount.businesscategory === "43") ||
            this.state.businessAccount.businesscategory === "43") && (
            <InputFeild
              // disabled={this.props.loadingUpdateInfo}
              incomplete={false}
              translate={this.props.screenProps.translate}
              stateName1="otherBusinessCategory"
              label="Other Business Category"
              // placeholder1="Other Business Category"
              value={
                this.props.registering
                  ? this.props.businessAccount.otherBusinessCategory
                  : this.state.businessAccount.otherBusinessCategory
              }
              valueError1={
                this.props.registering
                  ? this.props.otherBusinessCategoryError
                  : this.state.otherBusinessCategoryError
              }
              icon={BusinessIcon}
              setValue={
                this.props.registering ? this.props.setValue : this.setValue
              }
              getValidInfo={
                this.props.registering
                  ? this.props.getValidInfo
                  : this.getValidInfo
              }
              key={"otherBusinessCategory"}
            />
          )}

          <ModalField
            stateName={"country"}
            setModalVisible={
              this.props.registering
                ? this.props.openCountryModal
                : this.openCountryModal
            }
            modal={true}
            label={"Country"}
            valueError={this.state.countryError}
            getValidInfo={this.getValidInfo}
            disabled={
              (this.state.editBusinessInfo &&
                this.props.editBusinessInfoLoading) ||
              this.props.savingRegister
            }
            valueText={country}
            value={
              this.props.registering
                ? this.props.businessAccount.country
                : this.state.businessAccount.country
            }
            incomplete={false}
            translate={this.props.screenProps.translate}
            icon={LocationIcon}
            // isVisible={
            //   this.props.registering ? this.props.inputC : this.state.inputC
            // }
            customStyle={{
              paddingRight: 5,
            }}
          />

          {/** Webiste Component for  */}
          {this.state.editBusinessInfo && (
            <Website
              register={true}
              ref={(ref) => (this.websiteInput = ref)}
              inputs={this.inputs}
              stateName={"websitelink"}
              screenProps={this.props.screenProps}
              customStyle={{
                // width: widthPercentageToDP(85),
                paddingHorizontal: 0,
              }}
              iconFill={"#FFF"}
              labelColor={"#FFF"}
              optional={true}
              website={this.state.businessAccount.websitelink}
              setWebsiteValue={this.setWebsiteValue}
              // networkString={this.state.networkString}
              stateNameError={this.state.websitelinkError}
              // setNetworkString={this.setNetworkString}
              getValidInfo={this.getValidInfo}
              disabled={
                (this.state.editBusinessInfo &&
                  this.props.editBusinessInfoLoading) ||
                this.props.savingRegister
              }
            />
          )}
          <InputFeild
            // disabled={this.props.loadingUpdateInfo}
            // customStyles={{ width: "100%", marginLeft: 0 }}
            incomplete={false}
            translate={this.props.screenProps.translate}
            stateName1="insta_handle_for_review"
            label="instagram"
            placeholder1="@ Instagram UserName"
            value={
              "@" +
              (this.props.registering
                ? this.props.businessAccount.insta_handle_for_review
                : this.state.businessAccount.insta_handle_for_review)
            }
            valueError1={
              this.props.registering
                ? this.props.insta_handle_for_reviewError
                : this.state.insta_handle_for_reviewError
            }
            icon={InstagramIcon}
            getValidInfo={
              this.props.registering
                ? this.props.getValidInfo
                : this.getValidInfo
            }
            setValue={
              this.props.registering ? this.props.setValue : this.setValue
            }
            key={"insta_handle_for_review"}
            disabled={
              (this.state.editBusinessInfo &&
                this.props.editBusinessInfoLoading) ||
              this.props.savingRegister
            }
          />
          {/** App Choice for business */}
          {/* {this.state.editBusinessInfo && (
            <AppChoiceBusiness
              appstorelink={this.state.businessAccount.appstorelink}
              playstorelink={this.state.businessAccount.playstorelink}
              setModalVisible={this.setModalVisible}
              toggleAppSelection={this.toggleAppSelection}
              screenProps={this.props.screenProps}
              disabled={
                (this.state.editBusinessInfo &&
                  this.props.editBusinessInfoLoading) ||
                this.props.savingRegister
              }
              appSelections={{ iosAppSelected, androidAppSelected }}
            />
          )} */}
          {this.state.editBusinessInfo &&
            this.props.mainBusiness &&
            this.props.mainBusiness.fb_connected === "1" && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("WebView", {
                    url: `https://www.optimizeapp.com/facebooklogin/login.php?b=${this.props.mainBusiness.businessid}`,
                    title: "Instagram",
                    source: "open_business_info",
                    source_action: "a_change_instagram_page",
                  });
                }}
              >
                <Text style={styles.changeInstagramPageText}>
                  {translate("Change Instagram Page")}
                </Text>
              </TouchableOpacity>
            )}
          {/* Added handle submision button for updating business info */}
          {this.state.editBusinessInfo &&
          this.props.loadingUpdateBusinessInfo ? (
            <CheckMarkLoading
              style={{
                top: 5,
                width: 60,
                height: 60,
              }}
            />
          ) : this.showEditSubmitButton() ? (
            <LowerButton
              screenProps={this.props.screenProps}
              checkmark
              bottom={0}
              function={this._handleSubmission}
            />
          ) : null}

          {!this.props.registering && !this.state.editBusinessInfo && (
            <GradientButton
              disabled={this.props.savingRegister}
              style={[styles.bottomCard]}
              onPressAction={() => {
                this._handleSubmission();
              }}
              textStyle={styles.buttonText}
              text={translate("Create Account")}
              uppercase
            />
          )}
        </InputScrollView>
        {this.props.checkingBusinessName &&
          this.state.checkingBusinessNameSubmission && (
            <LoadingScreen dash={true} />
          )}
        <Picker
          showIcon={true}
          screenProps={this.props.screenProps}
          searchPlaceholderText={translate("Search Country")}
          data={this.state.countries}
          uniqueKey={"value"}
          displayKey={"label"}
          open={this.props.registering ? this.props.inputC : this.state.inputC}
          onSelectedItemsChange={
            this.props.registering
              ? this.props.onSelectedCountryIdChange
              : this.onSelectedCountryIdChange
          }
          onSelectedItemObjectsChange={
            this.props.registering
              ? this.props.onSelectedCountryChange
              : this.onSelectedCountryChange
          }
          selectedItems={
            this.props.registering
              ? [this.props.businessAccount.country]
              : [this.state.businessAccount.country]
          }
          single={true}
          screenName={"Create Business Account"}
          closeCategoryModal={
            this.props.registering
              ? this.props.closeCategoryModal
              : this.closeCountryModal
          }
        />

        <AppSearchModal
          mainState={this.state}
          selectApp={this.selectApp}
          setModalVisible={this.setModalVisible}
          setTheState={this.setTheState}
          _getIosAppIds={this._getIosAppIds}
          _getAndroidAppIds={this._getAndroidAppIds}
          handleAppError={this.handleAppError}
          validateApp={() => this.validate()}
          screenProps={this.props.screenProps}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  userInfoR: state.register.userInfo,
  countryCode: state.register.countryCode,
  inviteCode: state.register.inviteCode,
  successName: state.register.successName,
  mainBusiness: state.account.mainBusiness,
  loadingUpdateBusinessInfo: state.account.editBusinessInfoLoading,
  savingRegister: state.register.savingRegister,
  checkingBusinessName: state.register.checkingBusinessName,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (userInfo, navigation) =>
    dispatch(actionCreators.registerUser(userInfo, navigation)),
  createBusinessAccount: (account, navigation) =>
    dispatch(actionCreators.createBusinessAccount(account, navigation)),
  verifyBusinessName: (businessName, _handleBusinessName, submision) =>
    dispatch(
      actionCreators.verifyBusinessName(
        businessName,
        _handleBusinessName,
        submision
      )
    ),
  updateBusinessInfo: (userid, info, navigation, translate) =>
    dispatch(
      actionCreators.updateBusinessInfo(userid, info, navigation, translate)
    ),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBusinessAccount);
