const { MongoClient } = require('mongodb');


async function main() {
    const uri = 'mongodb+srv://Nourahrj1:Girl1234@cluster0.5hiedi6.mongodb.net/?retryWrites=true&w=majority'

    const client = new MongoClient(uri);
    try {
        await client.connect();
        //   await listDatabases(client);
        /* await createListing(client, {
             name: "Nourah",
             Result: "Is it connected or not?",
             Hope: "Yesss"
         })*/
        await createMultipleListings(client, [{

            name: "NourahAlrajhi",
            Result: "Is it connected or not?",
            Hope: "Yesss"
        },
            {
                name: "RayaAloud",
                Result: "Is it connected or not?",
                Hope: "Yesss"
            },
            {
                name: "Danah",
                Result: "Is it connected or not?",
                Hope: "Yesss"
            },
            {
                name: "Ghada",
                Result: "Is it connected or not?",
                Hope: "Yesss"
            },
            {
                name: "Rahaf",
                Result: "Is it connected or not?",
                Hope: "Yesss"
            }]);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);



//Add multiple doc to specific Collection
async function createMultipleListings(client, newListings) {
    const result2 = await client.db("Pinnacle").collection("Test1").insertMany(newListings);
    console.log(` ${result2.insertedCount} new Listing created with the following id(s):`);
    console.log(result2.insertedIds);

}

//Add only one doc to specific Collection
async function createListing(client, newListing) {
    const result = await client.db("Pinnacle").collection("Test1").insertOne(newListing);
    console.log(`New Listing created with the following id: ${result.insertedId}`);
}

//See what are the database that we have in out cluster
async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}

