import * as SecureStore from 'expo-secure-store';

export async function saveAuthToken(token: string) {
  await SecureStore.setItemAsync('_jid', token);
}