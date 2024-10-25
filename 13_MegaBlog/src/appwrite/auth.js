import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async signUp({ email, username, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );

      if (userAccount) {
        return await this.logIn({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw new Error(`Account not created: ${error.message}`);
    }
  }

  async logIn({ email, password }) {
    try {
      const userAccount = await this.account.createEmailPasswordSession(
        email,
        password
      );

      return userAccount || null;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async currentLoginStatus() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(
        `Appwrite :: service error :: currentLoginStatus :: ${error.message}`
      );
    }
    return null;
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(`Appwrite :: service-error :: logOut :: ${error.message}`);
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
