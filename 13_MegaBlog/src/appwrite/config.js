import conf from "../config/config";
import { Client, Databases, Query, Storage, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, content, slug, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(
        `Appwrite Error :: service :: createPost :: ${error.message}`
      );
    }
  }

  async updateDocument(slug, { title, content, featuredImage, status }) {
    try {
      return this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(
        `Appwrite Error :: service :: updatePost :: ${error.message}`
      );
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(
        `Appwrite Error :: service :: deletePost :: ${error.message}`
      );
      return false;
    }
  }

  async getDocument(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(
        `Appwrite :: service error :: getDocument :: ${error.message}`
      );
      return false;
    }
  }

  async listFilteredDocuments() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("status", "active")] // appwrite mein indexes bnana pdega agar Query maarna chahte ho
      );
    } catch (error) {
      console.log(
        `Appwrite :: service error :: listFilteredDocument :: ${error.message}`
      );
      return false;
    }
  }

  // upload a file

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(
        `Appwrite :: service error :: uploadFile :: ${error.message}`
      );
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log(
        `Appwrite :: service error :: uploadFile :: ${error.message}`
      );
      return false;
    }
  }

  previewFile(fileId) {
    try {
      return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log(
        `Appwrite :: service error :: previewFile :: ${error.message}`
      );
    }
  }
}

const service = new Service();

export default service;
