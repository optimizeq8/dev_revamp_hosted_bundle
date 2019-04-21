import React, { Component } from "react";
import { View, Image } from "react-native";
import { Linking, LinearGradient } from "expo";
import { Button, Text, Container } from "native-base";
import SuccessIcon from "../../../assets/SVGs/Success.svg";

//styles
import styles, { colors } from "./styles";

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
            <Text style={styles.text}>payment ID: {this.state.paymentId}</Text>
            <Text style={styles.text}>track ID: {this.state.trackID}</Text>
            <Text style={styles.text}>amount: {this.state.amount}</Text>
            <Text style={styles.text}>date: {this.state.paymentId}</Text>
            <Text style={styles.text}>status: {this.state.status}</Text>
          </View>
          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Home")}
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
