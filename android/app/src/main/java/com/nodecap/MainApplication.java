package com.nodecap;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.yamill.orientation.OrientationPackage;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.theweflex.react.WeChatPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import org.reactnative.camera.RNCameraPackage;
import io.realm.react.RealmReactPackage;
import com.imagepicker.ImagePickerPackage;
import com.nodecap.module.HotnodePackage;
import com.nodecap.module.RNSensorsAnalyticsPackage;
import com.oblador.keychain.KeychainPackage;

import cn.jpush.reactnativejpush.JPushPackage;
import io.sentry.RNSentryPackage;
import com.theweflex.react.WeChatPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.shimmer.RNShimmerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.horcrux.svg.SvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  // 设置为 true 将不会弹出 toast
  private boolean SHUTDOWN_TOAST = true;
  // 设置为 true 将不会打印 log
  private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new OrientationPackage(),
            new RCTPdfView(),
            new RNFetchBlobPackage(),
            new WeChatPackage(),
            new RNDeviceInfo(),
            new RNSensorsAnalyticsPackage(),
            new RNCameraPackage(),
            new HotnodePackage(),
            new RealmReactPackage(),
            new ImagePickerPackage(),
            new KeychainPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
            new RNSentryPackage(),
            new RNViewShotPackage(),
            new SplashScreenReactPackage(),
            new LinearGradientPackage(),
            new CodePush(BuildConfig.CODEPUSH_DEPLOYMENT_KEY_ANDROID, getApplicationContext(), BuildConfig.DEBUG),
            new RNShimmerPackage(),
            new ReactNativeConfigPackage(),
            new SvgPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
