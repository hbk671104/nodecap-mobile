import ImagePicker from 'react-native-image-picker';

export const launchImagePicker = callback => {
  ImagePicker.showImagePicker(
    {
      title: null,
      chooseFromLibraryButtonTitle: '相册中选择...',
      takePhotoButtonTitle: '拍照...',
      cancelButtonTitle: '取消',
      mediaType: 'photo',
      quality: 1,
      allowsEditing: true,
    },
    callback,
  );
};
