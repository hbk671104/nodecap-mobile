package com.nodecap;

        import android.os.Bundle;

        import com.facebook.react.ReactActivity;
        import com.facebook.react.bridge.ReactContext;
        import com.sensorsdata.analytics.android.sdk.SensorsDataAPI;

        import org.devio.rn.splashscreen.SplashScreen;

        import java.util.ArrayList;
        import java.util.List;

        import cn.jpush.android.api.JPushInterface;

public class MainActivity extends ReactActivity {

    // Debug 模式选项
    //   SensorsDataAPI.DebugMode.DEBUG_OFF - 关闭 Debug 模式
    //   SensorsDataAPI.DebugMode.DEBUG_ONLY - 打开 Debug 模式，校验数据，但不进行数据导入
    //   SensorsDataAPI.DebugMode.DEBUG_AND_TRACK - 打开 Debug 模式，校验数据，并将数据导入到 Sensors Analytics 中
    // 注意！请不要在正式发布的 App 中使用 Debug 模式！
    final SensorsDataAPI.DebugMode SA_DEBUG_MODE = SensorsDataAPI.DebugMode.DEBUG_OFF;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "nodecap";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ReactContext ctx = getReactInstanceManager().getCurrentReactContext();
        if (ctx == null) {
            SplashScreen.show(this, true);  // here
        }

        super.onCreate(savedInstanceState);

        // JPush
        JPushInterface.init(this);
        
        // 初始化 SDK
        SensorsDataAPI.sharedInstance(
                this,                               // 传入 Context
                BuildConfig.SENSOR_SDK_URL,                      // 数据接收的 URL
                SA_DEBUG_MODE);                     // Debug 模式选项

        // 打开自动采集, 并指定追踪哪些 AutoTrack 事件
        List<SensorsDataAPI.AutoTrackEventType> eventTypeList = new ArrayList<>();
        // $AppStart
        eventTypeList.add(SensorsDataAPI.AutoTrackEventType.APP_START);
        // $AppEnd
        eventTypeList.add(SensorsDataAPI.AutoTrackEventType.APP_END);
        // $AppViewScreen
        eventTypeList.add(SensorsDataAPI.AutoTrackEventType.APP_VIEW_SCREEN);
        // $AppClick
        eventTypeList.add(SensorsDataAPI.AutoTrackEventType.APP_CLICK);
        SensorsDataAPI.sharedInstance().enableAutoTrack(eventTypeList);
    }
}
