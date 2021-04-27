import {MovieItem} from '../services';

export interface Repo {
  getTopRatedAsync: () => Promise<MovieItem[]>;
  getTopRatedByPageAsync: (pageNumber: number) => Promise<MovieItem[]>;
  searchByMovieTitle: (title: string) => Promise<MovieItem[]>;
  getMovieByID: (id: number) => Promise<MovieItem | undefined>;
}
