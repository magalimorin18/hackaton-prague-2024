import { TYPE } from '../interface';

// OUTDATED- Remove when fully move on to ENVIO

export const URL = 'https://graph.mainnet.lukso.dev/subgraphs/name/lukso/lsps';

export const generateGraphQuery = (
  type: string,
  firstBlock: number,
  lastBlock: number,
) => {
  switch (type) {
    case TYPE.PROFILES:
    // return `query MyQuery($nullId: ID = "", $nullString: String = "") {\n  profiles(\n    where: {id_not: $nullId, name_not: $nullString, profileImages_: {url_not: $nullString}}\n    skip: ${offset}\n  first: 100\n) {\n    id\n    name\n    profileImages(first: 1) {\n      url\n    }\n  }\n}`;
    case TYPE.TRANSACTIONS:
    // return `query MyQuery($null: Bytes = "") {\n  transactions(\n    where: {hash_not: $null, profile_: {id_not: "null"}, to_not: $null, to_not_contains: "0x2300000A84D25dF63081feAa37ba6b62C4c89a30"}\n  skip: ${offset}\n  first: 100\n) {\n    hash\n    profile {\n      id\n    }\n    to\n  }\n}`;
    default:
      return '';
  }
};

export const getData = async (query: string) => {
  try {
    const headers = {
      'content-type': 'application/json',
    };

    const requestBody = {
      extension: {},
      operationName: 'MyQuery',
      query: query,
    };

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    };

    const response = await fetch(URL, options);
    const responseJson = await response.json();
    return responseJson.data;
  } catch (error) {
    console.log('❌ ERROR DURING GRAPH_URL REQUEST', error);
    throw error;
  }
};
