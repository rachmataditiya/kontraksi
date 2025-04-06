import { openDB } from 'idb';

const dbName = 'contractionDB';
const storeName = 'contractions';

export interface Contraction {
  timestamp: number;
  duration?: number; // Durasi kontraksi dalam milidetik
}

export const db = await openDB(dbName, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: 'timestamp' });
    }
  },
});

export const saveContraction = async (timestamp: Date, duration: number = 0) => {
  const tx = db.transaction('contractions', 'readwrite');
  const store = tx.objectStore('contractions');
  const contraction: Contraction = {
    timestamp: timestamp.getTime(),
    duration
  };
  await store.add(contraction);
};

export async function getContractions() {
  return await db.getAll(storeName);
}

export async function clearOldContractions() {
  const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  const contractions = await store.getAll();
  
  for (const contraction of contractions) {
    if (contraction.timestamp < oneDayAgo) {
      await store.delete(contraction.timestamp);
    }
  }
}