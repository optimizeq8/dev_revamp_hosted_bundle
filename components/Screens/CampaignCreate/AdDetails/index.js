//Components
import React, { Component } from "react";
import {
  View,
  Slider,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from "react-native";
import MultiSelect from "./MultiSelect";
import { Button, Text, Item, Input, Container, Icon } from "native-base";
import cloneDeep from "clone-deep";
import { LinearGradient } from "expo";
import RadioGroup from "react-native-radio-buttons-group";
import InputNumber from "rmc-input-number";
import Sidemenu from "react-native-side-menu";
import DateField from "./DateFields";
import ReachBar from "./ReachBar";
import CheckmarkIcon from "../../../../assets/SVGs/Checkmark.svg";
import LocationIcon from "../../../../assets/SVGs/Location.svg";
import InterestsIcon from "../../../../assets/SVGs/Interests.svg";

import dateFormat from "dateformat";

//Data
import country_regions from "./regions";

// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

//Redux Axios
import Axios from "axios";
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";

//Validators
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import GenderOptions from "./GenderOptions";
import AgeOption from "./AgeOption";
import MultiSelectSections from "./MultiSelect";
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
      filteredRegions: country_regions[0].regions,
      filteredLanguages: [
        { value: "ar", label: "Arabic" },
        { value: "en", label: "English" }
      ],
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
      totalReach: 0,
      selectionOption: ""
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
    let newCountry = selectedItems;

    if (typeof newCountry !== "undefined") {
      replace.targeting.geos[0].country_code = newCountry;
      replace.targeting.geos[0].region_id = [];
      let reg = country_regions.find(
        c => c.country_code === replace.targeting.geos[0].country_code
      );
      await this.setState({
        campaignInfo: replace,
        regions: reg.regions,
        filteredRegions: reg.regions
      });
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

  onSelectedLangsChange = selectedItem => {
    let replace = this.state.campaignInfo;
    if (
      replace.targeting.demographics[0].languages.find(r => r === selectedItem)
    ) {
      replace.targeting.demographics[0].languages = replace.targeting.demographics[0].languages.filter(
        r => r !== selectedItem
      );
    } else {
      replace.targeting.demographics[0].languages.push(selectedItem);
    }

    this.setState({
      campaignInfo: replace,
      languagesError:
        this.state.campaignInfo.targeting.demographics[0].languages.length === 0
          ? "Please choose a language."
          : null
    });
  };

  onSelectedGenderChange = selectedItem => {
    let replace = this.state.campaignInfo;
    replace.targeting.demographics[0].gender = selectedItem;
    this.setState({ campaignInfo: replace });
  };

  onSelectedBudgetChange = budget => {
    let replace = this.state.campaignInfo;
    replace.lifetime_budget_micro = budget;
    this.setState({ campaignInfo: replace });
  };

  onSelectedRegionChange = selectedItem => {
    let replace = this.state.campaignInfo;
    if (replace.targeting.geos[0].region_id.find(r => r === selectedItem)) {
      replace.targeting.geos[0].region_id = replace.targeting.geos[0].region_id.filter(
        r => r !== selectedItem
      );
    } else {
      replace.targeting.geos[0].region_id.push(selectedItem);
    }
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
    this.setState({ sidemenustate: status }, () => {});
  };

  _renderSideMenu = (component, option = "") => {
    this.setState({ sidemenu: component, selectionOption: option }, () =>
      this._handleSideMenuState(true)
    );
  };

  _changeGender = gender => {
    let replace = this.state.campaignInfo;
    replace.targeting.demographics[0].gender = gender;
    this.setState({ campaignInfo: { ...replace } });
  };

  selectRegion = () => {
    let regionlist = this.state.filteredRegions.map(c => {
      return (
        <TouchableOpacity
          key={c.id}
          style={{
            paddingVertical: 20
          }}
          onPress={() => {
            this.onSelectedRegionChange(c.id);
          }}
        >
          <Text
            style={{
              fontFamily: "montserrat-bold",
              color: this.state.campaignInfo.targeting.geos[0].region_id.find(
                r => r === c.id
              )
                ? "#FF9D00"
                : "#fff",
              fontSize: 14
            }}
          >
            {c.name}
          </Text>
        </TouchableOpacity>
      );
    });
    return (
      <>
        <View
          style={{
            flex: 1,
            top: 40,
            flexDirection: "column"
          }}
        >
          <View
            style={{
              marginTop: 10,
              alignItems: "center"
            }}
          >
            <LocationIcon width={110} height={110} fill="#fff" />
            <Text style={[styles.title]}> Select Country </Text>
          </View>
          <View
            style={{
              felx: 1,
              justifyContent: "space-between",
              paddingTop: 20,
              elevation: -1
            }}
          >
            <View style={styles.slidercontainer}>
              <Item>
                <Input
                  placeholder="Search Region..."
                  style={{
                    fontFamily: "montserrat-regular",
                    color: "#fff",
                    fontSize: 14
                  }}
                  placeholderTextColor="#fff"
                  onChangeText={value => {
                    let filteredR = this.state.regions.filter(c =>
                      c.name.toLowerCase().includes(value.toLowerCase())
                    );
                    this.setState({ filteredRegions: filteredR });
                  }}
                />
              </Item>

              <View style={{ height: "75%" }}>
                <ScrollView>{regionlist}</ScrollView>
              </View>
            </View>
          </View>
        </View>
        <Button
          style={[styles.button, { marginBottom: 30 }]}
          onPress={() => this._handleSideMenuState(false)}
        >
          <CheckmarkIcon width={53} height={53} />
        </Button>
      </>
    );
  };

  selectLanguage = () => {
    let languagelist = this.state.filteredLanguages.map(c => (
      <TouchableOpacity
        key={c.value}
        style={{
          paddingVertical: 10,
          marginVertical: 10,
          backgroundColor: this.state.campaignInfo.targeting.demographics[0].languages.find(
            l => l === c.value
          )
            ? "#FF9D00"
            : "transparent",
          borderRadius: 10,
          paddingLeft: 5
        }}
        onPress={() => {
          this.onSelectedLangsChange(c.value);
        }}
      >
        <Text
          style={{
            fontFamily: "montserrat-bold",
            color: "#fff",
            fontSize: 14
          }}
        >
          {c.label}
        </Text>
      </TouchableOpacity>
    ));
    return (
      <>
        <View
          style={{
            flex: 1,
            top: 40,
            flexDirection: "column"
          }}
        >
          <View
            style={{
              marginTop: 10,
              alignItems: "center"
            }}
          >
            <LocationIcon width={110} height={110} fill="#fff" />
            <Text style={[styles.title]}>Select Languages</Text>
          </View>
          <View
            style={{
              felx: 1,
              justifyContent: "space-between",
              paddingTop: 20,
              elevation: -1
            }}
          >
            <View style={styles.slidercontainer}>
              <Item>
                <Input
                  placeholder="Search Language..."
                  style={{
                    fontFamily: "montserrat-regular",
                    color: "#fff",
                    fontSize: 14
                  }}
                  placeholderTextColor="#fff"
                  onChangeText={value => {
                    let filteredC = this.state.languages.filter(c =>
                      c.label.toLowerCase().includes(value.toLowerCase())
                    );
                    this.setState({ filteredLanguages: filteredC });
                  }}
                />
              </Item>

              <View style={{ height: "75%" }}>
                <ScrollView>{languagelist}</ScrollView>
              </View>
            </View>
          </View>
        </View>
        <Button
          style={[styles.button, { marginBottom: 30 }]}
          onPress={() => this._handleSideMenuState(false)}
        >
          <CheckmarkIcon width={53} height={53} />
        </Button>
      </>
    );
  };

  render() {
    console.log(this.state.campaignInfo.targeting.geos[0]);

    let menu;
    switch (this.state.sidemenu) {
      case "gender": {
        menu = (
          <GenderOptions
            campaignInfo={this.state.campaignInfo}
            _changeGender={this._changeGender}
            _handleSideMenuState={this._handleSideMenuState}
          />
        );
        break;
      }
      case "age": {
        menu = (
          <AgeOption
            state={this.state}
            _handleMaxAge={this._handleMaxAge}
            _handleMinAge={this._handleMinAge}
            _handleSideMenuState={this._handleSideMenuState}
          />
        );
        break;
      }
      case "regions": {
        menu = this.selectRegion();

        break;
      }
      case "languages": {
        menu = this.selectLanguage();

        break;
      }
      case "selectors": {
        menu = (
          <MultiSelectSections
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
            _handleSideMenuState={this._handleSideMenuState}
            regions={this.state.regions}
            onSelectedRegionChange={this.onSelectedRegionChange}
            region_ids={this.state.campaignInfo.targeting.geos[0].region_id}
            onSelectedInterestsChange={this.onSelectedInterestsChange}
            onSelectedInterestsNamesChange={this.onSelectedInterestsNamesChange}
            option={this.state.selectionOption}
          />
        );
        break;
      }
    }
    let end_time = "";
    let start_time = "";
    let end_year = "";
    let start_year = "";
    if (
      this.state.campaignInfo.start_time !== "" &&
      this.state.campaignInfo.end_time !== ""
    ) {
      end_time = new Date(this.state.campaignInfo.end_time.split(".")[0]);
      start_time = new Date(this.state.campaignInfo.start_time.split(".")[0]);
      end_year = end_time.getFullYear();
      start_year = start_time.getFullYear();
      end_time = dateFormat(end_time, "d mmm");
      start_time = dateFormat(start_time, "d mmm");
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
              if (isOpen === false) this._handleSideMenuState(isOpen);
            }}
            disableGestures={true}
            menu={menu}
            menuPosition="right"
            openMenuOffset={wp("85%")}
            isOpen={this.state.sidemenustate}
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
                <View style={{}}>
                  <Button
                    iconLeft
                    transparent
                    onPress={() => this.props.navigation.goBack()}
                    style={{ justifyContent: "flex-start" }}
                  >
                    <Icon
                      style={{
                        paddingLeft: 10,
                        marginRight: 20,
                        top: 25,
                        fontSize: 30,
                        color: "#fff"
                      }}
                      name="arrow-back"
                    />
                  </Button>
                  <Text style={styles.headline}>
                    Input your Snapchat {"\n"} AD Details
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
                    maximumTrackTintColor="#fff"
                    minimumTrackTintColor="#751AFF"
                  />
                </View>
                <Text style={styles.subHeadings}>Duration</Text>

                <TouchableHighlight
                  underlayColor="rgba(0,0,0,0.2)"
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
                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        textAlign: "center"
                      }}
                    >
                      <Text style={[styles.categories, { fontSize: 16 }]}>
                        Start
                      </Text>
                      {this.state.campaignInfo.start_time !== "" && (
                        <Text style={styles.numbers}>
                          {start_time}
                          {"\n"}
                          <Text style={[styles.numbers, { fontSize: 12 }]}>
                            {start_year}
                          </Text>
                        </Text>
                      )}
                    </View>

                    <Text style={[styles.categories, { fontSize: 16 }]}>
                      To
                    </Text>

                    <View
                      style={{
                        flexDirection: "column"
                      }}
                    >
                      <Text style={[styles.categories, { fontSize: 16 }]}>
                        End
                      </Text>

                      {this.state.campaignInfo.end_time !== "" && (
                        <Text style={styles.numbers}>
                          {end_time}
                          {"\n"}
                          <Text style={[styles.numbers, { fontSize: 12 }]}>
                            {end_year}
                          </Text>
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableHighlight>
                <View
                  style={{
                    flexDirection: "row"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column"
                    }}
                  >
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
                        this._renderSideMenu("selectors", "countries");
                      }}
                    >
                      <Text> Country</Text>
                    </Button>
                  </View>
                  <View
                    style={{
                      flexDirection: "column"
                    }}
                  >
                    <Button
                      onPress={() => {
                        this._renderSideMenu("regions");
                      }}
                    >
                      <Text> Regions</Text>
                    </Button>
                    <Button
                      onPress={() => {
                        this._renderSideMenu("languages");
                      }}
                    >
                      <Text> Language</Text>
                    </Button>
                    <Button
                      onPress={() => {
                        this._renderSideMenu("selectors", "interests");
                      }}
                    >
                      <Text> Interests</Text>
                    </Button>
                  </View>
                </View>
              </View>

              <ReachBar
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
