import { useEffect, useState } from "react";
import AddFriendModal from "./AddFriendModal";
import MainContent from "./MainContent";
import { axiosInstance, SERVER_BASE_URL } from "../axiosConfig";


export default function SideNav(props) {



    const [friendList, setFriendList] = useState([{}]);
    const imageURL = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ac74eeab-a85d-4343-ba4c-0248b812aaf8/dgboh9u-2fe0bb5f-4fc6-46b3-9e5d-2a4b626a2e98.png/v1/fit/w_828,h_1036,q_70,strp/japanese_anime_girl_by_allbeautifulgirl_dgboh9u-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FjNzRlZWFiLWE4NWQtNDM0My1iYTRjLTAyNDhiODEyYWFmOFwvZGdib2g5dS0yZmUwYmI1Zi00ZmM2LTQ2YjMtOWU1ZC0yYTRiNjI2YTJlOTgucG5nIiwiaGVpZ2h0IjoiPD0yNDAwIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvYWM3NGVlYWItYTg1ZC00MzQzLWJhNGMtMDI0OGI4MTJhYWY4XC9hbGxiZWF1dGlmdWxnaXJsLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.mJ3eANaIRwCAZivbGHvDsgImS0VbtkJ3utgwJnshoq8";

    const [refresh , setRefresh] = useState(false);

    // window.setInterval( function(){
    //     console.log("running");
    //     setRefresh(!refresh);
    // },1000)

    useEffect(() => {


        axiosInstance.get("/friend/").then(res => {
            console.log("Friend List", res);
            const friends = res.data.data;

            setFriendList(prev => {
                return [
                    ...friends,
                ]
            })

        }).catch(err => {
            console.log("Unable to fetch friend list", err);
        });



    }, [])

    let index = 0;


    const openSideNav = (e) => {
        console.log("running", e.target);
        
    }

    return (    

        <>
        {refresh}
            <AddFriendModal setFriend={setFriendList}></AddFriendModal>
            <button data-drawer-target="default-sidebar"  data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 shadow  shadow-blue-800 overflow-y-auto bg-gray-900 dark:bg-gray-800">
                    <ul key={111} className="space-y-2 font-medium">
                        <li key={222}>
                            <a href="#" className="flex justify-between items-center m-0 p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group">
                                <span className="text-white">Conversations</span>
                                <button data-modal-target="add-friend-modal" data-modal-toggle="add-friend-modal" className="block p-1 text-white 1 bg-blue-800 hover:bg-blue-900 rounded-lg text-sm text-center" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" data-slot="icon" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                    </svg>

                                </button>

                            </a>
                        </li>

                        {
                            friendList.map((item) => {
                                index++;
                                return (
                                    <><li key={index}>
                                        <button onClick={() => props.setFriendData(item)} style={{ width: "100%" }} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
                                            <img src={SERVER_BASE_URL + item.image} className="flex-shrink-0 w-10 h-10 rounded-full object-fill " />
                                            <span className="flex-1 ms-3 text-white text-left whitespace-nowrap">{item.username}</span>
                                        </button>
                                        
                                    </li>
                                    <hr className="bg-red-400 text-red-400 border-gray-700"></hr>
                                    </>
                                )
                            })
                        }

                    </ul>
                </div>
            </aside>

            {/* <MainContent></MainContent> */}

        </>
    );
}