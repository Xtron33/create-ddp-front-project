import { useState } from 'react'
import {createFileRoute} from "@tanstack/react-router"

import Logo from "@assets/icons/ddplogo.svg?react"
import ReactLogo from "@assets/icons/react.svg?react"

import styles from "./main.module.css"

export const Route = createFileRoute('/')({
    component: Main,
})

const Main = () => {
    return (
        <div className={styles.bg}>
            <div className={styles.wrapper}>
                <Logo width={300} height={100} />+
                <div className={styles.box}>
                    {Array(8)
                        .fill(0)
                        .map((_, i) => (
                            <ReactLogo
                                width={150}
                                height={150}
                                className={styles.react}
                                key={i}
                                style={{ animationDelay: `${i * 20}ms`, opacity: 1 / (i * 2) }}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}
