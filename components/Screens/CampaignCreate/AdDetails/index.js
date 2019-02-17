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
import MultiSelect from "react-native-multiple-select";
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
        campaign_id: "9",
        lifetime_budget_micro: 50,
        targeting: {
          demographic: [{ gender: "", languages: [], minAge: 13, maxAge: 29 }],
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
  onSelectedItemsChange = selectedItems => {
    let replace = this.state.campaignInfo;
    replace.targeting.geos[0].country_code = selectedItems.pop();
    replace.targeting.geos[0].region_id = [];
    let reg = country_regions.find(
      c => c.country_code === replace.targeting.geos[0].country_code
    );

    this.setState({ campaignInfo: replace, regions: reg.regions });
  };
  onSelectedLangsChange = selectedItems => {
    let replace = this.state.campaignInfo;
    replace.targeting.demographic[0].languages = selectedItems;
    this.setState({ campaignInfo: replace });
  };
  onSelectedGenderChange = selectedItems => {
    let replace = this.state.campaignInfo;
    replace.targeting.demographic[0].gender = selectedItems;
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
            <View style={styles.slidercontainer}>
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
                    replace.targeting.demographic[0].gender = data.value;
                  }
                }}
              />
            </View>
            <Item rounded style={styles.input}>
              <Input
                style={styles.inputtext}
                placeholder="Minimum age limit is 13..."
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={value => {
                  let rep = this.state.campaignInfo;
                  rep.targeting.demographic[0].minAge = value;
                  this.setState({
                    campaignInfo: rep
                  });
                }}
              />
            </Item>
            <Item rounded style={styles.input}>
              <Input
                style={styles.inputtext}
                placeholder="Maximum Age"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={value => {
                  let rep = this.state.campaignInfo;
                  rep.targeting.demographic[0].maxAge = value;
                  this.setState({
                    campaignInfo: rep
                  });
                }}
              />
            </Item>
            <View style={styles.slidercontainer}>
              <MultiSelect
                hideTags
                items={this.state.countries}
                uniqueKey="value"
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={[
                  this.state.campaignInfo.targeting.geos[0].country_code
                ]}
                selectText="Pick Countries"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={text => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="label"
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#CCC"
                submitButtonText="Confirm Select"
              />
            </View>

            <View style={styles.slidercontainer}>
              <MultiSelect
                hideTags
                items={this.state.languages}
                uniqueKey="value"
                onSelectedItemsChange={this.onSelectedLangsChange}
                selectedItems={
                  this.state.campaignInfo.targeting.demographic[0].languages
                }
                selectText="Pick Languages"
                searchInputPlaceholderText="Search..."
                onChangeInput={text => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="label"
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#CCC"
                submitButtonText="Confirm Select"
              />
            </View>
            <View style={styles.slidercontainer}>
              <MultiSelect
                hideTags
                items={this.state.regions}
                uniqueKey="id"
                onSelectedItemsChange={this.onSelectedRegionChange}
                selectedItems={
                  this.state.campaignInfo.targeting.geos[0].region_id
                }
                selectText="Pick Regions"
                searchInputPlaceholderText="Search..."
                onChangeInput={text => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: "#CCC" }}
                submitButtonColor="#CCC"
                submitButtonText="Confirm Select"
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                console.log(this.state.campaignInfo);
                var rep = this.state.campaignInfo;

                rep.targeting = JSON.stringify(
                  this.state.campaignInfo.targeting
                );
                this.props.ad_details(rep);
              }}
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  ad_details: info => dispatch(actionCreators.ad_details(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdDetails);
