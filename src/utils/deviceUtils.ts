import { PermissionsAndroid, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';



export const getDeviceDetails = async () => {
  const os = Platform.OS;
  const deviceName = await DeviceInfo.getDeviceName();
  const macAddress = await DeviceInfo.getMacAddress();
  const imei = await DeviceInfo.getUniqueId();
  const location = await getCurrentLocation();
  const publicIp = await fetchPublicIP();

  return { os, deviceName, macAddress, imei, location, publicIp };
};


const fetchPublicIP = async () => {
  const response = await axios.get('https://api64.ipify.org?format=json');
  return response.data.ip;
};

const requestPermissionIOS = async () => {
  const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  if (result === RESULTS.GRANTED) {
    console.log('Location permission granted');
    return true;
  } else {
    console.log('Location permission denied');
    return false;
  }
};

export const requestPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location for better experience.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        console.log('Location permission denied by user.');
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('Permission denied permanently.');
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    requestPermissionIOS()
  }
  return false;
};

export const getCurrentLocation = async () => {
  const hasPermission = await requestPermission();
  if (!hasPermission) return;

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  });
};
