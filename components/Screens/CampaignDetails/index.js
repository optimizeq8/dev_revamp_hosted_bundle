import React, { Component } from "react";
import { connect } from "react-redux";

import {
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Modal
} from "react-native";
import {
  Card,
  Button,
  Content,
  Text,
  CardItem,
  Body,
  Item,
  Input,
  Container,
  Icon,
  H1,
  Thumbnail,
  Spinner
} from "native-base";
import dateFormat from "dateformat";
import Loading from "../../MiniComponents/LoadingScreen";

import * as actionCreators from "../../../store/actions";
import { Video, LinearGradient, BlurView, Segment } from "expo";
import { interestNames } from "./interesetNames";
import Chart from "../../MiniComponents/CampaignDetailCharts";
import InterestIcon from "../../../assets/SVGs/Interest.svg";
import GenderIcon from "../../../assets/SVGs/Gender.svg";
import LocationIcon from "../../../assets/SVGs/Location.svg";
import PauseIcon from "../../../assets/SVGs/Pause.svg";
import CloseIcon from "../../../assets/SVGs/Close.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import Toggle from "react-native-switch-toggle";
// import { Modal } from "react-native-paper";
import LineChartGraphs from "./LineChartGraphs";
import SlidingUpPanel from "rn-sliding-up-panel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BarIcon from "../../../assets/SVGs/Bar.svg";
// Style
import styles from "./styles";
import globalStyles from "../../../Global Styles";
import { colors } from "../../GradiantColors/colors";
import { ActivityIndicator } from "react-native-paper";

const { height } = Dimensions.get("window");

class CampaignDetails extends Component {
  static defaultProps = {
    draggableRange: {
      top: hp("78"),
      bottom: hp("23")
    }
  };

