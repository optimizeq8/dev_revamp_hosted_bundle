import React, { Component } from "react";
import { View, TouchableOpacity, BackHandler, Text } from "react-native";

import { SafeAreaView } from "react-navigation";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";
import BackIcon from "../../../assets/SVGs/BackButton";
// Style
import styles from "./styles";
import RegisterForm from "./RegisterForm";
import ProductSelect from "./ProductSelect";
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
      activeStep: 1
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    // Segment.screenWithProperties("Personal Info", {
    //   category: "User Menu"
    // });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  submitNextStep = activeStep => {
    this.setState({
      activeStep
    });
  };

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
        <View style={styles.outerView}>
          <LinearGradient
            colors={["#9300FF", "#5600CB"]}
            locations={[0, 0.75]}
            style={styles.gradient}
          />
          <Text style={styles.createWebsiteText}>
            {activeStep === 1
              ? translate(
                  "We’ll create a mini website for your business Just fill in the info below"
                )
              : translate(
                  "These are the products that will show on your website Tap to remove products"
                )}
          </Text>
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
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  loadingUpdateInfo: state.auth.loadingUpdateInfo
});

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (info, navigation) =>
    dispatch(actionCreators.updateUserInfo(info, navigation))
});
export default connect(mapStateToProps, mapDispatchToProps)(OptimizeWebsite);
