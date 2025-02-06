import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider

@main
class AppDelegate: RCTAppDelegate {
  var taskIdentifier: UIBackgroundTaskIdentifier = .invalid
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    self.moduleName = "test_update"
    self.dependencyProvider = RCTAppDependencyProvider()

    // You can add your custom initial props in the dictionary below.
    // They will be passed down to the ViewController used by React Native.
    self.initialProps = [:]

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func applicationWillResignActive(_ application: UIApplication) {
    if taskIdentifier != .invalid {
        application.endBackgroundTask(taskIdentifier)
        taskIdentifier = .invalid
    }

    taskIdentifier = application.beginBackgroundTask(withName: nil) { [weak self] in
        if let strongSelf = self {
            application.endBackgroundTask(strongSelf.taskIdentifier)
            strongSelf.taskIdentifier = .invalid
        }
    }
}


  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return OtaHotUpdate.getBundle() 
#endif
  }
}
