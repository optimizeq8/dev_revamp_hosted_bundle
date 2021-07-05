import axios from "axios";
import { showMessage } from "react-native-flash-message";
import * as SecureStore from "expo-secure-store";
import analytics from "@segment/analytics-react-native";
import { Animated } from "react-native";
import { persistor } from "../index";
import * as actionTypes from "./actionTypes";
import { setAuthToken, getBusinessAccounts } from "./genericActions";
import createBaseUrl from "./createBaseUrl";
import { errorMessageHandler } from "./ErrorActions";
import NavigationService from "../../NavigationService";
// import { AdjustEvent, Adjust } from "react-native-adjust";
import { getUniqueId } from "react-native-device-info";
import { update_user_on_intercom } from "./messengerActions";

export const changeBusiness = (business) => {
  return (dispatch, getState) => {
    persistor.purge();
    analytics.identify(getState().auth.userid, {
      businessname: business.businessname,
      businessid: business.businessid,
      revenue: business.revenue,
      ltv: business.ltv,
      wallet_amount: business.wallet_amount,
    });

    analytics.group(business.businessid, {
      businessid: business.businessid,
      [`$name`]: business.businessname,
      company: business.businessname,
      revenue: business.revenue,
      ltv: business.ltv,
      wallet_amount: business.wallet_amount,
      userId: getState().auth.userid,
    });
    dispatch({
      type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
      payload: { ...business },
    });
    dispatch(getBusinessAccounts(true));
  };
};

export const createBusinessAccount = (account, navigation) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
      payload: true,
    });
    createBaseUrl()
      .post(`businessaccountV2`, account) //businessaccount OLD API
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`a_create_buiness_account`, {
          source: "open_create_business_account",
          source_action: `a_create_buiness_account`,
          action_status: data.success ? "success" : "failure",
          timestamp: new Date().getTime(),
          ...account,
          newBusiness: data.success ? data.data : "",
        });
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top",
        });
        //incase of an error?? need handling
        if (data.success) {
          analytics.identify(getState().auth.userid, {
            businessname: data.data.businessname,
            businessid: data.data.businessid,
            revenue: 0,
            ltv: 0,
            wallet_amount: 0,
          });
          dispatch({
            type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
            payload: { ...data.data },
          });
          navigation.navigate("Dashboard", {
            source: "open_create_business_account",
            source_action: `a_create_buiness_account`,
          });
          return dispatch({
            type: actionTypes.ADD_BUSINESS_ACCOUNT,
            payload: {
              ...data.data,
            },
          });
        }
        if (!data.success) {
          return dispatch({
            type: actionTypes.ERROR_ADD_BUSINESS_ACCOUNT,
            payload: {
              loading: false,
            },
          });
        }
      })
      .catch((err) => {
        // console.log("error creating new bsn", err.message || err.response);
        errorMessageHandler(err);

        dispatch({
          type: actionTypes.ERROR_ADD_BUSINESS_ACCOUNT,
          payload: {
            loading: false,
          },
        });
      });
  };
};

export const addressForm = (address, navigation, addressId, translate) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.SET_BILLING_ADDRESS_LOADING,
        payload: true,
      });
      const response = await createBaseUrl().put("businessaddress", {
        businessid: getState().account.mainBusiness.businessid,
        id: addressId,
        ...address,
      });
      var time = new Animated.Value(0);
      if (response.data && response.data.message === "Address ID missing") {
        const respData = await createBaseUrl().post("businessaddress", {
          businessid: getState().account.mainBusiness.businessid,
          ...address,
        });
        analytics.track(`a_business_address`, {
          source: "open_business_address",
          source_action: "a_business_address",
          timestamp: new Date().getTime(),
          new: true,
          error_description: !respData.data.success
            ? respData.data.message
            : null,
          action_status: respData.data.success ? "success" : "failed",
          ...address,
          businessid: getState().account.mainBusiness.businessid,
        });
        Animated.timing(time, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => {
          showMessage({
            message: respData.data.message,
            type: respData.data.success ? "success" : "warning",
            position: "top",
          });
          if (respData.data.success)
            navigation.navigate("Dashboard", {
              source: "open_business_address",
              source_action: "a_business_address",
            });
          return dispatch({
            type: actionTypes.ADD_ADDRESS,
            payload: respData.data,
          });
        });
      } else {
        Animated.timing(time, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => {
          analytics.track(`a_business_address`, {
            source: "open_business_address",
            source_action: "a_business_address",
            timestamp: new Date().getTime(),
            new: false,
            error_description: !response.data.success
              ? response.data.message
              : null,
            ...address,
            action_status: response.data.success ? "success" : "failed",
            businessid: getState().account.mainBusiness.businessid,
          });
          showMessage({
            message: translate(response.data.message),
            type: response.data.success ? "success" : "warning",
            position: "top",
          });
          if (response.data.success) {
            navigation.navigate("Dashboard", {
              source: "open_business_address",
              source_action: "a_business_address",
            });
          }
          return dispatch({
            type: actionTypes.ADD_ADDRESS,
            payload: response.data,
          });
        });
      }
    } catch (error) {
      // console.log("Error while put/post address form", error.message);
      errorMessageHandler(err);

      return dispatch({
        type: actionTypes.ERROR_ADD_ADDRESS,
      });
    }
  };
};

