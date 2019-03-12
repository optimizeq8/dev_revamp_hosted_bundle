import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Slider,
  ScrollView
} from "react-native";
import MultiSelect from "./MultiSelect";
import { CheckBox } from "react-native-elements";
import {
  Card,
  Button,
  Content,
  Text,
  CardItem,
  Body,
  Item,
  Input,
  Container,
  Icon,
  H1,
  Badge
} from "native-base";
import { LinearGradient } from "expo";
import RadioGroup from "react-native-radio-buttons-group";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as actionCreators from "../../../../store/actions";
import country_regions from "./regions";
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";

// Style
import styles, { colors } from "./styles";

class AdDetails extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        campaign_id: "",
        lifetime_budget_micro: 50,
        targeting: {
          demographics: [
            { gender: "FEMALE", languages: ["en"], min_age: "", max_age: "" }
          ],
          geos: [{ country_code: "kw", region_id: [] }]
        }
      },
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
      value: 0
    };
  }

  async componentDidMount() {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        campaign_id: this.props.campaign_id
      }
    });
  }
  onSelectedItemsChange = selectedItems => {
    let replace = this.state.campaignInfo;
    let newCountry = selectedItems.pop();

    if (typeof newCountry !== "undefined") {
      replace.targeting.geos[0].country_code = newCountry;
      replace.targeting.geos[0].region_id = [];
      let reg = country_regions.find(
        c => c.country_code === replace.targeting.geos[0].country_code
      );
      this.setState({ campaignInfo: replace, regions: reg.regions });
    }
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

    this.setState({
      min_ageError,
      max_ageError,
      languagesError
    });
    if (!min_ageError && !max_ageError && !languagesError) {
      console.log(this.state.campaignInfo);
      var rep = { ...this.state.campaignInfo };

      rep.targeting = JSON.stringify(this.state.campaignInfo.targeting);

      this.props.ad_details(rep, this.props.navigation);
      // this.props.navigation.navigate("AdDesignReview");
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <Card
          style={[
            styles.mainCard,
            {
              margin: 0,
              shadowColor: "#fff",
              shadowRadius: 1,
              shadowOpacity: 0.7,
              shadowOffset: { width: 8, height: 8 }
            }
          ]}
        >
          <ScrollView>
            <Text style={styles.text}>Input your Snapchat AD Details</Text>
            <View style={[styles.slidercontainer, { alignSelf: "center" }]}>
              <View style={styles.textCon}>
                <Text style={styles.colorGrey}>
                  {this.state.minValueBudget} $
                </Text>
                <Text style={styles.colorYellow}>
                  {this.state.campaignInfo.lifetime_budget_micro + "$"}
                </Text>
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
            <View
              style={{
                alignSelf: "center",
                height: 50
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
                  }
                }}
              />
            </View>
            <Item
              rounded
              style={[
                styles.input,
                {
                  borderColor: this.state.min_ageError ? "red" : "#D9D9D9"
                }
              ]}
            >
              <Input
                style={styles.inputtext}
                placeholder="Minimum age limit is 13..."
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numeric"
                onChangeText={value => {
                  let rep = this.state.campaignInfo;
                  rep.targeting.demographics[0].min_age = value;
                  this.setState({
                    campaignInfo: rep
                  });
                }}
                onBlur={() => {
                  this.setState({
                    min_ageError: validateWrapper(
                      "age",
                      this.state.campaignInfo.targeting.demographics[0].min_age
                    )
                  });
                }}
              />
            </Item>
            {this.state.min_ageError && (
              <Text style={[styles.text, { paddingTop: 0 }]}>
                Min {this.state.min_ageError}{" "}
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
              <Input
                style={styles.inputtext}
                placeholder="Maximum Age"
                autoCorrect={false}
                keyboardType="numeric"
                autoCapitalize="none"
                onChangeText={value => {
                  let rep = this.state.campaignInfo;
                  rep.targeting.demographics[0].max_age = value;
                  this.setState({
                    campaignInfo: rep
                  });
                }}
                onBlur={() => {
                  this.setState({
                    max_ageError: validateWrapper(
                      "age",
                      this.state.campaignInfo.targeting.demographics[0].max_age
                    )
                  });
                }}
              />
            </Item>
            {this.state.max_ageError && (
              <Text style={[styles.text, { paddingTop: 0 }]}>
                Max {this.state.max_ageError}
              </Text>
            )}
            <MultiSelect
              countries={this.state.countries}
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
            />

            <TouchableOpacity
              onPress={this._handleSubmission}
              style={styles.buttonN}
            >
              <Image
                style={styles.image}
                source={require("../../../../assets/images/button.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </ScrollView>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id
});

const mapDispatchToProps = dispatch => ({
  ad_details: (info, navigation) =>
    dispatch(actionCreators.ad_details(info, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdDetails);
