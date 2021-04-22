import {Repo} from '../repos';
import {MovieItem} from './MovieItem';

export class MoviesHandler {
  repo: Repo;
  constructor(repo: Repo) {
    this.repo = repo;
  }

  public loadAllMovies(): MovieItem[] {
    const movies = this.repo.getAll();
    return movies;
  }
}
