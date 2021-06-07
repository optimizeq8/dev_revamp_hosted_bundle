export const mothersDayInterest = [
  {
    hasChild: 0,
    id: "SLC_5",
    name: "Beauty Mavens",
    parentId: "SLC_0",
    path: "/Beauty Mavens",
    source: "SNAPCHAT",
  },
  {
    hasChild: 0,
    id: "SLC_11",
    name: "Fashion & Style Gurus",
    parentId: "SLC_0",
    path: "/Fashion & Style Gurus",
    source: "SNAPCHAT",
  },
  {
    hasChild: 0,
    id: "SLC_36",
    name: "Green Living Enthusiasts",
    parentId: "SLC_0",
    path: "/Green Living Enthusiasts",
    source: "SNAPCHAT",
  },
  {
    hasChild: 0,
    id: "SLC_54",
    name: "Celebrity News Watchers",
    parentId: "SLC_52",
    path: "/News Watchers/Celebrity News Watchers",
    source: "SNAPCHAT",
  },
  {
    hasChild: 0,
    id: "SLC_162",
    name: "Cosmetics Shoppers",
    parentId: "SLC_61",
    path: "/Shoppers/Cosmetics Shoppers",
    source: "SNAPCHAT",
  },
  {
    hasChild: 0,
    id: "SLC_63",
    name: "Department Store Shoppers",
    parentId: "SLC_61",
    path: "/Shoppers/Department Store Shoppers",
    source: "SNAPCHAT",
  },
  {
    hasChild: 0,
    id: "SLC_166",
    name: "Jewelry & Watch Shoppers",
    parentId: "SLC_61",
    path: "/Shoppers/Jewelry & Watch Shoppers",
    source: "SNAPCHAT",
  },
  {
    hasChild: 0,
    id: "SLC_64",
    name: "Luxury Shoppers",
    parentId: "SLC_61",
    path: "/Shoppers/Luxury Shoppers",
    source: "SNAPCHAT",
  },
  {
    hasChild: 0,
    id: "SLC_65",
    name: "Online Shoppers",
    parentId: "SLC_61",
    path: "/Shoppers/Online Shoppers",
    source: "SNAPCHAT",
  },
  {
    hasChild: 0,
    id: "SLC_106",
    name: "Shopping Mall Shoppers",
    parentId: "SLC_61",
    path: "/Shoppers/Shopping Mall Shoppers",
    source: "SNAPCHAT",
  },
  {
    hasChild: 0,
    id: "SLC_176",
    name: "Women's Fashion Shoppers",
    parentId: "SLC_61",
    path: "/Shoppers/Women's Fashion Shoppers",
    source: "SNAPCHAT",
  },
  {
    hasChild: 0,
    id: "SLC_91",
    name: "Wellness & Healthy Lifestyle",
    parentId: "SLC_0",
    path: "/Wellness & Healthy Lifestyle",
    source: "SNAPCHAT",
  },
  {
    hasChild: 0,
    id: "SLC_88",
    name: "Women's Lifestyle",
    parentId: "SLC_0",
    path: "/Women's Lifestyle",
    source: "SNAPCHAT",
  },
];

export const mothersDayTargeting = {
  demographics: [
    {
      gender: "",
      languages: ["ar", "en"],
      min_age: 18,
      max_age: 35,
    },
  ],
  interests: [
    {
      category_id: [
        "SLC_5",
        "SLC_11",
        "SLC_36",
        "SLC_54",
        "SLC_162",
        "SLC_63",
        "SLC_166",
        "SLC_64",
        "SLC_65",
        "SLC_106",
        "SLC_176",
        "SLC_91",
        "SLC_88",
      ],
    },
  ],
  devices: [{ os_type: "iOS" }],
};
export const gender = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "All", value: "" },
];
export const OSType = [
  { value: "iOS", label: "iOS" },
  { value: "ANDROID", label: "ANDROID" },
  { label: "All", value: "" },
];

