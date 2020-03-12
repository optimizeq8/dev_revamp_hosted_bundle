import { FluidNavigator } from "react-navigation-fluid-transitions";
import Menu from "../Screens/Menu";
import Dashboard from "../Screens/Dashboard";
import SnapchatCreateAdAcc from "../Screens/SnapchatCreateAdAcc";
import CreateBusinessAccount from "../Screens/CreateBusinessAccount";
import CampaignDetails from "../Screens/CampaignDetails";
import BusinessList from "../Screens/BusinessList";
import ChangePassword from "../Screens/ChangePassword/";
import AddressForm from "../Screens/AddressForm";
import TransactionList from "../Screens/Transactions";
import PersonalInfo from "../Screens/PersonalInfo";
import Wallet from "../Screens/Wallet";
import MultiSelect from "../MiniComponents/MultiSelect/MultiSelect";
import WebView from "../MiniComponents/Webview";
import AdType from "../Screens/CampaignCreate/AdType";
import AdObjective from "../Screens/CampaignCreate/AdObjective";
import AdDesign from "../Screens/CampaignCreate/AdDesign";
import AdCover from "../Screens/CampaignCreate/AdCover";
import StoryAdDesignReview from "../Screens/CampaignCreate/AdDesign/StoryAdReview";
import AdDetails from "../Screens/CampaignCreate/AdDetails";
import AdDesignReview from "../Screens/CampaignCreate/AdDesignReview";
import SwipeUpDestination from "../Screens/CampaignCreate/SwipeUpDestination";
import SwipeUpChoice from "../Screens/CampaignCreate/SwipeUpChoice";
import AdPaymentReview from "../Screens/CampaignCreate/AdPaymentReview";
import PaymentForm from "../Screens/PaymentForm";
import ErrorRedirect from "../Screens/ErrorRedirect";
import SuccessRedirect from "../Screens/SuccessRedirect";
import LongFormVideoPreview from "../Screens/CampaignCreate/SwipeUpChoice/LongFormVideoPreview";
import CollectionMedia from "../MiniComponents/CollectionMedia";
import Animated, { Easing } from "react-native-reanimated";
import Messenger from "../Screens/Messenger";
import MessengerLoading from "../Screens/Messenger/LoadingChatScreen";
import SelectInstagramPost from "../Screens/CampaignCreate/SwipeUpChoice/WhatsappLead/SelectInstagramPost";
import SelectedInstagramProductsList from "../Screens/CampaignCreate/SwipeUpChoice/WhatsappLead/ProductList";
import EditProductDetailInstagramPost from "../Screens/CampaignCreate/SwipeUpChoice/WhatsappLead/EditProductDetail";
import ManageTeam from "../Screens/ManageTeam";
import AddOrEditTeamMember from "../Screens/ManageTeam/AddOrEditTeamMember";
import TeamInvite from "../Screens/TeamInvite";
import GoogleAdInfo from "../Screens/GoogleCampaignCreate/GoogleAdInfo";
import GoogleAdDesign from "../Screens/GoogleCampaignCreate/GoogleAdDesign";
import GoogleAdTargetting from "../Screens/GoogleCampaignCreate/GoogleAdTargetting";
import GoogleAdPaymentReview from "../Screens/GoogleCampaignCreate/GoogleAdPaymentReview";
import GoogleCreateAdAcc from "../Screens/GoogleCreateAdAcc";
import GoogleCampaignDetails from "../Screens/GoogleCampaignDetails";
import GoogleKeywordsStats from "../Screens/GoogleCampaignDetails/GoogleKeywordsStats";
import GoogleAudience from "../Screens/GoogleCampaignDetails/Audience";
import GoogleEditKeywords from "../Screens/GoogleCampaignDetails/EditKeywords";
import SwitchLanguageLoading from "../Screens/SwitchLanguage/Loading";
import SuspendedWarning from "../Screens/SuspendedWarning";
import GoogleSEAPreviewScreen from "../Screens/GoogleSEAPreviewScreen";
import VerifyAccount from "../Screens/VerifyAccount";
import InstagramFeedAdObjective from "../Screens/InstagramCampaignCreate/Feed/AdObjective";
import InstagramFeedAdDesign from "../Screens/InstagramCampaignCreate/Feed/AdDesign";
import InstagramFeedAdTargetting from "../Screens/InstagramCampaignCreate/Feed/AdTargetting";

