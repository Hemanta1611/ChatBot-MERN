import { Request, Response, NextFunction } from "express"
import User from "../models/User.js"
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";


export const generateChatCompletion = async(req: Request, res: Response, next: NextFunction) => {
    const {message} = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) return res.status(401).json({message: "User not registered or token malfunctioned"});
        // grab chats of user
        const chats = user.chats.map(({role, content}) => ({role, content})) as ChatCompletionRequestMessage[];
        chats.push({content: message, role:"user"});
        user.chats.push({content: message, role:"user"});
    
        // send all chats with new one to openAI api
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({chats: user.chats});
    
        // get latest response
    } catch (error) {
        console.error("Error in OpenAI API call: ", error.response ? error.response.data : error.message);
        
        if (error.response && error.response.data && error.response.data.error.code === 'insufficient_quota') {
            return res.status(403).json({message: "Insufficient quota. Please check your OpenAI billing."});
        }
        
        return res.status(500).json({message: "Something went wrong", error: error.message});
    }

};


export const sendChatsToUser = async (req: Request, res: Response, next: NextFunction) => {
    // user token check
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) return res.status(401).send("User not registered OR Token malfunctioned");
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }

        return res.status(200).json({message: "OK", chats: user.chats});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR", cause: error.message}); 
    }
};


export const deleteChats = async (req: Request, res: Response, next: NextFunction) => {
    // user token check
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) return res.status(401).send("User not registered OR Token malfunctioned");
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }

        // @ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({message: "OK"});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message: "ERROR", cause: error.message}); 
    }
};


