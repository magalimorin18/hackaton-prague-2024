import { ENVIO_URL } from '../../globals';
import { TYPE } from '../interface';

export const generateGraphQuery = (
  type: string,
  firstBlock: number,
  lastBlock: number,
  offset: number,
  limit = 1000,
) => {
  switch (type) {
    case TYPE.PROFILES:
      return `query MyQuery {\n  Profile(\n    where: {\n      id: { _is_null: false }\n      blockNumber: { _gte: ${firstBlock}, _lte: ${lastBlock} }\n    }\n    limit: ${limit}\n    offset: ${offset}\n  ) {\n    name\n    id\n    profileImages {\n      url\n    }\n  }\n}`;
    case TYPE.TRANSACTIONS:
      return `query MyQuery {\n  Transfer(\n    where: {\n      blockNumber: {  }\n      _or: {\n        from: { isEOA: { _eq: false } }\n        to: { isEOA: { _eq: false } }\n        blockNumber: { _gt: ${firstBlock}, _lte: ${lastBlock} }\n      }\n    }\n    limit: ${limit}\n    offset: ${offset}\n  ) {\n    from_id\n    to_id\n    transaction_id\n  }\n}`;
    default:
      return '';
  }
};

const queryIndexer = async (query: string, type: string) => {
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

    const response = await fetch(ENVIO_URL, options);
    const responseJson = await response.json();

    switch (type) {
      case TYPE.PROFILES:
        return responseJson.data.Profile;
      case TYPE.TRANSACTIONS:
        return responseJson.data.Transfer;
      default:
        return undefined;
    }
  } catch (error) {
    console.log('❌ ERROR DURING GRAPH_URL REQUEST', error);
    return undefined;
  }
};

export const getData = async (
  type: string,
  fromBlock: number,
  toBlock: number,
) => {
  let offset = 0;
  let aggregatedData: any[] = [];
  let query: string;
  let data;

  query = generateGraphQuery(type, fromBlock, toBlock, offset);
  data = await queryIndexer(query, type);

  while (data && data.length !== 0) {
    data.forEach((entity: any) => aggregatedData.push(entity));
    offset += 1000;
    query = generateGraphQuery(type, fromBlock, toBlock, offset);
    data = await queryIndexer(query, type);
  }

  return aggregatedData;
};
