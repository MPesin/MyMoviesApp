import {MovieItem} from '../models';
import {Repo} from '.';

export class FSRepo implements Repo {
  public getAll(): MovieItem[] {
    let movies: MovieItem[] = require('../_data/moviesSample.json');
    return movies;
  }
}
