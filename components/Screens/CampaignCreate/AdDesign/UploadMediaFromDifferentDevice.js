import React, { Component } from "react";
import { View, Platform } from "react-native";
import { Content, Text } from "native-base";
import { Modal } from "react-native-paper";
import { BlurView } from "@react-native-community/blur";
import { SafeAreaView } from "react-navigation";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

import CustomHeader from "../../../MiniComponents/Header";

//styles
import styles from "./styles";

class UploadMediaFromDifferentDevice extends Component {
  componentDidUpdate(prevProps) {
    if (
      !prevProps.uploadMediaDifferentDeviceModal &&
      this.props.uploadMediaDifferentDeviceModal
    ) {
      this.props.getMediaUploadUrl(
        //for rejected campaigns
        this.props.rejCampaign
          ? this.props.rejCampaign.campaign_id
          : this.props.campaign_id,
        this.props.brand_name,
        this.props.headline,
        this.props.adType
      );
    }
  }
  render() {
    const { translate } = this.props.screenProps;
    return (
      <Modal
        animationType={"fade"}
        transparent={Platform.OS === "ios"}
        onRequestClose={() =>
          this.props.setUploadFromDifferentDeviceModal(false)
        }
        onDismiss={() => this.props.setUploadFromDifferentDeviceModal(false)}
        visible={this.props.uploadMediaDifferentDeviceModal}
      >
        <BlurView>
          <View style={{ backgroundColor: "#0000", height: "100%" }}>
            <SafeAreaView forceInset={{ bottom: "never", top: "always" }} />
            <View style={styles.popupOverlay}>
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={true}
                actionButton={() => {
                  this.props.setUploadFromDifferentDeviceModal(false);
                }}
                title={"UPLOAD MEDIA"}
                segment={{
                  source: "upload_media",
                  source_action: "a_go_back",
                }}
              />
              <Text style={styles.uploadDifferentDeviceHeader}>
                {translate("from a different device")}
              </Text>

              <Content
                padder
                indicatorStyle="white"
                contentContainerStyle={
                  styles.uploadDifferentDeviceContentContainer
                }
              >
                <View style={styles.uploadDifferentDeviceRowView}>
                  <View style={styles.uploadDifferentDeviceIndex}>
                    <Text style={styles.uploadDifferentDeviceIndexText}>1</Text>
                  </View>
                  <View style={styles.uploadDifferentDeviceColView}>
                    <Text style={styles.uploadDifferentDeviceTitleText}>
                      {translate(
                        "Please access the link below on your Other device"
                      )}
                    </Text>
                    <Text
                      selectable={true}
                      style={styles.uploadMediaFromDifferentDeviceSubtitleText}
                    >
                      {this.props.uploadMediaDifferentDeviceURL}
                    </Text>
                  </View>
                </View>

                <View style={styles.uploadDifferentDeviceRowView}>
                  <View style={styles.uploadDifferentDeviceIndex}>
                    <Text style={styles.uploadDifferentDeviceIndexText}>2</Text>
                  </View>
                  <View style={styles.uploadDifferentDeviceColView}>
                    <Text style={styles.uploadDifferentDeviceTitleText}>
                      {translate("Enter your Access code")}
                    </Text>
                    <Text
                      selectable={true}
                      style={styles.uploadMediaFromDifferentDeviceSubtitleText}
                    >
                      {this.props.uploadMediaDifferentDeviceAccessCode}
                    </Text>
                  </View>
                </View>

                <View style={styles.uploadDifferentDeviceRowView}>
                  <View style={styles.uploadDifferentDeviceIndex}>
                    <Text style={styles.uploadDifferentDeviceIndexText}>3</Text>
                  </View>
                  <View style={styles.uploadDifferentDeviceColView}>
                    <Text style={styles.uploadDifferentDeviceTitleText}>
                      {translate(
                        "Keep this page open until your media is Uploaded on the other device"
                      )}
                    </Text>
                  </View>
                </View>
              </Content>
            </View>
          </View>
        </BlurView>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMediaUploadUrl: (campaign_id, brand_name, headline, adType) =>
    dispatch(
      actionCreators.getMediaUploadUrl(
        campaign_id,
        brand_name,
        headline,
        adType
      )
    ),
});
const mapStateToProps = (state) => ({
  campaign_id: state.campaignC.campaign_id,
  adType: state.campaignC.adType,
  mainBusiness: state.account.mainBusiness,
  data: state.campaignC.data,
  uploadMediaDifferentDeviceURL: state.campaignC.uploadMediaDifferentDeviceURL,
  uploadMediaDifferentDeviceAccessCode:
    state.campaignC.uploadMediaDifferentDeviceAccessCode,
  errorUploadMediaDiffernetDevice:
    state.campaignC.errorUploadMediaDiffernetDevice,
  rejCampaign: state.dashboard.rejCampaign,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadMediaFromDifferentDevice);
