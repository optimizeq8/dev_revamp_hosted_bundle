//Components
import React, { Component } from "react";
import { View, Text, ScrollView, BackHandler, Keyboard } from "react-native";
import { Button, Item, Input, Container, Icon } from "native-base";
import * as Segment from "expo-analytics-segment";
import CustomHeader from "../../MiniComponents/Header";
import { SafeAreaView } from "react-navigation";
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

//data
import businessCategoryList from "../../Data/businessCategoriesList.data";

//privay
import { openPrivacy, openTerms } from "../../Terms&Conditions";

// Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../GlobalStyles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
import StartUpIcon from "../../../assets/SVGs/UserProfile";
import CorporateIcon from "../../../assets/SVGs/Corporate";
import AgencyIcon from "../../../assets/SVGs/Agency";
import LocationIcon from "../../../assets/SVGs/LocationOutline";
import BusinessIcon from "../../../assets/SVGs/Briefcase";
import EmailIcon from "../../../assets/SVGs/EmailOutline";
//Validator
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import isStringArabic from "../../isStringArabic";
import { showMessage } from "react-native-flash-message";
import { widthPercentageToDP } from "react-native-responsive-screen";
import AppSearchModal from "../../MiniComponents/AppChoice/AppSearchModal";
import AppChoiceBusiness from "../../MiniComponents/AppChoiceBusiness";