export const getAddressForm = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.GET_BILLING_ADDRESS_LOADING,
      payload: true,
    });
    createBaseUrl()
      .get(`businessaddresses/${getState().account.mainBusiness.businessid}`)
      .then((response) => {
        if (response.data && response.data.success)
          if (!response.data.business_accounts) {
            return dispatch({
              type: actionTypes.GET_BILLING_ADDRESS,
              payload: {
                country: "",
                area: "",
                block: "",
                street: "",
                building: "",
                office: "",
                avenue: "",
              },
            });
          }
        return dispatch({
          type: actionTypes.GET_BILLING_ADDRESS,
          payload: response.data.business_accounts,
        });
      })
      .catch((err) => {
        // console.log("Get Billing Address Error: ", err.message || err.response);
        errorMessageHandler(err);

        return dispatch({
          type: actionTypes.ERROR_GET_BILLING_ADDRESS,
          payload: {},
        });
      });
  };
};

/**
 *
 * @param {*} info
 *  Object: {
 *    businessid,
 *    is_political,
 *    paying_advertiser_name
 *  }
 * @param {*} navigation
 */
// IS NOT IN THE AUTH TOKEN SO MIGHT NEED ANOTHER API TO FETCH ALL IDS
export const create_snapchat_ad_account = (info, navigation) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
      payload: true,
    });
    createBaseUrl()
      .post("snapadaccounts", info)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`a_accept_ad_TNC`, {
          source: "ad_TNC",
          source_action: "a_accept_ad_TNC",
          campaign_channel: "snapchat",
          timestamp: new Date().getTime(),
          device_id: getUniqueId(),
          ...info,
          action_status: data.success ? "success" : "failure",
          businessid: getState().account.mainBusiness.businessid,
        });
        if (data.success) {
          // let adjustSnapAdAccTracker = new AdjustEvent("vsf6z0");
          // Adjust.trackEvent(adjustSnapAdAccTracker);
          return dispatch({
            type: actionTypes.CREATE_SNAPCHAT_AD_ACCOUNT,
            payload: { data: data },
          });
        } else {
          showMessage({
            message: data.message,
            type: "info",
            position: "top",
          });
          dispatch({
            type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
            payload: false,
          });
        }
      })
      .catch((err) => {
        // console.log(
        //   "create_snapchat_ad_account_ERROR",
        //   err.message || err.response
        // );
        analytics.track(`a_error`, {
          error_page: "ad_TNC",
          action_status: "failure",
          campaign_channel: "snapchat",
          timestamp: new Date().getTime(),
          device_id: getUniqueId(),
          source_action: "a_accept_ad_TNC",
          error_description:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          businessid: getState().account.mainBusiness.businessid,
        });
        errorMessageHandler(err);

        return dispatch({
          type: actionTypes.ERROR_CREATE_SNAPCHAT_AD_ACCOUNT,
          payload: {
            loading: false,
          },
        });
      });
  };
};

