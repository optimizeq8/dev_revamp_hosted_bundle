import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  I18nManager,
} from "react-native";
import { Icon } from "native-base";
import isNull from "lodash/isNull";
import { RFValue } from "react-native-responsive-fontsize";
//Icons
import InterestsIcon from "../../../assets/SVGs/Interests";
import PlusCircle from "../../../assets/SVGs/PlusCircle";

//Styles
import styles from "./styles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import Picker from "../Picker";
import LowerButton from "../LowerButton";
import GradientButton from "../GradientButton";
import { globalColors } from "../../../GlobalStyles";
import {
  PowerTranslator,
  ProviderTypes,
  TranslatorConfiguration,
  TranslatorFactory,
} from "react-native-power-translator";

TranslatorConfiguration.setConfig(
  ProviderTypes.Google,
  "AIzaSyCPCME2BWXM3bRzNdvrGHAvnOxB3np3c_Q",
  "en"
);
const translator = TranslatorFactory.createTranslator();
class SelectInterests extends Component {
  state = { interests: null, customInterests: null, open: false };
  timeout = 0;
  async componentDidMount() {
    this.props.get_interests_instagram();
    const { translate } = this.props.screenProps;

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
      }
      // else {
      //   customInterests =
      //     this.props.customInterests &&
      //     Object.keys(this.props.customInterests).map((interest) => {
      //       return {
      //         id: interest,
      //         name: interest,
      //         subcat: [...this.props.customInterests[interest]],
      //       };
      //     });
      //   if (
      //     this.props.data &&
      //     this.props.data.hasOwnProperty("customInterestObjects") &&
      //     this.props.data.customInterestObjects
      //   ) {
      //     customInterests[0].subcat = customInterests[0].subcat.concat(
      //       this.props.data.customInterestObjects
      //     );
      //   }
      //   this.setState({ customInterests });
      // }
      else {
        TranslatorConfiguration.setConfig(
          ProviderTypes.Google,
          "AIzaSyCPCME2BWXM3bRzNdvrGHAvnOxB3np3c_Q",
          I18nManager.isRTL ? "ar" : "en"
        );
        let translator2 = TranslatorFactory.createTranslator();

        customInterests =
          this.props.customInterests &&
          //Had to use Promise.all because the translation function returns a promise and
          // using an async function in a .map() returns a promise so I had wrap both loops in Promise.all
          (await Promise.all(
            Object.keys(this.props.customInterests).map(async (interest) => {
              let interestsInArabic = await Promise.all(
                this.props.customInterests[interest] // only showing 25 interests to not overuse the translation api
                  .slice(
                    0,
                    this.props.customInterests[interest].length >= 25
                      ? 25
                      : this.props.customInterests[interest].length - 1
                  )
                  .map(async (inter) => {
                    let arabicInter = await translator2.translate(inter.name);
                    inter = { ...inter, name: arabicInter };
                    return inter;
                  })
              );
              return {
                id: interest,
                name: translate(interest),
                subcat: [...interestsInArabic],
              };
            })
          ));
        if (
          this.props.data &&
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
  async componentDidUpdate(prevProps) {
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
      }
      // else {
      //   customInterests =
      //     this.props.customInterests &&
      //     Object.keys(this.props.customInterests).map((interest) => {
      //       return {
      //         id: interest,
      //         name: interest,
      //         subcat: [...this.props.customInterests[interest]],
      //       };
      //     });
      //   if (
      //     this.props.data &&
      //     this.props.data.hasOwnProperty("customInterestObjects")
      //   ) {
      //     customInterests[0].subcat = customInterests[0].subcat.concat(
      //       this.props.data.customInterestObjects
      //     );
      //   }
      //   this.setState({ customInterests });
      // }
      else {
        TranslatorConfiguration.setConfig(
          ProviderTypes.Google,
          "AIzaSyCPCME2BWXM3bRzNdvrGHAvnOxB3np3c_Q",
          I18nManager.isRTL ? "ar" : "en"
        );
        let translator2 = TranslatorFactory.createTranslator();

        customInterests =
          this.props.customInterests &&
          (await Promise.all(
            Object.keys(this.props.customInterests).map(async (interest) => {
              let interestsInArabic = await Promise.all(
                this.props.customInterests[interest]
                  .slice(
                    0,
                    this.props.customInterests[interest].length >= 25
                      ? 25
                      : this.props.customInterests[interest].length - 1
                  )
                  .map(async (inter) => {
                    let arabicInter = await translator2.translate(inter.name);
                    inter = { ...inter, name: arabicInter };
                    return inter;
                  })
              );
              return {
                id: interest,
                name: translate(interest),
                subcat: [...interestsInArabic],
              };
            })
          ));
        if (
          this.props.data &&
          this.props.data.hasOwnProperty("customInterestObjects")
        ) {
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
    event = event.nativeEvent.text;
    translator.translate(event).then((translated) => {
      //Do something with the translated text
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.props.get_custom_interests_instagram(translated.replace(" ", "_"));
      }, 200);
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          <InterestsIcon
            width={RFValue(50, 414)}
            height={RFValue(50, 414)}
            fill={globalColors.rum}
          />
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
                <PlusCircle
                  width={RFValue(26.5, 414)}
                  height={RFValue(26.5, 414)}
                />
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
                  style={{ color: "#fff", fontSize: RFValue(12, 414) }}
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
                customInterestsLoading={this.props.customInterestsLoading}
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
  customInterestsLoading: state.instagramAds.customInterestsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  get_interests_instagram: () =>
    dispatch(actionCreators.get_interests_instagram()),
  get_custom_interests_instagram: (keyword) =>
    dispatch(actionCreators.get_custom_interests_instagram(keyword)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SelectInterests);
