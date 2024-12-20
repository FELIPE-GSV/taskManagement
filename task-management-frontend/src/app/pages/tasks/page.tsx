"use client"

import { useEffect, useState } from "react"
import Logo from "../../assets/Task-removebg-preview.png"
import { createTaskInBd, deleteTaskById, listAllTasks, updateTaskById } from "@/app/services/tasksService"
import { Check, Trash } from "phosphor-react"

export default function Tasks() {
    const [titleNewTask, setTitleNewTask] = useState("")
    const [tasks, setTasks] = useState<any[]>()

    const taksCompleted = tasks && tasks.filter((task) => task.completed === true)

    const findTasks = async () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token')
            const dataTasks = await listAllTasks(token)
            setTasks(dataTasks)
        }
    }

    const deleteTask = async (identifier: any) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token')
            const data = await deleteTaskById(identifier, token)
            if (data) {
                findTasks()
            }
        }
    }

    const completeTask = async (task: Task) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token')
            const dataInvite = {
                title: task.title,
                user: task.user,
                identifier: task.identifier
            }
            const data = await updateTaskById(token, dataInvite)
            if (data) {
                findTasks()
            }
        }
    }

    const createTask = async () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token')
            const user = localStorage.getItem('id')
            const dataInvite = {
                title: titleNewTask,
                user: Number(user),
            }
            const data = await createTaskInBd(token, dataInvite)
            if (data) {
                setTitleNewTask("")
                findTasks()
            }
        }
    }

    useEffect(() => {
        findTasks()
    }, [])


    return (
        <main className="bg-[#24427D] w-full min-h-screen flex flex-col items-center gap-[30px]">
            <img
                src={Logo.src}
                alt="Logo"
                className="w-[500px] h-[126px] object-cover mt-[18px]"
            />
            <div className="flex items-center w-[40%] h-[50px] gap-[15px]">
                <input
                    type="text"
                    className="w-[75%] h-14 rounded-[100px] bg-white pl-[33px] py-[27px] text-[#A1A1A1] text-[16px]"
                    placeholder="Nova atividade"
                    onChange={(e) => setTitleNewTask(e.target.value)}
                    value={titleNewTask}
                />
                <button
                    className="w-[25%] h-14 rounded-[100px] bg-[#4178E3] text-white"
                    onClick={()=> createTask()}
                >
                    Criar
                </button>
            </div>
            <section className="flex flex-col items-center w-[40%] h-[50px] gap-[6px]">
                <div className="w-full flex items-center justify-between">
                    <label className="font-bold text-[16px]">Atividades</label>
                    <label className="font-bold text-[16px]">{taksCompleted ? taksCompleted.length : "0"}/{tasks ? tasks.length : "0"}</label>
                </div>
                <div className="w-full flex flex-col items-center justify-start gap-[10px]">
                    {/* listagem */}

                    {tasks && tasks.map((task, index) =>
                        <div key={index} className="w-full h-[70px] rounded-[12px] flex items-center justify-between bg-[#E8E8E8] px-[28px]">
                            <label className={`text-[#909090] ${task.completed && ("line-through")}`}>{task.title}</label>
                            <div className="flex items-center gap-[10px]">
                                {!task.completed && (
                                    <button
                                        className="bg-[#B5DAFC] w-[40px] h-[40px] rounded-[12px] flex items-center justify-center"
                                        onClick={() => completeTask(task)}
                                    >
                                        <Check color="#4178E3" size={22} />
                                    </button>
                                )}
                                <button
                                    className="bg-[#FFD1D1] w-[40px] h-[40px] rounded-[12px] flex items-center justify-center"
                                    onClick={() => deleteTask(task.identifier)}
                                >
                                    <Trash color="#F45E5E" size={22} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

        </main>
    )
}