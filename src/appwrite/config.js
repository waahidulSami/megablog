


import conf from "../conf/conf";
import { Client, ID , Databases , Permission , Storage , Query  } from "appwrite";


export class Service {
    client  = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Appwrite Endpoint
            .setProject(conf.appwriteProjectId); // Project ID

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost(
    {title , content, featuredImage ,status , userId}) {
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                ID.unique(), // Unique document ID

                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId, 
                }
            )
        }
        catch (error) {
            console.error("Error creating post:", error);
            throw error; // Re-throw the error for further handling
        }
    }

    async updatePost(postId, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                postId, // Document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.error("Error updating post:", error);
            throw error; 
        }
    }

    async deletePost(postId) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                postId // Document ID
            );
        } catch (error) {
            console.error("Error deleting post:", error);
            throw error; 
        }
    }
 
    async getPost(postId){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                postId // Document ID
            );
        } catch (error) {
            console.error("Error getting post:", error);
            throw error; // Re-throw the error for further handling
            
        }
    }

    async getPosts(querys = [Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                querys // Query array
            )
        } catch (error) {
            console.error("Error getting posts:", error);
            throw error; // Re-throw the error for further handling
            
        }
    }

    // upload file 

    async uploadFile(file){
       try{
        return await this.bucket.createFile(
            conf.appwriteBucketId, // Bucket ID
            ID.unique(), // Unique file ID
            file , // File to upload,
              

        );
       }
       catch (error){
            console.error("Error uploading file:", error);
            throw error; 
       }
    }

    async deltefile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId, // Bucket ID
                fileId // File ID to delete
            );
        } catch (error) {
            console.error("Error deleting file:", error);
            throw error; 
        }
    }

     getFilepreview(fileId) {
        try {
            return  this.bucket.getFilePreview(
                conf.appwriteBucketId, // Bucket ID
                fileId // File ID to get preview
            );
        } catch (error) {
            console.error("Error getting file preview:", error);
            throw error; 
        }
    }

}


const service = new  Service();


export default service;