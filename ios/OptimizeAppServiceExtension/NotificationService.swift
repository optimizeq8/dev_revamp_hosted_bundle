//
//  NotificationService.swift
//  OptimizeAppServiceExtension
//
//  Created by Samy AbdelAal on 01/06/2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

import UserNotifications

class NotificationService: UNNotificationServiceExtension {

    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?

    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
        
      if let urlString = request.content.userInfo["attachment-url"] as? String, urlString != "" {
        NSLog("NotificationService, %s",urlString);
        NSLog("USERINFO", request.content.userInfo);
                 if let fileUrl = URL(string: urlString ) {
                     // Download the attachment
                     URLSession.shared.downloadTask(with: fileUrl) { (location, response, error) in
                         if let location = location {
                             // Move temporary file to remove .tmp extension
                             let tmpDirectory = NSTemporaryDirectory()
                             let tmpFile = "file://".appending(tmpDirectory).appending(fileUrl.lastPathComponent)
                             let tmpUrl = URL(string: tmpFile)!
                             try! FileManager.default.moveItem(at: location, to: tmpUrl)
                             
                             // Add the attachment to the notification content
                             if let attachment = try? UNNotificationAttachment(identifier: "", url: tmpUrl, options:nil) {
                                 
                                 self.bestAttemptContent?.attachments = [attachment]
                             }
                         }
                         // Serve the notification content
                         contentHandler(self.bestAttemptContent!)
                         }.resume()
                 }
                 
             } else {
                 contentHandler(bestAttemptContent!)
             }
             
    }
    
    override func serviceExtensionTimeWillExpire() {
        // Called just before the extension will be terminated by the system.
        // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
        if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }

}
