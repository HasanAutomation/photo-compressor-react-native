package com.photocompressor;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

public class FSModule  extends ReactContextBaseJavaModule {

    public FSModule(ReactApplicationContext context){
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "fsModule";
    }

    @ReactMethod
    public void greetingFromNative(String name, Promise promise){
        promise.resolve("Hi "+name);
    }
    @ReactMethod
    public void getImageSize(String uri ,Promise promise){
        File file = new File(uri);
        int size = (int) file.length();
        promise.resolve(size);
    }
}
