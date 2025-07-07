import conf from "../conf/conf";
import { Client, Account , ID } from "appwrite"; 


export class AuthService {
    client = new Client();;
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) //  Appwrite Endpoint
            .setProject(conf.appwriteProjectId); //  project ID

        this.account = new Account(this.client);
    }
    async createAccount(email, password, name) {
        try {
            const  userAccount = await this.account.create(
                ID.unique(), // Unique user ID
                email, // User email
                password, // User password
                name // User name
            )
            if(userAccount){
                // CALL OTHER METHOD
               return userAccount // Return the created user accoun
            }
            else{
                throw new Error("User creation failed");
            }
        }
        catch (error){
            console.error("Error creating user:", error);
            throw error; // Re-throw the error for further handling
        }
    }

    async login({email , password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);

        } catch (error) {
            console.error("Error logging in:", error);
            throw error; // Re-throw the error for further handling
        }
    }
    async logout() {
        try {
            return await this.account.deleteSessions("current"); // Deletes the current session
        } catch (error) {
            console.error("Error logging out:", error);
            throw error; // Re-throw the error for further handling 
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get(); 
        } catch (error) {
            console.error("Error getting current user:", error);
            throw error; // Re-throw the error for further handling

            
        }
    }



    // async  resetPassword(email) {
    //     try {
    //         return await this.account.createRecovery(email, conf.appwriteUrl + "/reset-password");
    //     } catch (error) {
    //         console.error("Error resetting password:", error);
    //         throw error; // Re-throw the error for further handling
    //     }
    // }

}


const authService  = new AuthService();

export default authService




