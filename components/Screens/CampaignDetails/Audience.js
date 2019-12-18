import React from "react";
import { View } from "react-native";
import LocationIcon from "../../../assets/SVGs/Location";
import GenderIcon from "../../../assets/SVGs/Gender";
import styles from "./styles";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";
import { Text, Icon } from "native-base";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import startCase from "lodash/startCase";
import toLower from "lodash/toLower";
import globalStyles from "../../../GlobalStyles";
import LowerButton from "../../MiniComponents/LowerButton";
import NavigationService from "../../../NavigationService";
export default props => {
  let {
    translate,
    targeting,
    loading,
    langaugeNames,
    countryName,
    selectedCampaign
  } = props;
  return (
    <View style={{ alignItems: "center", width: "40%", overflow: "hidden" }}>
      <View style={styles.titleHeader}>
        <Text uppercase style={globalStyles.title}>
          {translate("Audience")}
        </Text>
        <LowerButton
          function={() =>
            NavigationService.navigate("AdDetails", {
              editCampaign: true,
              campaign: selectedCampaign
            })
          }
          width={40}
          height={40}
        />
      </View>

      <View style={styles.targetingContainer}>
        <View style={styles.categoryView}>
          <GenderIcon width={hp("3")} height={hp("3")} />
          {loading ? (
            <View style={{ margin: 5 }}>
              <PlaceholderLine />
            </View>
          ) : (
            <Text style={styles.categories}>
              {translate("Gender")}
              {"\n "}
              <Text style={styles.subtext}>
                {targeting &&
                (targeting.demographics[0].gender === "" ||
                  !targeting.demographics[0].hasOwnProperty("gender"))
                  ? translate("All")
                  : targeting &&
                    translate(
                      startCase(toLower(targeting.demographics[0].gender))
                    )}
              </Text>
            </Text>
          )}
        </View>
        <View style={styles.categoryView}>
          <Icon style={styles.icon} type="FontAwesome" name="language" />
          {loading ? (
            <View style={{ margin: 5 }}>
              <PlaceholderLine />
            </View>
          ) : (
            <Text style={styles.categories}>
              {translate("Language")}
              {"\n "}
              <Text style={styles.subtext}>
                {langaugeNames &&
                  langaugeNames.length > 0 &&
                  langaugeNames.map(language => {
                    return translate(language) + ", ";
                  })}
              </Text>
            </Text>
          )}
        </View>
        <View style={styles.categoryView}>
          <Icon
            style={styles.icon}
            type="MaterialCommunityIcons"
            name="human-male-girl"
          />

          {loading ? (
            <View style={{ margin: 5 }}>
              <PlaceholderLine />
            </View>
          ) : (
            <Text style={[styles.categories]}>
              {translate("Age range")}
              {"\n"}
              <Text style={styles.subtext}>
                {targeting && targeting.demographics[0].min_age} -{" "}
                {targeting && targeting.demographics[0].max_age}
              </Text>
            </Text>
          )}
        </View>
        <View style={styles.categoryView}>
          <LocationIcon width={hp("3")} height={hp("3")} />
          {loading && !targeting ? (
            <View style={{ margin: 5 }}>
              <PlaceholderLine />
            </View>
          ) : (
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.categories}>
                {translate("Location")} {"\n"}
                <Text style={styles.subtext}>{countryName}</Text>
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
