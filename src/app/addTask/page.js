"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddTask() {
    const router = useRouter();
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDate] = useState('');

    function addTask() {
        console.log(taskName, description, deadline);

        // Ensure this code runs only on the client-side
        if (typeof window !== 'undefined') {
            const newTask = {
                taskName,
                taskDescription: description,
                taskDeadline: deadline,
                status: "pending"
            };

            const currUser = JSON.parse(localStorage.getItem('userData'));
            const data = JSON.parse(localStorage.getItem('data'));

            if (data && currUser) {
                const user = data.users.find(user => user.uid === currUser.uid);
                if (user) {
                    user.tasks.push(newTask);
                    console.log(user);
                    localStorage.setItem('data', JSON.stringify(data));
                    router.push('/Home');
                } else {
                    console.log(`User with uid ${currUser.uid} not found.`);
                }
            }
        }
    }

    return (
        <main className="bg-[url('../../public/assests/back-ground.jpg')] bg-cover bg-center">
            <header className="text-gray-600 body-font bg-opacity-30 backdrop-blur-md p-2">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl text-indigo-100">Task Manager</span>
                    </a>
                </div>
            </header>
            <div className="min-h-screen bg-opacity-30 backdrop-blur-md">
                <section className="text-indigo-100 body-font">
                    <div className="container px-5 py-10 mx-auto flex flex-wrap items-center justify-center">
                        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0">
                            <h2 className="text-lg text-gray-600 font-medium title-font mb-5">Add Task</h2>
                            <div className="relative mb-4">
                                <label htmlFor="taskName" className="leading-7 text-sm text-gray-600">Task Name</label>
                                <input onChange={(e) => setTaskName(e.target.value)} type="text" id="taskName" name="taskName" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                                <textarea onChange={(e) => setDescription(e.target.value)} id="description" name="description" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="deadline" className="leading-7 text-sm text-gray-600">Deadline</label>
                                <input type="date" id="deadline" name="deadline" onChange={(e) => setDate(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <button onClick={addTask} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
