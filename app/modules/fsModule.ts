import {NativeModules} from 'react-native';

const {fsModule} = NativeModules;

type Callback = (message: string) => void;

interface FsModuleInterface {
  greetingFromNative(value: string, cb: Callback): void;
}

export default fsModule as FsModuleInterface;
