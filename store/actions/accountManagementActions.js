import axios from "axios";
import { showMessage } from "react-native-flash-message";
import analytics from "@segment/analytics-react-native";
import * as Segment from "expo-analytics-segment";
import { AsyncStorage, Animated } from "react-native";
import { persistor } from "../index";
import * as actionTypes from "./actionTypes";
import { setAuthToken, getBusinessAccounts } from "./genericActions";
import createBaseUrl from "./createBaseUrl";
import { errorMessageHandler } from "./ErrorActions";
import NavigationService from "../../NavigationService";
import { AdjustEvent, Adjust } from "react-native-adjust";
import segmentEventTrack from "../../components/segmentEventTrack";
import { getUniqueId } from "react-native-device-info";

export const changeBusiness = business => {
  return (dispatch, getState) => {
    persistor.purge();
    Segment.identifyWithTraits(getState().auth.userid, {
      businessname: business.businessname,
      businessid: business.businessid,
      revenue: business.revenue
    });

    return dispatch({
      type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
      payload: { ...business }
    });
  };
};

export const createBusinessAccount = (account, navigation) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
      payload: true
    });
    createBaseUrl()
      .post(`businessaccountV2`, account) //businessaccount OLD API
      .then(res => {
        return res.data;
      })
      .then(data => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning",
          position: "top"
        });
        //incase of an error?? need handling
        if (data.success) {
          dispatch({
            type: actionTypes.SET_CURRENT_BUSINESS_ACCOUNT,
            payload: { ...data.data, ...account }
          });
          NavigationService.navigate("Dashboard");
          return dispatch({
            type: actionTypes.ADD_BUSINESS_ACCOUNT,
            payload: {
              ...data.data,
              ...account
            }
          });
        }
      })
      .catch(err => {
        // console.log("error creating new bsn", err.message || err.response);
        errorMessageHandler(err);

        dispatch({
          type: actionTypes.ERROR_ADD_BUSINESS_ACCOUNT,
          payload: {
            loading: false
          }
        });
      });
  };
};

export const addressForm = (address, navigation, addressId, translate) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.SET_BILLING_ADDRESS_LOADING,
        payload: true
      });
      const response = await createBaseUrl().put("businessaddress", {
        businessid: getState().account.mainBusiness.businessid,
        id: addressId,
        ...address
      });
      var time = new Animated.Value(0);
      if (response.data && response.data.message === "Address ID missing") {
        const respData = await createBaseUrl().post("businessaddress", {
          businessid: getState().account.mainBusiness.businessid,
          ...address
        });

        Animated.timing(time, {
          toValue: 1,
          duration: 2000
        }).start(() => {
          showMessage({
            message: respData.data.message,
            type: respData.data.success ? "success" : "warning",
            position: "top"
          });
          if (respData.data.success) navigation.goBack();
          return dispatch({
            type: actionTypes.ADD_ADDRESS,
            payload: respData.data
          });
        });
      } else {
        Animated.timing(time, {
          toValue: 1,
          duration: 2000
        }).start(() => {
          showMessage({
            message: translate(response.data.message),
            type: response.data.success ? "success" : "warning",
            position: "top"
          });
          if (response.data.success) {
            navigation.goBack();
          }
          return dispatch({
            type: actionTypes.ADD_ADDRESS,
            payload: response.data
          });
        });
      }
    } catch (error) {
      // console.log("Error while put/post address form", error.message);
      errorMessageHandler(err);

      return dispatch({
        type: actionTypes.ERROR_ADD_ADDRESS
      });
    }
  };
};

export const getAddressForm = () => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.GET_BILLING_ADDRESS_LOADING,
      payload: true
    });
    createBaseUrl()
      .get(`businessaddresses/${getState().account.mainBusiness.businessid}`)
      .then(response => {
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
                avenue: ""
              }
            });
          }
        return dispatch({
          type: actionTypes.GET_BILLING_ADDRESS,
          payload: response.data.business_accounts
        });
      })
      .catch(err => {
        // console.log("Get Billing Address Error: ", err.message || err.response);
        errorMessageHandler(err);

        return dispatch({
          type: actionTypes.ERROR_GET_BILLING_ADDRESS,
          payload: {}
        });
      });
  };
};
// IS NOT IN THE AUTH TOKEN SO MIGHT NEED ANOTHER API TO FETCH ALL IDS
export const create_snapchat_ad_account = (id, navigation) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
      payload: true
    });
    createBaseUrl()
      .post("snapadaccounts", { businessid: id })
      .then(res => {
        return res.data;
      })
      .then(data => {
        analytics.track(`a_accept_terms_and_condition`, {
          source: "terms_and_condition",
          source_action: "a_accept_terms_and_condition",
          campaign_channel: "snapchat",
          timestamp: new Date().getTime(),
          device_id: getUniqueId(),
          businessid: id,
          action_status: data.success ? "success" : "failure"
        });
        if (data.success) {
          let adjustSnapAdAccTracker = new AdjustEvent("vsf6z0");
          Adjust.trackEvent(adjustSnapAdAccTracker);
          return dispatch({
            type: actionTypes.CREATE_SNAPCHAT_AD_ACCOUNT,
            payload: { data: data }
          });
        } else {
          showMessage({
            message: data.message,
            type: "info",
            position: "top"
          });
          dispatch({
            type: actionTypes.SET_LOADING_ACCOUNT_MANAGEMENT,
            payload: false
          });
        }
      })
      .catch(err => {
        // console.log(
        //   "create_snapchat_ad_account_ERROR",
        //   err.message || err.response
        // );
        analytics.track(`a_error`, {
          error_page: "terms_and_condition",
          action_status: "failure",
          campaign_channel: "snapchat",
          timestamp: new Date().getTime(),
          device_id: getUniqueId(),
          source_action: "a_accept_terms_and_condition",
          error_description:
            err.message ||
            err.response ||
            "Something went wrong, please try again."
        });
        errorMessageHandler(err);

        return dispatch({
          type: actionTypes.ERROR_CREATE_SNAPCHAT_AD_ACCOUNT,
          payload: {
            loading: false
          }
        });
      });
  };
};

