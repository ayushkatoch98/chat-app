export default function MainContent(props) {
    return (


        <div className="p-4 sm:ml-64 bg-gray-800 h-screen">
            <div className="p-4  rounded-lg">
               {props.children}
                </div>
            </div>




            );
}