  _draggedValue = new Animated.Value(0);

  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      toggle: false,
      toggleText: "",
      chartAnimation: new Animated.Value(1),
      LineAnimation: new Animated.Value(0),
      visible: true
    };
  }

  componentDidMount() {
    Segment.screenWithProperties("Campaign Details Screen", {
      campaign_id: this.props.campaign.campaign_id
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.campaign !== this.props.campaign) {
      this.setState({
        toggleText: this.props.campaign.status,
        toggle: this.props.campaign.status !== "PAUSED"
      });
    }
  }
  hideCharts = value => {
    let vl = (value / hp("100%")) * 100 + 20;
    Animated.parallel([
      Animated.timing(this.state.chartAnimation, {
        toValue: 100 - vl * 1.5,
        duration: 200
      }),
      Animated.timing(this.state.LineAnimation, {
        toValue: vl,
        duration: 200
      })
    ]).start();
  };

  handleToggle = status => {
    console.log("status", status);
    this.setState({
      toggle: status !== "PAUSED",
      modalVisible: false,
      toggleText: status
    });
  };

  updateStatus = () => {
    this.props.updateStatus(
      {
        campaign_id: this.props.campaign.campaign_id,
        spends: this.props.campaign.spends,
        status: this.state.toggleText === "PAUSED" ? "LIVE" : "PAUSED"
      },
      this.handleToggle
    );
  };
  render() {
    this._draggedValue.addListener(({ value }) => {
      this.hideCharts(value);
    });
    const translateYInterpolate = this.state.chartAnimation.interpolate({
      inputRange: [0, 30],
      outputRange: [100, 0]
    });
    const ScaleInterpolate = this.state.LineAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1]
    });
    const animatedStyles = {
      opacity: this.state.chartAnimation,
      transform: [
        {
          translateY: translateYInterpolate
        }
      ]
    };
    const lineAnimatedStyles = {
      opacity: this.state.LineAnimation,
      transform: [
        {
          scaleX: ScaleInterpolate
        },
        { scaleY: ScaleInterpolate }
      ]
    };

    if (this.props.loading) {
      return <Loading dash={true} />;
    } else {
      let interesetNames =
        this.props.campaign.targeting &&
        this.props.campaign.targeting.hasOwnProperty("interests")
          ? this.props.campaign.targeting.interests[0].category_id.map(
              interest => {
                if (
                  this.props.campaign.targeting.interests[0].category_id.hasOwnProperty(
                    "scls"
                  )
                ) {
                  return ` ${
                    interestNames.interests.scls.find(
                      interestObj => interestObj.id === interest
                    ).name
                  } \n`;
                } else {
                  console.log(interest);

                  return (
                    interest !== "scls" &&
                    ` ${
                      interestNames.interests.scls.find(
                        interestObj => interestObj.id === interest
                      ).name
                    } \n`
                  );
                }
              }
            )
          : [];
      let start_time = "";
      let end_year = "";
      let start_year = "";
      let end_time = "";
      if (this.props.campaign.start_time && this.props.campaign.end_time) {
        end_time = new Date(this.props.campaign.end_time.split("T")[0]);
        start_time = new Date(this.props.campaign.start_time.split("T")[0]);
        end_year = end_time.getFullYear();
        start_year = start_time.getFullYear();
        end_time = dateFormat(end_time, "d mmm");
        start_time = dateFormat(start_time, "d mmm");
      }
      return (
        <>
          {this.props.campaign.media.includes(".mov") && (
            <View style={[styles.backgroundViewWrapper]}>
              <Video
                source={{
                  uri: "http://" + this.props.campaign.media
                }}
                isMuted
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            </View>
          )}
          <ImageBackground
            source={{
              uri: "http://" + this.props.campaign.media
            }}
            style={{
              width: "100%",
              height: "100%"
            }}
          >
            <Container style={styles.container}>
              <CloseIcon
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                style={globalStyles.backButton}
              />

              <Text
                onPress={() =>
                  this.props.navigation.push("AdDetails", {
                    editCampaign: true,
                    campaign: this.props.campaign
                  })
                }
                style={[
                  styles.subtext,
                  {
                    position: "absolute",
                    left: wp(85),
                    top: hp(10),
                    fontFamily: "montserrat-regular"
                  }
                ]}
              >
                Edit
              </Text>
              <Card padder style={styles.mainCard}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/images/snap-ghost.png")}
                  resizeMode="contain"
                />
                <Text style={styles.title}>{this.props.campaign.name}</Text>
                <View>
                  <View padder style={styles.toggleSpace}>
                    <View style={{ alignSelf: "center" }}>
                      {this.props.campaign && (
                        <Toggle
                          buttonTextStyle={{
                            fontFamily: "montserrat-medium",
                            fontSize: wp("2.7"),
                            color: "#fff",
                            top: 7,
                            textAlign: "center"
                          }}
                          buttonText={
                            this.state.toggleText !== "PAUSED"
                              ? "LIVE"
                              : "PAUSED"
                          }
                          containerStyle={styles.toggleStyle}
                          switchOn={this.state.toggle}
                          onPress={() => this.setState({ modalVisible: true })}
                          backgroundColorOff="rgba(255,255,255,0.1)"
                          backgroundColorOn="rgba(255,255,255,0.1)"
                          circleColorOff="#FF9D00"
                          circleColorOn="#66D072"
                          duration={500}
                          circleStyle={{
                            width: wp("13"),
                            height: hp("3.8"),
                            borderRadius: 25
                          }}
                        />
                      )}
                      <Text
                        style={{
                          fontFamily: "montserrat-medium",
                          fontSize: 10,
                          paddingTop: 5,
                          color: "#fff",
                          textAlign: "center"
                        }}
                      >
                        Tap to pause AD
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.subHeadings}>
                  Budget{"\n"}
                  <Text
                    style={[
                      styles.numbers,
                      { fontSize: hp("3.4"), fontFamily: "montserrat-semibold" }
                    ]}
                  >
                    {this.props.campaign.lifetime_budget_micro}
                  </Text>
                  <Text style={{ color: "white" }}>$</Text>
                </Text>
                <Text style={styles.subHeadings}>Duration</Text>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <View
                    style={{
                      flexDirection: "column",
                      alignSelf: "center"
                    }}
                  >
                    <Text style={[styles.categories, { fontSize: hp("2.5") }]}>
                      Start
                    </Text>
                    <Text style={styles.numbers}>
                      {start_time}{" "}
                      <Text style={[styles.numbers, { fontSize: hp("2") }]}>
                        {start_year}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      alignSelf: "center"
                    }}
                  >
                    <Text style={[styles.categories, { fontSize: hp("2.5") }]}>
                      End
                    </Text>
                    <Text style={styles.numbers}>
                      {end_time}{" "}
                      <Text style={[styles.numbers, { fontSize: hp("2") }]}>
                        {end_year}
                      </Text>
                    </Text>
                  </View>
                </View>
                <Text style={styles.subHeadings}>Audience</Text>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <View style={{ flexDirection: "column" }}>
                    <View
                      style={{
                        flexDirection: "row"
                      }}
                    >
                      <GenderIcon width={hp("2")} height={hp("2")} />
                      <Text style={styles.categories}>
                        Gender{"\n "}
                        <Text style={styles.subtext}>
                          {this.props.campaign.targeting &&
                          (this.props.campaign.targeting.gender === "" ||
                            !this.props.campaign.targeting.hasOwnProperty(
                              "gender"
                            ))
                            ? "All"
                            : this.props.campaign.targeting &&
                              this.props.campaign.targeting.demographics[0]
                                .gender}
                        </Text>
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <Icon
                        style={styles.icon}
                        type="FontAwesome"
                        name="language"
                      />
                      <Text style={styles.categories}>
                        Languages{"\n "}
                        <Text style={styles.subtext}>
                          {this.props.campaign.targeting &&
                            this.props.campaign.targeting.demographics[0].languages.join(
                              ", "
                            )}
                        </Text>
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "center"
                      }}
                    >
                      <Icon
                        style={styles.icon}
                        type="MaterialCommunityIcons"
                        name="human-male-girl"
                      />

                      <Text style={[styles.categories]}>
                        Age range{"\n"}
                        <Text style={styles.subtext}>
                          {this.props.campaign.targeting &&
                            this.props.campaign.targeting.demographics[0]
                              .min_age}{" "}
                          -{" "}
                          {this.props.campaign.targeting &&
                            this.props.campaign.targeting.demographics[0]
                              .max_age}
                        </Text>
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <LocationIcon width={hp("2")} height={hp("2")} />
                      <Text style={styles.categories}>
                        Location(s) {"\n"}
                        {this.props.campaign.targeting &&
                          this.props.campaign.targeting.geos[0].country_code}
                      </Text>
                    </View>
                  </View>

                  {interesetNames.length > 0 && (
                    <View
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start"
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <InterestIcon width={hp("2")} height={hp("2")} />
                        <Text style={styles.categories}>Interests</Text>
                      </View>
                      <ScrollView
                        contentContainerStyle={{ paddingBottom: hp(80) }}
                      >
                        <Text style={[styles.subtext, { textAlign: "left" }]}>
                          {interesetNames}{" "}
                        </Text>
                      </ScrollView>
                    </View>
                  )}
                </View>
              </Card>
              <SlidingUpPanel
                showBackdrop={false}
                ref={c => (this._panel = c)}
                draggableRange={this.props.draggableRange}
                animatedValue={this._draggedValue}
                friction={0.4}
                onDragEnd={value => {
                  if (value > hp("50%")) {
                    this._panel.show();
                  } else {
                    this._panel.hide();
                  }
                }}
              >
                {dragHandler => (
                  <View style={styles.bottomContainer}>
                    <View style={styles.dragHandler} {...dragHandler}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          if (this.state.visible) {
                            this._panel.hide();
                            this.setState({ visible: false });
                          } else {
                            this._panel.show();
                            this.setState({ visible: true });
                          }
                        }}
                      >
                        <LinearGradient
                          colors={
                            Platform.OS === "ios"
                              ? ["#751AFF", "#751AFF"]
                              : ["#6C52FF", "#751AFF"]
                          }
                          locations={
                            Platform.OS === "ios" ? [0.2, 0.8] : [0.1, 0.9]
                          }
                          start={[0, 0.2]}
                          end={Platform.OS === "ios" ? [1, 1] : [0.1, 1]}
                          style={styles.tab}
                        >
                          <BarIcon style={styles.handlerIcon} />
                          <Text style={styles.handlerText}>Dashboard</Text>
                        </LinearGradient>
                      </TouchableWithoutFeedback>
                    </View>
                    <LinearGradient
                      colors={["#751AFF", "#6C52FF", colors.background2]}
                      locations={[0.2, 0.6, 1]}
                      start={[0.2, 0.4]}
                      end={[1, 1]}
                      style={{ borderRadius: 30, overflow: "hidden" }}
                    >
                      <Animated.View
                        style={[styles.chartPosition, animatedStyles]}
                      >
                        <TouchableOpacity onPress={() => this._panel.show()}>
                          <Chart campaign={this.props.campaign} />
                        </TouchableOpacity>
                      </Animated.View>

                      <Animated.View style={[lineAnimatedStyles]}>
                        <ScrollView contentInset={{ top: 0 }}>
                          <LineChartGraphs campaign={this.props.campaign} />
                        </ScrollView>
                      </Animated.View>
                    </LinearGradient>
                  </View>
                )}
              </SlidingUpPanel>
            </Container>
            <Modal
              animationType={"fade"}
              transparent={Platform.OS === "ios"}
              onDismiss={() => this.setState({ modalVisible: false })}
              onRequestClose={() => this.setState({ modalVisible: false })}
              visible={this.state.modalVisible}
            >
              <BlurView tint="dark" intensity={100} style={styles.BlurView}>
                <Button
                  transparent
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}
                  style={styles.btnClose}
                >
                  <CloseIcon width={20} height={20} />
                </Button>

                <PauseIcon
                  width={43}
                  height={58}
                  style={{ alignSelf: "center", marginBottom: 20 }}
                />
                <Text style={styles.title}>Ad Pause</Text>
                <Text style={[styles.subHeadings, styles.pauseDes]}>
                  Your ad will be Paused.{"\n"} You will receive the amount
                  remaining from your budget in your
                  <Text
                    style={[
                      {
                        fontFamily: "montserrat-semibold",
                        color: "#fff",
                        fontSize: 14
                      }
                    ]}
                  >
                    {" "}
                    wallet
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.numbers,
                    { fontSize: 37, fontFamily: "montserrat-semibold" }
                  ]}
                >
                  200
                  <Text
                    style={{
                      color: "white",
                      fontSize: 25,
                      fontFamily: "montserrat-semibold"
                    }}
                  >
                    $
                  </Text>
                </Text>
                <Text
                  style={[
                    styles.subHeadings,
                    { fontFamily: "montserrat-regular", fontSize: 14 }
                  ]}
                >
                  Will be added to your wallet If the Ad has been paused for 3
                  Days
                </Text>
                <Button
                  onPress={() => this.updateStatus()}
                  style={styles.button}
                >
                  <CheckmarkIcon width={53} height={53} />
                </Button>
              </BlurView>
            </Modal>
          </ImageBackground>
        </>
      );
    }
  }
}

const mapStateToProps = state => ({
  campaign: state.auth.selectedCampaign,
  loading: state.auth.loading
});
const mapDispatchToProps = dispatch => ({
  updateStatus: (info, handleToggle) =>
    dispatch(actionCreators.updateStatus(info, handleToggle))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignDetails);
