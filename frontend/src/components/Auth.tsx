import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";





export default function AuthUser(props){

    const isSignedIn = useSelector(state => state.user.isSignedIn)
    
    const navigate = useNavigate()
    // const history = useHi

    console.log("isSignedIn", isSignedIn);
    if (!isSignedIn){
        window.location.href = "/";
    }


    const page = isSignedIn ? <>{props.children}</> : <></>

    return (

        <>
            {page}
        </>

    )
    

}