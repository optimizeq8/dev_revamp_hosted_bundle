import React, { Component } from "react";
import { Text, View } from "react-native";
import Logo from "../../../../assets/SVGs/Optimize";
import Background from "../../../../assets/SVGs/Background";
import BackdropIcon from "../../../../assets/SVGs/BackDropIcon";
import * as Animatable from "react-native-animatable";

import styles from "./styles";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { Button } from "native-base";
export default class EmptyCampaigns extends Component {
  render() {
    let { mainBusiness } = this.props;
    const B = props => (
      <Text style={{ fontFamily: "montserrat-bold" }}>{props.children}</Text>
    );

    return (
      <View>
        <BackdropIcon style={styles.backDrop} />
        <Background style={styles.background} />
        <Logo
          style={{ alignSelf: "center" }}
          width={heightPercentageToDP(10)}
          height={heightPercentageToDP(10)}
        />
        <Text style={styles.logoText}>Optimize</Text>
        <Text style={styles.brandNameStyle}>{mainBusiness.brandname}</Text>
        <Text style={styles.businessNameStyle}>
          {mainBusiness.businessname}
        </Text>
        <View style={styles.mainButtonView}>
          <Text style={styles.mainText}>
            Tap the button below to <B>launch</B> Your first Campaign!
          </Text>
          <Animatable.View
            animation="swing"
            duration={1200}
            iterationDelay={1000}
            iterationCount="infinite"
          >
            <Button style={styles.campaignButton}>
              <Text style={styles.campaignButtonText}>New{"\n"} Campaign</Text>
            </Button>
          </Animatable.View>
        </View>
      </View>
    );
  }
}
