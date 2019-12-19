import React, { Component } from "react";
import { View, Image, ScrollView, BackHandler } from "react-native";
import { Card, Button, Text, Container } from "native-base";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import HTMLView from "react-native-htmlview";
import { ActivityIndicator } from "react-native-paper";
import { terms, secondTerms } from "../../Data/terms.google.data";
import CustomHeader from "../../MiniComponents/Header";
import GoogleAd from "../../../assets/SVGs/GoogleAds";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";

// Style
import styles, { htmlStyles } from "./styles";
import { colors } from "../../GradiantColors/colors";

class GoogleCreateAdAcc extends Component {
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
  }

  componentDidUpdate(prevProps) {}

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
    return (
      <SafeAreaView
        style={{
          height: "100%",
          flex: 1,
          backgroundColor: "#0000"
        }}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            // Segment.screenWithProperties("Google Ad Account", {
            //   category: "Sign Up"
            // });
          }}
        />
        <Container style={styles.container}>
          <CustomHeader
            closeButton={false}
            segment={{
              str: "Dashboard",
              obj: {
                businessname: this.props.mainBusiness.businessname
              }
            }}
            navigation={this.props.navigation}
            title="Google Ads Policies"
            screenProps={this.props.screenProps}
          />
          <GoogleAd
            width={50}
            height={70}
            style={{ alignSelf: "center", margin: 15 }}
          />

          {/* <Image
            style={styles.media}
            source={require("../../../assets/images/logo01.png")}
            resizeMode="contain"
          /> */}
          <Card padder style={styles.mainCard}>
            <Text style={styles.text}>Terms And Conditions</Text>
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
                    this.props.create_google_ad_account(
                      {
                        businessid: this.props.mainBusiness.businessid
                      },
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
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  mainBusiness: state.account.mainBusiness,
  loading: state.account.loading
});

const mapDispatchToProps = dispatch => ({
  create_google_ad_account: (info, navigation) =>
    dispatch(actionCreators.create_google_ad_account(info, navigation))
});
export default connect(mapStateToProps, mapDispatchToProps)(GoogleCreateAdAcc);
