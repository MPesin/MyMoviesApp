import {Repo} from '.';
import {MovieItem, GenerItem} from '../services';
import Config from 'react-native-config';
import axios from 'axios';

const TOP_RATED_PATH = '/movie/top_rated';
const GENERS_PATH = '/genre/movie/list';

export class ApiRepo implements Repo {
  geners: GenerItem[] = [];
  public async getAll(): Promise<MovieItem[]> {
    const responseArray = await this.getTopRatedResponseArray();
    this.geners = await this.getGeners();
    let movies: MovieItem[] = this.convertResponseToMovieItem(responseArray);
    return movies;
  }

  private async getTopRatedResponseArray(): Promise<any[]> {
    try {
      const url = this.buildUrl(TOP_RATED_PATH);
      const response = await axios.get<any>(url);
      return response.data.results;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  private buildUrl(path: string): string {
    return `${Config.API_URL}${path}?api_key=${Config.API_KEY}`;
  }

  private async getGeners(): Promise<GenerItem[]> {
    try {
      const url = this.buildUrl(GENERS_PATH);
      const genersRes = await axios.get<{genres: GenerItem[]}>(url);
      return genersRes.data.genres;
    } catch (err) {
      return [];
    }
  }

  private convertResponseToMovieItem(responseArray: any[]): MovieItem[] {
    const results: MovieItem[] = [];
    let i: number;
    for (i = 0; i < responseArray.length; i++) {
      const responseItem = responseArray[i];
      const movieItem = this.convertResponseItemToMovieItem(responseItem);
      results.push(movieItem);
    }
    return results;
  }

  private convertResponseItemToMovieItem(responseItem: any): MovieItem {
    const generesOfMovie = this.printGenersOfMovie(responseItem.genre_ids);
    const posterUrl = this.buildImagePath(responseItem.poster_path);
    const year = this.getYearFromReleaseDate(responseItem.release_date);

    return {
      id: responseItem.id,
      title: responseItem.title,
      rating: responseItem.vote_average,
      catagory: generesOfMovie,
      poster: posterUrl,
      year: year,
      isFavorite: false,
    };
  }

  private printGenersOfMovie(ids: number[]): string {
    let genersString = '';
    ids.forEach(id => {
      this.geners.forEach(gener => {
        if (id === gener.id) {
          genersString += `${gener.name}/`;
        }
      });
    });
    return genersString;
  }

  private buildImagePath(pathToImage: string): string {
    return `${Config.API_IMAGE_URL}${pathToImage}`;
  }

  private getYearFromReleaseDate(releaseDate: string): number {
    const year = releaseDate.split('-')[0];
    return +year;
  }
}
