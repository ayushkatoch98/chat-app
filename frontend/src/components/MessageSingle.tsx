import React from 'react'



export default function MessageSingle(props) {


    const imageURL = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ac74eeab-a85d-4343-ba4c-0248b812aaf8/dgboh9u-2fe0bb5f-4fc6-46b3-9e5d-2a4b626a2e98.png/v1/fit/w_828,h_1036,q_70,strp/japanese_anime_girl_by_allbeautifulgirl_dgboh9u-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FjNzRlZWFiLWE4NWQtNDM0My1iYTRjLTAyNDhiODEyYWFmOFwvZGdib2g5dS0yZmUwYmI1Zi00ZmM2LTQ2YjMtOWU1ZC0yYTRiNjI2YTJlOTgucG5nIiwiaGVpZ2h0IjoiPD0yNDAwIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvYWM3NGVlYWItYTg1ZC00MzQzLWJhNGMtMDI0OGI4MTJhYWY4XC9hbGxiZWF1dGlmdWxnaXJsLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.mJ3eANaIRwCAZivbGHvDsgImS0VbtkJ3utgwJnshoq8";

    let messageDate = props.datetime;

    let a = new Date(messageDate);

    let x = a.getDate() + "/" + a.getMonth() + "/" + a.getFullYear() + " " + a.getHours() + ":" + a.getMinutes();
    let message;

    if (props.align == "left") {
        message = (<div className="flex justify-start mb-4">
            
            <div className="message-box bg-gray-900 shadow text-white p-2 rounded-md"> 
                <p>{props.children} </p>
                <p className=' text-xs'> {x}</p>
            </div>
        </div>)
    }
    else {
        message = (<div className="flex justify-end mb-4">
            <div className="message-box bg-gray-700 shadow text-white p-2 rounded-md"> 
            <p>{props.children} </p>
            <p className=' text-xs '> {x}</p>
            </div>
        </div>)
    }
    return message
}