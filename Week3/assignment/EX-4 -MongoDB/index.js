const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();


const { seedDatabase } = require("./seedDatabase.js");
async function createEpisodeExercise(client) {
  const bobRossCollection = client.db("databaseWeek3").collection("bob_ross_episodes");

  const newEpisode = {
    episode: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
  };

  const result = await bobRossCollection.insertOne(newEpisode);
  console.log(`Created season 9 episode 13 and the document got the id ${result.insertedId}`);
}


async function findEpisodesExercises(client) {
  const bobRossCollection = client.db("databaseWeek3").collection("bob_ross_episodes");

  // Find the title of episode 2 in season 2
  const episodeS02E02 = await bobRossCollection.findOne({ episode: "S02E02" });
  console.log(`The title of episode 2 in season 2 is ${episodeS02E02.title}`);

  // Find the season and episode number of the episode called "BLACK RIVER"
  const blackRiverEpisode = await bobRossCollection.findOne({ title: "BLACK RIVER" });
  console.log(`The season and episode number of the "BLACK RIVER" episode is ${blackRiverEpisode.episode}`);

  // Find all of the episode titles where Bob Ross painted a CLIFF
  const cliffEpisodes = await bobRossCollection.find({ elements: "CLIFF" }).toArray();
  console.log(`The episodes that Bob Ross painted a CLIFF are ${cliffEpisodes.map(e => e.title).join(", ")}`);

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE
  const cliffAndLighthouseEpisodes = await bobRossCollection.find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } }).toArray();
  console.log(`The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseEpisodes.map(e => e.title).join(", ")}`);
}


async function updateEpisodeExercises(client) {
  const bobRossCollection = client.db("databaseWeek3").collection("bob_ross_episodes");

  // Update episode 13 in season 30
  const updateResult1 = await bobRossCollection.updateOne({ episode: "S30E13" }, { $set: { title: "BLUE RIDGE FALLS" } });
  console.log(`Ran a command to update episode 13 in season 30 and it updated ${updateResult1.matchedCount} episodes`);

  // Update BUSHES to BUSH
  const updateResult2 = await bobRossCollection.updateMany({ elements: "BUSHES" }, { $set: { "elements.$": "BUSH" } });
  console.log(`Ran a command to update all the BUSHES to BUSH and it updated ${updateResult2.matchedCount} episodes`);
}


async function deleteEpisodeExercise(client) {
  const bobRossCollection = client.db("databaseWeek3").collection("bob_ross_episodes");

  // Delete episode 14 in season 31
  const deleteResult = await bobRossCollection.deleteOne({ episode: "S31E14" });
  console.log(`Ran a command to delete episode and it deleted ${deleteResult.deletedCount} episodes`);
}


async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
