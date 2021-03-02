import React from "react";

import { View, TouchableOpacity, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
// STYLES
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";

// DATA
import countries from "../InstagramCampaignCreate/Feed/AdTargetting/data";
// ICONS
import PenIcon from "../../../assets/SVGs/Pen";
import TrashIcon from "../../../assets/SVGs/Bin.svg";

export default AudienceCard = (props) => {
  const { item } = props;
  const { translate } = props.screenProps;

  let countryNames = item.targeting.geo_locations.countries.map(
    (country) => country
  );
  countryNames = countries.filter((ctry) => {
    if (countryNames.includes(ctry.value)) return translate(ctry.label);
  });
  countryNames = countryNames.map((ct) => translate(ct.label));

  return (
    <View style={[styles.cardViewOut]}>
      <TouchableOpacity
        key={item.name}
        style={[
          styles.cardView,
          props.selected_audience_id === item.id && styles.activeCardView,
        ]}
        onPress={() => {
          props.setAudienceId(item.id);
          props.setSelectedAudience(item.targeting, item.coordinates);

          //   props.navigation.navigate("AdDetails", {
          //     audienceSelected: true,
          //     campaignTargeting: item.targeting,
          //     coordinates: item.coordinates,
          //     source: "audience_list",
          //     source_action: "a_select_audience",
          //   });
        }}
      >
        <Text style={styles.audienceName}>{item.name}</Text>
        <Text style={styles.countryNames}>{countryNames.join(", ")}</Text>
      </TouchableOpacity>
      <View style={styles.flexAddEdit}>
        <TouchableOpacity
          style={styles.editAudienceIcon}
          onPress={() => {
            props.getAudienceDetail(item.id);
            props.navigation.navigate("InstagramAudienceTagetting", {
              editAudience: true,
              audience_type: props.audience_type,
            });
          }}
        >
          <PenIcon
            width={RFValue(6.5, 414)}
            height={RFValue(6.5, 414)}
            fill={globalColors.purple}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteAudienceIcon}
          onPress={() => props.showAlert(item)}
        >
          <TrashIcon
            width={RFValue(6.5, 414)}
            height={RFValue(6.5, 414)}
            fill={globalColors.purple}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
