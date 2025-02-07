//
//  CustomViewController.swift
//  App
//
//  Created by James Wright on 2/5/25.
//

import UIKit
import Capacitor

class CustomViewController: CAPBridgeViewController {
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    // Do any additional setup after loading the view.
  }
  
  override open func capacitorDidLoad() {
    bridge?.registerPluginInstance(VIPCPlugin())
  }
}
