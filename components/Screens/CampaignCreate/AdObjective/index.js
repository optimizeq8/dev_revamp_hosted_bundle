//Components
import React, { Component } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import {
  Button,
  Content,
  Text,
  Item,
  Input,
  Container,
  Icon,
  Label
} from "native-base";
import { LinearGradient, BlurView, Segment } from "expo";

import { Modal } from "react-native-paper";
import ObjectivesCard from "../../../MiniComponents/ObjectivesCard";
import LowerButton from "../../../MiniComponents/LowerButton";
import BackButton from "../../../MiniComponents/BackButton";
//icons
import PhoneIcon from "../../../../assets/SVGs/Phone.svg";
import BackButtonIcon from "../../../../assets/SVGs/BackButton.svg";
import ForwardButton from "../../../../assets/SVGs/ForwardButton.svg";

// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Validators
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import { heightPercentageToDP } from "react-native-responsive-screen";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";

class AdObjective extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        ad_account_id: "",
        start_time: "",
        end_time: "",
        name: "",
        objective: ""
      },
      modalVisible: false,
      objectiveLabel: "Select Objective",
      inputN: false,
      objectives: [
        {
          label: "Brand Awereness",
          value: "BRAND_AWARENESS",
          info: "The user will be taken to your website",
          icon: ""
        },
        {
          label: "Reach",
          value: "REACH",
          info: "The user will be shown A video of 10 Mins.",
          icon: ""
        },
        {
          label: "Traffic",
          value: "TRAFFIC",
          info: "The user will be sent to Download your app",
          icon: ""
        },
        {
          label: "App Installs",
          value: "APP_INSTALLS",
          info: "The user will be sent to a specific page inyour app",
          icon: ""
        },
        {
          label: "Video Views",
          value: "VIDEO_VIEWS",
          info: "The user will be sent to a specific page inyour app",
          icon: ""
        },
        {
          label: "Lead Generation",
          value: "LEAD_GENERATION",
          info: "The user will be sent to a specific page inyour app",
          icon: ""
        }
      ],
      nameError: "",
      objectiveError: ""
    };
    this._handleSubmission = this._handleSubmission.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setObjective = this.setObjective.bind(this);
  }

  setObjective(value) {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        objective: value
      }
    });
  }

  componentDidMount() {
    Segment.screen("Select Ad Objective Screen");

    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        ad_account_id: this.props.mainBusiness.snap_ad_account_id,
        businessid: this.props.mainBusiness.businessid
      }
    });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  _handleSubmission = () => {
    const nameError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.name
    );
    const objectiveError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.objective
    );

    this.setState({
      nameError,
      objectiveError
    });
    if (!nameError && !objectiveError) {
      Segment.trackWithProperties("Select Ad Objective Button", {
        business_name: this.props.mainBusiness.businessname,
        campaign_objective: this.state.campaignInfo.objective
      });

      this.props.ad_objective(this.state.campaignInfo, this.props.navigation);
      // this.props.navigation.navigate("AdDesign");
    }
  };

  render() {
    const list = this.state.objectives.map(o => (
      <ObjectivesCard
        choice={o}
        selected={this.state.campaignInfo.objective}
        setObjective={this.setObjective}
        key={o.value}
      />
    ));

    return (
      <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container style={styles.container}>
            <LinearGradient
              colors={[colors.background1, colors.background2]}
              locations={[0.7, 1]}
              style={styles.gradient}
            />
            <View>
              <BackButton
                screenname="Ad Objective"
                businessname={this.props.mainBusiness.businessname}
                navigation={this.props.navigation.goBack}
              />
              <Text style={styles.title}>Snap Ad</Text>
              <PhoneIcon style={styles.phoneicon} width={70} />
            </View>
            <View style={styles.maincontent}>
              <Item
                floatingLabel
                style={[
                  styles.input1,
                  {
                    borderColor: this.state.inputN
                      ? "#fff"
                      : this.state.nameError
                      ? "red"
                      : "#D9D9D9"
                  }
                ]}
              >
                <Label
                  style={[
                    styles.inputtext,
                    {
                      color: this.state.inputN ? "#FF9D00" : "#fff"
                    }
                  ]}
                >
                  Your Ad Name
                </Label>

                <Input
                  style={styles.inputtext}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={value =>
                    this.setState({
                      campaignInfo: { ...this.state.campaignInfo, name: value }
                    })
                  }
                  autoFocus={true}
                  onFocus={() => {
                    this.setState({ inputN: true });
                  }}
                  onBlur={() => {
                    this.setState({ inputN: false });
                    this.setState({
                      nameError: validateWrapper(
                        "mandatory",
                        this.state.campaignInfo.name
                      )
                    });
                  }}
                />
              </Item>
              <Text style={styles.subtext}>This will not show on your ad</Text>

              <Text style={styles.text}>Objective</Text>

              <Item
                rounded
                style={[
                  styles.input2,
                  {
                    borderColor: this.state.objectiveError
                      ? "red"
                      : "transparent"
                  }
                ]}
                onPress={() => {
                  this.setModalVisible(true);
                }}
              >
                <Text style={[styles.inputtext, { flex: 1 }]}>
                  {this.state.campaignInfo.objective === ""
                    ? this.state.objectiveLabel
                    : this.state.objectives.find(
                        c => this.state.campaignInfo.objective === c.value
                      ).label}
                </Text>
                <Icon type="AntDesign" name="down" style={styles.downicon} />
              </Item>
            </View>

            <LowerButton bottom={10} function={this._handleSubmission} />
          </Container>
        </TouchableWithoutFeedback>
        <Modal visible={this.props.loading}>
          <LoadingScreen top={0} />
        </Modal>
        <Modal
          animationType={"slide"}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}
        >
          <BlurView intensity={95} tint="dark">
            <View style={styles.popupOverlay}>
              <View style={styles.popupContent}>
                <Text style={styles.modaltitle}>Objectives</Text>
              </View>
              <ScrollView
                indicatorStyle="white"
                contentContainerStyle={{
                  paddingTop: heightPercentageToDP(7),
                  marginBottom: 20
                }}
              >
                {list}
              </ScrollView>
              <LowerButton bottom={3} function={this.setModalVisible} />
            </View>
          </BlurView>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.auth.mainBusiness,
  loading: state.campaignC.loading
});

const mapDispatchToProps = dispatch => ({
  ad_objective: (info, navigation) =>
    dispatch(actionCreators.ad_objective(info, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdObjective);
