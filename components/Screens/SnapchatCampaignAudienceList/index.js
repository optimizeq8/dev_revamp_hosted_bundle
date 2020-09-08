import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";

// Components
import Header from "../../MiniComponents/Header";

import { globalColors } from "../../../GlobalStyles";

// ICONS
import PenIcon from "../../../assets/SVGs/Pen";
import TrashIcon from "../../../assets/SVGs/Bin.svg";
import GradientButton from "../../MiniComponents/GradientButton";

import { heightPercentageToDP } from "react-native-responsive-screen";

// STYLES
import styles from "./styles";

export default class SnapchatCampaignAudience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_audience_id: 1,
    };
  }
  renderCard = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.name}
        style={[
          styles.cardView,
          this.state.selected_audience_id === item.audience_id &&
            styles.activeCardView,
        ]}
        onPress={() => {
          this.setState({
            selected_audience_id: item.audience_id,
          });
        }}
      >
        <Text style={styles.audienceName}>{item.name}</Text>

        <View style={styles.flexAddEdit}>
          <TouchableOpacity
            style={styles.editAudienceIcon}
            onPress={() => {
              this.props.navigation.navigate("SnapchatAudienceTagetting", {
                editAudience: true,
              });
            }}
          >
            <PenIcon width={20} height={20} fill={globalColors.purple} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteAudienceIcon}>
            <TrashIcon width={20} height={20} fill={globalColors.purple} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.campaignAudienceListOuterView}>
        <SafeAreaView forceInset={{ top: "always", bottom: "never" }} />
        <Header
          title={"Audience"}
          screenProps={this.props.screenProps}
          titleStyle={{ color: globalColors.purple }}
          navigation={this.props.navigation}
          iconColor={globalColors.purple}
          showTopRightButton={true}
          topRightButtonText={"Create"}
          topRightButtonFunction={() => {
            this.props.navigation.navigate("SnapchatAudienceTagetting");
          }}
        />

        <FlatList
          data={[
            { name: "KWT-GRP 01", audience_id: 1 },
            { name: "KSA-GRP 01", audience_id: 2 },
            { name: "BH-GRP 01", audience_id: 3 },
          ]}
          renderItem={this.renderCard}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{
            minHeight: heightPercentageToDP(50),
            flex: 0,
          }}
        />
      </View>
    );
  }
}
