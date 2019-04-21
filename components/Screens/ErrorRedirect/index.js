import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Linking } from "expo";
//Reddux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

class ErrorRedirect extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Something went wrong... </Text>
        <Button
          style={styles.paragraph}
          title="Retry"
          onPress={() => this.props.navigation.navigate("PaymentForm")}
        />
        <Button
          style={styles.paragraph}
          title="Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  data: state.campaignC.data,
  interestsNames: state.campaignC.interestsNames
});
const mapDispatchToProps = dispatch => ({
  updateCampaignList: id => dispatch(actionCreators.updateCampaignList(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorRedirect);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25,
    marginBottom: 25
  }
});
