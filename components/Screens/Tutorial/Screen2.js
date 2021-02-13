import React from "react";
import { View, Image, Text, I18nManager } from "react-native";
import { Icon } from "native-base";
import * as Animatable from "react-native-animatable";
import { RFValue } from "react-native-responsive-fontsize";
import PenIcon from "../../../assets/SVGs/Pen";
import EditCameraIcon from "../../../assets/SVGs/CameraCircleOutline";

import styles from "./styles";
import GradientButton from "../../MiniComponents/GradientButton";

export default class Screen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animateMedia: false,
      animateSwipe: false,
    };
  }
  componentDidUpdate() {
    const { id, activeSlide } = this.props;
    if (id === activeSlide) {
      // To start the animation of (button 1) view together with the business name and brandname view
      this.bsnViewBtn &&
        this.bsnViewBtn.animate({
          0: { scale: 1, translateX: 0 },
          0.5: { scale: 1.2, translateX: I18nManager.isRTL ? -30 : 30 },
          1: { scale: 1, translateX: 0 },
        });

      this.bsnView &&
        this.bsnView
          .animate({
            0: { scale: 1, translateX: 0 },
            0.5: {
              scale: 1.4,
              translateX: I18nManager.isRTL ? -30 : RFValue(15, 414),
            },
            1: { scale: 1, translateX: 0 },
          })
          .then(() => {
            this.mediaBtnRef &&
              this.mediaBtnRef
                .animate({
                  0: {
                    scale: 1,
                    translateX: 0,
                  },
                  0.5: {
                    scale: 1.5,
                    translateX: 0,
                  },
                  1: {
                    scale: 1,
                    translateX: 0,
                  },
                })
                .then(() => {
                  this.swipeViewRef &&
                    this.swipeViewRef.animate({
                      0: {
                        scale: 1,
                        translateX: 0,
                      },
                      0.5: {
                        scale: 1.25,
                        translateX: 0,
                      },
                      1: {
                        scale: 1,
                        translateX: 0,
                      },
                    });
                });
          });
    }
  }

  render() {
    const { id, activeSlide } = this.props;

    const { translate } = this.props.screenProps;

    return (
      <Animatable.View>
        {/* For android the view was cropping so had to remove from the inner view and place it in top most parent view */}
        <Animatable.View
          ref={(ref) => (this.bsnViewBtn = ref)}
          duration={2000}
          style={[styles.bsnBtnView]}
        >
          <GradientButton
            style={styles.block1}
            text={1}
            textStyle={styles.blockText}
          />
        </Animatable.View>

        <View style={styles.screen2OuterView}>
          <View
            style={{
              borderRadius: RFValue(15, 414),
              position: "absolute",
              height: "100%",
            }}
          >
            <Image
              style={{
                borderRadius: RFValue(15, 414),
                opacity: 0.4,
                overflow: "hidden",
                height: "100%",
              }}
              source={require("../../../assets/images/AdImagePlaceholder.png")}
            />
          </View>
          <Animatable.View
            ref={(ref) => (this.bsnView = ref)}
            duration={2000}
            style={[styles.bsnView, { paddingTop: RFValue(10, 414) }]}
          >
            <Animatable.View style={styles.adDesignTopView}>
              <PenIcon width={RFValue(8.5, 414)} height={RFValue(8.5, 414)} />
              <View style={styles.adDesignDetailView}>
                <Text style={styles.adDesignHeading}>
                  {translate("Business Name")}
                </Text>
                <Text style={styles.adDesignDescp}>ABYAT</Text>
              </View>
            </Animatable.View>
            <Animatable.View style={styles.adDesignTopView}>
              <PenIcon width={RFValue(8.5, 414)} height={RFValue(8.5, 414)} />
              <View style={styles.adDesignDetailView}>
                <Text style={styles.adDesignHeading}>
                  {translate("Headline")}
                </Text>
                <Text style={styles.adDesignDescp}>New Collection</Text>
              </View>
            </Animatable.View>
          </Animatable.View>
          <Animatable.View
            ref={(ref) => (this.mediaBtnRef = ref)}
            style={styles.mediaButtonView}
            duration={2000}
          >
            <GradientButton
              style={styles.block}
              text={2}
              textStyle={styles.blockText}
            />

            <EditCameraIcon
              width={RFValue(35, 414)}
              height={RFValue(35, 414)}
            />
            <Text style={styles.editText}>{translate("Edit Media")}</Text>
          </Animatable.View>
          <Animatable.View
            ref={(ref) => (this.swipeViewRef = ref)}
            duration={2000}
            style={styles.swipeUpView}
          >
            <GradientButton
              style={styles.block3}
              textStyle={styles.blockText}
              text={3}
            />

            <Text style={styles.adDesignWebsite}>{translate("Website")}</Text>
            <Text style={styles.adDesignWebsitePlaceholder}>
              www.optimizeapp.com
            </Text>
            <Icon
              type="MaterialIcons"
              name="arrow-drop-down"
              fontSize={50}
              style={styles.downIcon}
            />
          </Animatable.View>
        </View>
      </Animatable.View>
    );
  }
}
