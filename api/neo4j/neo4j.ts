import neo4j, { Session } from 'neo4j-driver';
import { TYPE } from '../interface';
import { NEO4J_PASSWORD, NEO4J_URI, NEO4J_USER } from '../../globals';

export const generateCypherQuery = (type: string, element?: any) => {
  switch (type) {
    case TYPE.PROFILES:
      const url = element.profileImages[0];
      return `MERGE (profile:Profiles {id: '${element.id}', name: '${element.name}', url: '${url}'}) RETURN profile;`;
    case TYPE.PROFILES_SET:
      return `MATCH (p:Profiles {id: '${element.id}'}) SET p.name = '${element.name}' SET p.url = '${element.url}' RETURN p`;
    case TYPE.TRANSACTIONS:
      return `MERGE (transaction:Transactions {from: '${element.from_id}', to: '${element.to_id}', hash: '${element.transaction_id}'});`;
    case TYPE.RELATIONSHIPS:
      return 'MATCH (transactions:Transactions) UNWIND transactions as tx MERGE (sender:Profiles {id: tx.from}) MERGE (recipient:Profiles {id: tx.to}) MERGE (sender)-[:TX]->(recipient)';
    case TYPE.COUNT_RELATIONSHIPS:
      return 'MATCH p=()-[:TX]->() RETURN p;';
    default:
      return '';
  }
};

export const writeData = async (type: string, data: any) => {
  const driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD),
  );

  const session = driver.session();
  for (const element of data) {
    const error = await executeQuery(session, type, element);

    if (error?.message && error?.message.includes('already exist')) {
      await executeQuery(session, TYPE.PROFILES_SET, element);
    }

    await executeQuery(session, TYPE.RELATIONSHIPS);
  }

  session.close();

  return;
};

const executeQuery = async (session: Session, type: string, element?: any) => {
  const cypherQuery = generateCypherQuery(type, element);
  try {
    await session.run(cypherQuery);
    return;
  } catch (error: any) {
    return error;
  }
};
