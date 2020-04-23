import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  BackHandler,
  Text,
  Image,
  ScrollView
} from "react-native";

import { SafeAreaView } from "react-navigation";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";
import BackIcon from "../../../assets/SVGs/BackButton";
import InstagramIcon from "../../../assets/SVGs/InstagarmBlackBg";
import WhatsApp from "../../../assets/SVGs/WhatsappBlackBg";
import PhoneIcon from "../../../assets/SVGs/PhoneBlackBackground";

// Style
import styles from "./styles";
import RegisterForm from "./RegisterForm";
import ProductSelect from "./ProductSelect";
import segmentEventTrack from "../../segmentEventTrack";
const regsiterSteps = [
  {
    id: 1,
    name: "Details"
  },
  {
    id: 2,
    name: "Products"
  },
  {
    id: 3,
    name: "Done"
  }
];
class OptimizeWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 2
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    if (this.state.activeStep === 1) {
      segmentEventTrack(
        "Back button pressed on Website Registration Detail screen"
      );
    } else {
      segmentEventTrack(
        "Back button pressed on Website Registration Product Select screen"
      );
    }

    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    Segment.screen("Website Registration Detail");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  submitNextStep = activeStep => {
    this.setState({
      activeStep
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeStep === 1 && this.state.activeStep === 2) {
      Segment.screen("Website Registration Product Select");
    }
  }

  render() {
    const { translate } = this.props.screenProps;
    const { activeStep } = this.state;
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <View style={styles.headerCardView}>
          <TouchableOpacity onPress={this.handleBackPress}>
            <BackIcon stroke={"#4CA2E0"} width={25} />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {activeStep === 1 && translate("WEBSITE REGISTRATION")}
            {activeStep === 2 && translate("Add Products")}
          </Text>
          <View style={styles.badgeView}>
            {regsiterSteps.map(step => {
              return (
                <>
                  <View key={step.id} style={styles.badgeViewInner}>
                    <View
                      style={[
                        styles.stepNoView,
                        activeStep === step.id && styles.activeStepView
                      ]}
                    >
                      <Text
                        style={[
                          styles.stepNoText,
                          activeStep === step.id && styles.activeStepText
                        ]}
                      >
                        {step.id}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.stepNameText,
                        activeStep === step.id && styles.activeStepText
                      ]}
                    >
                      {step.name}
                    </Text>
                  </View>
                  {step.id !== 3 && <View style={styles.horzintalLine} />}
                </>
              );
            })}
          </View>
        </View>
        <OnlineStoreHome style={styles.onlineStoreHomeIcon} />

        <ScrollView
          contentContainerStyle={[activeStep === 2 && styles.step2OuterView]}
          style={[styles.outerView, activeStep === 2 && styles.step2OuterView]}
        >
          {activeStep === 1 && (
            <LinearGradient
              colors={["#9300FF", "#5600CB"]}
              locations={[0, 0.75]}
              style={styles.gradient}
            />
          )}
          {activeStep === 2 && (
            <View style={styles.livePreviewView}>
              <Text style={styles.livePreviewText}>
                {translate("Live Preview")}
              </Text>
            </View>
          )}
          <>
            {activeStep === 2 && (
              <View style={styles.previewOuterView}>
                <LinearGradient
                  colors={["#9300FF", "#5600CB"]}
                  locations={[0, 0.75]}
                  style={styles.gradient}
                />
                <Image
                  style={styles.profileIcon}
                  source={{
                    uri: this.props.businessLogo
                  }}
                />
                <Text style={styles.bsnNameText}>
                  {this.props.mainBusiness.businessname}
                </Text>
                <View style={styles.socialMediaView}>
                  <PhoneIcon width={40} styles={styles.socialMediaIcon} />

                  <InstagramIcon width={40} styles={styles.socialMediaIcon} />

                  <WhatsApp width={40} styles={styles.socialMediaIcon} />
                </View>
              </View>
            )}
            {activeStep === 1 && (
              <Text style={styles.createWebsiteText}>
                {translate(
                  "We’ll create a mini website for your business Just fill in the info below"
                )}
              </Text>
            )}
            {activeStep === 1 && (
              <RegisterForm
                screenProps={this.props.screenProps}
                submitNextStep={this.submitNextStep}
              />
            )}
            {activeStep === 2 && (
              <ProductSelect
                navigation={this.props.navigation}
                screenProps={this.props.screenProps}
              />
            )}
          </>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.account.mainBusiness,
  businessLogo: state.website.businessLogo
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(OptimizeWebsite);
