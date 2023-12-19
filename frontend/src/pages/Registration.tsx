import { FormEvent, useState } from "react";
import MainContent from "../components/MainContent";
import SideNav from "../components/SideNav";
import {axiosInstance} from "../axiosConfig";
import { useNavigate } from "react-router-dom";



export default function RegistrationPage() {

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    const handleRegistration = async (event) => {

        event.preventDefault();

        console.log("FORM DATA");

        const data = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(data.entries());

        
        axiosInstance.post('/signup/', formObject, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then(res => {
            console.log(res);
            alert(res.data.message);
            setIsError(false);
            navigate("/")
        }).catch(err => {
            console.log(err);
            alert(err.response.data.message);
            setIsError(true);
        })

        console.log("FORM DATA", formObject);

    }

    let errorElement = <></>
    if (isError){
        errorElement = <span className=" text-red-700 text-xs"> Unable to created account </span>
    }

    return (
        <>
            {/* <SideNav /> */}


            <div className="flex flex-col items-center justify-center h-screen round bg-gray-800">

                <div className="w-full max-w-sm p-4 bg-gray-900  rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleRegistration} className="space-y-6" encType="multipart/form-data">
                        <h5 className="text-xl font-medium text-white">Sign Up</h5><div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Your Username</label>
                            <input autoComplete="true" type="text" name="username" id="username" className="bg-gray-900 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="username" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                            <input autoComplete="true" type="email" name="email" id="email" className="bg-gray-900 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
                            <input autoComplete="true" type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-900 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-white" htmlFor="file_input">Upload Profile Picture</label>
                            <input className="block w-full text-sm text-gray-300 border border-gray-300 rounded-lg cursor-pointer bg-gray-900 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="image" name="image" type="file"/>
                        </div>

                        <div>

                            {errorElement}

                        </div>

                        <button type="submit" className="w-full text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered ? <a href="/" className="text-blue-700 hover:underline dark:text-blue-500">Login</a>
                        </div>
                    </form>
                </div>







            </div>

        </>
    );
}