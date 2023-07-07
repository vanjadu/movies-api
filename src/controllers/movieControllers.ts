import { Request, Response } from 'express'
import movies from '../data/movies.json'
import fs from 'fs'
import MovieType from '../types/MovieType'

const getAllMovies = (req: Request, res: Response) => {
  res.send(movies)
}

const getMovieById = (req: Request, res: Response) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === Number(id))

  if (!movie) {
    res.status(404).send('Movie not found!')
  }

  res.status(200).send(movie)
}

const searchMovieByTitle = (req: Request, res: Response) => {
  const { title } = req.params

  const moviesByTitle = movies.filter((movie) => {
    return movie.Title.toLowerCase().includes(title.toLowerCase())
  })

  if (!moviesByTitle) {
    res.status(404).send('Movie not found!')
  }

  res.status(200).send(moviesByTitle)
}

const getMovieByYear = (req: Request, res: Response) => {
  const { year } = req.params
  const moviesByYear = movies.filter((movie) => movie.Year === year)

  if (moviesByYear.length > 0) {
    res.status(200).send(moviesByYear)
  } else {
    res.status(404).send('Movies not found!')
  }
}

const getMovieByIMDBRating = (req: Request, res: Response) => {
  const { imdbRating } = req.params
  const moviesByIMDBRating = movies.filter(
    (movie) => movie.imdbRating === parseInt(imdbRating)
  )

  if (moviesByIMDBRating.length > 0) {
    res.status(200).send(moviesByIMDBRating)
  } else {
    res.status(404).send('Movies not found!')
  }
}

const getMovieByType = (req: Request, res: Response) => {
  const { type } = req.params
  const moviesByType = movies.filter((movie) => movie.Type === type)

  if (moviesByType.length > 0) {
    res.status(200).send(moviesByType)
  } else {
    res.status(404).send('Movies not found!')
  }
}

const getCommingSoonMovies = (req: Request, res: Response) => {
  const commingSoonMovies = movies.filter((movie) => movie.ComingSoon === true)

  if (commingSoonMovies.length > 0) {
    res.status(200).send(commingSoonMovies)
  } else {
    res.status(404).send('Movies not found!')
  }
}

const addNewMovie = (req: Request, res: Response) => {
  const newMovie = req.body

  if (
    !newMovie.Title ||
    !newMovie.Year ||
    !newMovie.imdbRating ||
    !newMovie.Type ||
    !newMovie.ComingSoon ||
    !newMovie.Category
  ) {
    res
      .status(400)
      .send(
        'Movie needs a title, year, imdbRating, type, category and comingSoon field!'
      )
  }

  fs.readFile('./src/data/movies.json', 'utf8', (err, data) => {
    if (err) res.status(500).send('Something went wrong!')

    const movies = JSON.parse(data)

    const newMovieId = movies[movies.length - 1].id + 1
    const newMovieWithId = { id: newMovieId, ...newMovie }

    movies.push(newMovieWithId)

    fs.writeFile(
      './src/data/movies.json',
      JSON.stringify(movies, null, 2),
      (err) => {
        if (err) res.status(500).send('Something went wrong!')

        res.status(201).send('New movie added!')
      }
    )
  })
}

const updateMovie = (req: Request, res: Response) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === Number(id))

  if (!movie) {
    res.status(404).send('Movie not found!')
  }

  const updatedMovie = { ...movie, ...req.body }

  const index = movies.indexOf(movie as MovieType)

  movies[index] = updatedMovie

  fs.writeFile(
    './src/data/movies.json',
    JSON.stringify(movies, null, 2),
    (err) => {
      if (err) res.status(500).send('Something went wrong!')

      res.status(200).send('Movie updated!')
    }
  )
}

const deleteMovie = (req: Request, res: Response) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === Number(id))

  if (!movie) {
    res.status(404).send('Movie not found!')
  }

  const index = movies.indexOf(movie as MovieType)
  movies.splice(index, 1)

  fs.writeFile(
    './src/data/movies.json',
    JSON.stringify(movies, null, 2),
    (err) => {
      if (err) res.status(500).send('Something went wrong!')

      res.status(200).send('Movie deleted!')
    }
  )
}

export {
  getAllMovies,
  getMovieById,
  searchMovieByTitle,
  getMovieByYear,
  getMovieByIMDBRating,
  getMovieByType,
  getCommingSoonMovies,
  addNewMovie,
  updateMovie,
  deleteMovie,
}
