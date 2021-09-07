export let snapAdCampaignCreatedResponse = {
  api_version: "v1",
  success: true,
  message: "Campaign Created",
  data: {
    id: 9,
    name: "First Campaign",
    start_date: "2021-12-12T00:00:00.000000Z",
    end_date: "2021-12-12T11:59:59.000000Z",
    type: "snapchat",
    business_id: 10,
    campaign: {
      id: 7,
      objective: "WEB_VIEW",
      campaign_id: null,
      status: "PAUSED",
      adsquads: null,
      metrics: null,
      collection_creatives: [],
      composite_creatives: null,
    },
  },
};

export let acceptSnapTermsResponse = {
  api_version: "v1",
  error: true,
  message: "Please accept snap terms and conditions",
  data: null,
};

export let unauthorizedBusinessResponse = {
  api_version: "v1",
  error: true,
  message: "Unauthenticated.",
  data: {
    error: ["Unauthorized"],
  },
};
export let oldDatesCampaignResponse = {
  api_version: "v1",
  error: true,
  message: "Validation error",
  data: {
    start_date: ["The given data was invalid."],
  },
};
