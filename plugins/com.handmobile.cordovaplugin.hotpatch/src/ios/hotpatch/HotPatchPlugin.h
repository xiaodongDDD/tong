//
//  BaiduPushPlugin.h
//  HelloCordova
//
//  Created by titengjiang on 15/9/23.
//
//

#import <UIKit/UIKit.h>
#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVInvokedUrlCommand.h>
#import <ZipArchive/SSZipArchive.h>

//#import "SSZipArchive.h"
#import <Cordova/CDVViewController.h>


@interface HotPatchPlugin : CDVPlugin <SSZipArchiveDelegate>

-(void)updateNewVersion:(CDVInvokedUrlCommand*)command;

@end
