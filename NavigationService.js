import { NavigationActions } from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function navigateBack(screenName, routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: screenName,
      action: NavigationActions.navigate(
        {
          routeName: routeName,
        },
        params
      ),
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  navigateBack,
  setTopLevelNavigator,
};
