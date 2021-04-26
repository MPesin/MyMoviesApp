import {Repo} from '../repos';
import {store} from '../redux/store';
import {requestMovies} from '../redux';

export class MoviesHandler {
  repo: Repo;

  constructor(repo: Repo) {
    this.repo = repo;
  }

  /**
   * updateMovies updates the store with the movies from the repository.
   */
  public async updateMovies() {
    const movies = await this.repo.getAll();
    store.dispatch(requestMovies(movies));
  }
}
