export const NEO4J_URI = process.env.NEXT_PUBLIC_NEO4J_URI || '';
export const NEO4J_USER = process.env.NEXT_PUBLIC_NEO4J_USER || '';
export const NEO4J_PASSWORD = process.env.NEXT_PUBLIC_NEO4J_PASSWORD || '';

export const WRITE_TO_CSV = process.env.WRITE_TO_CSV || '';
export const POLLING_INTERVAL_IN_SECONDS = Number(
  process.env.POLLING_INTERVAL_IN_SECONDS || 12,
);
export const RPC_ENDPOINT = process.env.RPC_ENDPOINT || '';
export const START_BLOCK = Number(process.env.START_BLOCK || 1322500);
export const RANGE_BLOCK = Number(process.env.RANGE_BLOCK || 10000);

export const ENVIO_URL = process.env.ENVIO_URL || '';
