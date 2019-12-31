import React, { Component } from "react";
import { Text, View, Modal, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Button } from "native-base";

//Icons
import PauseIcon from "../../../assets/SVGs/Pause";
import CloseIcon from "../../../assets/SVGs/Close";

//styles
import styles from "./styles";
import formatNumber from "../../formatNumber";
import { colors } from "../../GradiantColors/colors";
export default class StatusModal extends Component {
  render() {
    const { translate } = this.props.screenProps;
    let selectedCampaign = this.props.selectedCampaign;
    return (
      <Modal
        animationType={"fade"}
        transparent={Platform.OS === "ios"}
        onDismiss={() => this.setState({ modalVisible: false })}
        onRequestClose={() => this.setState({ modalVisible: false })}
        visible={this.props.modalVisible}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={styles.gradient}
        />
        <BlurView tint="dark" intensity={100} style={styles.BlurView}>
          <Button
            transparent
            onPress={() => {
              this.props.showModal(false);
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
          <Text style={styles.title}>{translate("Ad Pause")}</Text>
          <Text style={[styles.subHeadings, styles.pauseDes]}>
            {translate(
              "Your ad will be Paused\nYou will receive the amount remaining from your budget in your"
            )}
            <Text
              style={[
                {
                  fontFamily: "montserrat-bold",
                  color: "#fff",
                  fontSize: 14
                }
              ]}
            >
              {" "}
              {translate("Wallet")}
            </Text>
          </Text>
          <Text
            style={[
              styles.numbers,
              { fontSize: 37, fontFamily: "montserrat-bold" }
            ]}
          >
            {formatNumber(
              (
                selectedCampaign.campaign.budget -
                selectedCampaign.overall.spend
              ).toFixed(2)
            )}
          </Text>
          <View style={{ top: 20 }}>
            <Button
              onPress={() => this.props.updateStatus()}
              style={styles.statusButtons}
              transparent
            >
              <Text style={styles.statusButtonsText}>
                {translate("Pause Campaign")}
              </Text>
            </Button>

            <Button
              onPress={() => this.props.updateStatus(true)}
              style={styles.statusButtons}
              transparent
            >
              <Text style={styles.statusButtonsText}>
                {translate("End Campaign")}
              </Text>
            </Button>
            <Text
              style={[
                styles.subHeadings,
                { fontFamily: "montserrat-regular", fontSize: 11 }
              ]}
            >
              {translate("The remaining budget will be added to your wallet")}
            </Text>
          </View>
        </BlurView>
      </Modal>
    );
  }
}