export const updateUserInfo = (info, navigation) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_ACCOUNT_UPDATE,
      payload: true,
    });
    createBaseUrl()
      .put("profile", { ...info })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`a_update_personal_info`, {
          source: "open_personal_details",
          source_action: "a_update_personal_info",
          action_status: data.success ? "success" : "failure",
          error_description: !data.success ? data.message : null,
          ...info,
          businessid: getState().account.mainBusiness.businessid,
        });
        if (data.success) {
          setAuthToken(data.accessToken);
          showMessage({
            message: data.message,
            type: "success",
            position: "top",
          });
          const updateInfo = {
            ...info,
            mobile: info.country_code + info.mobile,
          };
          analytics.identify(getState().auth.userid, {
            ...updateInfo,
          });
          navigation.navigate("Dashboard", {
            source: "open_personal_details",
            source_action: "a_update_personal_info",
          });
          return dispatch({
            type: actionTypes.UPDATE_USERINFO,
            payload: { ...updateInfo },
          });
        } else {
          showMessage({
            message: data.message,
            type: "info",
            position: "top",
          });
        }
        dispatch({
          type: actionTypes.SET_LOADING_ACCOUNT_UPDATE,
          payload: false,
        });
        return data.success;
      })
      .then((success) => {
        if (success) {
          var user = getState().auth.userInfo;
          return dispatch(
            update_user_on_intercom({
              user_id: user.userid,
              name: `${user.firstname} ${user.lastname}`,
              email: user.email,
              phone: user.mobile,
            })
          );
        }
      })

      .catch((err) => {
        // console.log(
        //   "create_snapchat_ad_account_ERROR",
        //   err.message || err.response
        // );
        errorMessageHandler(err);

        dispatch({
          type: actionTypes.SET_LOADING_ACCOUNT_UPDATE,
          payload: false,
        });
      });
  };
};

/**
 * Sends a request to delete a business from a user's account
 *
 * @method
 * @param {String} business_id the id of the business that will be deleted
 * @returns {Function} the function that calls the axios request 'deleteBusiness/${business_id}' and redux actions of
 * (DELETE_BUSINESS_LOADING,DELETE_BUSINESS_ACCOUNT)
 */
export const deleteBusinessAccount = (business_id) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.DELETE_BUSINESS_LOADING, payload: true });
    createBaseUrl()
      .delete(`deleteBusiness/${business_id}`)
      .then((res) => res.data)
      .then((data) => {
        if (data.success) {
          showMessage({ message: data.message, type: "success" });
          dispatch({
            type: actionTypes.DELETE_BUSINESS_ACCOUNT,
            payload: business_id,
          });
        }
      })
      .catch((err) => {
        dispatch({ type: actionTypes.DELETE_BUSINESS_LOADING, payload: false });

        errorMessageHandler(err);
      });
  };
};
/**
 * Sends a request to send an invite to a user to be added to a team
 * The Agecny account admins send: first and last name, email and membership type:
 * Admin, campaign maneger, Client
 *
 *
 * @method
 * @param {Object} info the object containing the information of the invited member
 * @param {String} info.firstname
 * @param {String} info.lastname
 * @param {String} info.email
 * @param {String} info.user_role
 * @param {String} info.businessid
 * @returns {Function} the function the calls the axios request 'memberaccount'
 */

export const inviteTeamMember = (info, resend) => {
  return (dispatch, getState) => {
    const source = resend
      ? "team_management_members_list"
      : "team_management_members_details";
    const source_action = "a_invite_team_member";

    createBaseUrl()
      .post("memberaccount", info)
      .then((res) => res.data)
      .then((data) => {
        analytics.track(`a_invite_team_member`, {
          source,
          source_action,
          timestamp: new Date().getTime(),
          resend_invite: resend,
          action_status: data.success ? "success" : "failure",
          ...info,
          businessid: getState().account.mainBusiness.businessid,
        });
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
        });
        return data;
      })
      .then(
        (data) =>
          data.success &&
          NavigationService.navigate("ManageTeam", {
            source,
            source_action,
          })
      )
      .catch((err) => {
        analytics.track(`a_error`, {
          error_page: source,
          action_status: "failure",
          timestamp: new Date().getTime(),
          source_action: source_action,
          error_description:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          businessid: getState().account.mainBusiness.businessid,
        });
        errorMessageHandler(err);
      });
  };
};
/**
 * Update the current business account information
 * @method
 * @param {string} userid
 * @param {object} info fields that can be updated except for the businessid
 * @param info.businessid {string}
 * @param info.businessname {string}
 * @param info.brandname {string}
 * @param info.businessemail {string}
 * @param info.businesstype {string}
 * @param info.businesscategory {string}
 * @param info.otherBusinessCategory {string}
 * @param info.country {string}
 * @param {function} naviagtion
 *
 * @returns for success navigates back to menu screen
 */
