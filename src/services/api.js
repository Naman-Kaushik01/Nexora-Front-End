import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

//create an instance of axios with the base URL and default headers

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Add token to request if availaible
api.interceptors.request.use
    ((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    }, (error) => {
    return Promise.reject(error);
    }
);

//api methods
 
export const apiService = {

    saveAuthData: (token , roles)=>{
        localStorage.setItem('token', token);
        localStorage.setItem('roles', JSON.stringify(roles));
    },

    logout: ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
    },

    hasRole(role){
        const roles = localStorage.getItem('roles');
        return roles ? JSON.parse(roles).includes(role) : false;

    },
    isAuthenticated: ()=>{  
        return localStorage.getItem('token') !== null;
    },

    //check if the user is admin
    isAdmin (){
        return this.hasRole('ADMIN');
    },

    // check if the user is customer
    isCustomer(){
        return this.hasRole('CUSTOMER');
    },

    //check if the user is an auditor
    isAuditor(){
        return this.hasRole('AUDITOR');
    },
    login:(body)=>{
        return api.post('/auth/login', body);
    },
    
    register:(body)=>{
        return api.post('/auth/register', body);
    },

    forgotPassword:(body)=>{
        return api.post('/auth/forgot-password', body);
    },
    
    resetPassword:(body)=>{
        return api.post('/auth/reset-password', body);
    }, 
    getMyProfile:()=>{
        return api.get('/users/me');
    },
    //Update Password

    updatePassword:(oldPassword, newPassword)=>{
        return api.put('/users/update-password',
             {oldPassword, newPassword});
    },

    uploadProfilePicture:(file)=>{
        const formData = new FormData();
        formData.append('file', file);

        return api.post('/users/profile-picture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    //ACCOUNT

    getMyAccounts:()=>{
        return api.get('/accounts/me');
    },

    //TRANSFER

    makeTransfer:(transferData)=>{
        return api.post('/transactions', transferData)
    },

    //GET TRANSACTIONS

    getTransactions:(accountNumber , page = 0, size = 10)=>{
        return api.get(`/transactions/${accountNumber}?page=${page}&size=${size}`);
    },

    //AUDITOR
    // Get system totals
    getSystemTotals: () => {
        return api.get('/audit/totals');
    },

    // Find user by email
    findUserByEmail: (email) => {
        return api.get(`/audit/users?email=${email}`);
    },

    // Find account by account number
    findAccountByAccountNumber: (accountNumber) => {
        return api.get(`/audit/accounts?accountNumber=${accountNumber}`);
    },

    // Get transactions by account number
    getTransactionsByAccountNumber: (accountNumber) => {
        return api.get(`/audit/transactions/by-account?accountNumber=${accountNumber}`);
    },

    // Get transaction by ID
    getTransactionById: (id) => {
        return api.get(`/audit/transactions/by-id?id=${id}`);
    },
    
}


export default api;