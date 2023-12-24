import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { SERVER_BASE_URL, axiosInstance } from "../axiosConfig";
import MessageSingle from "./MessageSingle";

import Cookies from 'js-cookie';
import { Socket } from "socket.io-client";

export default function ChatWindow(props) {

    const [ChatData, setChatData] = useState({
        messages: [],
        participants: [],
        conversationID: undefined
    });


    const sendMessage = (event) => {
        event.preventDefault();

        const formData: FormData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData);

        const jwtToken = Cookies.get("AUTH-TOKEN")


        formObject.userID = props.friendData._id;
        formObject.jwt = jwtToken;
        formObject.conversationID = ChatData.conversationID;

        if (formObject.message == "") return;

        console.log("Send Message From Data", formObject);
        props.socket.emit("sendMessage", formObject)

        formRef.current.reset();

    }

    useEffect(() => {

        console.log("Friend UserID", props.friendID);

        props.socket.on('receiveMessage', (data) => {

            console.log("received from socket", data);

            setChatData(prev => {
                return {
                    participants: prev.messages.participants,
                    messages: [...prev.messages, data],
                    conversationID: data.conversation_id,
                }
            })

        })

        console.log("FRIENDA TA ", props.friendData)

        if (Object.keys(props.friendData).length == 0) return;

        axiosInstance.get("/conversation?userID=" + props.friendData._id).then(res => {
            console.log("All Conversation Messages", res);

            props.socket.emit("leave");
            props.socket.emit("join", { conversationID: res.data.data.conversationID })
            setChatData(prev => {
                return res.data.data;
            })

        }).catch(err => {
            console.log("loading convo error", err)
        })


    }, [props.friendData]); // Only re-run the effect if location.search changes

    const imageURL = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ac74eeab-a85d-4343-ba4c-0248b812aaf8/dgboh9u-2fe0bb5f-4fc6-46b3-9e5d-2a4b626a2e98.png/v1/fit/w_828,h_1036,q_70,strp/japanese_anime_girl_by_allbeautifulgirl_dgboh9u-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FjNzRlZWFiLWE4NWQtNDM0My1iYTRjLTAyNDhiODEyYWFmOFwvZGdib2g5dS0yZmUwYmI1Zi00ZmM2LTQ2YjMtOWU1ZC0yYTRiNjI2YTJlOTgucG5nIiwiaGVpZ2h0IjoiPD0yNDAwIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvYWM3NGVlYWItYTg1ZC00MzQzLWJhNGMtMDI0OGI4MTJhYWY4XC9hbGxiZWF1dGlmdWxnaXJsLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.mJ3eANaIRwCAZivbGHvDsgImS0VbtkJ3utgwJnshoq8";

    const formRef = useRef(null);
    let index = 0;
    return (

        <>
            {


                props.friendData?._id == undefined ? (<></>) : (
                    <div className="grid grid-cols-3 gap-4 mb-4">

                <div className="flex items-center col-span-3 p-4 rounded  bg-gray-900">
                    <div className="text-xl text-white flex flex-row gap-3 items-center">
                       
                        <img src={SERVER_BASE_URL + props.friendData.image} className="flex-shrink-0 w-10 h-10 rounded-full object-cover" />
                        <div className=" m-10 bg-customDarkestLightest"> {props.friendData.username} </div>
                    </div>
                </div>
            </div>
                )

            }






            <div className="flex-1 overflow-hidden  h-full p-4">


                <div className="chatWindow">


                    {

                        props.friendData?._id == undefined ?
                            (
                                <div className=" text-center  text-gray-500">Select a conversation / add a friend to start
                                    <hr className="border-gray-700 mt-4 mb-4"></hr>
                                </div>
                            )
                            :
                            (
                                <div className=" text-center  text-gray-500">Start of your conversation
                                    <hr className="border-gray-700 mt-4 mb-4"></hr>
                                </div>
                            )

                    }


                    {
                        
                        ChatData.messages.map(item => {

                            index++;
                            if (item.sender.username == props.friendData.username) {
                                return (<MessageSingle align="left" key={index} sender={item.sender.username} datetime={item.created_at} > {item.message} </MessageSingle>)
                            }
                            else {
                                return (<MessageSingle align="right" key={index} sender={item.sender.username} datetime={item.created_at} > {item.message} </MessageSingle>)
                            }

                        })
                    }
                </div>




            </div>





            <div className="flex-shrink-0 p-4">
                <form ref={formRef} onSubmit={sendMessage} className="flex rounded-md border-none">
                    <input autoComplete="off" type="text" name="message" placeholder="Type your message..." className="flex-1 rounded-l-lg border-none p-2 bg-gray-900 text-white !outline-none focus:outline-none" />
                    <input type="submit" className="bg-blue-800 text-white p-2 rounded-r-lg border-none outline-none focus:outline-none focus:border-none" value="Send" />
                </form>
            </div>


        </>

    )

}