import React, { Component } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Text, Icon } from "native-base";
import { SafeAreaView } from "react-navigation";
import isNull from "lodash/isNull";
import * as Segment from "expo-analytics-segment";
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

class SelectInterests extends Component {
  state = { interests: null, open: false };
  componentDidMount() {
    Segment.screen("Interests Options");

    this.props.get_interests_instagram();
    this.setState({
      filteredCountreis: this.props.countries,
      selectedItems: this.props.selectedItems,
      selectedDevices: this.props.selectedDevices
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
          Object.keys(this.props.interests).map(interest => {
            return {
              id: interest,
              name: interest,
              subcat: [...this.props.interests[interest]]
            };
          });

        this.setState({ interests });
      }
    }
  }
  handleSideMenu = () => {
    this.props._handleSideMenuState(false);
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <InterestsIcon width={100} height={100} fill="#fff" />
            <Text style={styles.title}> {translate("Select Interests")}</Text>
            <Text style={styles.subHeadings}>
              {translate("Choose Interests that best describe your audience")}
            </Text>

            <View style={styles.slidercontainer}>
              <GradientButton
                style={[
                  styles.toggleSelectorButton,
                  {
                    opacity: this.props.country_code === "" ? 0.5 : 1
                  }
                ]}
                onPressAction={() => this.setState({ open: true })}
              >
                <PlusCircle width={53} height={53} />
              </GradientButton>
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
                closeCategoryModal={() => this.setState({ open: false })}
              />
              {isNull(this.state.interests) && (
                <ActivityIndicator color="#FFFF" size="large" />
              )}
            </View>
          </View>
          <LowerButton
            checkmark={true}
            style={styles.button}
            function={() => this.handleSideMenu()}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  campaign_id: state.instagramAds.campaign_id,
  mainBusiness: state.account.mainBusiness,
  interests: state.instagramAds.interests
});

const mapDispatchToProps = dispatch => ({
  get_interests_instagram: () =>
    dispatch(actionCreators.get_interests_instagram())
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectInterests);
