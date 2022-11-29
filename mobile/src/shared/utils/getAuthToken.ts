import * as SecureStore from 'expo-secure-store';

export async function getAuthToken() {
  const token = await SecureStore.getItemAsync('_jid')
  return token ?? ''
}