//Components
import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";
import { Button, Text, Item, Input, Container, Icon, Label } from "native-base";
import { LinearGradient, Segment, WebBrowser } from "expo";
import RNPickerSelect from "react-native-picker-select";
import CloseButton from "../../MiniComponents/CloseButton";
//icons
import CloseIcon from "../../../assets/SVGs/Close";
import HomeBussinesIcon from "../../../assets/SVGs/Person";
import CompanyIcon from "../../../assets/SVGs/Group";

//privay
import { openPrivacy } from "../../Terms&Condtions";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//Validator
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import businessCategoryList from "./BusinessCategoriesList";

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
    Segment.screen("Create New Business");
  }

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
  render() {
    return (
      <Container
        style={[
          styles.maincontainer,
          { marginTop: this.props.registering ? 0 : 30 }
        ]}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        {!this.props.registering && (
          <>
            <CloseButton navigation={this.props.navigation.goBack} />
            <Text style={styles.title}>New Business</Text>
            <Text style={styles.subtitle}>
              You can create a new Business under you!
            </Text>
          </>
        )}
        <View
          style={{
            paddingVertical: 10,
            flexDirection: "row",
            alignSelf: "center"
          }}
        >
          <Button
            block
            dark
            style={[
              this.state.businessAccount.businesstype === "1"
                ? styles.activebutton
                : styles.button,
              {
                borderBottomEndRadius: 0,
                borderTopEndRadius: 0,
                borderBottomStartRadius: 15,
                borderTopStartRadius: 15
              }
            ]}
            onPress={() => {
              this._handleBusinessCategories("1");
            }}
          >
            <Text
              style={[
                this.state.businessAccount.businesstype === "1"
                  ? styles.activetext
                  : styles.inactivetext
              ]}
            >
              <Icon
                type="MaterialCommunityIcons"
                name="home-account"
                style={[
                  this.state.businessAccount.businesstype === "1"
                    ? styles.activetext
                    : styles.inactivetext,
                  {
                    left: 25,
                    fontSize: 25
                  }
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
                ? styles.activebutton
                : styles.button,
              {
                borderBottomEndRadius: 0,
                borderTopEndRadius: 0,
                borderBottomStartRadius: 0,
                borderTopStartRadius: 0
              }
            ]}
            onPress={() => {
              this._handleBusinessCategories("2");
            }}
          >
            <Text
              style={[
                this.state.businessAccount.businesstype === "2"
                  ? styles.activetext
                  : styles.inactivetext
              ]}
            >
              <Icon
                type="Foundation"
                name="torsos-all"
                style={[
                  this.state.businessAccount.businesstype === "2"
                    ? styles.activetext
                    : styles.inactivetext,
                  {
                    alignSelf: "center",
                    fontSize: 25
                  }
                ]}
              />
              {"\n"}Agency
            </Text>
          </Button>

          <Button
            dark
            style={[
              this.state.businessAccount.businesstype === "3"
                ? styles.activebutton
                : styles.button,
              {
                borderTopStartRadius: 0,
                borderBottomStartRadius: 0,
                borderBottomEndRadius: 15,
                borderTopEndRadius: 15
              }
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
                  ? styles.activetext
                  : styles.inactivetext,
                {
                  fontSize: 25,
                  bottom: 5
                }
              ]}
            />
            <Text
              style={[
                this.state.businessAccount.businesstype === "3"
                  ? styles.activetext
                  : styles.inactivetext
              ]}
            >
              Corporate
            </Text>
          </Button>
        </View>
        <ScrollView style={[styles.mainCard]}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={styles.container}>
              <Item
                floatingLabel
                style={[
                  styles.input,
                  {
                    borderColor: this.state.inputN
                      ? "#7039FF"
                      : this.state.businessnameError || !this.props.successName
                      ? "red"
                      : "#D9D9D9"
                  }
                ]}
              >
                <Label
                  style={[
                    styles.inputtext,
                    {
                      flexDirection: "column",
                      color: this.state.inputN ? "#FF9D00" : "#717171"
                    }
                  ]}
                >
                  <Icon
                    style={{
                      fontSize: 20,
                      color: this.state.inputN ? "#FF9D00" : "#717171"
                    }}
                    name="person"
                  />
                  {"  "}
                  {this.state.businessAccount.businesstype === "1"
                    ? "Startup Name"
                    : this.state.businessAccount.businesstype === "2"
                    ? "Agency Name"
                    : "Corporate Name"}
                </Label>
                <Input
                  style={styles.inputtext}
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
                  {
                    borderColor: this.state.inputBN ? "#7039FF" : "#D9D9D9"
                  }
                ]}
              >
                <Label
                  style={[
                    styles.inputtext,
                    {
                      bottom: 5,
                      flexDirection: "row",
                      color: this.state.inputBN ? "#FF9D00" : "#717171"
                    }
                  ]}
                >
                  <Icon
                    type="MaterialIcons"
                    style={{
                      fontSize: 20,
                      color: this.state.inputBN ? "#FF9D00" : "#717171"
                    }}
                    name="label"
                  />
                  {"  "}
                  {this.state.businessAccount.businesstype === "1"
                    ? "Brand Name"
                    : this.state.businessAccount.businesstype === "2"
                    ? "Client Name"
                    : "Brand Name"}{" "}
                  (optional)
                </Label>

                <Input
                  style={styles.inputtext}
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
                    {
                      borderColor: this.state.inputE
                        ? "#7039FF"
                        : this.state.businessemailError
                        ? "red"
                        : "#D9D9D9"
                    }
                  ]}
                >
                  <Label
                    style={[
                      styles.inputtext,
                      {
                        bottom: 5,
                        flexDirection: "row",
                        color: this.state.inputE ? "#FF9D00" : "#717171"
                      }
                    ]}
                  >
                    <Icon
                      style={{
                        fontSize: 20,
                        color: this.state.inputE ? "#FF9D00" : "#717171"
                      }}
                      name="mail"
                    />
                    {"  "}
                    Email
                  </Label>

                  <Input
                    style={styles.inputtext}
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

              <RNPickerSelect
                items={this.state.countries}
                placeholder={{ label: "Select a country", value: "" }}
                onOpen={() => {
                  this.setState({ inputC: true });
                }}
                onClose={() => {
                  this.setState({ inputC: false });
                  this.setState({
                    countryError: validateWrapper(
                      "mandatory",
                      this.state.businessAccount.country
                    )
                  });
                }}
                onValueChange={value => {
                  this.setState({
                    businessAccount: {
                      ...this.state.businessAccount,
                      country: value
                    }
                  });
                }}
              >
                <Item
                  style={[
                    styles.input,
                    {
                      borderColor: this.state.inputC
                        ? "#7039FF"
                        : this.state.countryError
                        ? "red"
                        : "#D9D9D9"
                    }
                  ]}
                >
                  <Text
                    style={[
                      styles.inputtext,
                      {
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        color: "rgb(113,113,113)"
                      }
                    ]}
                  >
                    {this.state.businessAccount.country === ""
                      ? "Country"
                      : this.state.businessAccount.country}
                  </Text>
                  <Icon
                    type="AntDesign"
                    name="down"
                    style={{ color: "#5F5F5F", fontSize: 20, left: 25 }}
                  />
                </Item>
              </RNPickerSelect>
              <RNPickerSelect
                items={this.state.items}
                placeholder={{ label: "Select a business type", value: "" }}
                onOpen={() => {
                  this.setState({ inputT: true });
                }}
                onClose={() => {
                  this.setState({ inputT: false });
                  this.setState({
                    businesscategoryError: validateWrapper(
                      "mandatory",
                      this.state.businessAccount.businesscategory
                    )
                  });
                }}
                onValueChange={value => {
                  this.setState({
                    businessAccount: {
                      ...this.state.businessAccount,
                      businesscategory: value
                    }
                  });
                }}
              >
                <Item
                  style={[
                    styles.input,
                    {
                      borderColor: this.state.inputT
                        ? "#7039FF"
                        : this.state.businesscategoryError
                        ? "red"
                        : "#D9D9D9"
                    }
                  ]}
                >
                  <Text
                    placeholder={
                      this.state.businessAccount.businesscategory !== ""
                        ? this.state.businessAccount.businesscategory
                        : ""
                    }
                    style={[
                      styles.inputtext,
                      {
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        color: "rgb(113,113,113)"
                      }
                    ]}
                  >
                    {this.state.businessAccount.businesscategory === ""
                      ? this.state.businessAccount.businesstype === "1"
                        ? "Industry"
                        : this.state.businessAccount.businesstype === "2"
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
                    style={{ color: "#5F5F5F", fontSize: 20, left: 25 }}
                  />
                </Item>
              </RNPickerSelect>
              {this.state.businessAccount.businesscategory === "43" && (
                <Item
                  ref={r => {
                    this._textInputRef = r;
                  }}
                  floatingLabel
                  style={[
                    styles.input,
                    {
                      borderColor: this.state.inputBusinessCategoryOther
                        ? "#7039FF"
                        : this.state.businesscategoryOtherError
                        ? "red"
                        : "#D9D9D9"
                    }
                  ]}
                >
                  <Label
                    style={[
                      styles.inputtext,
                      {
                        bottom: 5,
                        flexDirection: "row",
                        color: this.state.inputBusinessCategoryOther
                          ? "#FF9D00"
                          : this.state.businesscategoryOtherError
                          ? "red"
                          : "#717171"
                      }
                    ]}
                  >
                    {"Other Business Catergory"}
                  </Label>

                  <Input
                    style={styles.inputtext}
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
                      this.setState({ inputBusinessCategoryOther: true });
                    }}
                    onBlur={() => {
                      this.setState({ inputBusinessCategoryOther: false });
                    }}
                  />
                </Item>
              )}
            </View>
          </TouchableWithoutFeedback>
          {this.props.registering && (
            <Text style={{ bottom: 10 }}>
              <Text style={[styles.link, { lineHeight: 20 }]}>
                {` By tapping the button below you agree to all the`}
                <Text
                  onPress={() => openPrivacy()}
                  style={[
                    styles.link,
                    {
                      textDecorationLine: "underline",
                      color: "blue"
                    }
                  ]}
                >
                  {`  Terms & Conditions`}
                </Text>{" "}
                {`mentioned in this `}
                <Text
                  onPress={() => openPrivacy()}
                  style={[
                    styles.link,
                    {
                      textDecorationLine: "underline",
                      color: "blue",
                      zIndex: 10
                    }
                  ]}
                >
                  {`agreement`}
                </Text>
              </Text>
            </Text>
          )}
        </ScrollView>

        <View style={{ backgroundColor: "#fff" }}>
          <Button
            block
            dark
            style={[styles.bottomCard, { justifyContent: "center" }]}
            onPress={() => {
              this._handleSubmission();
            }}
          >
            <Text style={styles.buttontext}>CREATE NEW BUSINESS</Text>
          </Button>
        </View>
      </Container>
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
