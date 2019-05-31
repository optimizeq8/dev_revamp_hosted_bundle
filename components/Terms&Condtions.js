import { WebBrowser } from "expo";
import { showMessage } from "react-native-flash-message";
export const openTerms = async (closeBrowserLoading = () => {}) => {
  try {
    await WebBrowser.openBrowserAsync(`https://www.optimizeapp.com/terms`).then(
      action => action.type === "cancel" && closeBrowserLoading()
    );
    // Segment.screenWithProperties("Payment Knet Screen", {
    //   businessname: this.props.mainBusiness.businessname,
    //   campaign_id: this.props.campaign_id
    // });
  } catch (error) {
    console.log(error);

    if (error)
      showMessage({
        message: "Something went wrong!",
        type: "warning",
        position: "top",
        description: "Please try again later."
      });
    // console.log(error);
  }
};

export const openPrivacy = async () => {
  try {
    await WebBrowser.openBrowserAsync(`https://www.optimizeapp.com/privacy`);
    // Segment.screenWithProperties("Payment Knet Screen", {
    //   businessname: this.props.mainBusiness.businessname,
    //   campaign_id: this.props.campaign_id
    // });
  } catch (error) {
    if (error)
      showMessage({
        message: "Something went wrong!",
        type: "warning",
        position: "top",
        description: error + "Please try again later."
      });
    // console.log(error);
  }
};
