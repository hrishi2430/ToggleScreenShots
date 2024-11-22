//
//  ScreenshotControl.m
//  ToggleScreenShots
//
//  Created by Paurnima Rishikesh Kelkar on 22/11/24.
//


#import "ScreenshotControl.h"

@implementation ScreenshotControl

RCT_EXPORT_MODULE();

// Enable screenshots
RCT_EXPORT_METHOD(enableScreenshot:(RCTPromiseResolveBlock)resolve
                          rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        dispatch_async(dispatch_get_main_queue(), ^{
            UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
            rootViewController.view.layer.masksToBounds = NO;
            resolve(@"Screenshot enabled");
        });
    } @catch (NSException *exception) {
        reject(@"ERROR", @"Failed to enable screenshot", nil);
    }
}

// Disable screenshots
RCT_EXPORT_METHOD(disableScreenshot:(RCTPromiseResolveBlock)resolve
                           rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
        dispatch_async(dispatch_get_main_queue(), ^{
            UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
            rootViewController.view.layer.masksToBounds = YES;
            resolve(@"Screenshot disabled");
        });
    } @catch (NSException *exception) {
        reject(@"ERROR", @"Failed to disable screenshot", nil);
    }
}

@end

