# VIP Connect SDK Integration for Ionic

This repository contains a sample application that demonstrates integration and use of the VIP Connect SDK for Ionic.

More instructions about the VIP Connect SDK can be found in our [main documentation](https://developer.vippreferred.com/).

## Integration Requirements

To interact with the VIP Connect services, first setup an [operator](https://developer.vippreferred.com/operator-onboarding/operator-setup) with Pavilion Payments.
This will allow you to create an [authentication token](https://developer.vippreferred.com/integration-steps/operator-requirements) for use with the Pavilion APIs
to [create a patron session](https://developer.vippreferred.com/APIS/SDK/create-patron-session) for your customer. For this example, replace the values in `environment.ts` with
the values provided to you by Pavilion.


## iOS
After getting a session id, [launch the VIP SDK web component via URL](https://developer.vippreferred.com/integration-steps/invoke-web-component) inside
an [`ASWebAuthenticationSession`](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession). 
This can be done using the plugin provided in this example code or with any other plugin that uses `ASWebAuthenticationSession`.

VIP Connect uses [Finicity Connect WebSDK](https://developer.mastercard.com/open-banking-us/documentation/connect/integrating/webviews/android-webviews/) or [Plaid Hosted Link](https://plaid.com/docs/link/hosted-link/) to securely connect your customer\'s bank accounts with VIP Connect; launching
the VIP Connect SDK inside an `ASWebAuthenticationSession` is necessary to provide the best experience to your customers. 

### Returning to the iOS app from VIP Connect

Upon completion or cancellation, VIP Connect will navigate to the address at the `returnURL` param passed during [session creation](https://developer.vippreferred.com/APIS/SDK/create-patron-session). 
If the transaction was successful, a URL with a transaction ID will be passed back to the caller. 

## Android
After getting a session id, [launch the VIP SDK web component via URL](https://developer.vippreferred.com/integration-steps/invoke-web-component) inside
a Chrome Custom Tab. In this example the Chrome Custom Tab is instatiate using the `Browser` Capacitor plugin.

VIP Connect uses [Finicity Connect WebSDK](https://developer.mastercard.com/open-banking-us/documentation/connect/integrating/webviews/android-webviews/) or [Plaid Hosted Link](https://plaid.com/docs/link/hosted-link/) to securely connect your customer\'s bank accounts with VIP Connect; launching
the VIP Connect SDK inside a Chrome Custom Tab is necessary to provide the best experience to your customers. 

### Returning to the Android app from VIP Connect

Upon completion or cancellation, VIP Connect will navigate to the address at the `returnURL` param passed during [session creation](https://developer.vippreferred.com/APIS/SDK/create-patron-session) and the Chrome Custom Tab will close. 
Be sure to update the intent filter located in `AndroidManifest.xml` with the following entries:

```
              <action android:name="android.intent.action.VIEW" />
              <category android:name="android.intent.category.DEFAULT" />
              <category android:name="android.intent.category.BROWSABLE" />
              <data android:scheme="closevip" android:host="done" />
```
In this example, we have chosen the `redirectURL` to be `closevip://done`. In your app, you will need to set the scheme and host to the same value that you supplied to the session creation call.

## Security 
It is not recommended to use an embedded browser or web view for OAuth as detailed in section 8.12 of the [Best Current Practice for OAuth 2.0 Native Apps](https://www.rfc-editor.org/rfc/rfc8252.txt).

## Running the sample app

The `environment.ts` file has fields for you to fill with your operator\'s values. You will need the VIP Connect URL
obtained during operator setup, and you will need to provide the name of the test environment your operator is in (such as `dev`, `qa`, or `cert`). Please contact your
Pavilion Payments representative if you need help obtaining these values.

NOTE: This sample app requires a new VIP Connect session ID for each launch.


