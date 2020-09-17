import * as Segment from "expo-analytics-segment";
import * as WebBrowser from "expo-web-browser";
import { showMessage } from "react-native-flash-message";
export const openTerms = async (closeBrowserLoading = () => {}) => {
  try {
    await WebBrowser.openBrowserAsync(
      `https://www.optimizeapp.com/terms_conditions`
    ).then((action) => action.type === "cancel" && closeBrowserLoading());
  } catch (error) {
    if (error)
      showMessage({
        message: "Something went wrong!",
        type: "warning",
        position: "top",
        description: "Please try again later.",
      });
    // console.log(error);
  }
};

export const openPrivacy = async () => {
  try {
    await WebBrowser.openBrowserAsync(`https://www.optimizeapp.com/privacy`);
  } catch (error) {
    if (error)
      showMessage({
        message: "Something went wrong!",
        type: "warning",
        position: "top",
        description: error + "Please try again later.",
      });
    // console.log(error);
  }
};
