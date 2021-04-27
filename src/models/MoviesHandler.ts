import {Repo} from '../repos';
import {store} from '../redux/store';
import {requestMovies, addMovies} from '../redux';

export class MoviesHandler {
  repo: Repo;
  moviesPage: number = 1;

  constructor(repo: Repo) {
    this.repo = repo;
  }

  /**
   * updateMovies updates the store with the movies from the repository.
   */
  public async updateMoviesAsync() {
    const movies = await this.repo.getTopRatedAsync();
    store.dispatch(requestMovies(movies));
  }

  public async fetchMoreMoviesAsync() {
    const movies = await this.repo.getTopRatedByPageAsync(++this.moviesPage);
    store.dispatch(addMovies(movies));
  }

  public resetPageToOne() {
    this.moviesPage = 1;
  }
}
