//Components
import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler
} from "react-native";
import { Button, Text, Item, Input, Container, Icon, Label } from "native-base";
import * as Segment from "expo-analytics-segment";
import CustomHeader from "../../MiniComponents/Header";
import { SafeAreaView } from "react-navigation";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";

import Picker from "../../MiniComponents/Picker";
import KeyBoardShift from "../../MiniComponents/KeyboardShift";
import LowerButton from "../../MiniComponents/LowerButton";
import CheckMarkLoading from "../../MiniComponents/CheckMarkLoading";

//data
import businessCategoryList from "../../Data/businessCategoriesList.data";

//privay
import { openPrivacy, openTerms } from "../../Terms&Conditions";

// Style
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

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
        brandname: ""
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
      data: [
        {
          label: "Individual",
          value: "1"
        },
        {
          label: "Business",
          value: "2"
        }
      ],
      items: businessCategoryList,
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
      editBusinessInfo: false
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
      this.setState({
        businessAccount: {
          ...this.props.mainBusiness
        },
        editBusinessInfo
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

  _verifyBusinessName = async name => {
    if (name !== "") {
      await this.props.verifyBusinessName(name, this._handleBusinessName);
      return this.props.successName;
    }
  };
  _handleBusinessName = value => {
    this.setState({
      businessnameAvalible: value
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

    this.setState({
      businessnameError,
      businessemailError,
      businesscategoryError,
      countryError,
      businesscategoryOtherError
    });
    await this._verifyBusinessName(this.state.businessAccount.businessname);
    if (
      !businessnameError &&
      // (await this._verifyBusinessName(
      //   this.state.businessAccount.businessname
      // )) &&
      !businessemailError &&
      !businesscategoryError &&
      !countryError &&
      !businesscategoryOtherError
    ) {
      if (this.state.businessAccount.brandname === "") {
        await this.setState({
          businessAccount: {
            ...this.state.businessAccount,
            brandname: this.state.businessAccount.businessname
          }
        });
      }

      if (this.props.registering) {
        let { businessemail, ...business } = this.state.businessAccount;
        let userInfo = {
          ...this.props.userInfoR,
          ...business,
          country_code: this.props.countryCode,
          inviteCode: this.props.inviteCode
        };

        this.props.registerUser(userInfo, this.props.navigation);
      }
      //  condition for updating business info
      else if (this.state.editBusinessInfo) {
        // check if info changed then call api else showMessage for no change
        const changedInfo = !isEqual(
          this.state.businessAccount,
          this.props.mainBusiness
        );
        if (changedInfo) {
          this.props.updateBusinessInfo(
            this.props.userInfo.userid,
            {
              ...this.state.businessAccount,
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
        this.props.createBusinessAccount(
          this.state.businessAccount,
          this.props.navigation
        );
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

  render() {
    const { translate } = this.props.screenProps;
    // Added disable(when updating business info loading ) and value ={having state value} props to input fields
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Container style={[styles.mainContainer]}>
          {!this.props.registering && (
            <>
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
            </>
          )}
          <Text uppercase style={styles.whatAreYouText}>
            {translate("What are you ?")}
          </Text>
          <View style={styles.topContainer}>
            <Button
              disabled={
                this.state.editBusinessInfo &&
                this.props.editBusinessInfoLoading
              }
              style={[
                this.state.businessAccount.businesstype === "1"
                  ? styles.activeButton
                  : styles.button,
                isStringArabic(translate("Startup")) ? { width: "40%" } : {}
              ]}
              onPress={() => {
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
            </Button>

            <Button
              disabled={
                this.state.editBusinessInfo &&
                this.props.editBusinessInfoLoading
              }
              style={[
                this.state.businessAccount.businesstype === "2"
                  ? styles.activeButton
                  : styles.button
              ]}
              onPress={() => {
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
            </Button>

            <Button
              disabled={
                this.state.editBusinessInfo &&
                this.props.editBusinessInfoLoading
              }
              style={[
                this.state.businessAccount.businesstype === "3"
                  ? styles.activeButton
                  : styles.button
              ]}
              onPress={() => {
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
            </Button>
          </View>
          <View style={[styles.mainCard]}>
            <ScrollView>
              <KeyBoardShift>
                {() => (
                  <>
                    <TouchableWithoutFeedback
                      onPress={Keyboard.dismiss}
                      accessible={false}
                    >
                      <View style={styles.container}>
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
                                : this.state.businessAccount.businesstype ===
                                  "2"
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
                              disabled={
                                this.state.editBusinessInfo &&
                                this.props.editBusinessInfoLoading
                              }
                              style={[styles.inputText]}
                              value={this.state.businessAccount.businessname}
                              onChangeText={value => {
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
                                this.setState({ inputN: false });
                                this._verifyBusinessName(
                                  this.state.businessAccount.businessname
                                );
                              }}
                            />
                          </Item>
                        </View>

                        <View style={styles.marginVertical}>
                          <View
                            style={[
                              styles.callToActionLabelView,
                              { width: 200 }
                            ]}
                          >
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
                                : this.state.businessAccount.businesstype ===
                                  "2"
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
                              style={styles.inputText}
                              autoCorrect={false}
                              disabled={
                                this.state.editBusinessInfo &&
                                this.props.editBusinessInfoLoading
                              }
                              value={this.state.businessAccount.brandname}
                              onChangeText={value =>
                                this.setState({
                                  businessAccount: {
                                    ...this.state.businessAccount,
                                    brandname: value
                                  }
                                })
                              }
                              maxLength={25}
                              onFocus={() => {
                                this.setState({ inputBN: true });
                              }}
                              onBlur={() => {
                                this.setState({ inputBN: false });
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
                                style={[
                                  styles.inputText,
                                  {
                                    fontFamily: "montserrat-regular-english"
                                  }
                                ]}
                                autoCorrect={false}
                                autoCapitalize="none"
                                disabled={
                                  this.state.editBusinessInfo &&
                                  this.props.editBusinessInfoLoading
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
                                  this.setState({ inputE: false });
                                  this.setState({
                                    businessemailError: validateWrapper(
                                      "email",
                                      this.state.businessAccount.businessemail
                                    )
                                  });
                                }}
                              />
                            </Item>
                          </View>
                        )}

                        <View style={styles.marginVertical}>
                          <Picker
                            screenProps={this.props.screenProps}
                            searchPlaceholderText={translate("Search Country")}
                            data={this.state.countries}
                            uniqueKey={"value"}
                            displayKey={"label"}
                            open={this.state.inputC}
                            onSelectedItemsChange={
                              this.onSelectedCountryIdChange
                            }
                            onSelectedItemObjectsChange={
                              this.onSelectedCountryChange
                            }
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
                              this.state.editBusinessInfo &&
                              this.props.editBusinessInfoLoading
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
                              {translate(this.state.businessAccount.country)}
                            </Text>
                            <Icon
                              type="AntDesign"
                              name="down"
                              style={styles.iconDown}
                            />
                          </Item>
                        </View>

                        <View style={styles.marginVertical}>
                          <Picker
                            screenProps={this.props.screenProps}
                            searchPlaceholderText={translate(
                              "Search Business Category"
                            )}
                            data={this.state.items}
                            uniqueKey={"value"}
                            displayKey={"label"}
                            open={this.state.inputT}
                            onSelectedItemsChange={
                              this.onSelectedBusinessCategoryIdChange
                            }
                            onSelectedItemObjectsChange={
                              this.onSelectedBusinessCategoryChange
                            }
                            selectedItems={[
                              this.state.businessAccount.businesscategory
                            ]}
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
                              this.state.editBusinessInfo &&
                              this.props.editBusinessInfoLoading
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
                              {this.state.businessAccount.businesscategory ===
                              ""
                                ? this.state.businessAccount.businesstype ===
                                  "1"
                                  ? translate("Industry")
                                  : this.state.businessAccount.businesstype ===
                                    "2"
                                  ? translate("Client Industry")
                                  : translate("Industry")
                                : this.state.items.find(
                                    i =>
                                      i.value ===
                                      this.state.businessAccount
                                        .businesscategory
                                  ).label}
                            </Text>
                            <Icon
                              type="AntDesign"
                              name="down"
                              style={styles.iconDown}
                            />
                          </Item>
                        </View>

                        {this.state.businessAccount.businesscategory ===
                          "43" && (
                          <View style={styles.marginVertical}>
                            <View
                              style={[
                                styles.callToActionLabelView,
                                { width: 220 }
                              ]}
                            >
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
                                  this.state.inputBusinessCategoryOther
                                    ? "#FF9D00"
                                    : "#FFF"
                                }
                              />
                              <Input
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
                                    inputBusinessCategoryOther: false
                                  });
                                }}
                                value={
                                  this.state.businessAccount
                                    .otherBusinessCategory
                                }
                                disabled={
                                  this.state.editBusinessInfo &&
                                  this.props.editBusinessInfoLoading
                                }
                              />
                            </Item>
                          </View>
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
                      </View>
                    </TouchableWithoutFeedback>
                  </>
                )}
              </KeyBoardShift>
            </ScrollView>
          </View>
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
            <Button
              style={[styles.bottomCard]}
              onPress={() => {
                this._handleSubmission();
              }}
            >
              <Text style={styles.buttonText} uppercase>
                {translate("Create new business")}
              </Text>
            </Button>
          )}
        </Container>
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
  loadingUpdateBusinessInfo: state.account.editBusinessInfoLoading
});

const mapDispatchToProps = dispatch => ({
  registerUser: (userInfo, navigation) =>
    dispatch(actionCreators.registerUser(userInfo, navigation)),
  createBusinessAccount: (account, navigation) =>
    dispatch(actionCreators.createBusinessAccount(account, navigation)),
  verifyBusinessName: (businessName, _handleBusinessName) =>
    dispatch(
      actionCreators.verifyBusinessName(businessName, _handleBusinessName)
    ),
  updateBusinessInfo: (userid, info, navigation) =>
    dispatch(actionCreators.updateBusinessInfo(userid, info, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBusinessAccount);
