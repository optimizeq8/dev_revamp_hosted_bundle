import analytics from "@segment/analytics-react-native";
import Axios from "axios";
import { Buffer } from "buffer";
import { Platform } from "react-native";
import { Notifications as RNNotifications } from "react-native-notifications";

export default (user_id) => {
  try {
    RNNotifications.registerRemoteNotifications();
    RNNotifications.events().registerRemoteNotificationsRegistered(
      async (event) => {
        Axios.get(
          `https://beta-api.customer.io/v1/api/customers/${user_id}/attributes`,
          {
            headers: {
              Authorization: `Bearer ${
                __DEV__
                  ? "3ad0c6ac47916ef33ef57d08f338c282"
                  : "e8cd76587e53c7726a0e13406df8dbd6"
              }`,
            },
          }
        )
          .then((res) => res.data)
          .then((data) => {
            let user_devices = data.customer.devices;
            if (
              user_devices.length === 0 ||
              user_devices.some((device) => device.id !== event.deviceToken)
            )
              Axios.put(
                `https://track.customer.io/api/v1/customers/${user_id}/devices`,
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
                      __DEV__
                        ? "49165acbbfd6f389f7af:f69963a4651863ea00e8"
                        : "cab103aba8b5250d7050:d29026369473d443175a"
                    ).toString("base64")}`,
                  },
                }
              )
                .then((res) => {
                  analytics.track("Device Token Updated", {
                    device: {
                      id: event.deviceToken,
                      platform: Platform.OS,
                      last_used: Math.floor(new Date().getTime() / 1000),
                    },
                  });
                })
                .catch((err) => {
                  analytics.track("Error Updating Device Token", {
                    device: {
                      id: event.deviceToken,
                      platform: Platform.OS,
                      last_used: Math.floor(new Date().getTime() / 1000),
                    },
                    errorDescription: err,
                  });
                });
          });
      }
    );
  } catch (error) {
    console.log("error,", error);
    analytics.track("Error Updating Device Token", {
      errorDescription: err,
    });
  }
};
