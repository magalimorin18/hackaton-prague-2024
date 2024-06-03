# 🌐 Universal Graph - ETHPrague 2024

![Cover image hackathon EthPrague 2024](./docs/ogp.png)

## Presentation

A Social visualisation of the blockchain to highlights interactions between Universal Profiles. The main objective is on to monitor chain activity.

It works as follow:

1. data from The Graph (indexed via a subgraph) is retrieved via graphql in JSON.
2. The JSON data is then processed in CSV and injected in a Neo4j database.
3. The Neo4j instance performs query to generate data that can be consumed to generate a network visualisation (nodes, edges, weight, relationships).
4. The dApp connects to the Neo4j instance using [`neo4j-driver`](https://www.npmjs.com/package/neo4j-driver) package.
5. The data retrieved is then consumed and displayed visually on the interface as a network using **D3.js**.

### Built with

- [The Graph](./api/)
- [Neo4j](https://neo4j.com/)
- [Next.js](https://nextjs.org/)
- [d3.js](https://d3js.org)
- [LSPs standards](https://docs.lukso.tech/standards/introduction)

## Installation

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Retrieve data from the graph

You can run the following commands to query the Graph Node and retrieve some data. This data will be saved in a csv file in `./api/data`
The offset is a parameter that represent the number of data entity to retrieve from the graph.

How to chose the offset:
If offset is set to 10 then, 10 000 profiles or assets or transactions will be retrieved.
If offset is set at 20 then, 20 000 profiles or assets or transactions will be retrieved.

You can specify the offset as an argument of the npm command. If no offset is provided, the default offset will be set at 1 (which corresponds to 1 000 entities).

```bash
npm run graph:profile <offset>

# or

npm run graph:assets <offset>

# or

npm run graph:txs <offset>
```

## Upload data to neo4j

1. IMPORT
   On neo4j you can import the csv files `Profiles.csv` and `Transactions.csv` and then match the model schema to the file directly from the UI.

2. QUERY
   You will then have to create the relationship between the profiles that have interacted through a transaction.
   Run the CYPHER command below

```cypher
MATCH (transactions:Transactions)
UNWIND transactions as tx
MATCH (sender:Profiles {id: tx.from})
MATCH (recipient:Profiles {id: tx.to})
MERGE (sender)-[:TX_BWT_PROFILES]->(recipient)
```

or

```cypher
MATCH (transactions:Transactions)
UNWIND transactions as tx
MERGE (sender:Profiles {id: tx.from})
MERGE (recipient:Profiles {id: tx.to})
CREATE (sender)-[:TX]->(recipient)
```

Visualise all transactions between profiles by running the following command:

`MATCH p=()-[:TX]->() RETURN p`
