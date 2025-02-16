    import { create } from "zustand";
    import {axiosInstance} from '../utils/axiosInstance'
    import io from "socket.io-client";

    // Initialize Socket.IO client
    const socket = io("http://localhost:3001"); // Replace with your server URL

    export const useMessageStore = create((set, get) => ({
        selectedUser : null,
        usersList : [],
        messages : [],
        

        userSelectForMessage : async(user) => {
            set({selectedUser:user})
        },

        removeSelectForMessage : () => {
            set({selectedUser:null})
        },

        getUsers : async() => {
            try {
                const res = await axiosInstance.get('/message/users');
                set({usersList : res.data});
            } catch (error) {
            console.log(error); 
            }
        },

        sendMessageUser : async(data, authUser) => {
            const selectedUser = get().selectedUser;
            try {
                const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, data);

                // Emit the message to the server for real-time broadcasting
                socket.emit("chatMessage", {...data, createdAt: new Date().toISOString() , senderId : authUser._id});
                return res
            } catch (error) {
                console.log(error);  
            }
        },

        getAllMessages : async() => {
            const selectedUser = get().selectedUser;
            try {
                const res = await axiosInstance.post(`/message/all/${selectedUser._id}`);
                set({messages : res.data})
            } catch (error) {
                console.log(error);  
            }
        },

        listingForIncomingMessage : async() => {
            // Remove any previous listener to prevent duplicates
            socket.off("chatMessage");

            socket.on("chatMessage", (newMessage) => {
                // Add the new message to the current state
                set((state) => ({
                    messages : [...state.messages, newMessage]
                }))
            })
        }
    }))