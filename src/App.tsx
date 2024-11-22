import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Button, Alert, ActivityIndicator, Image } from 'react-native';
import { enableScreenshot, disableScreenshot } from './plugins/ScreenshotControlPlugin';
import { submitDeviceDetails } from './services/apiService';
import { getDeviceDetails } from './utils/deviceUtils';

const App = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = useCallback(async () => {
    setLoading(true);
    try {
      if (isActivated) {
        await disableScreenshot();
      } else {
        await enableScreenshot();
      }

      const deviceDetails = await getDeviceDetails();
      await submitDeviceDetails({ ...deviceDetails, screenshotStatus: !isActivated });

      setIsActivated(!isActivated);
      Alert.alert('Success', `Screenshot ${isActivated ? 'disabled' : 'enabled'}`);
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false);
    }
  }, [isActivated]);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.webp')} style={{height:80, width:80, borderRadius:10, marginBottom:30}}/>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          title={isActivated ? 'Activated' : 'Activate'}
          onPress={handleToggle}
          color={isActivated ? 'green' : 'blue'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default App;
