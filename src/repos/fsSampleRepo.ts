import {MovieItem} from '../services';
import {Repo} from '.';

export class FSSampleRepo implements Repo {
  public async getTopRatedAsync(): Promise<MovieItem[]> {
    let movies: MovieItem[] = require('../_data/moviesSample.json');
    return movies;
  }

  public async getTopRatedByPageAsync(_: number): Promise<MovieItem[]> {
    let movies: MovieItem[] = require('../_data/moviesSample.json');
    return movies;
  }

  public async searchByMovieTitle(title: string): Promise<MovieItem[]> {
    let movies: MovieItem[] = require('../_data/moviesSample.json');
    const searchedMovies = movies.filter(movie => movie.title.includes(title));
    return searchedMovies;
  }

  public async getMovieByID(id: number): Promise<MovieItem | undefined> {
    let movies: MovieItem[] = require('../_data/moviesSample.json');
    const searchedMovie = movies.find(movie => movie.id === id);
    return searchedMovie;
  }
}
