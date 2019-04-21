import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Linking } from "expo";
//Reddux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

class SuccessRedirect extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.setState(this.props.navigation.state.params);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>paymentId: {this.state.paymentId}</Text>
        <Text>trackID:{this.state.trackID}</Text>
        <Text>amount:{this.state.amount}</Text>
        <Text>date:{this.state.paymentId}</Text>
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
)(SuccessRedirect);

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
