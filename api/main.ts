import {
  POLLING_INTERVAL_IN_SECONDS,
  RANGE_BLOCK,
  START_BLOCK,
  WRITE_TO_CSV,
} from '../globals';
import {
  instantiateCsv,
  writeProfileToCsv,
  writeTransactionToCsv,
} from './csv/csv';
import { getData } from './envio/envio';
import { TYPE } from './interface';
import { writeData } from './neo4j/neo4j';
import { getLatestBlockNumber } from './utils';

const main = async () => {
  WRITE_TO_CSV ? instantiateCsv() : console.log('🌝 Writting data to NEO4J');

  console.log('🏁 Starting block:', START_BLOCK);
  const latestBlock = await getLatestBlockNumber();
  console.log('🧱 Latest block:', latestBlock);

  console.log('💁‍♀️ Starting profiles indexing');
  await initialProcessProfiles(TYPE.PROFILES, latestBlock);
  console.log('👌 Profiles initial sweep complete');

  console.log('💸 Starting Transactions initial sweep');
  await initialProcessTransactions(TYPE.TRANSACTIONS, latestBlock);
  console.log('👌 Transactions initial sweep complete');

  console.log(
    `🥝 Processing new data every ${POLLING_INTERVAL_IN_SECONDS} seconds. Last synced block: ${latestBlock}`,
  );

  const lastSyncedBlock = latestBlock;
  continuousPullingProfile(TYPE.PROFILES, lastSyncedBlock);
  continuousPullingTransaction(TYPE.TRANSACTIONS, lastSyncedBlock);
};

const initialProcessProfiles = async (
  type: string,
  lastBlockAtInitialization: number,
) => {
  let block = 0;
  for (block = START_BLOCK; block <= lastBlockAtInitialization; ) {
    const fromBlock = block;
    const toBlock = block + RANGE_BLOCK;
    console.log(`⏳ Processing data from block ${fromBlock} to ${toBlock}.`);

    const data = await getData(type, fromBlock, toBlock);

    if (data && data.length === 0) {
      console.log(`🔍 No data found from block ${fromBlock} to ${toBlock}.`);
      block = toBlock;
      continue;
    }

    if (WRITE_TO_CSV) {
      data.forEach((entity: any) => {
        const url = entity.profileImages[0]?.url;
        writeProfileToCsv(entity.id, entity.name, url);
      });
    } else {
      await writeData(TYPE.PROFILES, data);
    }

    console.log(`👩‍🎤 ${data.length} added profiles`);
    block = toBlock;
  }
};

function continuousPullingProfile(type: string, lastSyncedBlock: number) {
  const ticker = setInterval(async () => {
    const latestBlock = await getLatestBlockNumber();

    console.log(
      `⏳ Processing data from block ${lastSyncedBlock} to ${latestBlock}.`,
    );

    const data = await getData(type, lastSyncedBlock, latestBlock);

    if (!data) {
      console.log(
        `🤷🏽‍♀️ No profiles created between blocks ${lastSyncedBlock} and ${latestBlock}`,
      );
      return;
    }

    if (WRITE_TO_CSV) {
      data.forEach((entity: any) => {
        const url = entity.profileImages[0]?.url;
        writeProfileToCsv(entity.id, entity.name, url);
      });
    } else {
      writeData(TYPE.PROFILES, data);
    }

    console.log(`👩‍🎤 ${data.length} profiles added`);
    lastSyncedBlock = latestBlock;
  }, POLLING_INTERVAL_IN_SECONDS * 1000);

  return ticker;
}

const initialProcessTransactions = async (
  type: string,
  lastBlockAtInitialization: number,
) => {
  let block = 0;
  for (block = START_BLOCK; block <= lastBlockAtInitialization; ) {
    const fromBlock = block;
    const toBlock = block + RANGE_BLOCK;
    console.log(`⏳ Processing data from block ${fromBlock} to ${toBlock}.`);

    const data = await getData(type, fromBlock, toBlock);

    if (data && data.length === 0) {
      console.log(`🔍 No data found from block ${fromBlock} to ${toBlock}.`);
      block = toBlock;
      continue;
    }

    if (WRITE_TO_CSV) {
      data.forEach((entity: any) => {
        if (entity?.transaction_id && entity?.from_id && entity?.to_id) {
          writeTransactionToCsv(
            entity.transaction_id,
            entity.from_id,
            entity.to_id,
          );
        }
      });
    } else {
      await writeData(TYPE.TRANSACTIONS, data);
    }

    console.log(`📝 ${data.length} added Transactions`);
    block = toBlock;
  }
};

function continuousPullingTransaction(type: string, lastSyncedBlock: number) {
  const ticker = setInterval(async () => {
    const latestBlock = await getLatestBlockNumber();

    console.log(
      `⏳ Processing data from block ${lastSyncedBlock} to ${latestBlock}.`,
    );

    const data = await getData(type, lastSyncedBlock, latestBlock);

    if (!data) {
      console.log(
        `🤷🏽‍♀️ No transactions created between blocks ${lastSyncedBlock} and ${latestBlock}`,
      );
      return;
    }

    if (WRITE_TO_CSV) {
      data.forEach((entity: any) => {
        if (entity?.transaction_id && entity?.from_id && entity?.to_id) {
          writeTransactionToCsv(
            entity.transaction_id,
            entity.from_id,
            entity.to_id,
          );
        }
      });
    } else {
      writeData(TYPE.TRANSACTIONS, data);
    }

    console.log(`📝 ${data.length} tx added`);
    lastSyncedBlock = latestBlock;
  }, POLLING_INTERVAL_IN_SECONDS * 1000);

  return ticker;
}

main()
  .then(() => console.log('✅'))
  .catch((e) => console.log('⚠️', e));
