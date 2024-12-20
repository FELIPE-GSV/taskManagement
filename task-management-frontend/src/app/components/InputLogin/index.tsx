"use client"

import { Eye, EyeClosed, User } from "phosphor-react"
import { useState } from "react"

interface Props {
    type: "name" | "password"
    width?: string
    onChange: (e: any) => void
}

export default function InputLogin({ type, width, onChange }: Props) {

    const [isVisible, setisVisible] = useState(false)

    return (
        <div className={`${width} h-[50px] border-b-[2px] border-white flex items-center justify-between`}>
            {type == "name" && (
                <>
                    <input
                        type="text"
                        placeholder="Nome de usuário"
                        className="w-[90%] h-full py-3 pl-2 pr-10 text-white placeholder-white bg-transparent border-none rounded-lg focus:ring-0 focus:outline-none text-[22px] placeholder-opacity-60"
                        onChange={onChange}
                    />
                    <User size={32} color="white" />
                </>
            )}
            {type == "password" && (
                <>
                    <input
                        type={isVisible ? "text" : "password"}
                        placeholder="Senha"
                        className="w-[90%] h-full py-3 pl-2 pr-10 text-white placeholder-white bg-transparent border-none rounded-lg focus:ring-0 focus:outline-none text-[22px] placeholder-opacity-60"
                        onChange={onChange}
                    />
                    {isVisible ?
                        <Eye size={32} color="white" className="cursor-pointer" onClick={() => setisVisible(false)} />
                        :
                        <EyeClosed size={32} color="white" className="cursor-pointer" onClick={() => setisVisible(true)} />
                    }
                </>
            )}
        </div>
    )
}