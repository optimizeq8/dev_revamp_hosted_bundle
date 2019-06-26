import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import styles from "../styles";
import GlobalStyles from "../../../../GlobalStyles";
import PlaceholderLine from "../../../MiniComponents/PlaceholderLine";
import formatNumber from "../../../formatNumber";
class Box extends Component {
  render() {
    let { info, title, dollar } = this.props;
    return (
      <View style={styles.boxStats}>
        <Text style={styles.stats}>{title}</Text>
        {this.props.loadingCampaignStats || (!info && info !== 0) ? (
          <PlaceholderLine />
        ) : (
          <Text style={[GlobalStyles.numbers, { fontSize: 23 }]}>
            {formatNumber(info.toFixed(dollar ? 2 : 0), !dollar)}
          </Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loadingCampaignStats: state.dashboard.loadingCampaignStats
});
export default connect(
  mapStateToProps,
  null
)(Box);
