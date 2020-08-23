import React, { Component } from "react";
import { Text, View } from "react-native";
import Modal from "react-native-modal";
import { BlurView } from "@react-native-community/blur";
import { Icon } from "native-base";
import AnimatedCircularProgress from "../AnimatedCircleProgress/AnimatedCircularProgress";
import styles from "./styles";
import { globalColors } from "../../../GlobalStyles";
export default class VideoProcessingLoader extends Component {
  render() {
    let { videoLoading, progress, handleVideoCaneling, translate } = this.props;
    return (
      <Modal isVisible={videoLoading} style={{ margin: 0 }}>
        <BlurView
          blurAmount={5}
          style={{
            height: "100%",
            justifyContent: "center",
          }}
        >
          <View style={styles.animatedLoaderContainer}>
            <Icon
              name="close"
              onPress={handleVideoCaneling}
              type="AntDesign"
              style={{
                color: globalColors.white,
                position: "absolute",
                top: 50,
                left: 10,
              }}
            />
            <AnimatedCircularProgress
              size={100}
              width={10}
              fill={progress}
              rotation={360}
              lineCap="round"
              tintColor={globalColors.orange}
              backgroundColor="rgba(255,255,255,0.3)"
              adDetails={false}
            />
            <Text style={styles.uplaodPercentageText}>
              {progress.toFixed(0)}
              <Text style={styles.percentage}>%</Text>
            </Text>
          </View>
        </BlurView>
        <Text style={styles.subTitle}>
          {translate("Processing and upscaling your video now")}...
        </Text>
      </Modal>
    );
  }
}
