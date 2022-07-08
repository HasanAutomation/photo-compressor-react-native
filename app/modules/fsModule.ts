import {NativeModules} from 'react-native';

const {fsModule} = NativeModules;

interface FsModuleInterface {
  greetingFromNative(value: string): Promise<string>;
  getImageSize(uri: string): Promise<number>;
}

export default fsModule as FsModuleInterface;
