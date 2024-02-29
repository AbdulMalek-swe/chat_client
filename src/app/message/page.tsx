"use client"

import axios from "axios";
import { useEffect, useState } from "react";


const Home = () => {
    const [user, setUser] = useState<any>([])
    const [userData, setUserData] = useState<any>({})
    const [message, setMessage] = useState<any>("")
    const [messages, setMessages] = useState<any>([])
    useEffect(() => {
        axios.get("https://chat-api-2-aelj.onrender.com/user")
            .then(res => {
                console.log(res);
                setUser(res?.data?.data)
            }).catch(err => {
                console.log(err.message);
            })
    }, [])
    const handleSend = async (e: any) => {
        const user: any = localStorage.getItem("user")
        const text = JSON.parse(user);
        try {
            // Make a POST request using Axios
            const response = await axios.post(`https://chat-api-2-aelj.onrender.com/message`, {

                "to": userData?._id,
                "from": text?._id,
                "message": message

            });

            // Handle the response, e.g., show a success message or redirect the user
            console.log('Registration successful:', response.data);
            setMessage("")
            return response?.data;
        } catch (error) {
            // Handle errors, e.g., show an error message to the user
            console.error('Registration failed:', error);
        }
    }
    useEffect(() => {
        async function getMessage() {
            try {
                const user: any = localStorage.getItem("user")
                const text = JSON.parse(user);
                // Make a POST request using Axios
                const response = await axios.post(`https://chat-api-2-aelj.onrender.com/message/getmessage`, {


                    "to": userData?._id,
                    "from": text?._id,

                });

                // Handle the response, e.g., show a success message or redirect the user
                console.log('Message successful:', response);
                setMessages(response.data)
                // return response?.data;
            } catch (error: any) {
                // Handle errors, e.g., show an error message to the user
                console.error('Registration failed:', error.message);
            }
        }
        getMessage()
    }, [userData])
    return (
        <div className="text-black">
            {
                user.map((item: any, index: any) => <div key={index} onClick={() => setUserData(item)}>
                    <h1>{item?.email}</h1>
                </div>)
            }
            <div>
                {
                    messages.map((item: any, index: any) => <div key={index} className="bg-blue-900 text-white p-5 ">

                        <p className={item?.fromSelf ? 'bg-red-900' : "bg-blue-800"}> {item.message}</p>
                    </div>)
                }
            </div>
            <div>
                <input onChange={(e) => setMessage(e.target.value)} />
                <button onClick={handleSend}>send</button>
            </div>
        </div>
    );
};

export default Home;