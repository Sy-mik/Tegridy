import AsyncStorage from "@react-native-community/async-storage";

export class LocalData {
  save(key, item) {
    const storeData = async (key, value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@" + key, jsonValue);
      } catch (e) {
        console.log(e);
      }
    };
    storeData(key, item);
  }

  get(key) {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@" + key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log(e);
      }
    };
    return getData();
  }
}
