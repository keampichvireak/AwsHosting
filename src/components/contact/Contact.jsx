import "./contact.css";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useState } from "react";
import { motion, useInView } from "motion/react";
import ContactSvg from "./ContactSvg";
const Contact = () => {
    const form = useRef();
    const ref = useRef();
    const listVariants = {
        initial: {
            opacity: 0,
            x: 100,
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2
            }
        }

    }

    const isInView = useInView(ref, { margin: "-200px" })

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID,
                form.current, {
                publicKey: import.meta.env.VITE_PUBLIC_KEY,
            })
            .then(
                () => {
                    setSuccess(true);
                    setError(false);
                },
                (error) => {
                    setError(true);
                    setSuccess(false);
                },
            );
    };
    return (

        <div className="contact" ref={ref} onSubmit={sendEmail} >
            <div className="cSection"  >
                <motion.form ref={form} variants={listVariants} animate={isInView ? "animate" : "initial"}  >
                    <motion.h1 variants={listVariants} className="cTitle"> Let's keep in touch</motion.h1>
                    <motion.div variants={listVariants}>
                        <label htmlFor="">Name</label>
                        <input type="text" name="user_username" placeholder="John Doe" />
                    </motion.div>
                    <motion.div variants={listVariants} className="formItem" >
                        <label >Email</label>
                        <input type="email" name="user_email" placeholder="pikapu@gmail.com" />
                    </motion.div>
                    <motion.div variants={listVariants} className="formItem" >
                        <label >Message</label>
                        <textarea rows={10} name="user_message" placeholder="Write your message ..."></textarea>
                    </motion.div>
                    <motion.button variants={listVariants} className="formButton">Send</motion.button>
                    {success && <span>Your message has been sent !</span>}
                    {error && <span>Something went wrong </span>}
                </motion.form>
            </div>
            <div className="cSection"><ContactSvg /></div>
        </div>

    )
}
export default Contact