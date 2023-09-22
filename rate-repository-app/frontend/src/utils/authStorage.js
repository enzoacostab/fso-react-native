import * as SecureStore from 'expo-secure-store';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const session = await SecureStore.getItemAsync(this.namespace);
    if (session) {
      return session;
    }
    return null;
  }

  async setAccessToken(accessToken) {
    await SecureStore.setItemAsync(
      this.namespace, accessToken
    );
  }

  async removeAccessToken() {
    await SecureStore.deleteItemAsync(this.namespace);
  }
}

export default AuthStorage;