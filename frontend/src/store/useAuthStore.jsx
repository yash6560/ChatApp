import { create } from 'zustand';
import {axiosInstance} from '../utils/axiosInstance'

export const useAuthStore = create((set) => ({
    authUser : null,
    isuserSignin : false,
    isuserLogin : false,
    isCheckAuth : false,
    

    checkAuth : async() => {
        set({isCheckAuth : true});
        try {
            const res = await axiosInstance.post('/user/check');
            set({authUser : res.data});
        } catch (error) {
            console.log(error);
        } finally {
            set({isCheckAuth:false});
        }
    },

    userSignup : async(data) => {
        set({isuserSignin : true});
        try {
            const res = await axiosInstance.post('/user/signup',data);
            return res.data;
        } catch (error) {
            console.log(error)
        } finally {
            set({isuserSignin: false});
        }
    },

    userLogin : async(data) => {
        set({isuserLogin : true});
        try {
            const res = await axiosInstance.post('/user/login',data)
            set({authUser : res.data.token})
            console.log(res.data)
            return res.data;
        } catch (error) {
            console.log(error);
        } finally{
            set({isuserLogin : false});
        }
    },

    userLogout : async() => {
        try {
            console.log("here");
            const res = await axiosInstance.post('/user/logout');
            set({authUser : null});
            return res.data;
            
        } catch (error) {
            console.log(error)
        } 
    },

    UpdateProfilePic : async(formData) => {
        try {
            const res = await axiosInstance.post('user/profile', formData);
            set((prev) => ({authUser : {...prev.authUser, image : res.data.imageUrl}}))
            return res;
        } catch (error) {
            console.log(error)
        }
    }
    
}));

 