export const updateBusinessInfo = (userid, info, navigation) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.UPDATE_BUSINESS_INFO_LOADING,
      payload: true,
    });
    createBaseUrl()
      .put("businessaccountV2", {
        // businessAccount OLD API
        userid,
        ...info,
      })
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "danger",
          position: "top",
        });
        analytics.track(`a_update_buisness_info`, {
          source_action: "open_business_info",
          source_action: "a_update_buisness_info",
          action_status: data.success ? "success" : "failure",
          timestamp: new Date().getTime(),
          ...info,
          businessid: getState().account.mainBusiness.businessid,
        });
        if (data.success) {
          navigation.navigate("Dashboard", {
            source: "open_business_info",
            source_action: "a_update_buisness_info",
          });
          return dispatch({
            type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
            payload: {
              ...info,
            },
          });
        }
        return dispatch({
          type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
          payload: {
            success: data.success,
            errorMessage: data.message,
          },
        });
      })
      .catch((error) => {
        // console.log(
        //   "updateBusinessInfo error",
        //   error.response || error.message
        // );
        return dispatch({
          type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
          payload: {
            success: false,
            errorMessage: error.response || error.message,
          },
        });
      });
  };
};

/**
 * After a user that was invited opens the app through the deep link
 * The app receives a temporary ID that is sent back to the backend to get
 * the info that was inputted by the Agency account admins
 *
 * @method
 * @param {String} member_id the temporary id of the invited user
 * @returns {Function} the function that calls the axios request 'memberaccount/${member_id}' and redux action of (SET_TEMP_USERINFO)
 */

export const getTempUserInfo = (member_id) => {
  return (dispatch) => {
    createBaseUrl()
      .get(`memberaccount/${member_id}`)
      .then((res) => res.data)
      .then((data) => {
        //if the user tries again to open the same deep link after registering
        //it will return {message:'invalid Account,success:false}
        if (data.success)
          dispatch({
            type: actionTypes.SET_TEMP_USERINFO,
            payload: data.data,
          });
        else {
          showMessage({ message: data.message, type: "warning" });
          //reset navigation
          NavigationService.navigate("SwitchLanguage", {
            source: "registration_detail",
            source_action: "a_set_business_detail",
          });
          dispatch({
            type: actionTypes.SET_TEMP_USERINFO,
            payload: null,
          });
        }
      })
      .catch((err) => {
        //console.log(err);
        errorMessageHandler(err);
      });
  };
};

/**
 * When a user that's already registered is invited, they receive an email with a deep link that opens
 * the app to the dashboard and a modal pops up to accept or decline the invite. This is where to send to
 * the  backend if they accepted or not with their tempID, status
 *
 * @method
 * @param {Int} status the status of the invite, 0 for declining or 1 for accepting
 * @param {Function} toggleInviteModal a function the closes the invite modal after submitting the answer
 * @param {Function} handleDoneWithInvite a function that resets the navigation params and state of the dashboard
 *                                         so that componentDidUpdate doesn't keep showing the InviteModal
 * @returns {Function} the function that calls the axios request 'acceptInvitation', dispatches getBusinessAccounts
 *                      and redux actions of (SET_TEAMINV_LOADING)
 */

export const handleTeamInvite = (status, segmentInfo) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.SET_TEAMINV_LOADING, payload: true });
    createBaseUrl()
      .post(`acceptInvitation`, { ...status })
      .then((res) => res.data)
      .then((data) => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
        });
        analytics.track("a_handle_team_invite", {
          ...segmentInfo,
          action_status: data.success ? "success" : "failure",
          businessid:
            getState().account.mainBusiness &&
            getState().account.mainBusiness.businessid,
        });
        if (data.success) {
          dispatch(getBusinessAccounts());
        }
        NavigationService.navigate("Dashboard", {
          source: segmentInfo.source,
          source_action: segmentInfo.source_action,
        });
        dispatch(resetBusinessInvitee());
        dispatch({
          type: actionTypes.SET_TEAMINV_LOADING,
          payload: false,
        });
      })
      .catch((err) => {
        // console.log(err);
        errorMessageHandler(err);

        dispatch({
          type: actionTypes.SET_TEAMINV_LOADING,
          payload: false,
        });
      });
  };
};

