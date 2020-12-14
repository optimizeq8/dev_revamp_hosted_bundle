import { FluidNavigator } from "react-navigation-fluid-transitions";
import { createStackNavigator } from "react-navigation-stack";
import createNativeStackNavigator from "react-native-screens/createNativeStackNavigator";
import { register } from "react-native-bundle-splitter";

// import Menu from "../Screens/Menu";
// import Dashboard from "../Screens/Dashboard";
// import SnapchatCreateAdAcc from "../Screens/SnapchatCreateAdAcc";
// import CreateBusinessAccount from "../Screens/CreateBusinessAccount";
// import CampaignDetails from "../Screens/CampaignDetails";
// import BusinessList from "../Screens/BusinessList";
// import ChangePassword from "../Screens/ChangePassword/";
// import AddressForm from "../Screens/AddressForm";
// import TransactionList from "../Screens/Transactions";
// import PersonalInfo from "../Screens/PersonalInfo";
// import Wallet from "../Screens/Wallet";
// import MultiSelect from "../MiniComponents/MultiSelect/MultiSelect";
// import WebView from "../MiniComponents/Webview";
// import AdType from "../Screens/CampaignCreate/AdType";
// import AdObjective from "../Screens/CampaignCreate/AdObjective";
// import AdDesign from "../Screens/CampaignCreate/AdDesign";
// import AdCover from "../Screens/CampaignCreate/AdCover";
// import StoryAdDesignReview from "../Screens/CampaignCreate/AdDesign/StoryAdReview";
// import AdDetails from "../Screens/CampaignCreate/AdDetails";
// import AdDetailsPolitical from "../Screens/CampaignCreate/AdDetailsPolitical";
// import AdDesignReview from "../Screens/CampaignCreate/AdDesignReview";
// import SwipeUpDestination from "../Screens/CampaignCreate/SwipeUpDestination";
// import SwipeUpChoice from "../Screens/CampaignCreate/SwipeUpChoice";
// import AdPaymentReview from "../Screens/CampaignCreate/AdPaymentReview";
// import PaymentForm from "../Screens/PaymentForm";
// import ErrorRedirect from "../Screens/ErrorRedirect";
// import SuccessRedirect from "../Screens/SuccessRedirect";
// import LongFormVideoPreview from "../Screens/CampaignCreate/SwipeUpChoice/LongFormVideoPreview";
// import CollectionMedia from "../MiniComponents/CollectionMedia";
// import Animated, { Easing } from "react-native-reanimated";
// import Messenger from "../Screens/Messenger";
// import ManageTeam from "../Screens/ManageTeam";
// import AddOrEditTeamMember from "../Screens/ManageTeam/AddOrEditTeamMember";
// import TeamInvite from "../Screens/TeamInvite";
// import GoogleAdInfo from "../Screens/GoogleCampaignCreate/GoogleAdInfo";
// import GoogleAdDesign from "../Screens/GoogleCampaignCreate/GoogleAdDesign";
// import GoogleAdTargetting from "../Screens/GoogleCampaignCreate/GoogleAdTargetting";
// import GoogleAdPaymentReview from "../Screens/GoogleCampaignCreate/GoogleAdPaymentReview";
// import GoogleCreateAdAcc from "../Screens/GoogleCreateAdAcc";
// import GoogleCampaignDetails from "../Screens/GoogleCampaignDetails";
// import GoogleKeywordsStats from "../Screens/GoogleCampaignDetails/GoogleKeywordsStats";
// import GoogleAudience from "../Screens/GoogleCampaignDetails/Audience";
// import GoogleEditKeywords from "../Screens/GoogleCampaignDetails/EditKeywords";
// import SwitchLanguageLoading from "../Screens/SwitchLanguage/Loading";
// import SuspendedWarning from "../Screens/SuspendedWarning";
// import GoogleSEAPreviewScreen from "../Screens/GoogleSEAPreviewScreen";
// import AcceptTermsConditionLoading from "../Screens/SnapchatCreateAdAcc/Loading";
// import OptimizeWebsite from "../Screens/OptimizeWebsite";
// import WebsiteRegistartionSuccess from "../Screens/OptimizeWebsite/RegistrationSuccess";
// import WebsiteSetting from "../Screens/OptimizeWebsite/WebsiteSetting";
// import MyWebsite from "../Screens/OptimizeWebsite/MyWebsite";
// import EditProduct from "../Screens/OptimizeWebsite/EditProduct/EditProduct";
// import AddProduct from "../Screens/OptimizeWebsite/AddProduct/AddProduct";
// import AddCategory from "../Screens/OptimizeWebsite/Category/AddCategory";
// import EditCategory from "../Screens/OptimizeWebsite/Category/EditCategory";
// import CategoryList from "../Screens/OptimizeWebsite/Category/CategoryList";

