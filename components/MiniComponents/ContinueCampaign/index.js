import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import * as actionCreators from "../../../store/actions";
import {
  SafeAreaView,
  NavigationActions,
  StackActions
} from "react-navigation";
import CustomHeader from "../Header";
import ExclamationIcon from "../../../assets/SVGs/ExclamationMark";
import LowerButton from "../LowerButton";
import { persistor } from "../../../store/";
import styles from "./styles";
class ContinueCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }
  componentDidMount() {
    if (this.props.incompleteCampaign && !this.props.campaignProgressStarted)
      this.continueCampaign();
  }
  navigateToContinue = () => {
    let tempAdType = this.props.navigation.getParam("tempAdType");
    let continueRoutes = this.props.currentCampaignSteps.map(route =>
      NavigationActions.navigate({
        routeName: route,
        params: {
          tempAdType
        }
      })
    );
    resetAction = StackActions.reset({
      index: continueRoutes.length - 1,
      actions: continueRoutes
    });

    this.props.navigation.dispatch(resetAction);
  };
  setModalVisible = (isVisible, resetCampaign) => {
    this.setState({ isVisible });
    let tempAdType =
      this.props.navigation.getParam("tempAdType") || this.props.tempAdType;
    if (resetCampaign) {
      this.props.resetCampaignInfo(!resetCampaign);
      this.props.set_adType(tempAdType);
      persistor.purge();
    }
  };
  continueCampaign = () => {
    if (this.props.incompleteCampaign) {
      setTimeout(() => {
        this.setState({ isVisible: true });
      }, 800);
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <Modal
        style={{ margin: 0 }}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={this.state.isVisible}
      >
        <BlurView intensity={95} tint="dark">
          <SafeAreaView
            style={styles.safeAreaView}
            forceInset={{ bottom: "never", top: "always" }}
          >
            <View style={styles.popupOverlay}>
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={true}
                actionButton={() => {
                  this.setModalVisible(false, false);
                }}
                title={"Continue campaign"}
              />
              <View
                style={{
                  flex: 0.8,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <ExclamationIcon style={{ alignSelf: "center" }} />
                <Text
                  style={[
                    styles.text,
                    {
                      fontFamily: "montserrat-regular",
                      width: 250
                    }
                  ]}
                >
                  {translate(
                    "A campaign creation process was in progress, would you like to continue?"
                  )}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  justifyContent: "center"
                }}
              >
                <LowerButton
                  cross={true}
                  bottom={4}
                  function={() => this.setModalVisible(false, true)}
                />
                <LowerButton
                  bottom={4}
                  // function={() => this.props.navigation.push("AdDesign")}
                  function={() => {
                    this.navigateToContinue();
                    this.setModalVisible(false, false);
                    this.props.setCampaignInProgress(true);
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </BlurView>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  adType: state.campaignC.adType,
  data: state.campaignC.data,
  incompleteCampaign: state.campaignC.incompleteCampaign,
  campaignProgressStarted: state.campaignC.campaignProgressStarted,
  currentCampaignSteps: state.campaignC.currentCampaignSteps,
  mainBusiness: state.account.mainBusiness
});

const mapDispatchToProps = dispatch => ({
  resetCampaignInfo: resetAdType =>
    dispatch(actionCreators.resetCampaignInfo(resetAdType)),
  setCampaignInProgress: value =>
    dispatch(actionCreators.setCampaignInProgress(value)),

  set_adType: value => dispatch(actionCreators.set_adType(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContinueCampaign);
