//
//  HotnodeManager.m
//  nodecap
//
//  Created by BK on 7/19/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "HotnodeManager.h"

@implementation HotnodeManager

RCT_EXPORT_MODULE();

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

RCT_EXPORT_METHOD(randomBytes:(NSUInteger)length resolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject) {
  uint8_t buffer[length];
  int status = SecRandomCopyBytes(kSecRandomDefault, length, buffer);
  if (status != 0) {
    reject(@"Unknown", @"Failed to generate random bytes", nil);
    return;
  }
  NSData *data = [NSData dataWithBytes:buffer length:sizeof(buffer)];
  resolve([data base64EncodedStringWithOptions:0]);
}

@end
