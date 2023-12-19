import { FormEvent } from "react";
import MainContent from "../components/MainContent";
import SideNav from "../components/SideNav";
import {axiosInstance} from "../axiosConfig";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {

    const navigate = useNavigate();

    const handleLogin = async (event) => {

        event.preventDefault();

        
        const formData = new FormData(event.currentTarget);
        const formObject = Object.fromEntries(formData.entries());

        const xx = new FormData();
        xx.append("email", "ak@gmail.com")
        xx.append("password", "123");
        

        try{
            const data = await axiosInstance.post("/signin", formObject);
            console.log("Response", data);
            navigate("/chat/");
        }
        catch(err){
            console.log("Something went wrong", err)
            alert(err.response.data.message);
        }

        console.log("FORM DATA", formObject);

    }

    return (
        <>
            {/* <SideNav /> */}


            <div className="flex flex-col items-center justify-center h-screen round bg-gray-800">

                <div className="w-full max-w-sm p-4 bg-gray-900 text-white  rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <h5 className="text-xl font-medium text-white">Sign In</h5>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                            <input autoComplete="true" type="email" name="email" id="email" className="bg-gray-900 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
                            <input autoComplete="true" type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-900 border border-gray-300 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>

                        <button type="submit" className="w-full text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered ? <a href="/register/" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                        </div>
                    </form>
                </div>







            </div>

        </>
    );
}