/**
 * Gets the list of team members for a business
 *
 * @method
 * @param {String} business_id the id of the business to retrieve its members
 * @returns {Function} the function that calls the axios request 'businessMembers', and redux actions of (SET_TEAM_MEMBERS_LOADING,SET_TEAM_MEMBERS)
 */
export const getTeamMembers = (business_id) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_TEAM_MEMBERS_LOADING, payload: true });
    createBaseUrl()
      .get(`businessMembers/${business_id}`)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: actionTypes.SET_TEAM_MEMBERS,
          payload: {
            teamMembers: data.data,
            pendingTeamInvites: data.pending_invitation_data,
          },
        });
      })
      .catch((err) => {
        // console.log("getTeamMembers", err);
        dispatch({
          type: actionTypes.SET_TEAM_MEMBERS_LOADING,
          payload: false,
        });
        errorMessageHandler(err);
      });
  };
};

/**
 * For updating members for 1 business at a time
 *
 * @method
 * @param {Object} memberInfo an object containing the info of the updated team member.
 * @param {String} userid
 * @param {String} userrole 1 for admin,2 for campaign manager, 3 for client
 * @param {String} businessid
 * @returns {Function} the function that calls the axios request 'userRole', and redux actions of (SET_TEAM_MEMBERS_LOADING,SET_UPDATED_TEAM_MEMBER)
 */

export const updateTeamMembers = (memberInfo) => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.SET_TEAM_MEMBERS_LOADING, payload: true });
    createBaseUrl()
      .put(`userRole`, { ...memberInfo })
      .then((res) => res.data)
      .then((data) => {
        analytics.track(`a_update_team_member_role`, {
          source: "team_management_member_details",
          source_action: "a_update_team_member_role",
          timestamp: new Date().getTime(),
          action_status: data.success ? "success" : "failure",
          ...memberInfo,
          businessid: getState().account.mainBusiness.businessid,
        });

        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
        });
        if (data.success) {
          dispatch({
            type: actionTypes.SET_UPDATED_TEAM_MEMBER,
            payload: memberInfo,
          });
        } else
          dispatch({
            type: actionTypes.SET_TEAM_MEMBERS_LOADING,
            payload: false,
          });
      })
      .catch((err) => {
        // console.log("updateTeamMembers", err)
        errorMessageHandler(err);

        dispatch({
          type: actionTypes.SET_TEAM_MEMBERS_LOADING,
          payload: false,
        });
      });
  };
};

/**
 *  Deletes the team member from the business
 *
 * @method
 * @param {String} memberId the Id of the member to delete
 * @param {String} businessid the id of the member's business
 * @param {Function} navigation the navigation function to go back to the member's list
 * @returns {Function} the function that calls the axios request '/businessMembers/${memberId}/${businessid}',
 *                      dispatches getTeamMembers() and redux actions of (SET_TEAM_MEMBERS_LOADING,DELETE_TEAM_MEMBER)
 */
export const deleteTeamMembers = (memberId, businessid, navigation) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_TEAM_MEMBERS_LOADING, payload: true });
    const source = "team_management_members_details";
    const source_action = "a_delete_team_member";

    createBaseUrl()
      .delete(`/businessMembers/${memberId}/${businessid}`)
      .then((res) => res.data)
      .then((data) => {
        analytics.track(`a_delete_team_member`, {
          source,
          source_action,
          timestamp: new Date().getTime(),
          action_status: data.success ? "success" : "failure",
          member_id: memberId,
          businessid: businessid,
        });

        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
        });
        if (data.success) {
          dispatch({
            type: actionTypes.DELETE_TEAM_MEMBER,
            payload: { data },
          });
          dispatch(getTeamMembers(businessid));
        } else
          dispatch({
            type: actionTypes.SET_TEAM_MEMBERS_LOADING,
            payload: false,
          });
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => {
        analytics.track(`a_error`, {
          error_page: source,
          action_status: "failure",
          timestamp: new Date().getTime(),
          source_action: source_action,
          error_description:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          businessid: businessid,
        });
        errorMessageHandler(err);

        dispatch({
          type: actionTypes.SET_TEAM_MEMBERS_LOADING,
          payload: false,
        });
      });
  };
};

