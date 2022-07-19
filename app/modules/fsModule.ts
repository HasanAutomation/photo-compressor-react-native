import {NativeModules} from 'react-native';

const {fsModule} = NativeModules;

type compressedImage = {size: number; uri: string};

interface FsModuleInterface {
  greetingFromNative(value: string): Promise<string>;
  getImageSize(uri: string): Promise<number>;
  compressImage(uri: string, quality: number): Promise<compressedImage>;
  saveImageToDevice(
    uri: string,
    imageName: string,
    compressValue: number,
  ): Promise<string>;
}

export default fsModule as FsModuleInterface;
