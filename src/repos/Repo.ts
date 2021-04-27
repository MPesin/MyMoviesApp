import {MovieItem} from '../models';

export interface Repo {
  getTopRatedAsync: () => Promise<MovieItem[]>;
  getTopRatedByPageAsync: (pageNumber: number) => Promise<MovieItem[]>;
}
