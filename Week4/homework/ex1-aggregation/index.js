const fs = require('fs');
const parse = require('csv-parse');
const { MongoClient } = require('mongodb');



const mongoURL = 'mongodb+srv://dshamma89:<password>@cluster0.iy4atgb.mongodb.net/';
const dbName = 'Countries';


async function insertCSVData(filePath, dbName, collectionName) {
  const client = new MongoClient(mongoURL, { useNewUrlParser: true });


  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const data = fs.readFileSync(filePath, 'utf8');
    const records = await new Promise((resolve, reject) => {
      parse(data, { columns: true }, (err, records) => {
        if (err) reject(err);
        else resolve(records);
      });
    });

    const result = await collection.insertMany(records);
    console.log(`${result.insertedCount} records inserted.`);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

async function getTotalPopulationByCountryAndYear(dbName, collectionName, country) {
  const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const pipeline = [
      {
        $match: { Country: country },
      },
      {
        $group: {
          _id: '$Year',
          countPopulation: {
            $sum: { $add: ['$M', '$F'] },
          },
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

async function getContinentInformation(dbName, collectionName, year, age) {
  const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const pipeline = [
      {
        $match: { Year: year, Age: age },
      },
      {
        $project: {
          Country: 1,
          Year: 1,
          Age: 1,
          M: 1,
          F: 1,
          TotalPopulation: { $sum: ['$M', '$F'] },
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

// Usage
insertCSVData('population_data.csv', dbName, 'population_data')
  .then(() => {
    return getTotalPopulationByCountryAndYear(dbName, 'population_data', 'Netherlands');
  })
  .then((countryPopulation) => {
    console.log('Total Population by Country and Year:', countryPopulation);
    return getContinentInformation(dbName, 'population_data', 2020, '100+');
  })
  .then((continentInfo) => {
    console.log('Continent Information with Total Population:', continentInfo);
  });

