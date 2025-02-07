//
//  VIPCPlugin.swift
//  App
//
//  Created by James Wright on 2/5/25.
//

import Foundation
import Capacitor
import AuthenticationServices

@objc(VIPCPlugin)
public class VIPCPlugin: CAPPlugin, CAPBridgedPlugin {
  public let identifier = "VIPCPlugin"
  public let jsName = "VIPCPlugin"
  public let pluginMethods: [CAPPluginMethod] = [
    CAPPluginMethod(name: "start", returnType: CAPPluginReturnPromise)
  ]
  
  @objc public func start(_ call: CAPPluginCall) {
    let urlString = call.getString("url") ?? ""
    let url = URL(string: urlString)!
    DispatchQueue.main.async {
      let vc = ASWebAuthenticationSession(url: url, callbackURLScheme: "closevip") { url, error in
        if let e = error as? ASWebAuthenticationSessionError, e.code == ASWebAuthenticationSessionError.canceledLogin {
          // session was cancelled by user, but transaction may still have completed successfully if the user cancelled
          // the session after the transaction was complete.
          call.reject("User cancelled", nil, e)
          return
        }
        
        if url?.absoluteString.contains("done") == true {
          // transaction completed successfully, and the session was automatically dismissed.
          print("Successful transaction")
          call.resolve(["url" : url?.absoluteString ?? ""])
        }
      }
      vc.presentationContextProvider = self
      vc.start()
    }
    
  }
}

extension VIPCPlugin: ASWebAuthenticationPresentationContextProviding {
  public func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
    return ASPresentationAnchor()
  }
}