// import VerifyAccount from "../Screens/VerifyAccount";
// import TutorialWeb from "../Screens/OptimizeWebsite/Tutorial";
// import InstagramFeedAdObjective from "../Screens/InstagramCampaignCreate/Feed/AdObjective";
// import InstagramFeedAdDesign from "../Screens/InstagramCampaignCreate/Feed/AdDesign";
// import InstagramFeedAdTargetting from "../Screens/InstagramCampaignCreate/Feed/AdTargetting";
// import InstagramAdPaymentReview from "../Screens/InstagramCampaignCreate/Feed/AdPaymentReview";
// import AdFeedDesignReview from "../Screens/InstagramCampaignCreate/Feed/AdReview";
// import InstagramAdDesignExistingPost from "../Screens/InstagramCampaignCreate/Feed/AdDesignExistingPost";

// import InstagramStoryAdObjective from "../Screens/InstagramCampaignCreate/Story/AdObjective";
// import InstagramStoryAdDesign from "../Screens/InstagramCampaignCreate/Story/AdDesign";
// import AdStoryDesignReview from "../Screens/InstagramCampaignCreate/Story/AdReview";
// import InstagramStoryAdTargetting from "../Screens/InstagramCampaignCreate/Story/AdTargetting";
// import InstagramStoryAdPaymentReview from "../Screens/InstagramCampaignCreate/Story/AdPaymentReview";

// import InstagramSwipeUpDestination from "../Screens/InstagramCampaignCreate/SwipeUpDestination";
// import ImagePreview from "../MiniComponents/ImagePreview";
// import InstagramCampaignDetails from "../Screens/InstagramCampaignDetails";
// import ReviewProductDetail from "../Screens/OptimizeWebsite/ReviewProductDetail";
// import MyWebsiteSelectProducts from "../Screens/OptimizeWebsite/SelectProduct";
// import MyWebsiteECommerce from "../Screens/OptimizeWebsite/MyWebsiteECommerce";
// import SnapchatCampaignAudienceList from "../Screens/SnapchatCampaignAudienceList";
// import SnapchatAudienceTagetting from "../Screens/SnapchatAudience";

