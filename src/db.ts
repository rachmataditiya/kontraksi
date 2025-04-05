import { openDB } from 'idb';

const dbName = 'contractionDB';
const storeName = 'contractions';

export const db = await openDB(dbName, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(storeName)) {
      db.createObjectStore(storeName, { keyPath: 'timestamp' });
    }
  },
});

export async function saveContraction(timestamp: Date) {
  await db.add(storeName, { timestamp: timestamp.getTime() });
}

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