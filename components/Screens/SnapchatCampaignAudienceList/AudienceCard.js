import React from "react";

import { View, TouchableOpacity, Text } from "react-native";

// STYLES
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";

// ICONS
import PenIcon from "../../../assets/SVGs/Pen";
import TrashIcon from "../../../assets/SVGs/Bin.svg";

export default AudienceCard = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity
      key={item.name}
      style={[
        styles.cardView,
        props.selected_audience_id === item.id && styles.activeCardView,
      ]}
      onPress={() => {
        props.setAudienceId(item.id);
        props.navigation.navigate("AdDetails", {
          audienceSelected: true,
          campaignTargeting: item.targeting,
          source: "audience_list",
          source_action: "a_select_audience",
        });
      }}
    >
      <Text style={styles.audienceName}>{item.name}</Text>

      <View style={styles.flexAddEdit}>
        <TouchableOpacity
          style={styles.editAudienceIcon}
          onPress={() => {
            props.getAudienceDetail(item.id);
            props.navigation.navigate("SnapchatAudienceTagetting", {
              editAudience: true,
            });
          }}
        >
          <PenIcon width={20} height={20} fill={globalColors.purple} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteAudienceIcon}
          onPress={() => props.showAlert(item)}
        >
          <TrashIcon width={20} height={20} fill={globalColors.purple} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
