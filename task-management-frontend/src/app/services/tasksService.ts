import { BASE_URL } from "../api/api"

export async function listAllTasks(token: any) {
    try {
        const response = await fetch(`${BASE_URL}/findTasks/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await response.json()

        return await data

    } catch (error) {
        console.log(error)
        return error
    }
}

export async function deleteTaskById(identifier: any, token: any) {
    try {
        const response = await fetch(`${BASE_URL}/deleteTaskById/${identifier}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await response.json()

        return await data
    } catch (error) {
        return error
    }
}

export async function updateTaskById(token: any, data: any) {

    // {
    // 	"title": "Tarefa concluída",
    // 	"completed": false,
    // 	"user": 1
    // }
    try {
        const title = data.title
        const completed = true
        const user = data.user

        const response = await fetch(`${BASE_URL}/putTask/${data.identifier}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, completed, user }),
        })
        if (response.ok) {
            const dataResponse = await response.json()
            return await dataResponse
        } else {
            return response.status
        }


    } catch (error) {
        return error
    }
}

export async function createTaskInBd(token: any, data: any) {
    try {
        const title = data.title
        const user = data.user
        const response = await fetch(`${BASE_URL}/createTask/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, user }),
        })

        if (response.ok) {
            const dataResponse = await response.json()
            return await dataResponse
        } else {
            return response.status
        }

    } catch (error) {
        return error
    }
}