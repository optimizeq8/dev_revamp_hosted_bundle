
package com.optimizeapp.optimizeapp;
import com.mixpanel.android.mpmetrics.MixpanelFCMMessagingService;

// import io.invertase.firebase.messaging.*;
import android.content.Intent;
import android.content.Context;
import io.intercom.android.sdk.push.IntercomPushClient;
// import io.invertase.firebase.messaging.RNFirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import android.util.Log;
import java.util.Map;


public class MainMessagingService extends MixpanelFCMMessagingService {
    private static final String TAG = "MainMessagingService";
    private final IntercomPushClient intercomPushClient = new IntercomPushClient();
    @Override public void onNewToken(String refreshedToken) {

       Log.d("refreshedToken", refreshedToken);
    intercomPushClient.sendTokenToIntercom(getApplication(), refreshedToken);
    //DO HOST LOGIC HERE
}
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Map message = remoteMessage.getData();

        if (intercomPushClient.isIntercomPush(message)) {
            Log.d(TAG, "Intercom message received");
            intercomPushClient.handlePush(getApplication(), message);
        } else {
            Log.d(TAG, "Intercom message  not received");
            super.onMessageReceived(remoteMessage);
        }
    }
}