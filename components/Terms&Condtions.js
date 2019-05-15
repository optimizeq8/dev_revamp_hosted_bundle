import { WebBrowser } from "expo";
export const openTerms = async closeBrowserLoading => {
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
    console.log(error);
  }
};
