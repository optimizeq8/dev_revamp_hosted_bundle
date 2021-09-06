export let updateBusinessSuccessResponseData = {
  api_version: "v1",
  success: true,
  message: "Business updated",
  data: {
    id: 11,
    name: "Updated Business name",
    country: { id: 2, name: "Kuwait" },
    type: "SME or Startup",
    approval_status: "Pending",
  },
};
export let createBusinessSuccessResponseData = {
  api_version: "v1",
  success: true,
  message: "Business Created",
  data: {
    id: 28,
    name: "New Business",
    country: {
      id: 2,
      name: "Kuwait",
    },
    type: "Agency",
    approval_status: "Pending",
  },
};

export let sameNameResponseData = {
  api_version: "v1",
  error: true,
  message: "Validation failed",
  data: {
    name: ["The name has already been taken."],
  },
};

export let wrongBusinessIDResponseData = {
  message: "No query results for model [App\\Business] wrongbusinessid",
};

export let approvalRequestSuccessResponse = (status) => ({
  api_version: "v1",
  success: true,
  message: "Approval status updated",
  data: {
    id: 28,
    name: "New Business",
    country: {
      id: 2,
      name: "Kuwait",
    },
    type: "Agency",
    approval_status: "User " + status,
  },
});

export let acceptedSnapTermsResponse = {
  api_version: "v1",
  success: true,
  message: "Business list",
  data: {
    id: 10,
    name: "OP Business",
    country: {
      id: 3,
      name: "UAE",
    },
    type: "SME or Startup",
    category: "Other",
    approval_status: 0,
    snap_terms: true,
    fb_connected: 0,
    instagram_handle: null,
    business_website: null,
    snap_ad_account_id: "TEMP-SNAP-ADACCOUNT-ID",
    fb_ad_account_id: "TEMP-FB-ADACCOUNT-ID",
    walletamount: "0.00",
  },
};
