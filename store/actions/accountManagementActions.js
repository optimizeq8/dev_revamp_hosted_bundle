import axios from "axios";
import { showMessage } from "react-native-flash-message";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
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
    analytics.identify(`${getState().auth.userid}`, {
      business_name: business.name,
      business_id: business.id,
      revenue: business.revenue,
      ltv: business.ltv,
      wallet_amount: business.wallet_amount,
    });

    analytics.group(`${business.id}`, {
      business_id: business.id,
      name: business.name,
      company: business.name,
      revenue: business.revenue,
      ltv: business.ltv,
      wallet_amount: business.wallet_amount,
    });
    dispatch({
      type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
      payload: { ...business },
    });
    dispatch(getBusinessAccounts(true));
  };
};

export const createBusinessAccount = (account, navigation) => {
  console.log("account", account);
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
      payload: true,
    });
    return createBaseUrl()
      .post(`business`, { ...account, type: "SME or Startup" })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log("createbusiness data", JSON.stringify(data, null, 2));
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top",
        });
        //incase of an error?? need handling
        if (data.success) {
          analytics.track(`Form Submitted`, {
            form_type: "Business Creation Form",
            form_context: {
              business_name: account.name,
              business_category: account.businesscategory,
              other_business_category: account.otherBusinessCategory,
              country: account.country,
              instagram_handle: account.instagram_handle,
              user_role: data.user_role,
              approved: data.approved,
              instagram_access: data.instagram_access,
            },
          });
          analytics.identify(`${getState().auth.userid}`, {
            business_name: data.data.name,
            business_id: data.data.id,
            revenue: 0,
            ltv: 0,
            wallet_amount: 0,
          });
          dispatch({
            type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
            payload: { ...data.data },
          });
          navigation.navigate("Dashboard", {
            source: "CreateBusinessAccount",
            source_action: `a_create_business_account`,
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
        console.log("error creating new bsn", err);
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
        businessid: getState().account.mainBusiness.id,
        id: addressId,
        ...address,
      });
      var time = new Animated.Value(0);
      if (response.data && response.data.message === "Address ID missing") {
        const respData = await createBaseUrl().post("businessaddress", {
          businessid: getState().account.mainBusiness.id,
          ...address,
        });
        analytics.track(`Form Submitted`, {
          form_type: "Address Form",
          form_context: {
            ...address,
          },
          error_description: !respData.data.success
            ? respData.data.message
            : null,
          action_status: respData.data.success ? "success" : "failed",
          business_id: getState().account.mainBusiness.id,
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
              source: "AddressForm",
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
          analytics.track(`Form Submitted`, {
            form_type: "Address Form",
            form_context: {
              ...address,
            },
            error_description: !response.data.success
              ? response.data.message
              : null,
            action_status: response.data.success ? "success" : "failed",
            business_id: getState().account.mainBusiness.id,
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
      .get(`businessaddresses/${getState().account.mainBusiness.id}`)
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
    return createBaseUrl()
      .post(`business/${info.business_id}/snap/terms`)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        analytics.track(`Snapchat AD Account Created`, {
          source: "SnapchatCreateAdAcc",
          campaign_channel: "snapchat",
          form_context: { ...info },
          action_status: data.success ? "success" : "failure",
          business_id: getState().account.mainBusiness.id,
        });
        if (data.success) {
          // let adjustSnapAdAccTracker = new AdjustEvent("vsf6z0");
          // Adjust.trackEvent(adjustSnapAdAccTracker);
          return dispatch({
            type: actionTypes.CREATE_SNAPCHAT_AD_ACCOUNT,
            payload: data.data,
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
        analytics.track(`Form Error Made`, {
          source: "SnapchatCreateAdAcc",
          campaign_channel: "snapchat",
          source_action: "a_accept_ad_TNC",
          error_description:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          business_id: getState().account.mainBusiness.id,
        });
        errorMessageHandler(err);

        return dispatch({
          type: actionTypes.ERROR_CREATE_SNAPCHAT_AD_ACCOUNT,
          payload: {
            loading: false,
            errorData: err.response.hasOwnProperty("data") && err.response.data,
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
        analytics.track(`Form Submitted`, {
          form_type: "Personal Info Form",
          form_context: {
            ...info,
          },
          action_status: data.success ? "success" : "failure",
          error_description: !data.success ? data.message : null,
          business_id: getState().account.mainBusiness.id,
        });
        if (data.success) {
          setAuthToken(data.accessToken);
          let decodedUser = jwt_decode(data.accessToken);
          console.log("decode", decodedUser);
          showMessage({
            message: data.message,
            type: "success",
            position: "top",
          });
          const updateInfo = {
            first_name: decodedUser.firstname,
            last_name: decodedUser.lastname,
            mobile: mobile,
          };

          analytics.identify(`${getState().auth.userid}`, {
            ...updateInfo,
          });
          navigation.navigate("Dashboard", {
            source: "PersonalInfo",
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
    return createBaseUrl()
      .delete(`deleteBusiness/${business_id}`)
      .then((res) => res.data)
      .then((data) => {
        showMessage({
          message: "Business deleted successfully",
          type: "success",
        });
        dispatch({
          type: actionTypes.DELETE_BUSINESS_ACCOUNT,
          payload: business_id,
        });
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
 * @param {String} info.id
 * @returns {Function} the function the calls the axios request 'memberaccount'
 */

export const inviteTeamMember = (info, resend) => {
  return (dispatch, getState) => {
    const source = resend ? "TeamManagment" : "AddOrEditTeamMember";
    const source_action = "a_invite_team_member";

    createBaseUrl()
      .post("memberaccount", info)
      .then((res) => res.data)
      .then((data) => {
        analytics.track(`Form Submitted`, {
          form_type: "Team Member Form",
          form_context: {
            ...info,
            resend_invite: resend,
          },
          action_status: data.success ? "success" : "failure",
          business_id: getState().account.mainBusiness.id,
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
        analytics.track(`Form Error Made`, {
          source: source,
          form_field: source_action,
          error_description:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          business_id: getState().account.mainBusiness.id,
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
 * @param info.id {string}
 * @param info.name {string}
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
export const updateBusinessInfo = (businessid, info, navigation, translate) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.UPDATE_BUSINESS_INFO_LOADING,
      payload: true,
    });
    return axios({
      url: `https://api.devoa.optimizeapp.com/api/business/${businessid}`,
      method: "PATCH",
      data: { ...info },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.data)
      .then((data) => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "danger",
          position: "top",
        });
        analytics.track(`Form Submitted`, {
          form_type: "Update Business Info Form",
          form_context: {
            business_name: info.name,
            business_category: info.businesscategory,
            country: info.country,
            business_type: info.businesstype,
            other_business_category: info.otherBusinessCategory,
            business_id: businessid,
          },
          business_id: businessid,
        });
        if (data.data) {
          dispatch(checkBusinessVerified(businessid, translate));
          //Dashboard
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
        } else
          return dispatch({
            type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
            payload: {
              success: false,
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
            errorMessage: error.response.data.message || error.response.data,
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
            source: "RegistrationDetailForm",
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
        analytics.track("Account Added User", {
          ...segmentInfo,
          action_status: data.success ? "success" : "failure",
          business_id:
            getState().account.mainBusiness &&
            getState().account.mainBusiness.id,
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
        analytics.track(`Team Member Updated`, {
          source: "AddOrEditTeamMember",
          action_status: data.success ? "success" : "failure",
          ...memberInfo,
          business_id: getState().account.mainBusiness.id,
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
    const source = "AddOrEditTeamMember";
    const source_action = "a_delete_team_member";

    createBaseUrl()
      .delete(`/businessMembers/${memberId}/${businessid}`)
      .then((res) => res.data)
      .then((data) => {
        analytics.track(`Team Member Deleted`, {
          source,
          action_status: data.success ? "success" : "failure",
          member_id: memberId,
          business_id: businessid,
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
        analytics.track(`Form Error Made`, {
          source,
          action_status: "failure",
          source_action: source_action,
          error_description:
            err.message ||
            err.response ||
            "Something went wrong, please try again.",
          business_id: businessid,
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
        analytics.track(`Form Submitted`, {
          form_type: "Website Info Form",
          form_context: {
            business_id: info.id,
            whatsapp_number: info.whatsappnumber,
            insta_handle: info.insta_handle,
            snapchat_handle: info.snapchat_handle,
            google_map_link: info.googlemaplink,
            call_number: info.callnumber,
          },
          error_description: !data.success && data.message,
          business_id:
            getState().account.mainBusiness &&
            getState().account.mainBusiness.id,
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
            source: "MyWebsite",
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
        analytics.track(`Business Logo Updated`, {
          source: "MyWbsite",
          action_status: data.success ? data.success : "failure",
          error_description: !data.success && data.message,
          business_id:
            getState().account.mainBusiness &&
            getState().account.mainBusiness.id,
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
        analytics.track(`Form Error Made`, {
          source: "MyWebsite",
          source_action: "a_upload_business_logo",
          error_description: error.response || error.message,
          business_id:
            getState().account.mainBusiness &&
            getState().account.mainBusiness.id,
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
          analytics.track("App Crashed For Suspicous User", {
            source: "CrashAppForSpamUser",
            business_id:
              getState().account.mainBusiness &&
              getState().account.mainBusiness.id,
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

export const checkBusinessVerified = (business_id, translate) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CHECK_BUSINESS_STATUS,
      payload: true,
    });
    return createBaseUrl()
      .get(`business/${business_id}/request_approval`)
      .then((res) => res.data.data)
      .then((data) => {
        let accountApproved =
          data.success && data.approval_status && data.approval_status === 1;
        analytics.track(`Business Verification Checked`, {
          source: "VerifyBusiness",
          verification_mode: "Business",
          business_id: business_id,
          business_approved: data.approval_status,
        });
        dispatch(
          updateBusinessConnectedToFacebook({
            approved: data.approval_status,
          })
        );

        if (accountApproved) {
          NavigationService.navigate("Dashboard", {
            source: "start_verify",
            source_action: "a_check_status",
          });
        }
        let approvedKey = data.approval_status;
        let message = null;
        let title = null;
        switch (approvedKey) {
          case 0:
            // message =
            //   "To give you the best service that we can offer, our team needs to verify your business first Please make sure the information you entered during registration is accurate before submitting If you need to make changes, you can do so in the menu under 'Business Info' and 'Personal Info'";
            break;
          case 1:
            title = "Your Business Is Now Verified!";
            message = "Get started and launch your ads now";
            showMessage({
              type: "success",
              message: translate(title),
              description: translate(message),
              duration: 10000,
            });
            break;
          case 2:
            title = "Request Submitted";
            message =
              "We'll be notifying you within 24 hours, so keep your eyes peeled for our app notification and email";

            showMessage({
              type: "info",
              message: translate(title),
              description: translate(message),
              duration: 10000,
            });
            break;
          case 3:
            dispatch(
              updateBusinessConnectedToFacebook({
                reject_reason: !!data.reject_reason && data.reject_reason,
              })
            );
            // message = "Your business could not be verified";
            break;
          default:
            title = undefined;
            message = "";
            break;
        }

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
