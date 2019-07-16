import React, { Component } from "react";
import { View, Image, BackHandler } from "react-native";
import * as Segment from 'expo-analytics-segment';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Text } from "native-base";
import { SafeAreaView } from "react-navigation";

// Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//styles
import styles, { colors } from "./styles";

// Icons
import ErrorIcon from "../../../assets/SVGs/Error.svg";

import LoadingScreen from "../LoadingScreen";

const imageLogo = require("../../../assets/images/logo01.png");

class ErrorComponent extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      logoImage: require("../../../assets/images/logo01.png")
    };
  }

  componentDidMount() {
    Segment.screen("Error");
    // BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  // }
  // handleBackButton() {
  //   return true;
  // }
  render() {
    if (this.props.loading) {
      return (
        <>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          />
          <LoadingScreen dash={true} top={0} />
        </>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <Image style={styles.image} source={imageLogo} resizeMode="contain" />
        <View style={styles.view}>
          <ErrorIcon width={80} height={80} />

          <Text style={styles.title}> Sorry </Text>
          <Text style={styles.errortext}>
            Oops ! There seems to be a problem . {"\n"}
            Try again in sometime.
          </Text>
          <Button
            style={styles.button}
            onPress={() => {
              this.props.dashboard
                ? this.props.clearPushToken(
                    this.props.navigation,
                    this.props.userInfo.userid
                  )
                : this.props.navigation.goBack();
            }}
          >
            <Text style={styles.buttontext}>
              {this.props.dashboard ? "Signin" : "Go Back"}
            </Text>
          </Button>
          <Button
            style={styles.whitebutton}
            onPress={() => {
              this.props.dashboard
                ? this.props.navigation.navigate("Invitation")
                : this.props.navigation.navigate("Dashboard");
            }}
          >
            <Text style={styles.whitebuttontext}>
              {this.props.dashboard ? "Reload" : "Home"}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo
});
const mapDispatchToProps = dispatch => ({
  clearPushToken: (navigation, userid) =>
    dispatch(actionCreators.clearPushToken(navigation, userid))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorComponent);
