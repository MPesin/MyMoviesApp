import {MovieItem} from '../models';

export interface Repo {
  getAll: () => Promise<MovieItem[]>;
}
