"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css'; // needed for toast notifications, can be ignored if hideToast=true
import suprsend from "@suprsend/web-sdk";
import SuprSendInbox from '@suprsend/react-inbox'


export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    const [cards, setCards] = useState([]);
    const [distinctId, setDistinctId] = useState("");

    const [hash,setHash]=useState("");
    useEffect(() => {
        if (typeof window!== 'undefined') {
            suprsend.init("eY0zNzLO0x7LGovrI9vG", "SS.WSS._YDCcHe0LB3OOtmGZ8Oo4PVuMBGgAKciOrGmUt_A");
        
        const loadData = () => {
            const userData = JSON.parse(localStorage?.getItem('userData') || '{}');
            const storedData = JSON.parse(localStorage?.getItem('data') || '{}');
            setUser(userData);
            setData(storedData);

            if (storedData && userData) {
                const currUser = storedData.users.find(u => u.uid === userData.uid);
                if (currUser) {
                    setCards(currUser.tasks);
                }
            }
        };

        loadData();

        const storedData = JSON.parse(localStorage?.getItem('data') || '{}');
        const userData = JSON.parse(localStorage?.getItem('userData') || '{}');
        setDistinctId(userData.uid);

        const uid = userData.uid;
        const secret = "wUbCunC7WHXkY7O9hFImzezYVo47k4zDpCht7vnZF-g";

        if (uid && secret) {
            fetch(`api/hmac?distinct_id=${uid}&secret=${secret}&tasksObj=${encodeURIComponent(JSON.stringify(storedData.users[uid - 1].tasks))}`)
                .then(response => response.json())
                .then(data => setHash(data.hash)) // Log hash for debugging
                .catch(error => console.error('Error fetching HMAC:', error));
        }

        window.addEventListener('storage', loadData);

        return () => {
            window.removeEventListener('storage', loadData);
        };
    }
    }, []);

    const addTask = () => {
        router.push('/addTask');
    };
    function logout(){
        router.push('/');
    }

    const changeStatus = (status, taskName) => {
        if (!data || !user) return;

        const currUser = data.users.find(u => u.uid === user.uid);
        if (currUser) {
            const task = currUser.tasks.find(task => task.taskName === taskName);
            if (task) {
                task.status = status;
                localStorage?.setItem('data', JSON.stringify(data));
                setCards([...currUser.tasks]);
            }
        }
    };

    if (!user || !data) {
        return <div>Loading...</div>;
    }

    return (
        <main className="bg-[url('../../public/assests/back-ground.jpg')] bg-cover bg-center">
            <header className="text-gray-600 body-font bg-opacity-30 backdrop-blur-md p-2">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl text-indigo-100">Task Manager</span>
                    </a>
                    <div className="flex">
                    <a href="/" className="text-indigo-100">Logout | </a>
                        <div className="flex items-center space-x-4">
                            <span className="text-white font-medium"> {user.username}</span>
                            <i className="fas fa-user-circle text-white text-2xl"></i>
                        </div>
                        
                    </div>
                </div>
            </header>
            <div className="min-h-screen backdrop-blur-md">
                <div className="flex justify-between p-3">
                    <div className="px-5">
                        <h1 className="text-white text-6xl">Welcome {user.username}.</h1>
                    </div>
                    <div>
                        <div className="flex">
                            <SuprSendInbox
                                workspaceKey="eY0zNzLO0x7LGovrI9vG"
                                subscriberId={hash}
                                distinctId={distinctId}
                                themeType="dark"
                            />
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={addTask}>+ Add Task</button>
                        </div>
                    </div>
                </div>
                <div className="p-3 mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {cards.map(card => (
                        <div key={card.taskName}>
                            <a href="#" className="block max-w-sm p-6 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-800">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">{card.taskName}</h5>
                                <p className="font-normal dark:text-gray-400">{card.taskDescription}</p>
                                <br />
                                <div className="flex">
                                    <svg className="w-6 h-6 text-grey-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
                                    </svg>
                                    <h3 className="dark:text-gray-400">{card.taskDeadline}</h3>
                                </div>
                                <h3>Status: {card.status}</h3>
                                <br />
                                <div className="flex">
                                    {card.status === "pending" ? (
                                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => changeStatus("completed", card.taskName)}>Mark as completed</button>
                                    ) : (
                                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => changeStatus("pending", card.taskName)}>Mark as pending</button>
                                    )}
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
