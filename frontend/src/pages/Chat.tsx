import { FormEvent, useEffect, useState } from "react";
import MainContent from "../components/MainContent";
import SideNav from "../components/SideNav";
import MessageSingle from "../components/MessageSingle";
import { useParams, useLocation } from "react-router-dom";
import { axiosInstance } from "../axiosConfig";
import ChatWindow from "../components/ChatWindow";

import { io } from "socket.io-client";
import AuthUser from "../components/Auth";


export default function ChatPage() {


    const [friendData, setfriendData] = useState({});


    let socket = io("http://192.168.1.139:3002", { transports: ['websocket'] });

    const setFriendData = (data) => {

        // const url = new URL(window.location);
        // url.searchParams.set('userID', id);
        // window.history.pushState(null, '', url.toString());
        console.log("HAHAH", data, friendData);

        setfriendData(prev => {

            return {
                ...prev,
                ...data
            }
        });
    }


    useEffect(() => {

        socket.on("connect", msg => {
            console.log("Connected to socket");
        })

        socket.on("disconnect", msg => {
            console.log("SOCKET DISCONNECTED");
        })

        socket.on('error', (err) => {
            console.log('received socket error:');
            console.log(err);
        });

    }, [socket]);


    return (
        <>
            <AuthUser>

                <SideNav setFriendData={setFriendData} />

                <MainContent>

                    <ChatWindow socket={socket} friendData={friendData}></ChatWindow>

                </MainContent>

            </AuthUser>


        </>
    );
}