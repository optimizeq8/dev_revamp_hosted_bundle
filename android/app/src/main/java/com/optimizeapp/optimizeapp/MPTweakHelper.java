
package com.optimizeapp.optimizeapp;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mixpanel.android.mpmetrics.Tweak;
import com.mixpanel.android.mpmetrics.MixpanelAPI;

import java.util.Map;
import java.util.HashMap;

public class MPTweakHelper extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static Tweak<Boolean> showAds = MixpanelAPI.booleanTweak("show button",false);

    MPTweakHelper(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }
    @Override
    public String getName() {
        return "MPTweakHelper";
    }

    @ReactMethod
    public void getNumberOfLivesTweak(String message) {
        Toast.makeText(getReactApplicationContext(), message,Toast.LENGTH_SHORT).show();
    }
}

