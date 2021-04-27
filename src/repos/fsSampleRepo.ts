import {MovieItem} from '../models';
import {Repo} from '.';

export class FSSampleRepo implements Repo {
  public async getTopRatedAsync(): Promise<MovieItem[]> {
    let movies: MovieItem[] = require('../_data/moviesSample.json');
    return movies;
  }

  public async getTopRatedByPageAsync(_: number): Promise<MovieItem[]> {
    let movies: MovieItem[] = require('../_data/moviesSample.json');
    return movies;
  }
}
