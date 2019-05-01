import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Image, ScrollView, BackHandler } from "react-native";
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
  Thumbnail
} from "native-base";
import { LinearGradient, Segment } from "expo";
import * as actionCreators from "../../../store/actions";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import { ActivityIndicator } from "react-native-paper";

class MainForm extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    Segment.screen("Create Snap Ad Account Screen");
    // BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    if (this.props.mainBusiness.snap_ad_account_id)
      this.props.navigation.navigate("Dashboard");
  }
  componentDidUpdate(prevProps) {
    if (this.props.mainBusiness.snap_ad_account_id)
      this.props.navigation.navigate("Dashboard");
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }
  render() {
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
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            {this.props.loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Button
                block
                dark
                style={styles.button}
                onPress={() => {
                  console.log(this.props.mainBusiness);

                  this.props.create_ad_account(
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
  mainBusiness: state.auth.mainBusiness,
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
  create_ad_account: (id, navigation) =>
    dispatch(actionCreators.create_ad_account(id, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
