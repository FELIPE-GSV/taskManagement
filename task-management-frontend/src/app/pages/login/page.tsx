"use client"

import InputLogin from "@/app/components/InputLogin"
import BackgG from "../../assets/background1.jpg"
import Logo from "../../assets/Task-removebg-preview.png"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { notification } from "antd"
import { NotificationType } from "@/app/types/notification"
import { BASE_URL } from "@/app/api/api"

interface LoginDTO {
    username: string,
    password: string
}

export default function Login() {

    const router = useRouter()

    const [loginObject, setLoginObject] = useState<LoginDTO>({
        username: "",
        password: "",
    })

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const loginMethod = async () => {


        if (loginObject.username === "" || loginObject.password === "") {
            openNotificationWithIcon("warning", "Campos vazios.", "Certifique-se de que preencheu todoso os campos!")
            return
        }

        let username = loginObject.username
        let password = loginObject.password

        try {
            const response = await fetch(`${BASE_URL}/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })


            if (response.ok) {
                const data = await response.json()
                if (typeof window !== 'undefined') {
                    const now = new Date().getTime();
                    localStorage.setItem('token', data.access);
                    localStorage.setItem('tokenTimestamp', now.toString());

                    try {
                        const response = await fetch(`${BASE_URL}/findUserByToken/`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${data.access}`
                            }
                        })

                        const dataResponse = await response.json()
                        localStorage.setItem('usename', dataResponse.username)
                        localStorage.setItem('id', dataResponse.id)
                        localStorage.setItem('email', dataResponse.email)
                        openNotificationWithIcon("success", "Login realizado com sucesso!.", "Carregando página seguinte...")
                        router.push("/pages/tasks")

                    } catch (error) {

                    }
                }
            } else if (response.status === 404 || response.status === 401) {
                openNotificationWithIcon("warning", "Dados incorretos.", "Certifique-se de que colocou os dados corretos!")
                const data = await response.json()
                console.log("erro 404", data)
                return
            } else if (response.status === 500) {
                openNotificationWithIcon("error", "Erro de conexão.", "Algo ocorreu com a api!")
                const data = await response.json()
                console.log("erro 404", data)
                return
            }

        } catch (error) {
            console.log("Erro do catch", error)
        }
    }

    return (
        <>
            {contextHolder}
            <main className="w-full min-h-screen relative">
                <img
                    src={BackgG.src}
                    alt="backgroundLogin"
                    className="h-[100vh] object-cover w-full"
                />
                <div className="w-full min-h-screen absolute top-0 left-0 bg-[#D3DEF2] opacity-70">
                </div>
                <div className="h-[80%] w-[40%]  bg-gradient-to-b from-[#4178E3] to-[#24427D] absolute top-1/2 
            left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[20px] gap-[90px] py-[87px] flex flex-col items-center">
                    <img
                        src={Logo.src}
                        alt="Logo"
                        className="w-[500px] h-[126px] object-cover"
                    />
                    <div className="w-[80%] h-auto flex flex-col gap-[50px]">
                        <InputLogin
                            type="name"
                            width="w-full"
                            onChange={(e) => setLoginObject({ ...loginObject, username: e.target.value })}
                        />
                        <InputLogin
                            type="password"
                            width="w-full"
                            onChange={(e) => setLoginObject({ ...loginObject, password: e.target.value })}
                        />
                    </div>
                    <button
                        className="w-[40%] h-[50px] rounded-[30px] bg-white text-[#4178E3] text-[24px] font-bold"
                        onClick={loginMethod}
                    >
                        Login
                    </button>
                </div>
            </main>
        </>

    )
}