import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Image, ScrollView, BackHandler } from "react-native";
import { Card, Button, Text, Container } from "native-base";
import { LinearGradient, Segment } from "expo";
import * as actionCreators from "../../../store/actions";
import HTMLView from "react-native-htmlview";
import { terms, secondTerms } from "./SnapchatTerms";

// Style
import styles, { htmlStyles } from "./styles";
import { colors } from "../../GradiantColors/colors";
import { ActivityIndicator } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../Global Styles";

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
    Segment.screen("Create Snap Ad Account Screen");
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
    const htmlContent = `<p><a href="http://jsdf.co">&hearts; nice job!</a></p>`;

    const Slide = ({ title }) => (
      <View style={styles.slide}>
        <Image
          style={{
            height: 250,
            width: 250
          }}
          source={require("../../../assets/images/tutorial/inst01.png")}
          resizeMode="contain"
        />
      </View>
    );

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
        <Card padder style={styles.mainCard}>
          <Text style={styles.text}>Terms And Conditions</Text>
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (this.isCloseToBottom(nativeEvent)) {
                this.setState({ accept: true });
              }
            }}
            scrollEventThrottle={400}
            contentContainerStyle={{
              // height: heightPercentageToDP("100%")
              // flex: 1
              paddingBottom: 50
            }}
            style={{
              height: heightPercentageToDP(40)
            }}
          >
            <View
              style={{
                width: widthPercentageToDP(85),
                alignSelf: "center"
              }}
            >
              <HTMLView value={terms} stylesheet={htmlStyles} />
              <HTMLView value={secondTerms} stylesheet={htmlStyles} />
            </View>
          </ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: 10
            }}
          >
            {this.props.loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Button
                block
                dark
                // disabled={!this.state.accept}
                style={[
                  styles.button,
                  {
                    backgroundColor: "#5F5F5F"
                  }
                ]}
                onPress={() => {
                  this.props.create_snapchat_ad_account(
                    this.props.mainBusiness.businessid,
                    this.props.navigation
                  );
                }}
              >
                <Text style={styles.buttontext}>Accept</Text>
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