export const updateUserInfo = (info, navigation) => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_LOADING_ACCOUNT_UPDATE,
      payload: true
    });
    createBaseUrl()
      .put("profile", { ...info })
      .then(res => {
        return res.data;
      })
      .then(data => {
        if (data.success) {
          setAuthToken(data.accessToken);
          Segment.track("Profile updated Successfully");
          showMessage({
            message: data.message,
            type: "success",
            position: "top"
          });
          const updateInfo = {
            ...info,
            mobile: info.country_code + info.mobile
          };
          navigation.goBack();
          return dispatch({
            type: actionTypes.UPDATE_USERINFO,
            payload: { ...updateInfo }
          });
        } else {
          showMessage({
            message: data.message,
            type: "info",
            position: "top"
          });
        }
        dispatch({
          type: actionTypes.SET_LOADING_ACCOUNT_UPDATE,
          payload: false
        });
      })

      .catch(err => {
        // console.log(
        //   "create_snapchat_ad_account_ERROR",
        //   err.message || err.response
        // );
        errorMessageHandler(err);

        dispatch({
          type: actionTypes.SET_LOADING_ACCOUNT_UPDATE,
          payload: false
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
export const deleteBusinessAccount = business_id => {
  return dispatch => {
    dispatch({ type: actionTypes.DELETE_BUSINESS_LOADING, payload: true });
    createBaseUrl()
      .delete(`deleteBusiness/${business_id}`)
      .then(res => res.data)
      .then(data => {
        if (data.success) {
          showMessage({ message: data.message, type: "success" });
          dispatch({
            type: actionTypes.DELETE_BUSINESS_ACCOUNT,
            payload: business_id
          });
        }
      })
      .catch(err => {
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

export const inviteTeamMember = info => {
  return dispatch => {
    createBaseUrl()
      .post("memberaccount", info)
      .then(res => res.data)
      .then(data => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning"
        });
        return data;
      })
      .then(data => data.success && NavigationService.navigate("ManageTeam"))
      .catch(err => {
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
  return dispatch => {
    dispatch({
      type: actionTypes.UPDATE_BUSINESS_INFO_LOADING,
      payload: true
    });
    createBaseUrl()
      .put("businessaccountV2", {
        // businessAccount OLD API
        userid,
        ...info
      })
      .then(resp => {
        return resp.data;
      })
      .then(data => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "danger",
          position: "top"
        });
        if (data.success) {
          navigation.navigate("Dashboard");
          return dispatch({
            type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
            payload: {
              ...info
            }
          });
        }
        return dispatch({
          type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
          payload: {
            success: data.success,
            errorMessage: data.message
          }
        });
      })
      .catch(error => {
        // console.log(
        //   "updateBusinessInfo error",
        //   error.response || error.message
        // );
        return dispatch({
          type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
          payload: {
            success: false,
            errorMessage: error.response || error.message
          }
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

export const getTempUserInfo = member_id => {
  return dispatch => {
    createBaseUrl()
      .get(`memberaccount/${member_id}`)
      .then(res => res.data)
      .then(data => {
        //if the user tries again to open the same deep link after registering
        //it will return {message:'invalid Account,success:false}
        if (data.success)
          dispatch({
            type: actionTypes.SET_TEMP_USERINFO,
            payload: data.data
          });
        else {
          showMessage({ message: data.message, type: "warning" });
          //reset navigation
          NavigationService.navigate("SwitchLanguage");
          dispatch({
            type: actionTypes.SET_TEMP_USERINFO,
            payload: null
          });
        }
      })
      .catch(err => {
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

export const handleTeamInvite = status => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.SET_TEAMINV_LOADING, payload: true });
    createBaseUrl()
      .post(`acceptInvitation`, { ...status })
      .then(res => res.data)
      .then(data => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning"
        });
        if (data.success) {
          dispatch(getBusinessAccounts());
        }
        NavigationService.navigate("Dashboard");
        dispatch(resetBusinessInvitee());
        dispatch({
          type: actionTypes.SET_TEAMINV_LOADING,
          payload: false
        });
      })
      .catch(err => {
        // console.log(err);
        errorMessageHandler(err);

        dispatch({
          type: actionTypes.SET_TEAMINV_LOADING,
          payload: false
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
export const getTeamMembers = business_id => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_TEAM_MEMBERS_LOADING, payload: true });
    createBaseUrl()
      .get(`businessMembers/${business_id}`)
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: actionTypes.SET_TEAM_MEMBERS,
          payload: {
            teamMembers: data.data,
            pendingTeamInvites: data.pending_invitation_data
          }
        });
      })
      .catch(err => {
        // console.log("getTeamMembers", err);
        dispatch({
          type: actionTypes.SET_TEAM_MEMBERS_LOADING,
          payload: false
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

export const updateTeamMembers = memberInfo => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_TEAM_MEMBERS_LOADING, payload: true });
    createBaseUrl()
      .put(`userRole`, { ...memberInfo })
      .then(res => res.data)
      .then(data => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning"
        });
        if (data.success) {
          dispatch({
            type: actionTypes.SET_UPDATED_TEAM_MEMBER,
            payload: memberInfo
          });
        } else
          dispatch({
            type: actionTypes.SET_TEAM_MEMBERS_LOADING,
            payload: false
          });
      })
      .catch(err => {
        // console.log("updateTeamMembers", err)
        errorMessageHandler(err);

        dispatch({
          type: actionTypes.SET_TEAM_MEMBERS_LOADING,
          payload: false
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
  return dispatch => {
    dispatch({ type: actionTypes.SET_TEAM_MEMBERS_LOADING, payload: true });
    createBaseUrl()
      .delete(`/businessMembers/${memberId}/${businessid}`)
      .then(res => res.data)
      .then(data => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "warning"
        });
        if (data.success) {
          dispatch({
            type: actionTypes.DELETE_TEAM_MEMBER,
            payload: { data }
          });
          dispatch(getTeamMembers(businessid));
        } else
          dispatch({
            type: actionTypes.SET_TEAM_MEMBERS_LOADING,
            payload: false
          });
      })
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        // console.log("deleteTeamMembers", err);
        errorMessageHandler(err);

        dispatch({
          type: actionTypes.SET_TEAM_MEMBERS_LOADING,
          payload: false
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
export const saveBusinessInvitee = inviteeInfo => {
  return dispatch => {
    dispatch({
      type: actionTypes.SAVE_INVITEE_INFO,
      payload: inviteeInfo
    });
  };
};

export const resetBusinessInvitee = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.RESET_INVITEE_INFO
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
  return dispatch => {
    dispatch({
      type: actionTypes.UPDATE_BUSINESS_INFO_LOADING,
      payload: true
    });

    createBaseUrl()
      .put("businesswebInfo", info)
      .then(resp => {
        return resp.data;
      })
      .then(data => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "danger",
          position: "top"
        });
        if (data.success) {
          dispatch({
            type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
            payload: {
              ...info
            }
          });
        } else {
          dispatch({
            type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
            payload: {
              success: data.success,
              errorMessage: data.message
            }
          });
        }

        return data;
      })
      .then(data => {
        if (data.success && submitNextStep) {
          segmentEventTrack("Successfully register website information");
          submitNextStep(2);
        } else if (data.success && !submitNextStep) {
          segmentEventTrack("Successfully update website information");
          NavigationService.navigateBack("MyWebsite");
        }
      })
      .catch(error => {
        // console.log(
        //   "updateWebInfoForBusiness error",
        //   error.response || error.message
        // );
        return dispatch({
          type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
          payload: {
            success: false,
            errorMessage: error.response || error.message
          }
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

  return dispatch => {
    dispatch({
      type: actionTypes.UPDATE_BUSINESS_INFO_LOADING,
      payload: true
    });
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      "Content-Type": "multipart/form-data;"
    };

    createBaseUrl()
      .post("uploadBusinessLogo", info, {
        onUploadProgress: ProgressEvent =>
          loading((ProgressEvent.loaded / ProgressEvent.total) * 100),
        cancelToken: cancelUplaod.token
      })
      .then(resp => {
        return resp.data;
      })
      .then(data => {
        showMessage({
          message: data.message,
          type: data.success ? "success" : "danger",
          position: "top"
        });
        onToggleModal(false);

        if (data.success) {
          segmentEventTrack(data.message);
          return dispatch({
            type: actionTypes.UPDATE_BUSINESS_INFO_SUCCESS,
            payload: {
              businesslogo: data.businesslogo
            }
          });
        } else {
          segmentEventTrack(data.message);
          return dispatch({
            type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
            payload: {
              success: data.success,
              errorMessage: data.message
            }
          });
        }
      })
      .catch(error => {
        loading(0);
        onToggleModal(false);
        // console.log(
        //   "changeBusinessLogo error",
        //   error.response || error.message
        // );
        return dispatch({
          type: actionTypes.UPDATE_BUSINESS_INFO_ERROR,
          payload: {
            success: false,
            errorMessage: error.response || error.message
          }
        });
      });
  };
};
