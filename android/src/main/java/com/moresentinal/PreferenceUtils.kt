package com.moresentinal

import android.content.Context

object PreferenceUtils {
  private const val PREFERENCE = "more-sentinel"
  const val USER_ID: String = "user_id"
  const val SESSION_ID: String = "session_id"

  fun getString(context: Context?, key: String?): String {
    if (context != null) {
      return context.getSharedPreferences(PREFERENCE, Context.MODE_PRIVATE).getString(key, "")!!
    }
    return ""
  }

  fun putString(context: Context?, key: String?, value: String?) {
    context?.let {
      val editor = context.getSharedPreferences(PREFERENCE, Context.MODE_PRIVATE).edit()
      editor.putString(key, value)
      editor.apply()
    }
  }

  fun clearData(context: Context?) {
    context?.let {
      val editor = context.getSharedPreferences(PREFERENCE, Context.MODE_PRIVATE).edit()
      editor.clear().apply()
    }
  }
}
