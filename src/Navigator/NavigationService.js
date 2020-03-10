/**
 * Navigation Listener implementation
 * @class NavigationService
 */

import { NavigationActions } from "react-navigation";

let _navigator;

/**
 * Adding a screen to top level stack.
 */
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

/**
 * function to navigate from one component to other.
 */
function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator
};