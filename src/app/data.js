"use client"
let data={
    "users":[
        {
            "uid":1,
            "username":"user1",
            "password":"password@1",
            "tasks":[
                {
                    "taskName":"newtask",
                    "taskDescription":"lorem",
                    "taskDeadline":"2024-08-04",
                    "status":"pending"
                }
            ]
        }
    ],
    

}
const savedData=localStorage.setItem('data',JSON.stringify(data))
export default savedData;