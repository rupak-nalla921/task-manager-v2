"use client"

import { useEffect } from 'react';

const data = {
    "users": [
        {
            "uid": 1,
            "username": "user1",
            "password": "password@1",
            "tasks": [
                {
                    "taskName": "newtask",
                    "taskDescription": "lorem",
                    "taskDeadline": "2024-08-04",
                    "status": "pending"
                }
            ]
        }
    ]
};

const DataComponent = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('data', JSON.stringify(data));
        }
    }, []);

    return null; // or any JSX you need
};

export default DataComponent;
