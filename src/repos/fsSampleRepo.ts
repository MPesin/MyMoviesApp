import {MovieItem} from '../models';
import {Repo} from '.';

export class FSSampleRepo implements Repo {
  public async getAll(): Promise<MovieItem[]> {
    let movies: MovieItem[] = require('../_data/moviesSample.json');
    return movies;
  }
}
