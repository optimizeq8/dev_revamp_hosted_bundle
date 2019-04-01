//Components
import React, { Component } from "react";
import { View, Slider, Platform } from "react-native";
import MultiSelect from "./MultiSelect";
import { Button, Text, Item, Input, Container, Icon } from "native-base";
import cloneDeep from "clone-deep";
import { LinearGradient } from "expo";
import RadioGroup from "react-native-radio-buttons-group";
import InputNumber from "rmc-input-number";
import Sidemenu from "react-native-side-menu";
import GenderIcon from "../../../../assets/SVGs/Gender.svg";
import DateField from "./DateFields";
import ReachBar from "./ReachBar";

//Data
import country_regions from "./regions";

// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import inputNumberStyles from "./inputNumber";

//Redux Axios
import Axios from "axios";
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";

//Validators
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";

class AdDetails extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        campaign_id: "",
        lifetime_budget_micro: 50,
        targeting: {
          demographics: [
            {
              gender: "FEMALE",

              languages: ["en"],
              min_age: 13,
              max_age: 35
            }
          ],
          interests: [{ category_id: [] }],
          geos: [{ country_code: "kw", region_id: [] }]
        },
        start_time: "",
        end_time: ""
      },
      sidemenustate: false,
      sidemenu: "gender",
      gender: [
        { label: "Female", value: "FEMALE" },
        { label: "Male", value: "MALE" },
        { label: "All", value: "" }
      ],
      languages: [
        { value: "ar", label: "Arabic" },
        { value: "en", label: "English" }
      ],
      regions: country_regions[0].regions,
      countries: [
        {
          label: "Kuwait",
          value: "kw"
        },
        {
          label: "UAE",
          value: "ae"
        },
        {
          label: "KSA",
          value: "sa"
        },
        {
          label: "Bahrain",
          value: "bh"
        },
        {
          label: "Qatar",
          value: "qa"
        },
        {
          label: "Oman",
          value: "om"
        }
      ],
      budget: 50,
      minValueBudget: 20,
      maxValueBudget: 1000,
      value: 0,
      interestNames: [],
      modalVisible: false,
      totalReach: 0
    };
  }

  async componentDidMount() {
    await this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        campaign_id: this.props.campaign_id
      }
    });
  }

  _handleMaxAge = value => {
    let rep = this.state.campaignInfo;
    rep.targeting.demographics[0].max_age = parseInt(value);
    this.setState({
      campaignInfo: rep
    });
  };

  _handleMinAge = value => {
    let rep = this.state.campaignInfo;
    rep.targeting.demographics[0].min_age = value;
    this.setState({
      campaignInfo: rep
    });
  };
  onSelectedItemsChange = async selectedItems => {
    let replace = this.state.campaignInfo;
    let newCountry = selectedItems.pop();

    if (typeof newCountry !== "undefined") {
      replace.targeting.geos[0].country_code = newCountry;
      replace.targeting.geos[0].region_id = [];
      let reg = country_regions.find(
        c => c.country_code === replace.targeting.geos[0].country_code
      );
      await this.setState({ campaignInfo: replace, regions: reg.regions });
      // this.getTotalReach();
    }
  };
  getMinimumCash = days => {
    let minValueBudget = days !== 0 ? 20 * days : 20;
    this.onSelectedBudgetChange(minValueBudget);
    this.setState({
      minValueBudget
    });
  };
  handleStartDatePicked = date => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        start_time: date
      }
    });
  };
  handleEndDatePicked = date => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        end_time: date
      }
    });
  };
  onSelectedInterestsChange = selectedItems => {
    let replace = cloneDeep(this.state.campaignInfo);
    replace.targeting.interests[0].category_id = selectedItems;
    this.setState({ campaignInfo: replace });
  };

  onSelectedInterestsNamesChange = selectedItems => {
    this.setState({ interestNames: selectedItems });
  };

  onSelectedLangsChange = selectedItems => {
    let replace = this.state.campaignInfo;
    replace.targeting.demographics[0].languages = selectedItems;
    this.setState({
      campaignInfo: replace,
      languagesError:
        this.state.campaignInfo.targeting.demographics[0].languages.length === 0
          ? "Please choose a language."
          : null
    });
  };

  onSelectedGenderChange = selectedItems => {
    let replace = this.state.campaignInfo;
    replace.targeting.demographics[0].gender = selectedItems;
    this.setState({ campaignInfo: replace });
  };

  onSelectedBudgetChange = budget => {
    let replace = this.state.campaignInfo;
    replace.lifetime_budget_micro = budget;
    this.setState({ campaignInfo: replace });
  };

  onSelectedRegionChange = selectedItems => {
    let replace = this.state.campaignInfo;
    replace.targeting.geos[0].region_id = selectedItems;
    this.setState({ campaignInfo: replace });
  };

  _handleSubmission = () => {
    const min_ageError = validateWrapper(
      "age",
      this.state.campaignInfo.targeting.demographics[0].min_age
    );
    const max_ageError = validateWrapper(
      "age",
      this.state.campaignInfo.targeting.demographics[0].max_age
    );
    const languagesError =
      this.state.campaignInfo.targeting.demographics[0].languages.length === 0
        ? "Please choose a language."
        : null;
    let dateErrors = this.dateField.getErrors();

    this.setState({
      min_ageError,
      max_ageError,
      languagesError,
      start_timeError: dateErrors.start_timeError,
      end_time: dateErrors.end_timeError
    });
    if (
      !min_ageError &&
      !max_ageError &&
      !languagesError &&
      !dateErrors.end_timeError &&
      !dateErrors.start_timeError
    ) {
      let rep = cloneDeep(this.state.campaignInfo);
      if (rep.targeting.demographics[0].gender === "") {
        delete rep.targeting.demographics[0].gender;
      }
      if (
        rep.targeting.geos[0].hasOwnProperty("region_id") &&
        rep.targeting.geos[0].region_id.length === 0
      ) {
        delete rep.targeting.geos[0].region_id;
      }
      if (
        rep.targeting.hasOwnProperty("interests") &&
        rep.targeting.interests[0].category_id.length === 0
      ) {
        delete rep.targeting.interests;
      }
      if (rep.targeting.demographics[0].max_age >= 35) {
        rep.targeting.demographics[0].max_age = "35+";
      }
      rep.targeting = JSON.stringify(this.state.campaignInfo.targeting);
      // console.log( /  rep);

      this.props.ad_details(
        rep,
        this.state.interestNames,
        this.props.navigation
      );
      // this.props.navigation.navigate("Home");
    }
  };

  getTotalReach = () => {
    let totalReach = {
      demographics: [
        {
          languages: ["en", "ar"],
          min_age: 13,
          max_age: "35+"
        }
      ],
      geos: [
        { country_code: this.state.campaignInfo.targeting.geos[0].country_code }
      ]
    };
    const obj = {
      targeting: JSON.stringify(totalReach),
      ad_account_id: this.props.mainBusiness.snap_ad_account_id
    };
    // this.props.snap_ad_audience_size(obj);
    Axios.post(
      `https://optimizekwtestingserver.com/optimize/public/snapaudiencesize`,
      obj
    ).then(res => {
      this.setState({
        totalReach: (this.props.average_reach / res.data.average_reach) * 100
      });
    });
  };

  _handleSideMenuState = status => {
    this.setState({ sidemenustate: status });
  };

  _renderSideMenu = component => {
    this.setState({ sidemenu: component }, () =>
      this._handleSideMenuState(true)
    );
  };
  render() {
    console.log(this.state.totalReach);
    let menu;
    switch (this.state.sidemenu) {
      case "gender": {
        menu = (
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "colum"
            }}
          >
            <View style={{ felx: 1, justifyContent: "flex-start" }}>
              <GenderIcon width={130} height={130} fill="#fff" />
              <Text style={styles.title}> Select Gender </Text>
            </View>
            <View
              style={{
                justifyContent: "flex-start"
              }}
            >
              <RadioGroup
                flexDirection="row"
                color="#5F5F5F"
                radioButtons={this.state.gender}
                onPress={value => {
                  var data = value.find(data => data.selected === true);
                  if (data.value !== "All") {
                    let replace = this.state.campaignInfo;
                    replace.targeting.demographics[0].gender = data.value;
                  } else {
                    let replace = this.state.campaignInfo;
                    replace.targeting.demographics[0].gender = "";
                  }
                }}
              />
            </View>
          </View>
        );
        break;
      }
      case "age": {
        menu = (
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              alignItem: "center",
              flexDirection: "colum",
              marginVertical: 50
            }}
          >
            <View style={{ felx: 1, justifyContent: "flex-start" }}>
              <GenderIcon width={130} height={130} fill="#fff" />
              <Text style={styles.title}> Select Gender </Text>
            </View>
            <View>
              <Item
                rounded
                style={[
                  styles.input,
                  {
                    borderColor: this.state.min_ageError ? "red" : "#D9D9D9"
                  }
                ]}
              >
                <InputNumber
                  keyboardType={
                    Platform.OS === "ios" ? "number-pad" : "numeric"
                  }
                  min={13}
                  max={
                    this.state.campaignInfo.targeting.demographics[0]
                      .max_age === 0
                      ? 35
                      : this.state.campaignInfo.targeting.demographics[0]
                          .max_age
                  }
                  styles={inputNumberStyles}
                  defaultValue={
                    this.state.campaignInfo.targeting.demographics[0].min_age
                  }
                  onChange={value => this._handleMinAge(value)}
                />
                <Text
                  style={[styles.text, { paddingTop: 0, paddingBottom: 0 }]}
                >
                  Min Age
                </Text>
              </Item>
              {this.state.min_ageError && (
                <Text style={[styles.text, { paddingTop: 0 }]}>
                  Min {this.state.min_ageError}
                </Text>
              )}
              <Item
                rounded
                style={[
                  styles.input,
                  {
                    borderColor: this.state.max_ageError ? "red" : "#D9D9D9"
                  }
                ]}
              >
                <InputNumber
                  keyboardType={
                    Platform.OS === "ios" ? "number-pad" : "numeric"
                  }
                  max={35}
                  min={
                    this.state.campaignInfo.targeting.demographics[0]
                      .min_age === 0
                      ? 13
                      : this.state.campaignInfo.targeting.demographics[0]
                          .min_age
                  }
                  styles={inputNumberStyles}
                  defaultValue={35}
                  onChange={value => this._handleMaxAge(value)}
                />
                <Text
                  style={[styles.text, { paddingTop: 0, paddingBottom: 0 }]}
                >
                  Max Age
                </Text>
              </Item>
              {this.state.max_ageError && (
                <Text style={[styles.text, { paddingTop: 0 }]}>
                  Max {this.state.max_ageError}
                </Text>
              )}
            </View>
          </View>
        );
        break;
      }
      case "countries": {
        menu = (
          <MultiSelect
            countries={this.state.countries}
            country_code={
              this.state.campaignInfo.targeting.geos[0].country_code
            }
            languages={this.state.languages}
            onSelectedItemsChange={this.onSelectedItemsChange}
            country_codes={
              this.state.campaignInfo.targeting.geos[0].country_code
            }
            languagesError={this.state.languagesError}
            onSelectedLangsChange={this.onSelectedLangsChange}
            selectedLangs={
              this.state.campaignInfo.targeting.demographics[0].languages
            }
            regions={this.state.regions}
            onSelectedRegionChange={this.onSelectedRegionChange}
            region_ids={this.state.campaignInfo.targeting.geos[0].region_id}
            onSelectedInterestsChange={this.onSelectedInterestsChange}
            onSelectedInterestsNamesChange={this.onSelectedInterestsNamesChange}
          />
        );
        break;
      }
    }

    return (
      <>
        <Container style={styles.container}>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          />
          <Sidemenu
            onChange={isOpen => {
              console.log("State", isOpen);
              if (isOpen === false) this._handleSideMenuState(isOpen);
            }}
            disableGestures={true}
            menu={menu}
            menuPosition="right"
            openMenuOffset={wp("85%")}
            isOpen={this.state.sidemenustate}
            autoClosing={false}
          >
            <View
              style={[
                styles.mainCard,
                {
                  margin: 0,
                  flex: 1
                }
              ]}
            >
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row" }}>
                  <Button
                    iconLeft
                    transparent
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <Icon
                      style={{ paddingLeft: 10, marginRight: 20, top: 25 }}
                      name="arrow-back"
                    />
                  </Button>
                  <Text style={styles.text}>
                    Input your Snapchat AD Details
                  </Text>
                </View>
                <View
                  style={[
                    styles.slidercontainer,
                    { alignSelf: "center", paddingTop: 40 }
                  ]}
                >
                  <View style={styles.textCon}>
                    <Text style={styles.colorGrey}>
                      {this.state.minValueBudget} $
                    </Text>
                    <View style={{ alignItems: "center" }}>
                      <Text style={styles.colorYellow}>
                        {this.state.campaignInfo.lifetime_budget_micro + "$"}
                      </Text>
                      <Text style={[styles.colorGrey, { fontSize: 11 }]}>
                        20$/day
                      </Text>
                    </View>
                    <Text style={styles.colorGrey}>
                      {this.state.maxValueBudget} $
                    </Text>
                  </View>

                  <Slider
                    style={{ width: 300 }}
                    step={10}
                    minimumValue={this.state.minValueBudget}
                    maximumValue={this.state.maxValueBudget}
                    value={this.state.campaignInfo.lifetime_budget_micro}
                    onValueChange={val => this.onSelectedBudgetChange(val)}
                    thumbTintColor="rgb(252, 228, 149)"
                    maximumTrackTintColor="#d3d3d3"
                    minimumTrackTintColor="rgb(252, 228, 149)"
                  />
                </View>
                <Item
                  rounded
                  style={[
                    styles.dateInput,
                    {
                      borderColor: this.state.start_timeError
                        ? "red"
                        : "#D9D9D9"
                    }
                  ]}
                  onPress={() => {
                    this.dateField.showModal();
                  }}
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
                    {this.state.campaignInfo.start_time === ""
                      ? "Start date"
                      : this.state.campaignInfo.start_time}
                  </Text>
                  <Text style={[styles.inputtext]}>To</Text>
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
                    {this.state.campaignInfo.end_time === ""
                      ? "End date"
                      : this.state.campaignInfo.end_time}
                  </Text>
                </Item>

                <Button
                  onPress={() => {
                    this._renderSideMenu("gender");
                  }}
                >
                  <Text> Gender</Text>
                </Button>
                <Button
                  onPress={() => {
                    this._renderSideMenu("age");
                  }}
                >
                  <Text> Age</Text>
                </Button>

                <Button
                  onPress={() => {
                    this._renderSideMenu("countries");
                  }}
                >
                  <Text> Country</Text>
                </Button>
              </View>

              <ReachBar
                style={{ justifyContent: "flex-end" }}
                country_code={
                  this.state.campaignInfo.targeting.geos[0].country_code
                }
                targeting={this.state.campaignInfo.targeting}
              />
              <Button onPress={this._handleSubmission} style={styles.button}>
                <Icon style={styles.icon} name="arrow-forward" />
              </Button>
            </View>
          </Sidemenu>
        </Container>
        <DateField
          getMinimumCash={this.getMinimumCash}
          onRef={ref => (this.dateField = ref)}
          handleStartDatePicked={this.handleStartDatePicked}
          handleEndDatePicked={this.handleEndDatePicked}
          start_time={this.state.campaignInfo.start_time}
          end_time={this.state.campaignInfo.end_time}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  average_reach: state.campaignC.average_reach,
  mainBusiness: state.auth.mainBusiness
});

const mapDispatchToProps = dispatch => ({
  ad_details: (info, interestNames, navigation) =>
    dispatch(actionCreators.ad_details(info, interestNames, navigation)),
  snap_ad_audience_size: (info, totalReach) =>
    dispatch(actionCreators.snap_ad_audience_size(info, totalReach))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdDetails);
