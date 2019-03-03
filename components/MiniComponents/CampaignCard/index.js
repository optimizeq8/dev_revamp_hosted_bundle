import React, { Component } from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";
import styles, { colors } from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

class CampaignCard extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.getCampaign(this.props.campaign.campaign_id);
          this.props.navigation.push("CampaignDetails");
        }}
        style={styles.campaignButton}
      >
        <Icon type="MaterialCommunityIcons" name="web" style={styles.icon} />
        <View style={styles.textcontainer}>
          <Text style={[styles.titletext]}>{this.props.campaign.name}</Text>
          <Text style={[styles.subtext]}>{this.props.campaign.status}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCampaign: id => dispatch(actionCreators.getCampaign(id))
});
export default connect(
  null,
  mapDispatchToProps
)(CampaignCard);
