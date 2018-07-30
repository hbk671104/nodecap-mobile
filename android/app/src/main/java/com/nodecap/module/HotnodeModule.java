package com.nodecap.module;

import android.util.Base64;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.security.SecureRandom;

public class HotnodeModule extends ReactContextBaseJavaModule {
    public HotnodeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "HotnodeManager";
    }

    @ReactMethod
    public void randomBytes(int length, Promise promise) {
        SecureRandom sr = new SecureRandom();
        byte[] key = new byte[length];
        sr.nextBytes(key);
        promise.resolve(Base64.encodeToString(key, Base64.NO_WRAP));
    }
}
