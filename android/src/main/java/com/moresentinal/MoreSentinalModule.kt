package com.moresentinal

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.content.Context

class MoreSentinalModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private var context: Context = reactContext;

  override fun getName(): String {
    return "MoreSentinel"
  }

  @ReactMethod
  fun setUserId(userId: String) {
    PreferenceUtils.putString(context, PreferenceUtils.USER_ID, userId)
  }

  @ReactMethod
  fun setSessionId(sessionId: String) {
    PreferenceUtils.putString(context, PreferenceUtils.SESSION_ID, sessionId)
  }

  @ReactMethod
  fun clearData() {
    PreferenceUtils.clearData(context)
  }

  companion object {
    const val NAME = "MoreSentinal"
  }
}
