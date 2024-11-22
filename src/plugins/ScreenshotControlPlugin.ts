import { NativeModules } from 'react-native';

const { ScreenshotControl } = NativeModules;

export const enableScreenshot = async () => {
  try {
    const result = await ScreenshotControl.enableScreenshot();
    console.log('enableScreenshot', result); // Handle success
  } catch (error) {
    console.error("Error enabling screenshot:", error);
  }
};

export const disableScreenshot = async () => {
  try {
    const result = await ScreenshotControl.disableScreenshot();
    console.log('disableScreenshot', result); // Handle success
  } catch (error) {
    console.error("Error disabling screenshot:", error);
  }
};
