import React, { Component } from "react";
import { View, Image, BackHandler } from "react-native";
import { Linking, LinearGradient, Segment } from "expo";
import { Button, Text, Container } from "native-base";
import ErrorIcon from "../../../assets/SVGs/Error.svg";
import LoadingScreen from "../LoadingScreen";

//styles
import styles, { colors } from "./styles";

class ErrorComponent extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    Segment.screen(" Error Screen");
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }
  render() {
    if (this.props.loading) {
      return (
        <>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          />
          <LoadingScreen dash={true} top={0} />
        </>
      );
    }
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
        <View style={styles.view}>
          <ErrorIcon width={93} height={93} />

          <Text style={styles.title}> Sorry </Text>
          <Text style={styles.errortext}>
            Oops ! There seems to be a problem . {"\n"}
            Try again in sometime.
          </Text>
          <Button
            style={styles.button}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.buttontext}> Go Back </Text>
          </Button>
          <Button
            style={styles.whitebutton}
            onPress={() => this.props.navigation.navigate("Dashboard")}
          >
            <Text style={styles.whitebuttontext}> Home </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default ErrorComponent;