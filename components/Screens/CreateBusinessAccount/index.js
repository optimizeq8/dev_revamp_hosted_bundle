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

import Picker from "../../MiniComponents/Picker";
import KeyBoardShift from "../../MiniComponents/KeyboardShift";

import businessCategoryList from "../../Data/businessCategoriesList.data";

//privay
import { openPrivacy, openTerms } from "../../Terms&Conditions";

// Style
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//Validator
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";

class CreateBusinessAccount extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

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
          label: "Kuwait",
          value: "Kuwait"
        },
        {
          label: "UAE",
          value: "UAE"
        },
        {
          label: "KSA",
          value: "KSA"
        },
        {
          label: "Bahrain",
          value: "Bahrain"
        },
        {
          label: "Qatar",
          value: "Qatar"
        },
        {
          label: "Oman",
          value: "Oman"
        }
      ]
    };
  }
  componentDidMount() {
    Segment.screen(
      this.props.registering
        ? "Business Info Registration"
        : "Create New Business",
      {
        category: this.props.registering ? "Sign Up" : "User Menu"
      }
    );
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
    this._verifyBusinessName(this.state.businessAccount.businessname);
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
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Container style={[styles.mainContainer]}>
          {!this.props.registering && (
            <>
              <CustomHeader
                navigation={this.props.navigation}
                title={"New Business"}
                closeButton={true}
              />
              <Text style={styles.subTitle}>
                You can create a new Business under you!
              </Text>
            </>
          )}
          <View style={styles.topContainer}>
            <Button
              block
              dark
              style={[
                this.state.businessAccount.businesstype === "1"
                  ? styles.activeButton
                  : styles.button,
                styles.businessTypeButton1
              ]}
              onPress={() => {
                this._handleBusinessCategories("1");
              }}
            >
              <Text
                style={[
                  this.state.businessAccount.businesstype === "1"
                    ? styles.activeText
                    : styles.inactiveText
                ]}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name="home-account"
                  style={[
                    this.state.businessAccount.businesstype === "1"
                      ? styles.activeText
                      : styles.inactiveText,
                    styles.iconButtonStyleLeft
                  ]}
                />
                {"\n"}
                SME{"\n"} or Startup
              </Text>
            </Button>

            <Button
              block
              dark
              style={[
                this.state.businessAccount.businesstype === "2"
                  ? styles.activeButton
                  : styles.button,
                styles.businessTypeButton2
              ]}
              onPress={() => {
                this._handleBusinessCategories("2");
              }}
            >
              <Text
                style={[
                  this.state.businessAccount.businesstype === "2"
                    ? styles.activeText
                    : styles.inactiveText
                ]}
              >
                <Icon
                  type="Foundation"
                  name="torsos-all"
                  style={[
                    this.state.businessAccount.businesstype === "2"
                      ? styles.activeText
                      : styles.inactiveText,
                    styles.iconButtonStyle2
                  ]}
                />
                {"\n"}Agency
              </Text>
            </Button>

            <Button
              dark
              style={[
                this.state.businessAccount.businesstype === "3"
                  ? styles.activeButton
                  : styles.button,
                styles.businessTypeButton3
              ]}
              onPress={() => {
                this._handleBusinessCategories("3");
              }}
            >
              <Icon
                type="FontAwesome"
                name="building"
                style={[
                  this.state.businessAccount.businesstype === "3"
                    ? styles.activeText
                    : styles.inactiveText,
                  styles.iconButtonStyle3
                ]}
              />
              <Text
                style={[
                  this.state.businessAccount.businesstype === "3"
                    ? styles.activeText
                    : styles.inactiveText
                ]}
              >
                Corporate
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
                        <Item
                          floatingLabel
                          style={[
                            styles.input,
                            this.state.inputN
                              ? globalStyles.purpleBorderColor
                              : this.state.businessnameError ||
                                !this.props.successName
                              ? globalStyles.redBorderColor
                              : globalStyles.lightGrayBorderColor
                          ]}
                        >
                          <Label style={styles.label}>
                            <Text
                              style={[
                                styles.inputText,
                                this.state.inputN
                                  ? globalStyles.orangeTextColor
                                  : globalStyles.darkGrayTextColor,
                                {
                                  flexDirection: "column"
                                }
                              ]}
                            >
                              <Icon
                                style={[
                                  this.state.inputN
                                    ? globalStyles.orangeTextColor
                                    : globalStyles.darkGrayTextColor,
                                  styles.iconStartUp
                                ]}
                                name="person"
                              />
                              {"  "}
                              {this.state.businessAccount.businesstype === "1"
                                ? "Startup Name"
                                : this.state.businessAccount.businesstype ===
                                  "2"
                                ? "Agency Name"
                                : "Corporate Name"}
                            </Text>
                          </Label>
                          <Input
                            style={[styles.inputText]}
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

                        <Item
                          ref={r => {
                            this._textInputRef = r;
                          }}
                          floatingLabel
                          style={[
                            styles.input,
                            this.state.inputBN
                              ? globalStyles.purpleBorderColor
                              : globalStyles.lightGrayBorderColor
                          ]}
                        >
                          <Label style={styles.label}>
                            <Text
                              style={[
                                styles.inputText,
                                this.state.inputBN
                                  ? globalStyles.orangeTextColor
                                  : globalStyles.darkGrayTextColor
                              ]}
                            >
                              <Icon
                                type="MaterialIcons"
                                style={[
                                  this.state.inputBN
                                    ? globalStyles.orangeTextColor
                                    : globalStyles.darkGrayTextColor,
                                  styles.iconBrandName
                                ]}
                                name="label"
                              />
                              {"  "}
                              {this.state.businessAccount.businesstype === "1"
                                ? "Brand Name"
                                : this.state.businessAccount.businesstype ===
                                  "2"
                                ? "Client Name"
                                : "Brand Name"}{" "}
                              (optional)
                            </Text>
                          </Label>

                          <Input
                            style={styles.inputText}
                            autoCorrect={false}
                            onChangeText={value =>
                              this.setState({
                                businessAccount: {
                                  ...this.state.businessAccount,
                                  brandname: value
                                }
                              })
                            }
                            onFocus={() => {
                              this.setState({ inputBN: true });
                            }}
                            onBlur={() => {
                              this.setState({ inputBN: false });
                            }}
                          />
                        </Item>

                        {!this.props.registering && (
                          <Item
                            ref={r => {
                              this._textInputRef = r;
                            }}
                            floatingLabel
                            style={[
                              styles.input,
                              this.state.inputE
                                ? globalStyles.purpleBorderColor
                                : this.state.businessemailError
                                ? globalStyles.redBorderColor
                                : globalStyles.lightGrayBorderColor
                            ]}
                          >
                            <Label style={styles.label}>
                              <Text
                                style={[
                                  styles.inputText,
                                  this.state.inputE
                                    ? globalStyles.orangeTextColor
                                    : globalStyles.darkGrayTextColor,
                                  styles.labelEmail
                                ]}
                              >
                                <Icon
                                  style={[
                                    this.state.inputE
                                      ? globalStyles.orangeTextColor
                                      : globalStyles.darkGrayTextColor,

                                    styles.iconEmail
                                  ]}
                                  name="mail"
                                />
                                {"  "}
                                Email
                              </Text>
                            </Label>

                            <Input
                              style={styles.inputText}
                              autoCorrect={false}
                              autoCapitalize="none"
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
                        )}

                        <Picker
                          searchPlaceholderText={"Search Country"}
                          data={this.state.countries}
                          uniqueKey={"value"}
                          displayKey={"label"}
                          open={this.state.inputC}
                          onSelectedItemsChange={this.onSelectedCountryIdChange}
                          onSelectedItemObjectsChange={
                            this.onSelectedCountryChange
                          }
                          selectedItems={[this.state.businessAccount.country]}
                          single={true}
                          screenName={"Create Business Account"}
                          closeCategoryModal={this.closeCountryModal}
                        />

                        <Item
                          onPress={() => {
                            this.setState({ inputC: true });
                          }}
                          style={[
                            styles.input,
                            this.state.inputC
                              ? globalStyles.purpleBorderColor
                              : this.state.countryError
                              ? globalStyles.redBorderColor
                              : globalStyles.lightGrayBorderColor
                          ]}
                        >
                          <Text style={styles.pickerText}>
                            {this.state.businessAccount.country === ""
                              ? "Country"
                              : this.state.businessAccount.country}
                          </Text>
                          <Icon
                            type="AntDesign"
                            name="down"
                            style={styles.iconDown}
                          />
                        </Item>

                        <Picker
                          searchPlaceholderText={"Search Business Category"}
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
                          screenName={"Create Business Account"}
                          closeCategoryModal={this.closeCategoryModal}
                        />

                        <Item
                          style={[
                            styles.input,
                            this.state.inputT
                              ? globalStyles.purpleBorderColor
                              : this.state.businesscategoryError
                              ? globalStyles.redBorderColor
                              : globalStyles.lightGrayBorderColor
                          ]}
                          onPress={() => this.setState({ inputT: true })}
                        >
                          <Text
                            placeholder={
                              this.state.businessAccount.businesscategory !== ""
                                ? this.state.businessAccount.businesscategory
                                : ""
                            }
                            style={styles.pickerText}
                          >
                            {this.state.businessAccount.businesscategory === ""
                              ? this.state.businessAccount.businesstype === "1"
                                ? "Industry"
                                : this.state.businessAccount.businesstype ===
                                  "2"
                                ? "Client Industry"
                                : "Industry"
                              : this.state.items.find(
                                  i =>
                                    i.value ===
                                    this.state.businessAccount.businesscategory
                                ).label}
                          </Text>
                          <Icon
                            type="AntDesign"
                            name="down"
                            style={styles.iconDown}
                          />
                        </Item>
                        {this.state.businessAccount.businesscategory ===
                          "43" && (
                          <Item
                            ref={r => {
                              this._textInputRef = r;
                            }}
                            floatingLabel
                            style={[
                              styles.input,
                              this.state.inputBusinessCategoryOther
                                ? globalStyles.purpleBorderColor
                                : this.state.businesscategoryOtherError
                                ? globalStyles.redBorderColor
                                : globalStyles.lightGrayBorderColor
                            ]}
                          >
                            <Label
                              style={[
                                styles.inputText,
                                this.state.inputBusinessCategoryOther
                                  ? globalStyles.orangeTextColor
                                  : this.state.businesscategoryOtherError
                                  ? globalStyles.redTextColor
                                  : globalStyles.darkGrayTextColor,
                                {
                                  bottom: 5,
                                  flexDirection: "row"
                                }
                              ]}
                            >
                              {"Other Business Catergory"}
                            </Label>

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
                            />
                          </Item>
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                    {this.props.registering && (
                      <Text style={styles.textAgreement}>
                        <Text style={[styles.link, styles.buttonLink]}>
                          {` By tapping the button below you agree to all the`}
                          <Text
                            onPress={() => openTerms()}
                            style={[styles.link, styles.tNcLink]}
                          >
                            {`  Terms & Conditions`}
                          </Text>{" "}
                          {`mentioned in this `}
                          <Text
                            onPress={() => openPrivacy()}
                            style={[
                              styles.link,
                              styles.tNcLink,
                              styles.agreementLink
                            ]}
                          >
                            {`agreement`}
                          </Text>
                        </Text>
                      </Text>
                    )}
                  </>
                )}
              </KeyBoardShift>
            </ScrollView>
          </View>
          <View style={globalStyles.whiteBackgroundColor}>
            <Button
              block
              dark
              style={[styles.bottomCard]}
              onPress={() => {
                this._handleSubmission();
              }}
            >
              <Text style={styles.buttonText}>CREATE NEW BUSINESS</Text>
            </Button>
          </View>
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
  successName: state.register.successName
});

const mapDispatchToProps = dispatch => ({
  registerUser: (userInfo, navigation) =>
    dispatch(actionCreators.registerUser(userInfo, navigation)),
  createBusinessAccount: (account, navigation) =>
    dispatch(actionCreators.createBusinessAccount(account, navigation)),
  verifyBusinessName: (businessName, _handleBusinessName) =>
    dispatch(
      actionCreators.verifyBusinessName(businessName, _handleBusinessName)
    )
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBusinessAccount);
