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
  TouchableWithoutFeedback
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

import * as actionCreators from "../../../store/actions";
import { Video, LinearGradient, BlurView } from "expo";
import { interestNames } from "./interesetNames";
import Chart from "../../MiniComponents/CampaignDetailCharts";
import InterestIcon from "../../../assets/SVGs/Interest.svg";
import GenderIcon from "../../../assets/SVGs/Gender.svg";
import LocationIcon from "../../../assets/SVGs/Location.svg";
import PauseIcon from "../../../assets/SVGs/Pause.svg";
import CloseIcon from "../../../assets/SVGs/Close.svg";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import Toggle from "react-native-switch-toggle";
import { Modal } from "react-native-paper";
import LineChart from "./LineChart";
import SlidingUpPanel from "rn-sliding-up-panel";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BarIcon from "../../../assets/SVGs/Bar.svg";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

const { height } = Dimensions.get("window");

class CampaignDetails extends Component {
  static defaultProps = {
    draggableRange: {
      top: height / 1.25,
      bottom: 200
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
      chartAnimation: new Animated.Value(1),
      LineAnimation: new Animated.Value(0),
      visible: true
    };
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

    if (!this.props.campaign) {
      return <Spinner color="red" />;
    } else {
      let interesetNames = this.props.campaign.targeting.interests[0].category_id.map(
        interest =>
          ` ${
            interestNames.interests.scls.find(
              interestObj => interestObj.id === interest
            ).name
          } \n`
      );
      let end_time = new Date(this.props.campaign.end_time.split(".")[0]);
      let start_time = new Date(this.props.campaign.start_time.split(".")[0]);
      let end_year = end_time.getFullYear();
      let start_year = start_time.getFullYear();
      end_time = dateFormat(end_time, "d mmm");
      start_time = dateFormat(start_time, "d mmm");

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
              {/* <LinearGradient
              colors={[colors.background1, colors.background2]}
              startPoint={{ x: 1, y: 0 }}
              endPoint={{ x: 0, y: 1 }}
              style={styles.gradient}
            /> */}

              <Card padder style={styles.mainCard}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/images/snap-ghost.png")}
                  resizeMode="contain"
                />
                <Text style={styles.title}>{this.props.campaign.name}</Text>
                <View>
                  <View padder style={styles.bottomCard}>
                    <View style={{ alignSelf: "center" }}>
                      <Toggle
                        buttonTextStyle={{
                          fontFamily: "montserrat-medium",
                          fontSize: 10,
                          color: "#fff",
                          top: 7,
                          textAlign: "center"
                        }}
                        buttonText={this.props.campaign.status}
                        containerStyle={styles.toggleStyle}
                        switchOn={this.props.campaign.status === "Paused"}
                        onPress={() => this.setState({ modalVisible: true })}
                        backgroundColorOff="rgba(255,255,255,0.1)"
                        backgroundColorOn="rgba(0,0,0,0.1)"
                        circleColorOff="#FF9D00"
                        circleColorOn="#66D072"
                        duration={200}
                        buttonStyle={{ width: 50, height: 27 }}
                      />
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
                      { fontSize: 32, fontFamily: "montserrat-semibold" }
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
                    <Text style={[styles.categories, { fontSize: 16 }]}>
                      Start
                    </Text>
                    <Text style={styles.numbers}>
                      {start_time}{" "}
                      <Text style={[styles.numbers, { fontSize: 12 }]}>
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
                    <Text style={[styles.categories, { fontSize: 16 }]}>
                      End
                    </Text>
                    <Text style={styles.numbers}>
                      {end_time}{" "}
                      <Text style={[styles.numbers, { fontSize: 12 }]}>
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
                      <GenderIcon width={25} height={25} />
                      <Text style={styles.categories}>
                        Gender{"\n "}
                        <Text style={styles.subtext}>
                          {this.props.campaign.targeting.demographics[0]
                            .gender === ""
                            ? "All"
                            : this.props.campaign.targeting.demographics[0]
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
                          {this.props.campaign.targeting.demographics[0].languages.join(
                            ", "
                          )}
                        </Text>
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <Icon
                        style={styles.icon}
                        type="MaterialCommunityIcons"
                        name="human-male-girl"
                      />
                      <Text style={styles.categories}>
                        Age range{"\n"}
                        <Text style={styles.subtext}>
                          {
                            this.props.campaign.targeting.demographics[0]
                              .min_age
                          }{" "}
                          -{" "}
                          {
                            this.props.campaign.targeting.demographics[0]
                              .max_age
                          }
                        </Text>
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <LocationIcon width={25} height={25} />
                      <Text style={styles.categories}>
                        Location(s) {"\n"}
                        {this.props.campaign.targeting.geos[0].country_code}
                      </Text>
                    </View>
                  </View>

                  {interesetNames.length > 0 && (
                    <View
                      style={{ flexDirection: "column", alignItems: "left" }}
                    >
                      <Text style={styles.categories}>
                        {" "}
                        {/* <Icon
                        type="SimpleLineIcons"
                        name="screen-desktop"
                        style={[styles.icon]}
                      /> */}
                        <InterestIcon width={25} height={25} />
                        {"   "}
                        Interests
                      </Text>
                      <Text style={[styles.subtext, { textAlign: "left" }]}>
                        {interesetNames}{" "}
                      </Text>
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
                  console.log(value);

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
                          colors={[colors.background1, colors.background2]}
                          locations={[0.7, 1]}
                          style={styles.tab}
                        >
                          <BarIcon style={styles.handlerIcon} />
                          <Text style={styles.handlerText}>Dashboard</Text>
                        </LinearGradient>
                      </TouchableWithoutFeedback>
                    </View>
                    <LinearGradient
                      colors={[colors.background1, colors.background2]}
                      locations={[0.7, 1]}
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
                        <ScrollView
                          contentInset={{ bottom: hp("30%"), top: 0 }}
                        >
                          <LineChart />
                        </ScrollView>
                      </Animated.View>
                    </LinearGradient>
                  </View>
                )}
              </SlidingUpPanel>
            </Container>
            <Modal
              animationType={"slide"}
              transparent={true}
              onDismiss={() => this.setState({ modalVisible: false })}
              onRequestClose={() => this.setState({ modalVisible: false })}
              visible={this.state.modalVisible}
            >
              <BlurView tint="dark" intensity={95} style={styles.BlurView}>
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
                <Button style={styles.button}>
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
  campaign: state.auth.selectedCampaign
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignDetails);
