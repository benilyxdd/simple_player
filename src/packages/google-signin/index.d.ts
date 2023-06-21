import { NativeModuleError } from '@react-native-google-signin/google-signin';

declare module '@react-native-google-signin/google-signin' {
  export function isNativeModuleError(error: any): error is NativeModuleError {
    return typeof error === 'object' && 'code' in error;
  }
}
