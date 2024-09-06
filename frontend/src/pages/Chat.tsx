import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import {IoMdSend} from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import red from "@mui/material/colors/red";
import ChatItem from "../components/chat/ChatItem";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";

// const chatMessages = [
//   { role: "user", content: "Hello, how can you assist me today?" },
//   {
//     role: "assistant",
//     content:
//       "Hi! I can help you with a variety of tasks, such as answering questions, providing recommendations, and offering guidance on different topics.",
//   },
//   { role: "user", content: "Can you tell me what is the weather like today?" },
//   {
//     role: "assistant",
//     content:
//       "I cannot provide real-time weather updates, but you can check the weather using a weather app or website like Google Weather or AccuWeather.",
//   },
//   { role: "user", content: "Give me some tips for improving coding skills." },
//   {
//     role: "assistant",
//     content:
//       "To improve your coding skills, try practicing regularly on platforms like LeetCode, HackerRank, and GitHub. Focus on understanding the basics, work on real projects, and review code from experienced developers.",
//   },
// ];

type Message = {
  role: "user" | "assitant";
  content: string;
}

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    // console.log(inputRef.current?.value);
    const content = inputRef.current?.value as string;
    if(inputRef && inputRef.current){
      inputRef.current.value = "";
    }
    const newMessage: Message = {role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]); 
  };

  const handleDeleteChats = async () => {
    try{
      toast.loading("Deleting Chats", {id: "deletechats"});
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", {id: "deletechats"});
    }catch(error){
      console.log(error);
      toast.error("Deleting chats Failed", {id: "deletechats"});
    }
  };

  useLayoutEffect(() => {
    if(auth?.isLoggedIn && auth.user){
      toast.loading("Loading Chats", {id: "loadchats"});
      getUserChats().then((data) => {
        setChatMessages([...data.chats]);
        toast.success("Successfully loaded chats", {id: "loadchats"});
      }).catch((err) => {
        console.log(err);
        toast.error("Loading Failed", {id: "loadchats"});
      })
    }
  }, [auth]);
  return (
    <Box sx={{ display: "flex", flex: 1, width: "100%", mt: 3, gap: 3 }}>
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a chatbot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auot",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": { bgcolor: red.A400 },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            boarderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            // <div> {chat.content}</div>
            // @ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <Box>
          <div
            style={{
              width: "100%",
              padding: "20px",
              borderRadius: 8,
              backgroundColor: "rgb(17, 27, 39)",
              display: "flex",
              margin: "auto",
            }}
          >
            <input
              ref = {inputRef}
              type="text"
              style={{
                width: "100%",
                backgroundColor: "transparent",
                padding: "10px",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "20px",
              }}
            />
            <IconButton onClick={handleSubmit} sx={{ml: "auto", color: "white", }}><IoMdSend /></IconButton>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
