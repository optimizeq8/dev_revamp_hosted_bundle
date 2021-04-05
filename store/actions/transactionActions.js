import axios from "axios";
import analytics from "@segment/analytics-react-native";
import * as actionTypes from "./actionTypes";
import NavigationService from "../../NavigationService";
import { showMessage } from "react-native-flash-message";
import createBaseUrl from "./createBaseUrl";
import { NavigationActions } from "react-navigation";

export const setCampaignInfoForTransaction = (data) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.SET_CAMPAIGN_INFO_FOR_TRANSACTION,
      payload: data,
    });
  };
};

export const reset_transaction_reducer = () => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.RESET_TRANSACTION_DATA,
    });
  };
};

export const getTransactions = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true,
    });
    createBaseUrl()
      .get(`paymentHistory/${getState().account.mainBusiness.businessid}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        // console.log("payment list:", data);

        return dispatch({
          type: actionTypes.SET_TRANSACTION_LIST,
          payload: data,
        });
      })
      .catch((err) => {
        // console.log("getTransactions Error: ", err.message || err.response); // => prints: Api is being canceled
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_SET_TRANSACTION_LIST,
        });
      });
  };
};

export const getWalletAmount = (retries = 3) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true,
    });

    createBaseUrl()
      .get(`mybusinesswallet/${getState().account.mainBusiness.businessid}`, {
        timeout: 3000,
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return dispatch({
          type: actionTypes.SET_WALLET_AMOUNT,
          payload: data,
        });
      })
      .catch((err) => {
        // console.log("getWalletAmount Error: ", err.response || err.message); // => prints: Api is being canceled
        showMessage({
          message:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        if (retries > 0) {
          dispatch(getWalletAmount(retries - 1));
          return;
        }
        return dispatch({
          type: actionTypes.ERROR_SET_WALLET_AMOUNT,
        });
      });
  };
};

export const addWalletAmount = (
  info,
  openBrowser,
  payment_mode,
  retries = 3
) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true,
    });
    console.log("info", JSON.stringify(info, null, 2));
    createBaseUrl()
      .post(
        `purchaseBusinessWalletAmount`,
        {
          ...info,
          businessid: getState().account.mainBusiness.businessid,
        },
        { timeout: 10000 }
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log("data", data);
        analytics.track(`a_top_up_wallet`, {
          source: "payment_mode",
          source_action: "a_top_up_wallet",
          top_up_amount: info.amount,
          mode_of_payment: payment_mode,
          action_status: data.success ? "success" : "failure",
          error_description: !data.success ? data.message : null,
        });
        return dispatch({
          type: actionTypes.ADD_WALLET_AMOUNT,
          payload: data,
        });
      })
      .then(() => openBrowser())
      .catch((err) => {
        // console.log("addWalletAmount Error: ", err.message || err.response);
        analytics.track(`a_top_up_wallet`, {
          source: "payment_mode",
          source_action: "a_top_up_wallet",
          top_up_amount: info.amount,
          mode_of_payment: payment_mode,
          action_status: "failure",
          error_description:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
        });
        if (retries > 0) {
          dispatch(addWalletAmount(info, openBrowser, retries - 1));
          return;
        }
        showMessage({
          message:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_ADD_WALLET_AMOUNT,
        });
      });
  };
};
export const getWalletAmountInKwd = (amount, retries = 3) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true,
    });
    createBaseUrl()
      .get(`kdamount/${amount}`, { timeout: 10000 })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        return dispatch({
          type: actionTypes.GET_WALLET_AMOUNT_IN_KWD,
          payload: data,
        });
      })
      .catch((err) => {
        // console.log(
        //   "getWalletAmountInKwd Error: ",
        //   err.message || err.response
        // );

        if (retries > 0) {
          dispatch(getWalletAmountInKwd(amount, retries - 1));
          return;
        }
        showMessage({
          message:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long to retrieve wallet amount in KWD, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_GET_WALLET_AMOUNT_IN_KWD,
        });
      });
  };
};
export const useWallet = (
  campaign_id,
  setWalletModal,
  navigation,
  retries = 3
) => {
  return (dispatch, getState) => {
    console.log("called", campaign_id);
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true,
    });
    var info = { campaign_id: campaign_id };
    if (
      getState().transA.channel === "google" ||
      getState().transA.channel === "instagram"
    )
      info = { ...info, channel: getState().transA.channel };
    createBaseUrl()
      .post(`useWallet`, info, { timeout: 10000 })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.data && data.data.campaign_already_created) {
          dispatch(checkoutwithWallet(data.campaign_id, navigation));
          return dispatch({
            type: actionTypes.SET_TRAN_LOADING,
            payload: false,
          });
        } else {
          showMessage({
            message: data.message,
            type: "info",
            position: "top",
          });
          if (!data.success) {
            return dispatch({
              type: actionTypes.SET_TRAN_LOADING,
              payload: false,
            });
          } else
            return dispatch({
              type: actionTypes.USE_WALLET_AMOUNT,
              payload: data,
            });
        }
      })

      .catch((err) => {
        // console.log("useWallet Error: ", err.message);

        if (retries > 0) {
          dispatch(
            useWallet(campaign_id, setWalletModal, navigation, retries - 1)
          );
          return;
        }
        showMessage({
          message:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        setWalletModal(false);
        return dispatch({
          type: actionTypes.ERROR_USE_WALLET_AMOUNT,
        });
      });
  };
};

export const removeWalletAmount = (
  campaign_id,
  navigation,
  names,
  goBack,
  retries = 3
) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true,
    });
    var info = { campaign_id: campaign_id };
    if (
      getState().transA.channel === "google" ||
      getState().transA.channel === "instagram"
    )
      info = { ...info, channel: getState().transA.channel };

    createBaseUrl()
      .post(`removeWallet`, info)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`a_remove_wallet_amount`, {
          source: "payment_mode",
          source_action: "a_remove_wallet_amount",
          action_status: data.success ? "success" : "failure",
          campaign_id,
          campaign_channel:
            getState().transA.channel === "google" ? "google" : "snapchat",
        });
        return dispatch({
          type: actionTypes.REMOVE_WALLET_AMOUNT,
          payload: data,
        });
      })
      .then(() => {
        if (goBack) {
          //TODO: check for google
          navigation.navigate("AdPaymentReview", {
            names: names,
            source: "payment_mode",
            source_action: "a_remove_wallet_amount",
          });
        }
      })
      .catch((err) => {
        // console.log("removeWalletAmount Error: ", err.message || err.response);
        if (retries > 0) {
          removeWalletAmount(
            campaign_id,
            navigation,
            names,
            goBack,
            retries - 1
          );
          return;
        }
        showMessage({
          message:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_REMOVE_WALLET_AMOUNT,
        });
      });
  };
};

export const checkoutwithWallet = (campaign_id, navigation, retries = 3) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_TRAN_LOADING,
      payload: true,
    });
    var info = { campaign_id: campaign_id };
    if (
      getState().transA.channel === "google" ||
      getState().transA.channel === "instagram"
    )
      info = { ...info, channel: getState().transA.channel };

    createBaseUrl()
      .post(`checkoutwithWallet`, info)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`payment_processing`, {
          source: "payment_mode",
          source_action: "a_payment_processing",
          mode_of_payment: "WALLET",
          amount: data.amount,
          campaign_id,
          action_status: data.success ? "success" : "failure",
        });

        // Update the new wallet amount for that user's profile buiness
        data.success &&
          analytics.identify(getState().auth.userid, {
            wallet_amount: data.wallet_amount,
          });
        navigation.reset(
          [
            NavigationActions.navigate({
              routeName: "SuccessRedirect",
              params: {
                ...data,
                source: "payment_processing",
                source_action: "a_payment_processing",
                payment_mode: "WALLET",
                checkoutwithWallet: true,
              },
            }),
          ],
          0
        );
      })

      .then((data) => {
        // console.log("CHECKOUT_WITH_WALLET data", data);
        return dispatch({
          type: actionTypes.CHECKOUT_WITH_WALLET,
          payload: data,
        });
      })

      .catch((err) => {
        // console.log("checkoutwithWallet Error: ", err.message || err.response);
        analytics.track(`a_error`, {
          source: "payment_mode",
          error_page: "payment_mode",
          source_action: "a_payment_processing",
          mode_of_payment: "WALLET",
          campaign_id,
          action_status: "failure",
          error_description:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
        });
        if (retries > 0) {
          checkoutwithWallet(campaign_id, retries - 1);
          return;
        }
        showMessage({
          message:
            (err.message &&
              err.message.includes("timeout") &&
              `Request took too long, ${
                retries > 0 ? "re-trying again." : "try again later"
              }`) ||
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_CHECKOUT_WITH_WALLET,
        });
      });
  };
};
export const filterTransactions = (query, source, source_action) => {
  analytics.track(`a_filter`, {
    source,
    source_action,
    query,
  });
  return (dispatch) =>
    dispatch({
      type: actionTypes.FILTER_TRANSACTION,
      payload: query,
    });
};

export const payment_request_knet = (
  campaign_id,
  openBrowser,
  navigation,
  closeBrowserLoading
) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING,
      payload: true,
    });
    var url =
      getState().transA.channel === ""
        ? `makeknetpayment/${campaign_id}`
        : `makeknetpayment/${campaign_id}/${getState().transA.channel}`;

    createBaseUrl()
      .get(url, {
        timeout: 5000,
        timeoutErrorMessage: "Something went wrong, please try again later.",
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.knet_payment_url) {
          return dispatch({
            type: actionTypes.PAYMENT_REQUEST_URL,
            payload: data,
          });
        } else {
          analytics.track(`payment_processing`, {
            source: "payment_mode",
            source_action: "a_payment_processing",
            mode_of_payment: "KNET",
            campaign_id,
            amount: data.amount,
            action_status: data.success ? "success" : "failure",
            error_description: !data.success ? data.status : null,
          });
          navigation.navigate("SuccessRedirect", {
            ...data,
            source: "payment_processing",
            source_action: "a_payment_processing",
            payment_mode: "KNET",
          });
          return dispatch({
            type: actionTypes.PAYMENT_REQUEST_URL,
            payload: data,
          });
        }
      })
      .then(() => {
        if (getState().transA.campaign_payment_data.knet_payment_url) {
          openBrowser();
        }
      })
      .catch((err) => {
        // console.log("payment_request_knet", err || err);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        closeBrowserLoading();
        return dispatch({
          type: actionTypes.ERROR_PAYMENT_REQUEST_URL,
          payload: {
            loading: false,
          },
        });
      });
  };
};

export const payment_request_credit_card = (
  campaign_id,
  openBrowser,
  navigation,
  closeBrowserLoading
) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING,
      payload: true,
    });

    var url =
      getState().transA.channel === ""
        ? `makeccpayment/${campaign_id}`
        : `makeccpayment/${campaign_id}/${getState().transA.channel}`;

    createBaseUrl()
      .post(url, {
        timeout: 5000,
        timeoutErrorMessage: "Something went wrong, please try again later.",
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.cc_payment_url) {
          return dispatch({
            type: actionTypes.PAYMENT_REQUEST_URL,
            payload: data,
          });
        } else {
          analytics.track(`payment_processing`, {
            source: "payment_mode",
            source_action: "a_payment_processing",
            mode_of_payment: "CREDIT CARD",
            amount: data.amount,
            campaign_id,
            action_status: data.success ? "success" : "failure",
            error_description: !data.success ? data.status : null,
          });
          navigation.navigate("SuccessRedirect", {
            ...data,
            source: "payment_processing",
            source_action: "a_payment_processing",
            payment_mode: "CREDIT CARD",
          });
          return dispatch({
            type: actionTypes.PAYMENT_REQUEST_URL,
            payload: data,
          });
        }
      })
      .then(() => {
        if (getState().transA.campaign_payment_data.cc_payment_url) {
          openBrowser();
        }
      })
      .catch((err) => {
        // console.log("payment_request_cc", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        closeBrowserLoading();
        return dispatch({
          type: actionTypes.ERROR_PAYMENT_REQUEST_URL,
          payload: {
            loading: false,
          },
        });
      });
  };
};
/**
 * Get wallet transaction list for the current business id
 *
 *
 *
 */
export const getWalletTransactionsHistory = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_TRAN_WALLET_LOADING,
      payload: true,
    });
    createBaseUrl()
      .get(`walletpaymentHistory/${getState().account.mainBusiness.businessid}`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        // console.log("payment list:", data);
        return dispatch({
          type: actionTypes.SET_WALLET_TRANSACTION_LIST,
          payload: data,
        });
      })
      .catch((err) => {
        // console.log("getTransactions Error: ", err.message || err.response); // => prints: Api is being canceled
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        return dispatch({
          type: actionTypes.ERROR_SET_WALLET_TRANSACTION_LIST,
        });
      });
  };
};

/**
 * Method: POST
 * @param {*} businessCountry  to fetch the payment method based on the business country
 * @param {*} amount in USD
 */
export const getPaymentMethods = (businessCountry, businessid, amount) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.PAYMENT_MODES,
      payload: { data: [], loading: true },
    });

    createBaseUrl()
      .post(`/availablePaymentMethods`, {
        country: businessCountry,
        businessid: businessid,
        amount,
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        return dispatch({
          type: actionTypes.PAYMENT_MODES,
          payload: { data: data.data, loading: false },
        });
      })
      .catch((error) => {
        return dispatch({
          type: actionTypes.PAYMENT_MODES,
          payload: {
            data: [],
            loading: false,
          },
        });
      });
  };
};

export const payment_request_payment_method = (
  campaign_id,
  PaymentMethodId,
  openBrowser,
  navigation,
  closeBrowserLoading
) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_AD_LOADING,
      payload: true,
    });
    var url =
      getState().transA.channel === ""
        ? `makemfpayment/${campaign_id}`
        : `makemfpayment/${campaign_id}/${getState().transA.channel}`;

    createBaseUrl()
      .post(
        url,
        {
          PaymentMethodId: PaymentMethodId,
        },
        {
          timeout: 5000,
          timeoutErrorMessage: "Something went wrong, please try again later.",
        }
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (data.mf_payment_url) {
          return dispatch({
            type: actionTypes.PAYMENT_REQUEST_URL,
            payload: data,
          });
        } else {
          analytics.track(`payment_processing`, {
            source: "payment_mode",
            source_action: "a_payment_processing",
            mode_of_payment: "CREDIT CARD",
            amount: data.amount,
            campaign_id,
            action_status: data.success ? "success" : "failure",
            error_description: !data.success ? data.status : null,
          });
          navigation.navigate("SuccessRedirect", {
            ...data,
            source: "payment_processing",
            source_action: "a_payment_processing",
            payment_mode: "CREDIT CARD",
          });
          return dispatch({
            type: actionTypes.PAYMENT_REQUEST_URL,
            payload: data,
          });
        }
      })
      .then(() => {
        if (getState().transA.campaign_payment_data.mf_payment_url) {
          openBrowser();
        }
      })
      .catch((err) => {
        // console.log("payment_request_cc", err.message || err.response);
        showMessage({
          message:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          type: "danger",
          position: "top",
        });
        closeBrowserLoading();
        return dispatch({
          type: actionTypes.ERROR_PAYMENT_REQUEST_URL,
          payload: {
            loading: false,
          },
        });
      });
  };
};