export const country_regions = [
  {
    country_code: "kw",
    country_name: "Kuwait",
    regions: [
      {
        id: "25678",
        code: "ah",
        name: "Ahmadi",
      },

      {
        id: "25680",
        code: "ku",
        name: "Kuwait City (Capital)",
      },
    ],
  },
  {
    country_code: "ae",
    country_name: "UAE",
    regions: [
      {
        id: "25151",
        code: "aj",
        name: "Ajman",
      },
      {
        id: "25152",
        code: "az",
        name: "Abu Dhabi",
      },
      {
        id: "25153",
        code: "du",
        name: "Dubai",
      },
      {
        id: "25154",
        code: "fu",
        name: "Fujairah",
      },

      {
        id: "25156",
        code: "sh",
        name: "Sharjah",
      },
      {
        id: "25157",
        code: "uq",
        name: "Umm Al - Quwain",
      },
    ],
  },
  {
    country_code: "sa",
    country_name: "KSA",
    regions: [
      {
        id: "12205",
        code: "04",
        name: "Eastern Province",
      },
      {
        id: "12207",
        code: "02",
        name: "Makkah",
      },
      {
        id: "12208",
        code: "01",
        name: "Riyadh",
      },
      {
        id: "23905",
        code: "03",
        name: "Al - Madinah",
      },
      {
        id: "24313",
        code: "07",
        name: "Tabuk",
      },
      {
        id: "24817",
        code: "09",
        name: "Jizan",
      },

      {
        id: "24819",
        code: "08",
        name: "Northern Borders",
      },

      {
        id: "24970",
        code: "12",
        name: "Al Jawf",
      },
      {
        id: "24971",
        code: "14",
        name: "Asir",
      },
      {
        id: "24972",
        code: "10",
        name: "Najran",
      },
    ],
  },
  {
    country_code: "bh",
    country_name: "Bahrain",
    regions: [
      {
        id: "25180",
        code: "13",
        name: "Al Asimah",
      },
      // {
      //   id: "28673",
      //   code: "14",
      //   name: "Al Janubiyah"
      // },
      // {
      //   id: "28674",
      //   code: "15",
      //   name: "Al Muharraq"
      // },
      // {
      //   id: "28675",
      //   code: "16",
      //   name: "Al Wusta"
      // },
      {
        id: "28676",
        code: "17",
        name: "Ash Shamaliyah",
      },
    ],
  },
  {
    country_code: "qa",
    country_name: "Qatar",
    regions: [
      {
        id: "25911",
        code: "da",
        name: "Ad Dawhah",
      },
      {
        id: "30060",
        code: "kh",
        name: "Al Khawr Wa Adh Dhakhira",
      },
      // {
      //   id: "30061",
      //   code: "ms",
      //   name: "Ash Shamal"
      // },
      // {
      //   id: "30062",
      //   code: "ra",
      //   name: "Ar Rayyan"
      // },
      // {
      //   id: "30063",
      //   code: "us",
      //   name: "Umm Salai"
      // },
      {
        id: "30064",
        code: "wa",
        name: "Al Wakrah",
      },
      // {
      //   id: "30065",
      //   code: "za",
      //   name: "Az Zain"
      // }
    ],
  },
  {
    country_code: "om",
    country_name: "Oman",
    regions: [
      {
        id: "25874",
        code: "ma",
        name: "Masqat",
      },
      // {
      //   id: "29714",
      //   code: "ba",
      //   name: "Al Batinah"
      // },
      // {
      //   id: "29715",
      //   code: "bu",
      //   name: "Al Buraimi"
      // },
      {
        id: "29716",
        code: "da",
        name: "Ad Dakhiliyah",
      },
      // {
      //   id: "29717",
      //   code: "mu",
      //   name: "Musandam"
      // },
      // {
      //   id: "29718",
      //   code: "sh",
      //   name: "Ash Sharqiyah"
      // },
      // {
      //   id: "29719",
      //   code: "wu",
      //   name: "Al Wusta"
      // },
      // {
      //   id: "29720",
      //   code: "za",
      //   name: "Az Zahirah"
      // },
      {
        id: "29721",
        code: "zu",
        name: "Zufar",
      },
      // {
      //   id: "34944",
      //   code: "bj",
      //   name: "Janub Al Batinah"
      // },
      // {
      //   id: "34945",
      //   code: "sj",
      //   name: "Janub Ash Sharqiyah"
      // },
      // {
      //   id: "34946",
      //   code: "bs",
      //   name: "Shamal Al Batinah"
      // },
      // {
      //   id: "34947",
      //   code: "ss",
      //   name: "Shamal Ash Sharqiyah"
      // }
    ],
  },
];

export default countries = [
  {
    label: "Kuwait",
    value: "kw",
  },
  {
    label: "UAE",
    value: "ae",
  },
  {
    label: "KSA",
    value: "sa",
  },
  {
    label: "Bahrain",
    value: "bh",
  },
  {
    label: "Qatar",
    value: "qa",
  },
  {
    label: "Oman",
    value: "om",
  },
];