class CreateBusinessAccount extends Component {
  static navigationOptions = {
    header: null
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
          icon_media_url: ""
        },
        playstorelink: {
          app_name: "",
          icon_media_url: "",
          android_app_url: ""
        }
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
      businessemailError: "",
      businesscategoryError: "",
      businesscategoryOtherError: "",
      countryError: "",
      websitelinkError: null,
      items: businessCategoryList(translate),
      countries: [
        {
          label: translate("Kuwait"),
          value: "Kuwait"
        },
        {
          label: translate("UAE"),
          value: "UAE"
        },
        {
          label: translate("KSA"),
          value: "KSA"
        },
        {
          label: translate("Bahrain"),
          value: "Bahrain"
        },
        {
          label: translate("Qatar"),
          value: "Qatar"
        },
        {
          label: translate("Oman"),
          value: "Oman"
        }
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
      createNewBusiness: false
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
    Segment.screen(
      editBusinessInfo
        ? "Edit Business Info"
        : this.props.registering
        ? "Business Info Registration"
        : "Create New Business",
      {
        category: this.props.registering ? "Sign Up" : "User Menu"
      }
    );

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
          websitelink: website ? website : ""
        },
        editBusinessInfo,
        // networkString: networkString ? networkString : "http://",
        iosAppSelected:
          this.props.mainBusiness.appstorelink &&
          this.props.mainBusiness.appstorelink.ios_app_id !== "",
        androidAppSelected:
          this.props.mainBusiness.playstorelink &&
          this.props.mainBusiness.playstorelink.android_app_url !== ""
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
  _handleBusinessCategories = async type => {
    await this.setState({
      businessAccount: {
        ...this.state.businessAccount,
        businesstype: type
      }
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
  _handleBusinessName = value => {
    this.setState({
      businessnameAvalible: value,
      checkingBusinessNameSubmission: false
    });
  };

  _handleSubmission = async () => {
    const { translate } = this.props.screenProps;
    const businessnameError = validateWrapper(
      "mandatory",
      this.state.businessAccount.businessname
    );

    const businessemailError = validateWrapper(
      "mandatory",
      this.props.registering
        ? "not empty"
        : this.state.businessAccount.businessemail
    );
    const businesscategoryError = validateWrapper(
      "mandatory",
      this.state.businessAccount.businesscategory
    );
    const countryError = validateWrapper(
      "mandatory",
      this.state.businessAccount.country
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
        "url",
        // this.state.networkString +
        this.state.businessAccount.websitelink
      );

    this.setState({
      businessnameError,
      businessemailError,
      businesscategoryError,
      countryError,
      businesscategoryOtherError,
      websitelinkError
    });
    if (websitelinkError) {
      showMessage({
        message: translate("Please enter a valid URL"),
        type: "warning"
      });
    } else {
      if (
        !businessnameError &&
        !businessemailError &&
        !businesscategoryError &&
        !countryError &&
        !businesscategoryOtherError &&
        !websitelinkError
      ) {
        if (this.state.businessAccount.brandname === "") {
          await this.setState({
            businessAccount: {
              ...this.state.businessAccount,
              brandname: this.state.businessAccount.businessname
            }
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
                icon_media_url: ""
              };
              businessAccount = { ...businessAccount, appstorelink };
            }
            if (!this.state.androidAppSelected) {
              let playstorelink = {
                app_name: "",
                icon_media_url: "",
                android_app_url: ""
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
              websitelink
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
                icon_media_url: ""
              };
              businessAccount = { ...businessAccount, appstorelink };
            }
            if (!this.state.androidAppSelected) {
              let playstorelink = {
                app_name: "",
                icon_media_url: "",
                android_app_url: ""
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
                    : this.state.businessAccount.otherBusinessCategory // to handle other business category field
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
                      : this.state.businessAccount.otherBusinessCategory // to handle other business category field
                },
                this.props.navigation
              );
            } else {
              showMessage({
                type: "warning",
                message: translate("No changes to update"),
                position: "top"
              });
            }
          } else {
            let businessAccount = this.state.businessAccount;
            if (!this.state.iosAppSelected) {
              let appstorelink = {
                app_name: "",
                ios_app_id: "",
                icon_media_url: ""
              };
              businessAccount = { ...businessAccount, appstorelink };
            }
            if (!this.state.androidAppSelected) {
              let playstorelink = {
                app_name: "",
                icon_media_url: "",
                android_app_url: ""
              };
              businessAccount = { ...businessAccount, playstorelink };
            }
            let websitelink = this.state.businessAccount.websitelink;
            if (websitelink !== "") {
              websitelink =
                // this.state.networkString +
                this.state.businessAccount.websitelink;
            }
            this.props.createBusinessAccount(
              {
                ...businessAccount,
                websitelink,
                otherBusinessCategory:
                  this.state.businessAccount.businesscategory !== "43"
                    ? null
                    : this.state.businessAccount.otherBusinessCategory // to handle other business category field
              },
              this.props.navigation
            );
          }
        }
      } else {
        showMessage({
          message: translate("Please complete all the required fields"),
          type: "warning"
        });
      }
    }
  };

  onSelectedBusinessCategoryIdChange = value => {
    // NOTE: compulsory to pass this function
    // console.log("businescatId", value);
  };
  closeCategoryModal = () => {
    this.setState({
      businesscategoryError: validateWrapper(
        "mandatory",
        this.state.businessAccount.businesscategory
      ),
      inputT: false
    });
  };

  onSelectedBusinessCategoryChange = value => {
    if (value && !isEmpty(value)) {
      this.setState(
        {
          businessAccount: {
            ...this.state.businessAccount,
            businesscategory: value[0].value
          }
        },
        () => {
          this.closeCategoryModal();
        }
      );
    }
  };

  onSelectedCountryIdChange = value => {
    // NOTE: compulsory to pass this function
    // console.log("country", value);
  };
  closeCountryModal = () => {
    this.setState({
      countryError: validateWrapper(
        "mandatory",
        this.state.businessAccount.country
      ),
      inputC: false
    });
  };

  onSelectedCountryChange = value => {
    if (value && !isEmpty(value)) {
      this.setState(
        {
          businessAccount: {
            ...this.state.businessAccount,
            country: value[0].value
          }
        },
        () => {
          this.closeCountryModal();
        }
      );
    }
  };
  focusTheField = fieldName => {
    this.inputs[fieldName]._root.focus();
  };
  inputs = {};

  setWebsiteValue = value => {
    const businessAccount = {
      ...this.state.businessAccount,
      websitelink: value
    };
    this.setState({
      businessAccount
    });
  };
  // setNetworkString = value => {
  //   this.setState({
  //     networkString: value
  //   });
  // };
  getValidInfo = (stateError, error) => {
    this.setState({
      [stateError]: error
    });
  };

  setModalVisible = (isVisible, os) => {
    this.setState({ isVisible, appSelection: os });
  };

  toggleAppSelection = android => {
    this.setState(
      android
        ? { androidAppSelected: !this.state.androidAppSelected }
        : { iosAppSelected: !this.state.iosAppSelected }
    );
  };

  _getIosAppIds = app => {
    this.setState({
      ...this.state,
      businessAccount: {
        ...this.state.businessAccount,
        appstorelink: {
          app_name: app.title,
          ios_app_id: app.id,
          icon_media_url: app.icon
        }
      },
      attachment: {
        app_name: app.title,
        ios_app_id: app.id,
        icon_media_url: app.icon
      },
      iosAppSelected: true
    });
  };

  _getAndroidAppIds = app => {
    this.setState({
      ...this.state,
      businessAccount: {
        ...this.state.businessAccount,
        playstorelink: {
          app_name: app.title,
          icon_media_url: app.icon,
          android_app_url: app.id ? app.id : app.application_id
        }
      },
      attachment: {
        app_name: app.title,
        icon_media_url: app.icon,
        android_app_url: app.id ? app.id : app.application_id
      },
      androidAppSelected: true
    });
  };
  setTheState = state => {
    this.setState({
      ...state
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
   * @memberof CreateBusinessAccount
   */
  getBusinessCategory = () => {
    let category = "Select Business Type";
    // if from registration  screen
    if (
      this.props.registering &&
      this.props.businessAccount &&
      this.props.businessAccount.businesscategory !== ""
    ) {
      category = this.state.items.find(
        i => i.value === this.props.businessAccount.businesscategory
      ).label;
    } else if (this.state.businessAccount.businesscategory !== "") {
      // if from create business account or edit screen
      category = this.state.items.find(
        i => i.value === this.state.businessAccount.businesscategory
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
        : value;

    let businessAccount = {
      ...this.state.businessAccount,
      ...state
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
      ...state
    });
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
          top: this.props.registering ? "never" : "always"
        }}
      >
        {!this.props.registering && (
          <View>
            <CustomHeader
              screenProps={this.props.screenProps}
              navigation={this.props.navigation}
              title={
                this.state.editBusinessInfo ? "Business Info" : "New Business"
              }
              closeButton={!this.state.editBusinessInfo}
            />
            {/* to display only when creating new business */}
            {!this.state.editBusinessInfo && (
              <Text style={styles.subTitle}>
                {translate("You can create a new Business under you!")}
              </Text>
            )}
          </View>
        )}

        <InputScrollView
          {...ScrollView.props}
          contentContainerStyle={[
            !this.props.registering && styles.businessView
          ]}
        >
          <View style={styles.subHeadView}>
            <BusinessIcon fill={"#FFF"} />
            {/* <UserProfile fill="#FFF" stroke={"#FFF"} /> */}
            <Text style={styles.subHeading}>
              {translate("BUSINESS DETAILS")}
            </Text>
          </View>

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
          <Item
            disabled={
              (this.state.editBusinessInfo &&
                this.props.editBusinessInfoLoading) ||
              this.props.savingRegister
            }
            onPress={() => {
              if (this.props.registering) {
                this.props.openCategoryModal();
              } else this.setState({ inputT: true });
            }}
            style={[
              styles.input,
              this.state.inputT || this.props.inputT
                ? globalStyles.purpleBorderColor
                : this.state.businesscategoryError ||
                  this.props.businesscategoryError
                ? globalStyles.redBorderColor
                : globalStyles.transparentBorderColor,
              styles.itemView
            ]}
          >
            <BusinessIcon
              style={{
                // position: "absolute",
                marginLeft: 15
              }}
              fill={this.state.inputT || this.props.inputT ? "#FF9D00" : "#FFF"}
            />
            <View style={styles.colView}>
              <Text
                style={[
                  styles.inputLabel,
                  this.state.inputT || this.props.inputT
                    ? globalStyles.orangeTextColor
                    : globalStyles.whiteTextColor
                ]}
              >
                {translate("Business Type")}
              </Text>
              <Text style={[styles.inputText]}>
                {translate(businessCategory)}
              </Text>
            </View>
            <Icon type="AntDesign" name="down" style={styles.iconDown} />
          </Item>
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

          <Item
            disabled={
              (this.state.editBusinessInfo &&
                this.props.editBusinessInfoLoading) ||
              this.props.savingRegister
            }
            onPress={() => {
              if (this.props.registering) {
                this.props.openCountryModal();
              } else this.setState({ inputC: true });
            }}
            style={[
              styles.input,
              this.state.countryError
                ? globalStyles.redBorderColor
                : globalStyles.transparentBorderColor,
              styles.itemView
            ]}
          >
            <LocationIcon
              style={{
                marginLeft: 15
              }}
              stroke={this.state.inputC ? "#FF9D00" : "#FFF"}
            />
            <View style={styles.colView}>
              <Text
                style={[
                  styles.inputLabel,
                  this.state.inputC
                    ? globalStyles.orangeTextColor
                    : globalStyles.whiteTextColor
                ]}
              >
                {translate("Country")}
              </Text>
              <Text style={[styles.inputText]}>{translate(country)}</Text>
            </View>

            <Icon type="AntDesign" name="down" style={styles.iconDown} />
          </Item>

          {/** Webiste Component */}
          {this.state.editBusinessInfo && (
            <Website
              register={true}
              ref={ref => (this.websiteInput = ref)}
              inputs={this.inputs}
              stateName={"websitelink"}
              screenProps={this.props.screenProps}
              customStyle={{
                // width: widthPercentageToDP(85),
                paddingHorizontal: 0
              }}
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
          {/* Added handle submision button for updating business info */}
          {this.state.editBusinessInfo &&
          this.props.loadingUpdateBusinessInfo ? (
            <CheckMarkLoading
              style={{
                top: 5,
                width: 60,
                height: 60
              }}
            />
          ) : this.state.editBusinessInfo ? (
            <LowerButton
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
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  userInfoR: state.register.userInfo,
  countryCode: state.register.countryCode,
  inviteCode: state.register.inviteCode,
  successName: state.register.successName,
  mainBusiness: state.account.mainBusiness,
  loadingUpdateBusinessInfo: state.account.editBusinessInfoLoading,
  savingRegister: state.register.savingRegister,
  checkingBusinessName: state.register.checkingBusinessName
});

const mapDispatchToProps = dispatch => ({
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
  updateBusinessInfo: (userid, info, navigation) =>
    dispatch(actionCreators.updateBusinessInfo(userid, info, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBusinessAccount);
