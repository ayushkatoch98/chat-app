import { useState } from "react";
import {axiosInstance} from "../axiosConfig";



export default function AddFriendModal(props) {

    const [isError, setIsError] = useState(null);
    let errorElement=  <></>
    // setMessage("WOWOWOW");
    
    const handleAddFriend = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData.entries());
        
        axiosInstance.post("/friend/", formObject).then( res => {
            
            console.log(res);
            alert(res.data.message);
            errorElement = <span className=" text-xs text-green-600">Friend Added</span>
            
            setIsError(false)
            props.setFriend( prev => {
                return [
                    ...prev,
                    res.data.data,
                ]
            })

        }).catch(err => {
            console.log(err);
            alert(err.response.data.message)
            errorElement = <span className=" text-xs text-green-600">Error: Unable to add friend</span>
            setIsError(true);
        })
    }
    if (isError == null){
        errorElement = <></>
    }
    else if (isError == true){
        errorElement = <span className="text-xs text-red-600">Unable to add friend</span>
    }
    else{
        errorElement = <span className="text-xs text-green-600">Friend Added</span>
    }
    return (
        <>
          

            <div id="add-friend-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    
                    <div className="relative bg-gray-800 rounded-lg shadow dark:bg-gray-700">
                        
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-700">
                            <h3 className="text-xl font-semibold text-white">
                                Add friend
                            </h3>
                            <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-700 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="add-friend-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        
                        <div className="p-4 md:p-5">
                            <form className="space-y-4" onSubmit={handleAddFriend}>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Friend Username</label>
                                    <input type="text" name="username" id="username" className="bg-gray-900 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Username" required/>
                                    {errorElement}
                                    {/* <div className="hidden">{message}</div> */}
                                </div>
                              
                                <button type="submit" className="w-full text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add friend</button>
                              
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )


}