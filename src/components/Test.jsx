import React from 'react'
import { motion } from "motion/react"
const Test = () => {
    return (
        <section style={{
            display: "flex", alignItems: "center",
            justifyContent: "center"
        }}>
            <motion.div
                initial={{ x: 0, y: 0 }}
                animate={{ x: 100, y: 100 }}
                transition={{ duration: 2 }}
                style={{ width: 300, height: 300, backgroundColor: "red" }}
            >

            </motion.div>

        </section>
    )
}

export default Test