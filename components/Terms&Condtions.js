import { WebBrowser } from "expo";
export const openTerms = async () => {
  try {
    let result = await WebBrowser.openBrowserAsync(
      `https://www.optimizeapp.com/terms`
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
    let result = await WebBrowser.openBrowserAsync(
      `https://www.optimizeapp.com/privacy`
    );
    // Segment.screenWithProperties("Payment Knet Screen", {
    //   businessname: this.props.mainBusiness.businessname,
    //   campaign_id: this.props.campaign_id
    // });
  } catch (error) {
    console.log(error);
  }
};