import InstagramStoryAdObjective from "../Screens/InstagramCampaignCreate/Story/AdObjective";
import InstagramStoryAdDesign from "../Screens/InstagramCampaignCreate/Story/AdDesign";
import InstagramSwipeUpDestination from "../Screens/InstagramCampaignCreate/SwipeUpDestination";

export default FluidNavigator(
  {
    Menu: { screen: Menu, navigationOptions: { gesturesEnabled: false } },
    Dashboard: { screen: Dashboard, path: "dashboard/" },
    SnapchatCreateAdAcc: SnapchatCreateAdAcc,
    CreateBusinessAccount: CreateBusinessAccount,
    CampaignDetails: CampaignDetails,
    BusinessList: BusinessList,
    ChangePassword: ChangePassword,
    AddressForm: AddressForm,
    PersonalInfo: PersonalInfo,
    MultiSelect: MultiSelect,
    TransactionList: TransactionList,
    Wallet: Wallet,
    AdType: AdType,
    AdObjective: AdObjective,
    CollectionMedia: CollectionMedia,
    AdDesign: { screen: AdDesign, path: "ad_design/" },
    AdCover: AdCover,
    StoryAdDesignReview: StoryAdDesignReview,
    AdDetails: AdDetails,
    AdDesignReview: AdDesignReview,
    SwipeUpDestination: SwipeUpDestination,
    SwipeUpChoice: SwipeUpChoice,
    AdPaymentReview: AdPaymentReview,
    AddressForm: AddressForm,
    PaymentForm: PaymentForm,
    LongFormVideoPreview: LongFormVideoPreview,
    ErrorRedirect: {
      screen: ErrorRedirect,
      path: "error/"
    },
    SuccessRedirect: {
      screen: SuccessRedirect,
      path: "success/"
    },
    Messenger: Messenger,
    MessengerLoading: {
      screen: MessengerLoading,
      path: "MessengerLoading/"
    },
    WebView: WebView,
    SelectInstagramPost: SelectInstagramPost,
    SelectedInstagramProductsList: SelectedInstagramProductsList,
    EditProductDetailInstagramPost: EditProductDetailInstagramPost,
    ManageTeam: ManageTeam,
    AddOrEditTeamMember: AddOrEditTeamMember,
    TeamInvite: { screen: TeamInvite, path: "team_invite/" },
    GoogleAdInfo: GoogleAdInfo,
    GoogleAdDesign: GoogleAdDesign,
    GoogleAdTargetting: GoogleAdTargetting,
    GoogleAdPaymentReview: GoogleAdPaymentReview,
    GoogleCreateAdAcc: GoogleCreateAdAcc,
    GoogleCampaignDetails: GoogleCampaignDetails,
    GoogleKeywordsStats: GoogleKeywordsStats,
    GoogleAudience: GoogleAudience,
    GoogleEditKeywords: GoogleEditKeywords,
    SwitchLanguageLoading: SwitchLanguageLoading,
    SuspendedWarning: SuspendedWarning,
    GoogleSEAPreviewScreen: GoogleSEAPreviewScreen,
    VerifyAccount: { screen: VerifyAccount, path: "verify_account/" },
    InstagramFeedAdObjective: InstagramFeedAdObjective,
    InstagramFeedAdDesign: InstagramFeedAdDesign,
    InstagramStoryAdObjective: InstagramStoryAdObjective,
    InstagramStoryAdDesign: InstagramStoryAdDesign,
    InstagramSwipeUpDestination: InstagramSwipeUpDestination,
    InstagramFeedAdTargetting: InstagramFeedAdTargetting
    //     PaymentForm: {
    //       screen: PaymentForm
    //     }
  },

  {
    transConfig,
    initialRouteName: "Dashboard",
    mode: "card",
    navigationOptions: {
      gesturesEnabled: true,
      headerStyle: {
        backgroundColor: "#0000"
      },
      headerTintColor: "#0000",
      headerTextStyle: {
        fontWeight: "bold"
      }
    },
    cardStyle: {
      backgroundColor: "#0000",
      opacity: 1
    }
  }
);

const transConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});
