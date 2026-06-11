import dotenv from "dotenv"
import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import topMusicData from "./data/top-music.json" with { type: "json" }
import listEndpoints from "express-list-endpoints"

dotenv.config()

// If you're using one of our datasets, uncomment the appropriate import below
// to get started!
// import avocadoSalesData from "./data/avocado-sales.json"
// import booksData from "./data/books.json"
// import goldenGlobesData from "./data/golden-globes.json"
// import netflixData from "./data/netflix-titles.json"

const Track = mongoose.model('Track', {
  id: Number,
  trackName: String,
  artistName: String,
  genre: String,
  bpm: Number,
  energy: Number,
  danceability: Number,
  loudness: Number,
  liveness: Number,
  valence: Number,
  length: Number,
  acousticness: Number,
  speechiness: Number,
  popularity: Number
})
if (process.env.RESET_DB) {
  const seedDatabase = async () => {
    await Track.deleteMany({})
    topMusicData.forEach((track) => {
      new Track(track).save()
    })
  }
  seedDatabase()
}

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/project-first-api"
mongoose.connect(mongoUrl)
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get("/", (req, res) => {
  res.json(listEndpoints(app))
})

app.get("/tracks", async (req, res) => {
  const { genre, artistName } = req.query
  const filter = {}
  if (genre) filter.genre = genre
  if (artistName) filter.artistName = artistName
  const tracks = await Track.find(filter)
  res.json(tracks)
})

app.get("/tracks/:id", async (req, res) => {
  const track = await Track.findById(req.params.id)
  res.json(track)
})

app.get("/tracks/genre/:genre", async (req, res) => {
  const tracks = await Track.find({ genre: req.params.genre })
  res.json(tracks)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
