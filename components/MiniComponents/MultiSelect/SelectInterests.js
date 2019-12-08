import React, { Component } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Button, Text, Icon } from "native-base";
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

class SelectInterests extends Component {
  state = { interests: null, open: false };
  componentDidMount() {
    Segment.screen("Interests Options");
    !this.props.addressForm &&
      this.props.get_interests(this.props.country_code);
    this.setState({
      filteredCountreis: this.props.countries,
      selectedItems: this.props.selectedItems,
      selectedDevices: this.props.selectedDevices
    });
  }
  componentDidUpdate(prevProps) {
    const { translate } = this.props.screenProps;
    if (
      prevProps.interests !== this.props.interests &&
      !this.props.addressForm
    ) {
      let interests = [];
      if (this.props.interests.length === 0) {
        this.setState({ interests: [] });
      } else {
        interests = this.props.interests.map(interest => {
          return {
            hasChild: interest.hasChild,
            id: interest.id,
            name: translate(interest.name),
            parentId: interest.parentId,
            path: interest.path,
            source: interest.source
          };
        });
        this.setState({ interests });
      }
    }
    if (
      prevProps.country_code !== this.props.country_code &&
      !this.props.addressForm
    ) {
      this.props.get_interests(this.props.country_code);
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
              <Button
                style={[
                  styles.toggleSelectorButton,
                  {
                    opacity: this.props.country_code === "" ? 0.5 : 1
                  }
                ]}
                onPress={() => this.setState({ open: true })}
              >
                <PlusCircle width={53} height={53} />
              </Button>
              <ScrollView style={styles.scrollContainer}>
                <Picker
                  screenProps={this.props.screenProps}
                  searchPlaceholderText={translate("Search Interests")}
                  data={this.state.interests}
                  uniqueKey={"id"}
                  displayKey={"name"}
                  open={this.state.open}
                  onSelectedItemsChange={this.props.onSelectedItemsChange}
                  onSelectedItemObjectsChange={
                    this.props.onSelectedItemObjectsChange
                  }
                  selectedItems={this.props.selectedItems}
                  single={false}
                  screenName={"Select Interests"}
                  closeCategoryModal={() => this.setState({ open: false })}
                />
                {isNull(this.state.interests) && (
                  <ActivityIndicator color="#FFFF" size="large" />
                )}
              </ScrollView>
            </View>
          </View>
          <Button style={styles.button} onPress={this.handleSideMenu}>
            <CheckmarkIcon width={53} height={53} />
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  mainBusiness: state.account.mainBusiness,
  interests: state.campaignC.interests
});

const mapDispatchToProps = dispatch => ({
  get_interests: info => dispatch(actionCreators.get_interests(info))
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectInterests);
