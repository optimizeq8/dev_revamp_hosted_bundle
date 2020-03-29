//Components
import React, { Component } from "react";
import { View, ScrollView, BackHandler } from "react-native";
import { Button, Text, Item, Input, Container, Icon } from "native-base";
import * as Segment from "expo-analytics-segment";
import CustomHeader from "../../MiniComponents/Header";
import { SafeAreaView } from "react-navigation";
import InputScrollView from "react-native-input-scroll-view";

import isEmpty from "lodash/isEmpty";
import isEqual from "react-fast-compare";

import Picker from "../../MiniComponents/Picker";
import Website from "../../MiniComponents/InputField/Website";
import LowerButton from "../../MiniComponents/LowerButton";
import CheckMarkLoading from "../../MiniComponents/CheckMarkLoading";
import GradientButton from "../../MiniComponents/GradientButton";
import LoadingScreen from "../../MiniComponents/LoadingScreen";

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
      iosAppSelected: false
    };
  }
  componentDidMount() {
    // to check if call is from menu to update business info
    const editBusinessInfo = this.props.navigation.getParam(
      "editBusinessInfo",
      false
    );
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
          (this.state.editBusinessInfo
          ? this.state.businessAccount.businessname !==
            this.props.mainBusiness.businessname
          : true)
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
  render() {
    const { translate } = this.props.screenProps;
    let { iosAppSelected, androidAppSelected } = this.state;
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
          contentContainerStyle={{ paddingBottom: "30%", paddingTop: 13 }}
        >
          <Text uppercase style={styles.whatAreYouText}>
            {translate("What are you ?")}
          </Text>
          <View style={styles.topContainer}>
            <GradientButton
              disabled={
                (this.state.editBusinessInfo &&
                  this.props.editBusinessInfoLoading) ||
                this.props.savingRegister
              }
              radius={50}
              transparent={this.state.businessAccount.businesstype !== "1"}
              style={[
                this.state.businessAccount.businesstype === "1"
                  ? styles.activeButton
                  : styles.button,
                isStringArabic(translate("Startup")) ? { width: "40%" } : {}
              ]}
              onPressAction={() => {
                this._handleBusinessCategories("1");
              }}
            >
              <StartUpIcon
                style={styles.iconButtonStyleLeft}
                fill={
                  this.state.businessAccount.businesstype === "1"
                    ? "#FFF"
                    : "rgba(255,255,255,0.6)"
                }
              />
              <Text
                style={[
                  this.state.businessAccount.businesstype === "1"
                    ? styles.activeText
                    : styles.inactiveText
                ]}
              >
                {translate("SME")}
                {!isStringArabic(translate("Startup")) &&
                  "\n" + translate("or") + " " + translate("Startup")}
              </Text>
            </GradientButton>

            <GradientButton
              radius={50}
              disabled={
                (this.state.editBusinessInfo &&
                  this.props.editBusinessInfoLoading) ||
                this.props.savingRegister
              }
              transparent={this.state.businessAccount.businesstype !== "2"}
              style={[
                this.state.businessAccount.businesstype === "2"
                  ? styles.activeButton
                  : styles.button
              ]}
              onPressAction={() => {
                this._handleBusinessCategories("2");
              }}
            >
              <AgencyIcon
                fill={
                  this.state.businessAccount.businesstype === "2"
                    ? "#FFF"
                    : "rgba(255,255,255,0.6)"
                }
              />
              <Text
                style={[
                  this.state.businessAccount.businesstype === "2"
                    ? styles.activeText
                    : styles.inactiveText
                ]}
              >
                {translate("Agency")}
              </Text>
            </GradientButton>

            <GradientButton
              radius={50}
              disabled={
                (this.state.editBusinessInfo &&
                  this.props.editBusinessInfoLoading) ||
                this.props.savingRegister
              }
              transparent={this.state.businessAccount.businesstype !== "3"}
              style={[
                this.state.businessAccount.businesstype === "3"
                  ? styles.activeButton
                  : styles.button
              ]}
              onPressAction={() => {
                this._handleBusinessCategories("3");
              }}
            >
              <CorporateIcon
                fill={
                  this.state.businessAccount.businesstype === "3"
                    ? "#FFF"
                    : "rgba(255,255,255,0.6)"
                }
              />

              <Text
                style={[
                  this.state.businessAccount.businesstype === "3"
                    ? styles.activeText
                    : styles.inactiveText
                ]}
              >
                {translate("Corporate")}
              </Text>
            </GradientButton>
          </View>

          <View style={styles.marginVertical}>
            <View style={[styles.callToActionLabelView]}>
              <Text
                uppercase
                style={[
                  styles.inputLabel,
                  this.state.inputN
                    ? globalStyles.orangeTextColor
                    : globalStyles.whiteTextColor
                ]}
              >
                {this.state.businessAccount.businesstype === "1"
                  ? translate("Startup Name")
                  : this.state.businessAccount.businesstype === "2"
                  ? translate("Agency Name")
                  : translate("Corporate Name")}
              </Text>
            </View>
            <Item
              style={[
                styles.input,
                this.state.inputN
                  ? globalStyles.purpleBorderColor
                  : this.state.businessnameError
                  ? // !this.props.successName
                    globalStyles.redBorderColor
                  : globalStyles.transparentBorderColor,
                {
                  paddingHorizontal: 0
                  // width: "50%"
                }
              ]}
            >
              <CorporateIcon
                style={{
                  position: "absolute",
                  marginLeft: 15
                }}
                fill={this.state.inputN ? "#FF9D00" : "#FFF"}
              />
              <Input
                onSubmitEditing={() => {
                  this.focusTheField("inputBN");
                }}
                maxLength={25}
                autoCorrect={false}
                ref={input => {
                  this.inputs["inputN"] = input;
                }}
                blurOnSubmit={false}
                returnKeyType={"next"}
                disabled={
                  (this.state.editBusinessInfo &&
                    this.props.editBusinessInfoLoading) ||
                  this.props.savingRegister
                }
                style={[styles.inputText]}
                value={this.state.businessAccount.businessname}
                onChangeText={value => {
                  value = value.replace(
                    /[^ a-zA-Z0-9\u0621-\u064A\u0660-\u0669]/gi,
                    ""
                  );
                  this.setState({
                    businessAccount: {
                      ...this.state.businessAccount,
                      businessname: value
                    }
                  });
                }}
                onFocus={() => {
                  this.setState({ inputN: true });
                }}
                onBlur={() => {
                  this.setState({
                    inputN: false,
                    businessAccount: {
                      ...this.state.businessAccount,
                      businessname: this.state.businessAccount.businessname.trim()
                    }
                  });
                  this._verifyBusinessName(
                    this.state.businessAccount.businessname
                  );
                }}
              />
            </Item>
          </View>

          <View style={styles.marginVertical}>
            <View style={[styles.callToActionLabelView, { width: 200 }]}>
              <Text
                uppercase
                style={[
                  styles.inputLabel,
                  this.state.inputBN
                    ? globalStyles.orangeTextColor
                    : globalStyles.whiteTextColor
                ]}
              >
                {this.state.businessAccount.businesstype === "1"
                  ? translate("Brand Name")
                  : this.state.businessAccount.businesstype === "2"
                  ? translate("Client Name")
                  : translate("Brand Name")}{" "}
                ({translate("optional")})
              </Text>
            </View>
            <Item
              style={[
                styles.input,
                globalStyles.transparentBorderColor,
                {
                  paddingHorizontal: 0
                  // width: "50%"
                }
              ]}
            >
              <Input
                onSubmitEditing={() => {
                  this.focusTheField("inputE");
                }}
                ref={input => {
                  this.inputs["inputBN"] = input;
                }}
                blurOnSubmit={false}
                returnKeyType={"next"}
                style={styles.inputText}
                autoCorrect={false}
                disabled={
                  (this.state.editBusinessInfo &&
                    this.props.editBusinessInfoLoading) ||
                  this.props.savingRegister
                }
                value={this.state.businessAccount.brandname}
                onChangeText={value => {
                  value = value.replace(
                    /[^ a-zA-Z0-9\u0621-\u064A\u0660-\u0669]/gi,
                    ""
                  );
                  this.setState({
                    businessAccount: {
                      ...this.state.businessAccount,
                      brandname: value
                    }
                  });
                }}
                maxLength={25}
                onFocus={() => {
                  this.setState({ inputBN: true });
                }}
                onBlur={() => {
                  this.setState({
                    inputBN: false,
                    businessAccount: {
                      ...this.state.businessAccount,
                      brandname: this.state.businessAccount.brandname.trim()
                    }
                  });
                }}
              />
            </Item>
          </View>

          {!this.props.registering && (
            <View style={styles.marginVertical}>
              <View style={[styles.callToActionLabelView]}>
                <Text
                  uppercase
                  style={[
                    styles.inputLabel,
                    this.state.inputE
                      ? globalStyles.orangeTextColor
                      : globalStyles.whiteTextColor
                  ]}
                >
                  {translate("Email")}
                </Text>
              </View>
              <Item
                style={[
                  styles.input,
                  this.state.inputE
                    ? globalStyles.transparentBorderColor
                    : this.state.businessemailError
                    ? globalStyles.redBorderColor
                    : globalStyles.transparentBorderColor,
                  {
                    paddingHorizontal: 0
                    // width: "50%"
                  }
                ]}
              >
                <EmailIcon
                  style={{
                    // position: "absolute",
                    marginLeft: 15
                  }}
                  fill={this.state.inputE ? "#FF9D00" : "#FFF"}
                />
                <Input
                  ref={input => {
                    this.inputs["inputE"] = input;
                  }}
                  blurOnSubmit={true}
                  style={[
                    styles.inputText,
                    {
                      fontFamily: "montserrat-regular-english"
                    }
                  ]}
                  autoCorrect={false}
                  autoCapitalize="none"
                  disabled={
                    (this.state.editBusinessInfo &&
                      this.props.editBusinessInfoLoading) ||
                    this.props.savingRegister
                  }
                  value={this.state.businessAccount.businessemail}
                  onChangeText={value =>
                    this.setState({
                      businessAccount: {
                        ...this.state.businessAccount,
                        businessemail: value
                      }
                    })
                  }
                  onFocus={() => {
                    this.setState({ inputE: true });
                  }}
                  onBlur={() => {
                    this.setState({
                      inputE: false,
                      businessAccount: {
                        ...this.state.businessAccount,
                        businessemail: this.state.businessAccount.businessemail.trim()
                      },
                      businessemailError: validateWrapper(
                        "email",
                        this.state.businessAccount.businessemail.trim()
                      )
                    });
                  }}
                />
              </Item>
            </View>
          )}

          <View style={styles.marginVertical}>
            <Picker
              showIcon={true}
              screenProps={this.props.screenProps}
              searchPlaceholderText={translate("Search Country")}
              data={this.state.countries}
              uniqueKey={"value"}
              displayKey={"label"}
              open={this.state.inputC}
              onSelectedItemsChange={this.onSelectedCountryIdChange}
              onSelectedItemObjectsChange={this.onSelectedCountryChange}
              selectedItems={[this.state.businessAccount.country]}
              single={true}
              screenName={"Create Business Account"}
              closeCategoryModal={this.closeCountryModal}
            />
            <View style={[styles.callToActionLabelView]}>
              <Text
                uppercase
                style={[
                  styles.inputLabel,
                  this.state.inputC
                    ? globalStyles.orangeTextColor
                    : globalStyles.whiteTextColor
                ]}
              >
                {translate("Country")}
              </Text>
            </View>
            <Item
              disabled={
                (this.state.editBusinessInfo &&
                  this.props.editBusinessInfoLoading) ||
                this.props.savingRegister
              }
              onPress={() => {
                this.setState({ inputC: true });
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
                  // position: "absolute",
                  marginLeft: 15
                }}
                stroke={this.state.inputC ? "#FF9D00" : "#FFF"}
              />
              <Text
                style={[
                  styles.pickerText,
                  { fontFamily: "montserrat-regular" }
                ]}
              >
                {this.state.businessAccount.country !== ""
                  ? translate(this.state.businessAccount.country)
                  : translate("Select Country")}
              </Text>
              <Icon type="AntDesign" name="down" style={styles.iconDown} />
            </Item>
          </View>

          <View style={styles.marginVertical}>
            <Picker
              showIcon={true}
              screenProps={this.props.screenProps}
              searchPlaceholderText={translate("Search Business Category")}
              data={this.state.items}
              uniqueKey={"value"}
              displayKey={"label"}
              open={this.state.inputT}
              onSelectedItemsChange={this.onSelectedBusinessCategoryIdChange}
              onSelectedItemObjectsChange={
                this.onSelectedBusinessCategoryChange
              }
              selectedItems={[this.state.businessAccount.businesscategory]}
              single={true}
              screenName={
                this.state.editBusinessInfo
                  ? "Business Info"
                  : "Create Business Account"
              }
              closeCategoryModal={this.closeCategoryModal}
            />
            <View style={[styles.callToActionLabelView]}>
              <Text
                uppercase
                style={[
                  styles.inputLabel,
                  this.state.inputT
                    ? globalStyles.orangeTextColor
                    : globalStyles.whiteTextColor
                ]}
              >
                {translate("Business Type")}
              </Text>
            </View>
            <Item
              disabled={
                (this.state.editBusinessInfo &&
                  this.props.editBusinessInfoLoading) ||
                this.props.savingRegister
              }
              onPress={() => {
                this.setState({ inputT: true });
              }}
              style={[
                styles.input,
                this.state.inputT
                  ? globalStyles.purpleBorderColor
                  : this.state.businesscategoryError
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
                fill={this.state.inputT ? "#FF9D00" : "#FFF"}
              />
              <Text style={[styles.pickerText]}>
                {this.state.businessAccount.businesscategory === ""
                  ? this.state.businessAccount.businesstype === "1"
                    ? translate("Industry")
                    : this.state.businessAccount.businesstype === "2"
                    ? translate("Client Industry")
                    : translate("Industry")
                  : this.state.items.find(
                      i =>
                        i.value === this.state.businessAccount.businesscategory
                    ).label}
              </Text>
              <Icon type="AntDesign" name="down" style={styles.iconDown} />
            </Item>
          </View>

          {this.state.businessAccount.businesscategory === "43" && (
            <View style={styles.marginVertical}>
              <View style={[styles.callToActionLabelView, { width: 220 }]}>
                <Text
                  uppercase
                  style={[
                    styles.inputLabel,
                    {
                      width: 200
                    },
                    this.state.inputBusinessCategoryOther
                      ? globalStyles.orangeTextColor
                      : globalStyles.whiteTextColor
                  ]}
                >
                  {translate("Other Business Category")}
                </Text>
              </View>
              <Item
                onPress={() => {
                  this.setState({ inputT: true });
                }}
                style={[
                  styles.input,
                  this.state.inputBusinessCategoryOther
                    ? globalStyles.purpleBorderColor
                    : this.state.businesscategoryOtherError
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
                  fill={
                    this.state.inputBusinessCategoryOther ? "#FF9D00" : "#FFF"
                  }
                />
                <Input
                  onSubmitEditing={() => {
                    this.focusTheField("inputWeb");
                  }}
                  ref={input => {
                    this.inputs["inputO"] = input;
                  }}
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  style={styles.inputText}
                  autoCorrect={false}
                  onChangeText={value =>
                    this.setState({
                      businessAccount: {
                        ...this.state.businessAccount,
                        otherBusinessCategory: value
                      }
                    })
                  }
                  onFocus={() => {
                    this.setState({
                      inputBusinessCategoryOther: true
                    });
                  }}
                  onBlur={() => {
                    this.setState({
                      inputBusinessCategoryOther: false,
                      businessAccount: {
                        ...this.state.businessAccount,
                        otherBusinessCategory: this.state.businessAccount.otherBusinessCategory.trim()
                      }
                    });
                  }}
                  value={this.state.businessAccount.otherBusinessCategory}
                  disabled={
                    (this.state.editBusinessInfo &&
                      this.props.editBusinessInfoLoading) ||
                    this.props.savingRegister
                  }
                />
              </Item>
            </View>
          )}

          {/** Webiste Component */}
          <View style={styles.marginVertical}>
            <Website
              register={true}
              ref={ref => (this.websiteInput = ref)}
              inputs={this.inputs}
              stateName={"websitelink"}
              screenProps={this.props.screenProps}
              customStyle={{
                width: widthPercentageToDP(85),
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
          </View>

          <Text style={styles.appText}>
            {translate("Do you have an app?")}
            <Text style={styles.optionalText}> ({translate("optional")})</Text>
          </Text>
          {/** App Choice for business */}
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

          {this.props.registering && (
            <Text style={styles.textAgreement}>
              <Text style={[styles.link, styles.buttonLink]}>
                {translate(`By tapping the button below you agree to all the`) +
                  " "}
                <Text
                  onPress={() => openTerms()}
                  style={[styles.link, styles.tNcLink]}
                >
                  {translate(`Terms & Conditions`)}
                </Text>{" "}
                {translate(`mentioned in this`) + " "}
                <Text
                  onPress={() => openPrivacy()}
                  style={[styles.link, styles.tNcLink, styles.agreementLink]}
                >
                  {translate(`agreement`)}
                </Text>
              </Text>
            </Text>
          )}
          {!this.state.editBusinessInfo && (
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
