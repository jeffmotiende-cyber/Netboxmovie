const mongoose = require('mongoose');

const movieCacheSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    title: String,
    overview: String,
    posterPath: String,
    backdropPath: String,
    genres: [{ id: Number, name: String }],
    releaseDate: String,
    runtime: Number,
    voteAverage: Number,
    voteCount: Number,
    popularity: Number,
    originalLanguage: String,
    productionCompanies: [{ id: Number, name: String, logoPath: String }],
    tagline: String,
    budget: Number,
    revenue: Number,
    status: String,
    views: { type: Number, default: 0 },
    favoritesCount: { type: Number, default: 0 },
    wishlistCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MovieCache', movieCacheSchema);

