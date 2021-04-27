import {Repo} from '.';
import {MovieItem, GenerItem} from '../services';
import Config from 'react-native-config';
import axios from 'axios';
import {getLocales} from 'react-native-localize';

const TOP_RATED_PATH = '/movie/top_rated';
const GENERS_PATH = '/genre/movie/list';
const DEFAULT_COUNTRY_CODE = 'US';

export class ApiRepo implements Repo {
  geners: GenerItem[] = [];
  totalPages: number = 1;
  region: string;

  constructor() {
    const currentCountryCode = getLocales()[0]?.countryCode;
    this.region = currentCountryCode
      ? currentCountryCode
      : DEFAULT_COUNTRY_CODE;
  }

  public async getTopRatedAsync(): Promise<MovieItem[]> {
    const responseArray = await this.getTopRatedResponseArrayAsync(1);
    this.geners = await this.getGenersAsync();
    let movies: MovieItem[] = this.convertResponseToMovieItem(responseArray);
    return movies;
  }

  public async getTopRatedByPageAsync(
    pageNumber: number,
  ): Promise<MovieItem[]> {
    const responseArray = await this.getTopRatedResponseArrayAsync(pageNumber);
    this.geners = await this.getGenersAsync();
    let movies: MovieItem[] = this.convertResponseToMovieItem(responseArray);
    return movies;
  }

  private async getTopRatedResponseArrayAsync(
    pageNumber: number,
  ): Promise<any[]> {
    try {
      if (pageNumber > this.totalPages) {
        return [];
      }

      const url = this.buildUrl(TOP_RATED_PATH, pageNumber);
      const response = await axios.get<any>(url);

      // set total pages for future checks
      const total = response.data.total_pages;
      if (total !== this.totalPages) {
        this.totalPages = total;
      }

      return response.data.results;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  private buildUrl(path: string, pageNumber: number): string {
    let url = `${Config.API_URL}${path}?api_key=${Config.API_KEY}&region=${this.region}`;
    if (pageNumber > 0) {
      url += `&page=${pageNumber}`;
    }
    return url;
  }

  private async getGenersAsync(): Promise<GenerItem[]> {
    try {
      const url = this.buildUrl(GENERS_PATH, 0);
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
    let genersString: string[] = [];
    ids.forEach(id => {
      this.geners.forEach(gener => {
        if (id === gener.id) {
          genersString.push(gener.name);
        }
      });
    });
    return genersString.join('/');
  }

  private buildImagePath(pathToImage: string): string {
    return `${Config.API_IMAGE_URL}${pathToImage}`;
  }

  private getYearFromReleaseDate(releaseDate: string): number {
    const year = releaseDate.split('-')[0];
    return +year;
  }
}
