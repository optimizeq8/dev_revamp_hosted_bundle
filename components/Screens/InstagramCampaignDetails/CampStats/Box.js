import React, { Component } from "react";
import { connect } from "react-redux";
import { RFValue } from "react-native-responsive-fontsize";
import { Text, View } from "react-native";
import styles from "../styles";
import GlobalStyles from "../../../../GlobalStyles";
import PlaceholderLine from "../../../MiniComponents/PlaceholderLine";
import formatNumber from "../../../formatNumber";
class Box extends Component {
  render() {
    const { translate } = this.props.screenProps;
    let { info, title, dollar } = this.props;
    return (
      <View style={styles.boxStats}>
        <Text style={styles.stats}>{translate(title)}</Text>
        {this.props.loadingCampaignStats || (!info && info !== 0) ? (
          <PlaceholderLine />
        ) : (
          <Text
            style={[GlobalStyles.numbers, { fontSize: RFValue(11.5, 414) }]}
          >
            {formatNumber(info.toFixed(dollar ? 2 : 0), !dollar)}
          </Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingCampaignStats: state.dashboard.loadingCampaignStats,
});
export default connect(mapStateToProps, null)(Box);
