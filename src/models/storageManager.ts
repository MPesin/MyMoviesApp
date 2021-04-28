import AsyncStorage from '@react-native-async-storage/async-storage';
import {MovieItem} from '../services';

const STORAGE_KEY = 'favorites_storage_key_my_movies';

/**
 * Storage manager is resposible for storing the ID's of the favorite movies.
 */
export class StorageManager {
  public async saveMovieAsync(item: MovieItem) {
    try {
      const storedData = await this.getStoredDataAsync();
      const storedList: string[] = JSON.parse(storedData);
      storedList.push(`${item.id}`);
      const dataToStore = JSON.stringify(storedList);
      await AsyncStorage.setItem(STORAGE_KEY, dataToStore);
    } catch (err) {
      console.error(err);
    }
  }

  public async deleteMovieAsync(movie: MovieItem) {
    try {
      const storedData = await this.getStoredDataAsync();
      let storedList: string[] = JSON.parse(storedData);
      const id: string = `${movie.id}`;
      storedList = storedList.filter(item => id !== item);
      const dataToStore = JSON.stringify(storedList);
      await AsyncStorage.setItem(STORAGE_KEY, dataToStore);
    } catch (err) {
      console.error(err);
    }
  }

  public async getAllStoredIDsAsync(): Promise<string[]> {
    try {
      const storedData = await this.getStoredDataAsync();
      return JSON.parse(storedData);
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  private async getStoredDataAsync(): Promise<string> {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const data = storedData ? storedData : JSON.stringify([]); // if no data then return a stringifies empty list.
      return data;
    } catch (err) {
      console.error(err);
      return JSON.stringify([]);
    }
  }
}
