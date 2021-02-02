import React, { Component } from "react";
import { Keyboard, Text, View } from "react-native";
import CampaignDuration from "../../../MiniComponents/CampaignDurationField";
import Duration from "./Duration";
import styles from "./styles";
import * as Animatable from "react-native-animatable";

export default class CampaignDurationContainer extends Component {
  render() {
    let {
      screenProps,
      stopTimer,
      handleDuration,
      duration,
      start_timeError,
      end_timeError,
      loading,
      campaignInfo,
      dateField,
      copilot,
    } = this.props;
    let { translate } = screenProps;
    return (
      <View {...copilot} screenProps={screenProps}>
        <CampaignDuration
          stopTimer={stopTimer}
          handleDuration={handleDuration}
          duration={duration}
          screenProps={screenProps}
          disabled={duration === 3}
        />
        {duration === 3 && (
          <Text style={styles.minDurationText}>
            {translate("Minimum Duration is {{n}} days", {
              n: 3,
            })}
          </Text>
        )}
        <Animatable.View
          onAnimationEnd={() =>
            this.setState({
              start_timeError: null,
              end_timeError: null,
            })
          }
          duration={200}
          easing={"ease"}
          animation={!start_timeError || !end_timeError ? "" : "shake"}
        >
          {/* <View style={[styles.dateTextLabel]}>
                    <Text uppercase style={[styles.inputLabel]}>
                      {translate("Date")}
                    </Text>
                  </View> */}
          <Duration
            label={"Start Date"}
            screenProps={screenProps}
            loading={loading}
            dismissKeyboard={Keyboard.dismiss}
            start_time={campaignInfo.start_time}
            end_time={campaignInfo.end_time}
            start_timeError={start_timeError}
            end_timeError={end_timeError}
            dateField={dateField}
          />
        </Animatable.View>
      </View>
    );
  }
}
