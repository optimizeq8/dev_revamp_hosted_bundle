import React, { Component } from "react";
import { View, Image, ScrollView, BackHandler } from "react-native";
import { Card, Button, Text, Container } from "native-base";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationEvents } from "react-navigation";
import HTMLView from "react-native-htmlview";
import { ActivityIndicator } from "react-native-paper";
import { terms, secondTerms } from "../../Data/snapchatTerms.data";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

// Style
import styles, { htmlStyles } from "./styles";
import { colors } from "../../GradiantColors/colors";

class SnapchatCreateAdAcc extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      accept: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    if (this.props.mainBusiness.snap_ad_account_id) {
      this.props.navigation.navigate("Dashboard");
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.mainBusiness.snap_ad_account_id) {
      this.props.navigation.state.params.closeAnimation();
      this.props.navigation.navigate("Dashboard");
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <Container style={styles.container}>
        <NavigationEvents
          onDidFocus={() => {
            Segment.screenWithProperties("Snap Ad Account", {
              category: "Sign Up"
            });
          }}
        />
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={styles.gradient}
        />
        <Image
          style={styles.media}
          source={require("../../../assets/images/logo01.png")}
          resizeMode="contain"
        />
        <Card padder style={styles.mainCard}>
          <Text style={styles.text}>{translate("Terms & Conditions")}</Text>
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (this.isCloseToBottom(nativeEvent)) {
                this.setState({ accept: true });
              }
            }}
            scrollEventThrottle={400}
            contentContainerStyle={styles.scrollViewContentContainer}
            style={styles.scrollViewContainer}
          >
            <View style={styles.htmlContainer}>
              <HTMLView value={terms} stylesheet={htmlStyles} />
              <HTMLView value={secondTerms} stylesheet={htmlStyles} />
            </View>
          </ScrollView>
          <View style={styles.bottomContainer}>
            {this.props.loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Button
                block
                dark
                // disabled={!this.state.accept}
                style={[styles.button]}
                onPress={() => {
                  this.props.create_snapchat_ad_account(
                    this.props.mainBusiness.businessid,
                    this.props.navigation
                  );
                }}
              >
                <Text style={styles.buttontext}>{translate("Accept")}</Text>
              </Button>
            )}
          </View>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  mainBusiness: state.account.mainBusiness,
  loading: state.account.loading
});

const mapDispatchToProps = dispatch => ({
  create_snapchat_ad_account: (id, navigation) =>
    dispatch(actionCreators.create_snapchat_ad_account(id, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnapchatCreateAdAcc);
