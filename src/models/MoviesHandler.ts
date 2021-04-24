import {DatePickerIOSBase} from 'react-native';
import {useAppDispatch} from '../redux';
import {Repo} from '../repos';
import {MovieItem} from '../services/movieItem';

export class MoviesHandler {
  repo: Repo;

  constructor(repo: Repo) {
    this.repo = repo;
  }

  public initialize() {
    this.loadMoviesFromRepo();
  }

  public loadMoviesFromRepo(): MovieItem[] {
    return this.repo.getAll();
    //const dispatch = useAppDispatch();
  }
}
