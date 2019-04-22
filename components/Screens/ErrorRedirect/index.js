import React, { Component } from "react";
import { View, Image } from "react-native";
import { Linking, LinearGradient } from "expo";
import { Button, Text, Container } from "native-base";
import ErrorIcon from "../../../assets/SVGs/Error.svg";

//styles
import styles, { colors } from "./styles";

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
          <ErrorIcon width={93} height={93} />

          <Text style={styles.title}> Sorry </Text>
          <Text style={styles.errortext}>
            There seems to be a problem with {"\n"}
            your payment method
          </Text>
          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate("PaymentForm")}
          >
            <Text style={styles.buttontext}> Retry </Text>
          </Button>
          <Button
            style={styles.whitebutton}
            onPress={() => this.props.navigation.navigate("Dashboard")}
          >
            <Text style={styles.whitebuttontext}> Home </Text>
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
)(ErrorRedirect);
