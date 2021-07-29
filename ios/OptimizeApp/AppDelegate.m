/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <UMCore/UMModuleRegistry.h>
#import <UMReactNativeAdapter/UMNativeModulesProxy.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>
#import <EXScreenOrientation/EXScreenOrientationViewController.h>
#import <React/RCTLinkingManager.h>
#import "RNBootSplash.h"
#import <GoogleMaps/GoogleMaps.h>
#import <Intercom/intercom.h>
#import "RNNotifications.h"

@interface AppDelegate ()

@property (nonatomic, strong) NSDictionary *launchOptions;

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
    return [RCTLinkingManager application:application openURL:url options:options];
}

// Only if your app is using [Universal Links](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html).
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler

{
 return [RCTLinkingManager application:application
                  continueUserActivity:userActivity
                    restorationHandler:restorationHandler];
}

@synthesize window = _window;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyDxOd8PlgO-DjzmoVDaFmpGj2XcqhclrwM"];
  self.moduleRegistryAdapter = [[UMModuleRegistryAdapter alloc] initWithModuleRegistryProvider:[[UMModuleRegistryProvider alloc] init]];
  self.launchOptions = launchOptions;
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  #ifdef DEBUG
    NSString *const SEGMENT_WRITE_KEY = @"fcKWh6YqnzDNtVwMGIpPOC3bowVHXSYh";
    [Intercom setApiKey:@"ios_sdk-e2493179152d82a4976b580fd1ec442cf2a1e018" forAppId:@"qf7uj8rc"];
  #else
    NSString *const SEGMENT_WRITE_KEY = @"ExPvBTX3CaGhY27ll1Cbk5zis5FVOJHB";
    [Intercom setApiKey:@"ios_sdk-345d9b5af6cf6662f16b5d47798d2473c0e0b617" forAppId:@"k5yqpre9"];
  #endif
SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:SEGMENT_WRITE_KEY];
config.enableAdvertisingTracking = YES;


[SEGAnalytics setupWithConfiguration:config];
#ifdef DEBUG
  [self initializeReactNativeApp];
#else
  EXUpdatesAppController *controller = [EXUpdatesAppController sharedInstance];
  controller.delegate = self;
  [controller startAndShowLaunchScreen:self.window];
#endif


NSDictionary* notification = [launchOptions valueForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
if (notification != nil) {
  NSString* link = [notification valueForKeyPath:@"aps.link"];
  
  if (link != nil) {
    [launchOptions setValue:link forKey:UIApplicationLaunchOptionsURLKey];
  }
}
  [super application:application didFinishLaunchingWithOptions:launchOptions];
  [RNNotifications startMonitorNotifications];
  return YES;
}

- (RCTBridge *)initializeReactNativeApp
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:self.launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"main" initialProperties:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  UIViewController *rootViewController = [[EXScreenOrientationViewController alloc] init]; 
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [RNBootSplash initWithStoryboard:@"SplashScreen" rootView:rootView];
  return bridge;
}

- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge
{
  NSArray<id<RCTBridgeModule>> *extraModules = [_moduleRegistryAdapter extraModulesForBridge:bridge];
  // You can inject any extra modules that you would like here, more information at:
  // https://facebook.github.io/react-native/docs/native-modules-ios.html#dependency-injection
  return extraModules;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
#ifdef DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[EXUpdatesAppController sharedInstance] launchAssetUrl];
#endif
}

- (void)appController:(EXUpdatesAppController *)appController didStartWithSuccess:(BOOL)success
{
  appController.bridge = [self initializeReactNativeApp];
}
- (void)applicationDidBecomeActive:(UIApplication *)application {
    UNUserNotificationCenter *notificationCenter = [UNUserNotificationCenter currentNotificationCenter];
    [notificationCenter requestAuthorizationWithOptions:(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge) completionHandler:^(BOOL granted, NSError * _Nullable error) {
       [application registerForRemoteNotifications];
    }];
}

- (void)sceneDidBecomeActive:(UIScene *)scene  API_AVAILABLE(ios(13.0)){
    UNUserNotificationCenter *notificationCenter = [UNUserNotificationCenter currentNotificationCenter];
    [notificationCenter requestAuthorizationWithOptions:(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge) completionHandler:^(BOOL granted, NSError * _Nullable error) {
        [[UIApplication sharedApplication] registerForRemoteNotifications];
    }];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    // Intercom
    [Intercom setDeviceToken:deviceToken];
    [[SEGAnalytics sharedAnalytics] registeredForRemoteNotificationsWithDeviceToken:deviceToken];
    [RNNotifications didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];


}


- (void)userNotificationCenter:(UNUserNotificationCenter *)center
         willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
  completionHandler(UNNotificationPresentationOptionAlert + UNNotificationPresentationOptionSound + UNNotificationPresentationOptionBadge);
}
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  [RNNotifications didFailToRegisterForRemoteNotificationsWithError:error];
}
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
        didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void(^)(void))completionHandler  {
  // on tap the notification
  NSDictionary *userInfo = response.notification.request.content.userInfo;
  
  NSString *uri = [userInfo valueForKeyPath:@"uri"];
  // NSLog( @"Notiication response, %@",userInfo);
  if (uri != nil) {
    [RCTLinkingManager application:UIApplication.sharedApplication openURL:[NSURL URLWithString:uri] options: [NSDictionary alloc]];
  }else{
    NSDictionary *userInfo = response.notification.request.content.userInfo;
    
    NSString *uri = [userInfo valueForKeyPath:@"mp_ontap.uri"];
    if (uri != nil) {
      [RCTLinkingManager application:UIApplication.sharedApplication openURL:[NSURL URLWithString:uri] options: [NSDictionary alloc]];
    }
  }
  
  completionHandler();
}

@end
