"use client"
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import data from "@/app/data"
export default function Home() {
	const router = useRouter();
    const [isWrong, setWrong] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [Description, setDescription] = useState('');
    const [deadline,setDate]=useState('');
    function addTask() {
        console.log(taskName,Description,deadline);
        const newtask={
            "taskName":taskName,
            "taskDescription":Description,
            "taskDeadline":deadline,
            "status":"pending"
        }
    
        let currUser = JSON.parse(sessionStorage.getItem('userData'));
        const data=JSON.parse(localStorage.getItem('data'))
        const user = data.users.find(user => user.uid === currUser.uid);
        
        if (user) {
            // Add the new task to the user's tasks array

            user.tasks.push(newtask);
            console.log(user);
            localStorage.setItem('data', JSON.stringify(data));
            router.push('/Home');

        } else {
            console.log(`User with uid ${uid} not found.`);
        }
        
    }

	return (
		<main className="bg-[url('../../public/assests/back-ground.jpg')] bg-cover bg-center">
			<header className="  text-gray-600 body-font bg-opacity-30 backdrop-blur-md p-2">
				<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
					<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
					</svg>
					<span className="ml-3 text-xl text-indigo-100">Task Manager</span>
				</a>
				
				</div>
			</header>
			<div className="min-h-screen bg-opacity-30 backdrop-blur-md" >
					<section className="text-indigo-100 body-font">
						<div className="container px-5 py-10 mx-auto flex flex-wrap items-center justify-center">
							
							<div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col  md:ml-0 w-full mt-10 md:mt-0">
								<h2 className=" text-lg text-gray-600 font-medium title-font mb-5">Add task</h2>
								
								<div className="relative mb-4">
									<label htmlFor="email" className="leading-7 text-sm text-gray-600">task name</label>
									<input onChange={(e)=>{setTaskName(e.target.value) }} type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
									</input>
								</div>
								<div className="relative mb-4">
									<label htmlFor="password" className="leading-7 text-sm text-gray-600">Description</label>
									<textarea onChange={(e)=>{setDescription(e.target.value) }} type="text" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
									</textarea>
								</div>
                                <div class="relative mb-4">
                                    <label htmlFor="deadline" className="leading-7 text-sm text-gray-600">deadline</label>

                                    <input
                                        type="date"
                                        id="deadline"
                                        name="deadline"
                                        onChange={(e)=>{setDate(e.target.value)}}
                                        class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
								<button onClick={addTask} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
							</div>
						</div>
					</section>
			</div>
		</main>
	);
}