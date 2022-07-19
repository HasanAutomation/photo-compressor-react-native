package com.photocompressor;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FSModule  extends ReactContextBaseJavaModule {
    FileOutputStream fos;
    Context context;
    public FSModule(ReactApplicationContext context){
        super(context);
        this.context = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "fsModule";
    }

    private int getSize(String uri){
        File file = new File(uri);
        int size = (int) file.length();
        return size;
    }

    @ReactMethod
    public void greetingFromNative(String name, Promise promise){
        promise.resolve("Hi "+name);
    }
    @ReactMethod
    public void getImageSize(String uri ,Promise promise){
        int size = getSize(uri);
        promise.resolve(size);
    }

    @ReactMethod
    public void compressImage(String uri,int compressQuality,Promise promise) {
        try{
            File outputDir = context.getCacheDir();
            File outputFile = File.createTempFile("my-image",".jpg",outputDir);
            fos = new FileOutputStream(outputFile);
            Bitmap bitmap = BitmapFactory.decodeFile(new File(uri).getAbsolutePath());

            bitmap.compress(Bitmap.CompressFormat.JPEG,compressQuality,fos);

            int size = getSize(outputFile.getAbsolutePath());

            WritableMap result = Arguments.createMap();
            result.putString("uri",String.valueOf(outputFile));
            result.putInt("size",size);

            promise.resolve(result);

        }catch (Exception e){
            promise.reject(e);
        }finally {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
                promise.reject(e);
            }
        }

    }

    @ReactMethod
    public void saveImageToDevice(String uri,String imageName, int compressValue, Promise promise){
        try{
           File publicImageFolder =  Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES) ;
           publicImageFolder = new File(publicImageFolder + "/PhotoCompress");

           if(!publicImageFolder.exists()){

               boolean created = publicImageFolder.mkdir();
           }

           fos = new FileOutputStream(publicImageFolder + "/" + imageName + ".jpg");

           Bitmap bitmap = BitmapFactory.decodeFile(new File(uri).getAbsolutePath());

           bitmap.compress(Bitmap.CompressFormat.JPEG,compressValue,fos);

           promise.resolve("Done");

        }catch (Exception e){
            promise.reject(e);
        }finally {
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
                promise.reject(e);
            }
        }
    }
}
