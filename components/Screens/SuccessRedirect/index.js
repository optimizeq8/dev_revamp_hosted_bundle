import React, { Component } from "react";
import { View, Image, BackHandler } from "react-native";
import { Linking, LinearGradient, Segment } from "expo";
import { Button, Text, Container } from "native-base";
import SuccessIcon from "../../../assets/SVGs/Success.svg";

//styles
import styles, { colors } from "./styles";

//Reddux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

class SuccessRedirect extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    Segment.screen("Payment Success Screen");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    this.setState(this.props.navigation.state.params);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }
  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <Image
          style={styles.image}
          source={require("../../../assets/images/logo01.png")}
          resizeMode="contain"
        />
        <View style={styles.view}>
          <SuccessIcon width={93} height={93} />
          <Text style={styles.title}> Success! </Text>
          <Text style={styles.errortext}>Your Ad is now being processed</Text>
          <View style={styles.details}>
            <Text style={styles.text}>Payment ID: {this.state.paymentId}</Text>
            <Text style={styles.text}>Track ID: {this.state.trackID}</Text>
            <Text style={styles.text}>Amount: {this.state.amount}</Text>
            <Text style={styles.text}>Date: {this.state.date}</Text>
            <Text style={styles.text}>Status: {this.state.status}</Text>
          </View>
          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Dashboard")}
          >
            <Text style={styles.buttontext}> Home </Text>
          </Button>
        </View>
      </Container>
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