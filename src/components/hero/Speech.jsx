import { TypeAnimation } from "react-type-animation"
import { motion } from "motion/react"
const Speech = () => {
    return (
        <motion.div className="bubbleContainer"
            animate={{ opacity: [0, 1] }} transition={{ duration: 3 }}>
            <div className="bubble">
                <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Same substring at the start will only be typed out once , initially ',
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        'Lorem ipsum dolor sit amet lerinat consectetur adipiscing',
                        1000,

                    ]}
                    wrapper="span"
                    speed={40}
                    deletionSpeed={60}
                    repeat={Infinity}
                /></div>
            <img src="/man.png" alt="" />
        </motion.div>

    )
}
export default Speech