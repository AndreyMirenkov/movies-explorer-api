const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const DeleteError = require('../errors/delete-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({}).then((movies) => res.send({ data: movies }))
    .catch(next);
};
module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch(next);
};
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).then((movie) => {
    if (movie === null) {
      throw new NotFoundError('Запрашиваемый фильм не найден');
    }
    if (movie.owner == req.user._id) {
      Movie.findByIdAndRemove(movie._id).then(() => {
        res.status(200).send({ message: 'Фильм удалён' });
      });
    } else {
      throw new DeleteError('Вы не можете удалить чужой фильм');
    }
  })
    .catch(next);
};