/**
 * Saves the necessariy info for handling team invites
 * @param {Object} inviteeInfo the info of the business that the user was invited to
 * @param {String} inviteeInfo.businessInvitee the name of the business
 * @param {String} inviteeInfo.invitedEmail the email of the invited account
 * @param {String} inviteeInfo.tempInviteId the temp id to send back to the backend
 */
export const saveBusinessInvitee = (inviteeInfo) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SAVE_INVITEE_INFO,
      payload: inviteeInfo,
    });
  };
};

export const resetBusinessInvitee = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.RESET_INVITEE_INFO,
    });
  };
};
//For updating members for multiple businesses at the same time only from the main business of the account
// export const updateTeamMemberForBusinesses = memberInfo => {
//   return dispatch => {
//     dispatch({ type: actionTypes.SET_TEAM_MEMBERS_LOADING, payload: true });
//     createBaseUrl()
//       .put(`userRoleMultiple`, { ...memberInfo })
//       .then(res => res.data)
//       .then(data => {
//         console.log(data);
//         showMessage({
//           message: data.message,
//           type: data.success ? "success" : "warning"
//         });
//         if (data.success) {
//           dispatch({
//             type: actionTypes.SET_UPDATED_TEAM_MEMBER,
//             payload: memberInfo
//           });
//         } else
//           dispatch({
//             type: actionTypes.SET_TEAM_MEMBERS_LOADING,
//             payload: false
//           });
//       })
//       .catch(err => {
//         console.log("updateTeamMembers", err);
//         dispatch({
//           type: actionTypes.SET_TEAM_MEMBERS_LOADING,
//           payload: false
//         });
//       });
//   };
// };

/**
 *
 * @param {*} info object {
 * businessid,
 * insta_handle,
 * googlemaplink,
 * whatsappnumber,
 * callnumber
 * }
 * @param {*} submitNextStep Needed to go to next step of registration
 */
export const updateWebInfoForBusiness = (info, submitNextStep = false) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.UPDATE_BUSINESS_INFO_LOADING,
      payload: true,
    });

    createBaseUrl()
      .put("businesswebInfo", info)
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "danger",
          position: "top",
        });
        analytics.track(`a_submit_my_website_detail`, {
          source: "my_website_detail",
          source_action: "a_submit_my_website_detail",
          new: submitNextStep ? true : false,
          action_status: data.success ? "success" : "failure",
          error_description: !data.success && data.message,
          ...info,
          businessid:
            getState().account.mainBusiness &&
            getState().account.mainBusiness.businessid,
        });
        if (data.success) {
          dispatch({
            type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
            payload: {
              ...info,
            },
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
            payload: {
              success: data.success,
              errorMessage: data.message,
            },
          });
        }

        return data;
      })
      .then((data) => {
        if (data.success && submitNextStep) {
          submitNextStep(2);
        } else if (data.success && !submitNextStep) {
          NavigationService.navigateBack("MyWebsite", "MyWebsite", {
            source: "my_website_detail",
            source_action: "a_submit_my_website_detail",
          });
        }
      })
      .catch((error) => {
        // console.log(
        //   "updateWebInfoForBusiness error",
        //   error.response || error.message
        // );
        return dispatch({
          type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
          payload: {
            success: false,
            errorMessage: error.response || error.message,
          },
        });
      });
  };
};

export const changeBusinessLogo = (
  info,
  loading,
  cancelUplaod,
  onToggleModal
) => {
  onToggleModal(true);
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.UPDATE_BUSINESS_INFO_LOADING,
      payload: true,
    });
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      "Content-Type": "multipart/form-data;",
    };

    createBaseUrl()
      .post("uploadBusinessLogo", info, {
        onUploadProgress: (ProgressEvent) =>
          loading((ProgressEvent.loaded / ProgressEvent.total) * 100),
        cancelToken: cancelUplaod.token,
      })
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "danger",
          position: "top",
        });
        onToggleModal(false);
        analytics.track(`a_upload_business_logo`, {
          source: "open_my_website",
          source_action: "a_select_media",
          ...info,
          action_status: data.success ? data.success : "failure",
          error_description: !data.success && data.message,
          businessid:
            getState().account.mainBusiness &&
            getState().account.mainBusiness.businessid,
        });
        if (data.success) {
          return dispatch({
            type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
            payload: {
              businesslogo: data.businesslogo,
            },
          });
        } else {
          return dispatch({
            type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
            payload: {
              success: data.success,
              errorMessage: data.message,
            },
          });
        }
      })
      .catch((error) => {
        loading(0);
        onToggleModal(false);
        analytics.track(`a_error`, {
          source: "open_my_website",
          source_action: "a_upload_business_logo",
          action_status: "failure",
          error_description: error.response || error.message,
          businessid:
            getState().account.mainBusiness &&
            getState().account.mainBusiness.businessid,
        });
        // console.log(
        //   "changeBusinessLogo error",
        //   error.response || error.message
        // );
        return dispatch({
          type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
          payload: {
            success: false,
            errorMessage: error.response || error.message,
          },
        });
      });
  };
};
/**
 *
 * @param {*} data {fb_connected: "1", fb_ad_account_id: //value coming from navigator}
 */
