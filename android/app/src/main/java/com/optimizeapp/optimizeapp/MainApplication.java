package com.optimizeapp.optimizeapp;

import android.app.Application;
import android.content.Context;
import android.net.Uri;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.robinpowered.react.Intercom.IntercomPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.segment.analytics.reactnative.integration.adjust.RNAnalyticsIntegration_AdjustPackage;
import com.reactnativecommunity.checkbox.ReactCheckBoxPackage;
import com.airbnb.android.react.maps.MapsPackage;
import org.reactnative.maskedview.RNCMaskedViewPackage;
import com.cmcewen.blurview.BlurViewPackage;
// import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.zoontek.rnbootsplash.RNBootSplashPackage;
// import com.segment.analytics.android.integrations.adjust.AdjustIntegration;
import info.applike.advertisingid.RNAdvertisingIdPackage;

// import com.adjust.nativemodule.AdjustPackage;
import ly.img.react_native.pesdk.RNPhotoEditorSDKPackage;
// import com.segment.analytics.reactnative.integration.mixpanel.RNAnalyticsIntegration_MixpanelPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.segment.analytics.reactnative.core.RNAnalyticsPackage;
// import io.sentry.RNSentryPackage;
import ly.img.react_native.vesdk.RNVideoEditorSDKPackage;
import com.arthenica.reactnative.RNFFmpegPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.optimizeapp.optimizeapp.generated.BasePackageList;
import com.optimizeapp.optimizeapp.CustomTweakHelper;

import org.unimodules.adapters.react.ReactAdapterPackage;
import org.unimodules.adapters.react.ModuleRegistryAdapter;
import org.unimodules.adapters.react.ReactModuleRegistryProvider;
import org.unimodules.core.interfaces.Package;
import org.unimodules.core.interfaces.SingletonModule;
import expo.modules.constants.ConstantsPackage;
import expo.modules.permissions.PermissionsPackage;
import expo.modules.filesystem.FileSystemPackage;
import expo.modules.updates.UpdatesController;
import com.airbnb.android.react.lottie.LottiePackage;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;
import java.util.List;
import javax.annotation.Nullable;

import io.intercom.android.sdk.Intercom;

public class MainApplication extends androidx.multidex.MultiDexApplication implements ReactApplication {
  private final ReactModuleRegistryProvider mModuleRegistryProvider = new ReactModuleRegistryProvider(
      new BasePackageList().getPackageList());

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new ModuleRegistryAdapter(mModuleRegistryProvider));
      packages.add(new CustomTweakHelper()); // <-- Add this line with your package name.

      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected @Nullable String getJSBundleFile() {
      if (BuildConfig.DEBUG) {
        return super.getJSBundleFile();
      } else {
        return UpdatesController.getInstance().getLaunchAssetFile();
      }
    }

    @Override
    protected @Nullable String getBundleAssetName() {
      if (BuildConfig.DEBUG) {
        return super.getBundleAssetName();
      } else {
        return UpdatesController.getInstance().getBundleAssetName();
      }
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
    if (!BuildConfig.DEBUG) {
      /** OptimizeApp LIVE */
      Intercom.initialize(this, "android_sdk-9b7ba07ad91cc3cc69e3e422f855fb51c9685f53", "k5yqpre9");
      UpdatesController.initialize(this);
    } else {
      /** OptimizeApp DEV */
      Intercom.initialize(this, "android_sdk-a0d25d6a43b2ab0c505588621d140240a57cef60", "qf7uj8rc");
    }
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         * We use reflection here to pick up the class that initializes Flipper, since
         * Flipper library is not available in release mode
         */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