export default createNativeStackNavigator(
  {
    Menu: {
      screen: register({
        require: () => require("../Screens/Menu"),
      }),
      navigationOptions: { gesturesEnabled: false },
    },
    Dashboard: {
      screen: register({
        require: () => require("../Screens/Dashboard"),
      }),
      path: "dashboard/",
    },
    // SnapchatCreateAdAcc: SnapchatCreateAdAcc,
    CreateBusinessAccount: register({
      require: () => require("../Screens/CreateBusinessAccount"),
    }),
    CampaignDetails: register({
      require: () => require("../Screens/CampaignDetails"),
    }),
    BusinessList: register({
      require: () => require("../Screens/BusinessList"),
    }),
    ChangePassword: register({
      require: () => require("../Screens/ChangePassword"),
    }),
    AddressForm: register({ require: () => require("../Screens/AddressForm") }),
    PersonalInfo: register({
      require: () => require("../Screens/PersonalInfo"),
    }),
    MultiSelect: register({
      require: () => require("../MiniComponents/MultiSelect/MultiSelect"),
    }),
    TransactionList: register({
      require: () => require("../Screens/Transactions"),
    }),
    Wallet: register({ require: () => require("../Screens/Wallet") }),
    AdType: {
      screen: register({
        require: () => require("../Screens/CampaignCreate/AdType"),
      }),
      path: "ad_type/",
    },
    AdObjective: {
      screen: register({
        require: () => require("../Screens/CampaignCreate/AdObjective"),
      }),
      path: "AdObjective/",
    },
    CollectionMedia: register({
      require: () => require("../MiniComponents/CollectionMedia"),
    }),
    AdDesign: {
      screen: register({
        require: () => require("../Screens/CampaignCreate/AdDesign"),
      }),
      path: "ad_design/",
    },
    AdCover: register({
      require: () => require("../Screens/CampaignCreate/AdCover"),
    }),
    StoryAdDesignReview: register({
      require: () =>
        require("../Screens/CampaignCreate/AdDesign/StoryAdReview"),
    }),
    AdDetails: register({
      require: () => require("../Screens/CampaignCreate/AdDetails"),
    }),
    AdDetailsPolitical: register({
      require: () => require("../Screens/CampaignCreate/AdDetailsPolitical"),
    }),
    AdDesignReview: register({
      require: () => require("../Screens/CampaignCreate/AdDesignReview"),
    }),
    SwipeUpDestination: register({
      require: () => require("../Screens/CampaignCreate/SwipeUpDestination"),
    }),
    SwipeUpChoice: register({
      require: () => require("../Screens/CampaignCreate/SwipeUpChoice"),
    }),
    AdPaymentReview: register({
      require: () => require("../Screens/CampaignCreate/AdPaymentReview"),
    }),
    PaymentForm: register({ require: () => require("../Screens/PaymentForm") }),
    LongFormVideoPreview: register({
      require: () =>
        require("../Screens/CampaignCreate/SwipeUpChoice/LongFormVideoPreview"),
    }),
    ErrorRedirect: {
      screen: register({
        require: () => require("../Screens/ErrorRedirect"),
      }),
      path: "error/",
    },
    SuccessRedirect: {
      screen: register({
        require: () => require("../Screens/SuccessRedirect"),
      }),
      path: "success/",
    },
    Messenger: {
      screen: register({
        require: () => require("../Screens/Messenger"),
      }),
      path: "Messenger/",
    },
    WebView: register({ require: () => require("../MiniComponents/Webview") }),
    ManageTeam: register({ require: () => require("../Screens/ManageTeam") }),
    AddOrEditTeamMember: register({
      require: () => require("../Screens/ManageTeam/AddOrEditTeamMember"),
    }),
    TeamInvite: {
      screen: register({
        require: () => require("../Screens/TeamInvite"),
      }),
      path: "team_invite/",
    },
    GoogleAdInfo: {
      screen: register({
        require: () => require("../Screens/GoogleCampaignCreate/GoogleAdInfo"),
      }),
      path: "GoogleAdInfo",
    },
    GoogleAdDesign: register({
      require: () => require("../Screens/GoogleCampaignCreate/GoogleAdDesign"),
    }),
    GoogleAdTargetting: register({
      require: () =>
        require("../Screens/GoogleCampaignCreate/GoogleAdTargetting"),
    }),
    GoogleAdPaymentReview: register({
      require: () =>
        require("../Screens/GoogleCampaignCreate/GoogleAdPaymentReview"),
    }),
    GoogleCreateAdAcc: register({
      require: () => require("../Screens/GoogleCreateAdAcc"),
    }),
    GoogleCampaignDetails: register({
      require: () => require("../Screens/GoogleCampaignDetails"),
    }),
    GoogleKeywordsStats: register({
      require: () =>
        require("../Screens/GoogleCampaignDetails/GoogleKeywordsStats"),
    }),
    GoogleAudience: register({
      require: () => require("../Screens/GoogleCampaignDetails/Audience"),
    }),
    GoogleEditKeywords: register({
      require: () => require("../Screens/GoogleCampaignDetails/EditKeywords"),
    }),
    SwitchLanguageLoading: register({
      require: () => require("../Screens/SwitchLanguage/Loading"),
    }),
    SuspendedWarning: register({
      require: () => require("../Screens/SuspendedWarning"),
    }),
    GoogleSEAPreviewScreen: register({
      require: () => require("../Screens/GoogleSEAPreviewScreen/"),
    }),
    AcceptTermsConditionLoading: register({
      require: () => require("../Screens/SnapchatCreateAdAcc/Loading"),
    }),
    VerifyAccount: {
      screen: register({
        require: () => require("../Screens/VerifyAccount"),
      }),
      path: "verify_account/",
    },
    OptimizeWebsite: register({
      require: () => require("../Screens/OptimizeWebsite"),
    }),
    WebsiteRegistartionSuccess: register({
      require: () => require("../Screens/OptimizeWebsite/RegistrationSuccess"),
    }),
    WebsiteSetting: register({
      require: () => require("../Screens/OptimizeWebsite/WebsiteSetting"),
    }),
    MyWebsite: register({
      require: () => require("../Screens/OptimizeWebsite/MyWebsite"),
    }),
    TutorialWeb: register({
      require: () => require("../Screens/OptimizeWebsite/Tutorial"),
    }),
    InstagramFeedAdObjective: {
      screen: register({
        require: () =>
          require("../Screens/InstagramCampaignCreate/Feed/AdObjective"),
      }),
      path: "InstagramFeedAdObjective",
    },
    InstagramFeedAdDesign: register({
      require: () =>
        require("../Screens/InstagramCampaignCreate/Feed/AdDesign"),
    }),
    InstagramStoryAdObjective: register({
      require: () =>
        require("../Screens/InstagramCampaignCreate/Story/AdObjective"),
    }),
    InstagramStoryAdDesign: register({
      require: () =>
        require("../Screens/InstagramCampaignCreate/Story/AdDesign"),
    }),
    InstagramStoryAdTargetting: register({
      require: () =>
        require("../Screens/InstagramCampaignCreate/Story/AdTargetting"),
    }),
    AdStoryDesignReview: register({
      require: () =>
        require("../Screens/InstagramCampaignCreate/Story/AdReview"),
    }),
    InstagramSwipeUpDestination: register({
      require: () =>
        require("../Screens/InstagramCampaignCreate/SwipeUpDestination"),
    }),
    InstagramFeedAdTargetting: register({
      require: () =>
        require("../Screens/InstagramCampaignCreate/Feed/AdTargetting"),
    }),
    AdFeedDesignReview: register({
      require: () =>
        require("../Screens/InstagramCampaignCreate/Feed/AdReview"),
    }),
    InstagramAdPaymentReview: register({
      require: () =>
        require("../Screens/InstagramCampaignCreate/Feed/AdPaymentReview"),
    }),
    InstagramStoryAdPaymentReview: register({
      require: () =>
        require("../Screens/InstagramCampaignCreate/Story/AdPaymentReview"),
    }),
    ImagePreview: register({
      require: () => require("../MiniComponents/ImagePreview"),
    }),
    InstagramCampaignDetails: register({
      require: () => require("../Screens/InstagramCampaignDetails"),
    }),
    InstagramAdDesignExistingPost: register({
      require: () =>
        require("../Screens/InstagramCampaignCreate/Feed/AdDesignExistingPost"),
    }),
    EditProduct: register({
      require: () =>
        require("../Screens/OptimizeWebsite/EditProduct/EditProduct"),
    }),
    AddProduct: register({
      require: () =>
        require("../Screens/OptimizeWebsite/AddProduct/AddProduct"),
    }),
    ReviewProductDetail: register({
      require: () => require("../Screens/OptimizeWebsite/ReviewProductDetail"),
    }),
    MyWebsiteSelectProducts: register({
      require: () => require("../Screens/OptimizeWebsite/SelectProduct"),
    }),
    MyWebsiteECommerce: register({
      require: () => require("../Screens/OptimizeWebsite/MyWebsiteECommerce"),
    }),
    SnapchatAudienceList: register({
      require: () => require("../Screens/SnapchatCampaignAudienceList"),
    }),
    SnapchatAudienceTagetting: register({
      require: () => require("../Screens/SnapchatAudience"),
    }),
    AddCategory: register({
      require: () => require("../Screens/OptimizeWebsite/Category/AddCategory"),
    }),
    EditCategory: register({
      require: () =>
        require("../Screens/OptimizeWebsite/Category/EditCategory"),
    }),
    CategoryList: register({
      require: () =>
        require("../Screens/OptimizeWebsite/Category/CategoryList"),
    }),
    VerifyEngagmentNumber: register({
      require: () =>
        require("../Screens/SuccessRedirect/VerifyEngagmentNumber"),
    }),
    //     PaymentForm: {
    //       screen: PaymentForm
    //     }
  },

  {
    initialRouteName: "Dashboard",
    mode: "card",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: true,
      headerStyle: {
        backgroundColor: "#000",
      },
      headerTintColor: "#000",
      headerTextStyle: {
        fontWeight: "bold",
      },
    },
    transparentCard: true,
    cardStyle: { opacity: 1 },
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: "transparent",
      },
    }),
  }
);
