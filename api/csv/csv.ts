import { appendFileSync } from 'fs';

export const writeProfileToCsv = (id: string, name: string, url: string) => {
  const csv = `${id},${name},${url}\n`; // Construct a CSV row
  try {
    appendFileSync('./api/data/profiles.csv', csv); // Append the CSV row to the file
  } catch (error) {
    console.log('❌Converting profiles to csv', error);
    throw error;
  }
};

export const writeTransactionToCsv = (
  hash: string,
  from: string,
  to: string,
) => {
  const csv = `${hash},${from},${to}\n`; // Construct a CSV row
  try {
    appendFileSync('./api/data/transactions.csv', csv); // Append the CSV row to the file
  } catch (error) {
    console.log('❌Converting transactions to csv', error);
    throw error;
  }
};

export const instantiateCsv = () => {
  console.log('🧪 Writting data to CSV');
  try {
    appendFileSync('./api/data/transactions.csv', `hash,from,to\n`);
    appendFileSync('./api/data/profiles.csv', `id,name,url\n`);
  } catch (error) {
    console.log('❌Converting transactions to csv', error);
    throw error;
  }
};
