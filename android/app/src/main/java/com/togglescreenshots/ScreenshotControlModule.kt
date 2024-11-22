package com.togglescreenshots

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.view.WindowManager
import com.facebook.react.bridge.UiThreadUtil

class ScreenshotControlModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        private const val PREVENT_SCREENSHOT_ERROR_CODE = "PREVENT_SCREENSHOT_ERROR_CODE"
    }

    override fun getName(): String {
        return "ScreenshotControl"
    }

    @ReactMethod
    fun disableScreenshot(promise: Promise) {
        UiThreadUtil.runOnUiThread {
            try {
                currentActivity?.window?.setFlags(
                    WindowManager.LayoutParams.FLAG_SECURE,
                    WindowManager.LayoutParams.FLAG_SECURE
                )
                val currentFlags = currentActivity?.window?.attributes?.flags
                println("DEBUG: Window flags after forbid: $currentFlags")

                promise.resolve("Screenshot disabled.")
            } catch (e: Exception) {
                promise.reject(PREVENT_SCREENSHOT_ERROR_CODE, "Forbid screenshot taking failure.")
            }
        }
    }

    @ReactMethod
    fun enableScreenshot(promise: Promise) {
        UiThreadUtil.runOnUiThread {
            try {
                currentActivity?.window?.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
                promise.resolve("Screenshot enabled.")
            } catch (e: Exception) {
                promise.reject(PREVENT_SCREENSHOT_ERROR_CODE, "Allow screenshot taking failure.")
            }
        }
    }
}

