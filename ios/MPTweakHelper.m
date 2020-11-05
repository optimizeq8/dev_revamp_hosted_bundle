//
//  MPTweakHelper.m
//  OptimizeApp
//
//  Created by Samy AbdelAal on 10/27/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

// MPTweakHelper.m
//Also need to import mixpanel and handle getting the correct instance
#import "MPTweakHelper.h"
#import "Mixpanel/MPTweakInline.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@implementation MPTweakHelper

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getCustomTweak:(NSString *)name callback:(RCTResponseSenderBlock)callback)
{
  BOOL x = MPTweakValue(@"show alternate view", YES);
  callback(@[[NSNull null],@(x)]);
}

@end
