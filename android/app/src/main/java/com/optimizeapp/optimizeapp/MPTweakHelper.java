
package com.optimizeapp.optimizeapp;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.mixpanel.android.mpmetrics.Tweak;
import com.mixpanel.android.mpmetrics.MixpanelAPI;
import com.facebook.react.bridge.Callback;
import android.content.Context;
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
    public void getCustomTweak(String userId,Callback successCallback) {
        if(showAds.get()){
            Toast.makeText(getReactApplicationContext(), "true",Toast.LENGTH_LONG).show();
        } else {
            Toast.makeText(getReactApplicationContext(), "false",Toast.LENGTH_LONG).show();
        }      
        successCallback.invoke(null,showAds.get());
    }
}

