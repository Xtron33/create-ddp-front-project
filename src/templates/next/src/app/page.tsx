import Image from "next/image"

import Logo from "@assets/icons/ddplogo.svg"
import NextLogo from "@assets/icons/next.svg"

import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.bg}>
      <div className={styles.wrapper}>
        <Image src={Logo} width={300} height={100} alt='DDPLogo' />+
        <div className={styles.box}>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Image
                src={NextLogo}
                width={350}
                height={150}
                className={styles.react}
                key={i}
                alt='NextLogo'
                style={{ animationDelay: `${i * 15}ms`, opacity: 1 / (i * 2) }}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
