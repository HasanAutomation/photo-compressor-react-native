import {NativeModules} from 'react-native';

const {fsModule} = NativeModules;

interface FsModuleInterface {
  greetingFromNative(value: string): Promise<string>;
}

export default fsModule as FsModuleInterface;
