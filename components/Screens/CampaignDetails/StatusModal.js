import React, { Component } from "react";
import { Text, View, Modal, Platform } from "react-native";
import { BlurView } from "expo";
import { Button } from "native-base";

//Icons
import PauseIcon from "../../../assets/SVGs/Pause.svg";
import CloseIcon from "../../../assets/SVGs/Close.svg";

//styles
import styles from "./styles";
import formatNumber from "../../formatNumber";
import { globalColors } from "../../../Global Styles";
export default class StatusModal extends Component {
  render() {
    let selectedCampaign = this.props.selectedCampaign;
    return (
      <Modal
        animationType={"fade"}
        transparent={Platform.OS === "ios"}
        onDismiss={() => this.setState({ modalVisible: false })}
        onRequestClose={() => this.setState({ modalVisible: false })}
        visible={this.props.modalVisible}
      >
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
          <Text style={styles.title}>Ad Pause</Text>
          <Text style={[styles.subHeadings, styles.pauseDes]}>
            Your ad will be Paused.{"\n"} You will receive the amount remaining
            from your budget in your
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
            {formatNumber(
              (
                selectedCampaign.lifetime_budget_micro - selectedCampaign.spends
              ).toFixed(2)
            )}
          </Text>
          <View style={{ top: 20 }}>
            <Button
              onPress={() => this.props.updateStatus()}
              style={{
                backgroundColor: "transparent",
                borderColor: globalColors.orange,
                borderWidth: 0.5,
                alignSelf: "center",
                marginVertical: 5
              }}
            >
              <Text>Pause Campaign</Text>
            </Button>

            <Button
              onPress={() => this.props.endCampaign()}
              style={{
                backgroundColor: "transparent",
                borderColor: globalColors.orange,
                borderWidth: 0.5,
                alignSelf: "center",
                marginVertical: 5
              }}
            >
              <Text>End campaign</Text>
            </Button>
            <Text
              style={[
                styles.subHeadings,
                { fontFamily: "montserrat-regular", fontSize: 11 }
              ]}
            >
              The remaining budget will be added to your wallet.
            </Text>
          </View>
          {/* <Button
                  onPress={() => this.updateStatus()}
                  style={styles.button}
                >
                  <CheckmarkIcon width={53} height={53} />
                </Button> */}
        </BlurView>
      </Modal>
    );
  }
}
