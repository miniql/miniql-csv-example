const { miniql } = require("miniql");
const { createQueryResolver } = require("@miniql/csv");

async function main() {

    //
    // Configures CSV files to be loaded and how they relate to each other.
    //
    const csvFilesConfig = {
        species: {
            primaryKey: "name",
            csvFilePath: "./data/species.csv",
            nested: {
                homeworld: {
                    parentKey: "homeworld",
                    from: "planet",
                },
            },
        },
        planet: {
            primaryKey: "name",
            csvFilePath: "./data/planets.csv",
            nested: {
                species: {
                    foreignKey: "homeworld",
                },
            },
        },
    };
    
    // 
    // Loads CSV files and creates a MiniQL query resolver.
    //
    const queryResolver = await createQueryResolver(csvFilesConfig);

    //
    // Check out each function for example queries.
    //

    await example_query_get_all_species(queryResolver);

    await example_query_get_one_species(queryResolver);

    await example_query_get_one_species_with_nested_entity_lookup(queryResolver);

    await example_query_get_all_species_with_nested_entity_lookup(queryResolver);

    await example_query_get_all_species_with_nested_entity_lookup(queryResolver);
}

//
// Example query to get all species.
//
async function example_query_get_all_species(queryResolver) {

    const query = {
        get: {
            species: { // Query for "species" entity.
                // No arguments gets all entities.
            },
        },
    };

    const result = await miniql(query, queryResolver, {});  // Invokes MiniQL.
    console.log(JSON.stringify(result, null, 4));           // Displays the query result.
}

//
// Example query to get one individual species.
//
async function example_query_get_one_species(queryResolver) {

    const query = {
        get: {
            species: { // Query for "species" entity.
                args: {
                    name: "Hutt", // Gets the one species that matches this name.
                },
            },
        },
    };

    const result = await miniql(query, queryResolver, {});  // Invokes MiniQL.
    console.log(JSON.stringify(result, null, 4));           // Displays the query result.
}

//
// Example query to get a single species with nested entity lookup.
//
async function example_query_get_one_species_with_nested_entity_lookup(queryResolver) {

    const query = {
        get: {
            species: { // Query for "species" entity.
                args: {
                    name: "Hutt", // Gets the one species that matches this name.
                },
                resolve: {
                    homeworld: { // Resolves the homeworld of the species as a nested lookup.
                    },
                },
            },
        },
    };

    const result = await miniql(query, queryResolver, {});  // Invokes MiniQL.
    console.log(JSON.stringify(result, null, 4));           // Displays the query result.
}

//
// Example query to get all species with nested entity lookup.
//
async function example_query_get_all_species_with_nested_entity_lookup(queryResolver) {

    const query = {
        get: {
            species: { // Query for "species" entity.

                // No arguments gets all entities.

                resolve: {
                    homeworld: { // Resolves the homeworld of each species as a nested lookup.
                    },
                },
            },
        },
    };

    const result = await miniql(query, queryResolver, {});  // Invokes MiniQL.
    console.log(JSON.stringify(result, null, 4));           // Displays the query result.
}

//
// Example query to get all planets with nested species lookup.
//
async function example_query_get_all_species_with_nested_entity_lookup(queryResolver) {

    const query = {
        get: {
            planet: {  // Query for "planet" entity.
            
                // No arguments gets all entities.

                resolve: {
                    species: { // Gets all the species related to to each planet.
                    },
                },
            },
        },
    };

    const result = await miniql(query, queryResolver, {});  // Invokes MiniQL.
    console.log(JSON.stringify(result, null, 4));           // Displays the query result.
}

main()
    .then(() => console.log("Done"))
    .catch(err => {
        console.error("Error!");
        console.error(err && err.stack || err);
    })