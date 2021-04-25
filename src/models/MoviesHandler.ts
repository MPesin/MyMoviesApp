import {Repo} from '../repos';
import {MovieItem} from '../services/movieItem';
import {store} from '../redux/store';
import {requestMovies} from '../redux';

export class MoviesHandler {
  repo: Repo;

  constructor(repo: Repo) {
    this.repo = repo;
  }

  public updateMovies() {
    const movies = this.loadMoviesFromRepo();
    store.dispatch(requestMovies(movies));
  }

  public loadMoviesFromRepo(): MovieItem[] {
    return this.repo.getAll();
  }
}
