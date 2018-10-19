FROM elviejokike/react-native-android:latest

ADD . /

RUN yarn install
RUN react-native link
RUN react-native run-android
