import { AsyncStorage } from 'react-native';

class AppData {

  getItemForKey = async (key, callback) => {

    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        callback(true, value);
      }
    } catch (error) {
      // Error retrieving data
      callback(false, error.message);
    }

  };

  setItemForKey = async (key, value, callback) => {

    try {
      await AsyncStorage.setItem(key, value, () => {
        callback(true);
      });
    } catch (error) {
      callback(false);
    }
  }

  clearData = async callback => {
    try {
      await AsyncStorage.clear(() => {
        callback(true);
      });
    } catch (error) {
      callback(false);
    }
  };
  
}

export default new AppData();