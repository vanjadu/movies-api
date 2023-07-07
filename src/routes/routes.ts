import {
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
} from '../controllers/movieControllers'
import { Router } from 'express'

const router = Router()

// I created routes by RESTful conventions
router.get('/movies', getAllMovies)
router.get('/movies/:id', getMovieById)
router.get('/movies/search/:title', searchMovieByTitle)
router.get('/movies/year/:year', getMovieByYear)
router.get('/movies/imdb/:imdbRating', getMovieByIMDBRating)
router.get('/movies/type/:type', getMovieByType)
router.get('/movies/comming-soon', getCommingSoonMovies)
router.post('/movies/add-movie', addNewMovie)
router.put('/movies/update-movie/:id', updateMovie)
router.delete('/movies/delete-movie/:id', deleteMovie)

export default router
