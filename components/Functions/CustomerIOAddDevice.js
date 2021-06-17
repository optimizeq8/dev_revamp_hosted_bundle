import analytics from "@segment/analytics-react-native";
import Axios from "axios";
import { Buffer } from "buffer";
import { Platform } from "react-native";
import { Notifications as RNNotifications } from "react-native-notifications";

export default (userid) => {
  try {
    RNNotifications.events().registerRemoteNotificationsRegistered((event) => {
      Axios.put(
        `https://track.customer.io/api/v1/customers/${userid}/devices`,
        {
          device: {
            id: event.deviceToken,
            platform: Platform.OS,
            last_used: Math.floor(new Date().getTime() / 1000),
          },
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              "cab103aba8b5250d7050:d29026369473d443175a"
            ).toString("base64")}`,
          },
        }
      )
        .then((res) => {
          analytics.track("Device token updated for Customer.io", {
            device: {
              id: event.deviceToken,
              platform: Platform.OS,
              last_used: Math.floor(new Date().getTime() / 1000),
            },
          });
        })
        .catch((err) => {
          console.log("error,", err);
          analytics.track("Error updating device token for Customer.io", {
            device: {
              id: event.deviceToken,
              platform: Platform.OS,
              last_used: Math.floor(new Date().getTime() / 1000),
            },
            errorDescription: err,
          });
        });
    });
  } catch (error) {
    console.log("error,", error);
  }
};
