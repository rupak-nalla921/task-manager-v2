"use client"
import { useRouter } from 'next/navigation';
import { useState,useEffect } from 'react'; // Ensure this import works as expected
import data from '@/app/data'
export default function Home() {
    const router = useRouter();
    const [isWrong, setWrong] = useState(false);
    const [uname, setregisterUserName] = useState('');
    const [password, setregisterPassword] = useState('');
	

    function register() {
        // Ensure this code runs only on the client side
        if (typeof window !== 'undefined') {
			const data = JSON.parse(localStorage.getItem('data')) || { users: [] };
            const users = data.users;
            for (let i = 0; i < users.length; i++) {
                if (users[i].username === uname) {
                    setWrong(true);
                    return;
                }
            }// Set wrong flag if register fails
        
            const newUser = {
                "uid": users.length+1,
                "username": uname,
                "password": password,
                "tasks": []
            };
            data.users.push(newUser);
            localStorage.setItem('data',JSON.stringify(data));
            router.push("/");

            
        }
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
                    <a href='/' className='text-indigo-100'>Sign In</a>
                </div>
            </header>
            <div className="min-h-screen bg-opacity-30 backdrop-blur-md">
                <section className="text-indigo-100 body-font">
                    <div className="container px-5 py-10 mx-auto flex flex-wrap items-center">
                        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                            <h1 className="title-font font-medium text-5xl text-white">Task Manager</h1>
                            <p className="leading-relaxed mt-4 text-indigo-500">A place where you organize your day</p>
                        </div>
                        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                            <h2 className="text-lg text-gray-600 font-medium title-font mb-5">Sign Up</h2>
                            {isWrong ? (
                                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                    Username/password already exists
                                </span>
                            ) : null}
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input
                                    onChange={(e) => setregisterUserName(e.target.value)}
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                                <input
                                    onChange={(e) => setregisterPassword(e.target.value)}
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <button onClick={register} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                Submit
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
