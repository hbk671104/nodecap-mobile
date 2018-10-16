import ImagePicker from 'react-native-image-picker';

export const launchImagePicker = callback => {
  ImagePicker.showImagePicker(
    {
      title: null,
      chooseFromLibraryButtonTitle: '从相册中选取',
      takePhotoButtonTitle: '拍照',
      cancelButtonTitle: '取消',
      mediaType: 'photo',
      quality: 1,
      allowsEditing: true,
    },
    callback,
  );
};
