import axios from "axios";

export const loginUser = async(email: string, password: string) => {
    const res = await axios.post("/user/login", {email, password});
    if(res.status !== 200){
        throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
}

export const signupUser = async(name: string, email: string, password: string) => {
    const res = await axios.post("/user/signup", {name, email, password});
    // console.log(res);
    if(res.status !== 200){
        throw new Error("Unable to Signup");
    }
    const data = await res.data;
    return data;
}

export const checkAuthStatus = async() => {
    const res = await axios.get("/user/auth-status");
    if(res.status !== 200){
        throw new Error("Unable to Authenticate");
    }
    const data = await res.data;
    return data;
}

export const sendChatRequest = async(message: string) => {
    const res = await axios.post("/chat/new", { message });
    if(res.status !== 200){
        throw new Error("Unable to Send Chat");
    }
    const data = await res.data;
    return data;
}

export const getUserChats = async() => {
    const res = await axios.get("/chat/all-chats");
    if(res.status !== 200){
        throw new Error("Unable to Send Chat");
    }
    const data = await res.data;
    return data;
}

export const deleteUserChats = async() => {
    const res = await axios.delete("/chat/delete");
    if(res.status !== 200){
        throw new Error("Unable to Delete Chat");
    }
    const data = await res.data;
    return data;
}

export const userLogout = async() => {
    const res = await axios.get("/user/logout");
    if(res.status !== 200){
        throw new Error("Unable to Logout");
    }
    const data = await res.data;
    return data;
}