export const updateBusinessConnectedToFacebook = (data) => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
      payload: {
        ...data,
      },
    });
  };
};

export const crashAppForSpamUser = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: actionTypes.CRASH_APP,
      payload: false,
    });
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      const result = await createBaseUrl().get(`appAccessStatus`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data) {
        const data = result.data;
        if (data && data.error) {
          analytics.track("app_crash", {
            source: "suspicous_user",
            source_action: "a_app_crash",
            businessid:
              getState().account.mainBusiness &&
              getState().account.mainBusiness.businessid,
          });
          NavigationService.navigate("SuspendedWarning", {
            source: "app_crash",
            source_action: "a_app_crash",
          });
          return dispatch({
            type: actionTypes.CRASH_APP,
            payload: true,
          });
        }
      }
    }
  };
};

export const searchForBusinessInBackend = (businessName) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.BUSINESS_SEARCH_LOADING,
      payload: true,
    });
    createBaseUrl()
      .get(`searchbusinessaccounts/${businessName}`)
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: actionTypes.BUSINESS_SEARCH_FOUND,
          payload: data.business_accounts,
        });
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
        errorMessageHandler(err);
      });
  };
};

export const checkBusinessVerified = (businessid, translate) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECK_BUSINESS_STATUS,
      payload: true,
    });
    createBaseUrl()
      .get(`businessApprovalStatus/${businessid}`)
      .then((res) => res.data)
      .then((data) => {
        console.log("data", JSON.stringify(data, null, 2));
        let accountApproved =
          data.success &&
          data.business_accounts &&
          data.business_accounts.approved === "1";
        analytics.track(`a_check_status`, {
          source: "start_verify",
          source_action: "a_check_status",
          verification_channel: "Business",
          businessid: businessid,
          business_approved:
            data.business_accounts && data.business_accounts.approved,
        });
        dispatch(
          updateBusinessConnectedToFacebook({
            approved: data.business_accounts && data.business_accounts.approved,
          })
        );

        if (accountApproved) {
          NavigationService.navigate("Dashboard", {
            source: "start_verify",
            source_action: "a_check_status",
          });
        }
        let approvedKey =
          data.business_accounts && data.business_accounts.approved;
        let message = "";
        let title = null;
        switch (approvedKey) {
          case "0":
            message =
              "To give you the best service that we can offer, our team needs to verify your business first Please make sure the information you entered during registration is accurate before submitting If you need to make changes, you can do so in the menu under 'Business Info' and 'Personal Info'";
            break;
          case "1":
            title = "Your Business Is Now Verified!";
            message = "Get started and launch your ads now";
            break;
          case "2":
            title = "Request Submitted";
            message =
              "We'll be notifying you within 24 hours, so keep your eyes peeled for our app notification and email";
            break;
          case "3":
            dispatch(
              updateBusinessConnectedToFacebook({
                reject_reason:
                  data.business_accounts &&
                  data.business_accounts.reject_reason,
              })
            );
            message = "Your business could not be verified";
            break;
          default:
            message = "";
            break;
        }
        showMessage({
          type: accountApproved ? "success" : "warning",
          message: title && translate(title),
          description: translate(message),
          duration: 5000,
        });
        return dispatch({
          type: actionTypes.CHECK_BUSINESS_STATUS,
          payload: false,
        });
      })
      .catch((error) => {
        // console.log("checkBusinessVerified Error", error);
        return dispatch({
          type: actionTypes.CHECK_BUSINESS_STATUS,
          payload: false,
        });
      });
  };
};
