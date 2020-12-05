package com.optimizeapp.optimizeapp;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.mixpanel.android.mpmetrics.MixpanelAPI;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import com.zoontek.rnbootsplash.RNBootSplash;
public class MainActivity extends ReactActivity {
 @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    MixpanelAPI mixpanel =
    MixpanelAPI.getInstance(this, "c9ade508d045eb648f95add033dfb017");
    RNBootSplash.init(R.drawable.splashscreen, MainActivity.this); // <- display the generated bootsplash.xml drawable over our MainActivity
  }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "main";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}
