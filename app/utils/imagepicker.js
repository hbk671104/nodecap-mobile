import ImagePicker from 'react-native-image-picker';

export const launchImagePicker = callback => {
  ImagePicker.showImagePicker(
    {
      title: null,
      chooseFromLibraryButtonTitle: '从相册中选取',
      takePhotoButtonTitle: '拍照',
      cancelButtonTitle: '取消',
      mediaType: 'photo',
      quality: 0.6,
      maxWidth: 1024,
      maxHeight: 1024,
      allowsEditing: true,
    },
    callback,
  );
};
