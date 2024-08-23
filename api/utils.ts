import { ethers } from 'ethers';
import { TYPE } from './interface';
import { RPC_ENDPOINT } from '../globals';

export const updateFailedUpload = (type: string, failedUpload: any) => {
  switch (type) {
    case TYPE.PROFILES:
      failedUpload.profiles += 1;
    case TYPE.TRANSACTIONS:
      failedUpload.transactions += 1;
    case TYPE.RELATIONSHIPS:
      failedUpload.relationships += 1;
  }
};

export const getLatestBlockNumber = async () => {
  const provider = new ethers.JsonRpcProvider(RPC_ENDPOINT);
  const lastBlock = (await provider.getBlock('latest'))?.number;

  if (!lastBlock) {
    throw new Error('❌ Unable to get last block.');
  }

  return lastBlock;
};
