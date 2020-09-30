import React, { Component } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Text, Icon } from "native-base";
import { SafeAreaView } from "react-navigation";
import isNull from "lodash/isNull";
//Icons
import BackButton from "../../MiniComponents/BackButton";
import InterestsIcon from "../../../assets/SVGs/Interests";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark";
import PlusCircle from "../../../assets/SVGs/PlusCircle";

//Styles
import styles from "./styles";
import SectionStyle, { colors } from "./SectionStyle";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import Picker from "../Picker";
import LowerButton from "../LowerButton";
import GradientButton from "../GradientButton";
import { globalColors } from "../../../GlobalStyles";

class SelectInterests extends Component {
  state = { interests: null, customInterests: null, open: false };
  componentDidMount() {
    this.props.get_interests_instagram();

    if (this.props.interests) {
      let interests = [];
      if (this.props.interests.length === 0) {
        this.setState({ interests: [] });
      } else {
        interests =
          this.props.interests &&
          Object.keys(this.props.interests).map((interest) => {
            return {
              id: interest,
              name: interest,
              subcat: [...this.props.interests[interest]],
            };
          });

        this.setState({ interests });
      }
    }
    if (this.props.customInterests) {
      let customInterests = [];
      if (
        this.props.customInterests.length === 0 ||
        this.props.customInterests.Interests.length === 0
      ) {
        this.setState({ customInterests: [] });
      } else {
        customInterests =
          this.props.customInterests &&
          Object.keys(this.props.customInterests).map((interest) => {
            return {
              id: interest,
              name: interest,
              subcat: [...this.props.customInterests[interest]],
            };
          });
        if (
          this.props.data.hasOwnProperty("customInterestObjects") &&
          this.props.data.customInterestObjects
        ) {
          customInterests[0].subcat = customInterests[0].subcat.concat(
            this.props.data.customInterestObjects
          );
        }
        this.setState({ customInterests });
      }
    }
    this.setState({
      filteredCountreis: this.props.countries,
      selectedItems: this.props.selectedItems,
      selectedDevices: this.props.selectedDevices,
    });
  }
  componentDidUpdate(prevProps) {
    const { translate } = this.props.screenProps;

    if (this.props.interests && prevProps.interests !== this.props.interests) {
      let interests = [];
      if (this.props.interests.length === 0) {
        this.setState({ interests: [] });
      } else {
        interests =
          this.props.interests &&
          Object.keys(this.props.interests).map((interest) => {
            return {
              id: interest,
              name: interest,
              subcat: [...this.props.interests[interest]],
            };
          });

        this.setState({ interests });
      }
    }
    if (
      this.props.customInterests &&
      prevProps.customInterests !== this.props.customInterests
    ) {
      let customInterests = [];
      if (
        this.props.customInterests.length === 0 ||
        this.props.customInterests.Interests.length === 0
      ) {
        this.setState({ customInterests: [] });
      } else {
        customInterests =
          this.props.customInterests &&
          Object.keys(this.props.customInterests).map((interest) => {
            return {
              id: interest,
              name: interest,
              subcat: [...this.props.customInterests[interest]],
            };
          });
        if (this.props.data.hasOwnProperty("customInterestObjects")) {
          customInterests[0].subcat = customInterests[0].subcat.concat(
            this.props.data.customInterestObjects
          );
        }
        this.setState({ customInterests });
      }
    }
  }
  handleSideMenu = () => {
    this.props._handleSideMenuState(false);
  };
  handleCustomInterests = (event) => {
    this.props.get_custom_interests_instagram(event.replace(" ", "_"));
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          <InterestsIcon width={100} height={100} fill={globalColors.rum} />
          <Text style={styles.title}> {translate("Select Interests")}</Text>
          <Text style={styles.subHeadings}>
            {translate("Choose Interests that best describe your audience")}
          </Text>

          <View style={styles.slidercontainer}>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <GradientButton
                style={[
                  styles.toggleSelectorButton,
                  {
                    opacity: this.props.country_code === "" ? 0.5 : 1,
                  },
                ]}
                onPressAction={() => this.setState({ open: true })}
              >
                <PlusCircle width={53} height={53} />
              </GradientButton>
              <GradientButton
                style={[
                  styles.toggleSelectorButton,
                  {
                    opacity: this.props.country_code === "" ? 0.5 : 1,
                  },
                ]}
                onPressAction={() => this.setState({ open2: true })}
              >
                <Icon
                  style={{ color: "#fff" }}
                  name="edit"
                  type="MaterialIcons"
                />
              </GradientButton>
            </View>
            {this.props.selectedItems.length > 0 && (
              <Text style={styles.interestSection}>
                {translate("Pre-defined interests")}
              </Text>
            )}
            <ScrollView>
              <Picker
                showDropDowns={true}
                readOnlyHeadings={true}
                screenProps={this.props.screenProps}
                searchPlaceholderText={translate("Search Interests")}
                data={this.state.interests}
                uniqueKey={"id"}
                displayKey={"name"}
                subKey="subcat"
                selectChildren={true}
                open={this.state.open}
                onSelectedItemsChange={this.props.onSelectedItemsChange}
                onSelectedItemObjectsChange={
                  this.props.onSelectedItemObjectsChange
                }
                showIcon={false}
                selectedItems={this.props.selectedItems}
                single={false}
                screenName={"Select Interests"}
                customColors={{
                  chipColor: globalColors.rum,
                }}
                closeCategoryModal={() => this.setState({ open: false })}
              />
            </ScrollView>
            {this.props.selectedCustomInterests.length > 0 && (
              <Text style={styles.interestSection}>
                {translate("Custom interests")}
              </Text>
            )}
            <ScrollView>
              <Picker
                showDropDowns={false}
                readOnlyHeadings={true}
                screenProps={this.props.screenProps}
                searchPlaceholderText={translate("Search for custom Interests")}
                data={this.state.customInterests}
                uniqueKey={"id"}
                displayKey={"name"}
                subKey="subcat"
                selectChildren={true}
                open={this.state.open2}
                onSelectedItemsChange={this.props.onSelectedItemsChange}
                onSelectedItemObjectsChange={
                  this.props.onSelectedItemObjectsChange
                }
                showIcon={false}
                selectedItems={this.props.selectedCustomInterests}
                single={false}
                screenName={"Select Interests"}
                customColors={{
                  chipColor: globalColors.rum,
                }}
                closeCategoryModal={() => this.setState({ open2: false })}
                customSearch={this.handleCustomInterests}
              />
            </ScrollView>
            {isNull(this.state.interests) && (
              <ActivityIndicator color={globalColors.rum} size="large" />
            )}
          </View>
        </View>
        <LowerButton
          screenProps={this.props.screenProps}
          checkmark={true}
          style={styles.button}
          purpleViolet
          function={() => this.handleSideMenu()}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  mainBusiness: state.account.mainBusiness,
  interests: state.instagramAds.interests,
  customInterests: state.instagramAds.customInterests,
  data: state.instagramAds.data,
});

const mapDispatchToProps = (dispatch) => ({
  get_interests_instagram: () =>
    dispatch(actionCreators.get_interests_instagram()),
  get_custom_interests_instagram: (keyword) =>
    dispatch(actionCreators.get_custom_interests_instagram(keyword)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectInterests);
