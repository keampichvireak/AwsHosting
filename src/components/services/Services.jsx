import { useRef, useState } from "react";
import Counter from "./Counter";
import "./services.css";
import { motion, useInView } from "motion/react"
import ComputerModelContainer from "./computer/ComputerModelContainer";
import MugModelContainer from "./mug/MugModelContainer";
import ConsoleModelContainer from "./console/ConsoleModelContainer";
const textVariants = {
    initial: {
        x: -100,
        y: -100,
        opacity: 0,
    },
    animate: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
        }
    }
}


const listVariants = {
    initial: {
        x: -100,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            staggerChildren: 0.5
        }
    }
}

const services = [
    {
        id: 1,
        img: "/service1.png",
        title: "Web Development",
        counter: 35,
    },
    {
        id: 2,
        img: "/service2.png",
        title: "Product Design",
        counter: 23,
    },
    {
        id: 3,
        img: "/service3.png",
        title: "Branding",
        counter: 46,
    }
];



const Services = () => {
    const [currentServiceId, setCurrentServiceId] = useState(1);
    const ref = useRef();
    const isInview = useInView(ref, { margin: "-200px" });
    return (
        <div className="services" ref={ref}>
            <div className="sSection left">
                <motion.h1 variants={textVariants} animate={isInview ? "animate" : "initial"} className="sTitle">How do I help?</motion.h1>
                <motion.div

                    variants={textVariants}
                    animate={isInview ? "animate" : "initial"}
                    className="serviceList">
                    {
                        services.map((service) => (
                            <motion.div variants={listVariants} className="service" key={service.id}
                                onClick={() => setCurrentServiceId(service.id)}
                            >
                                <div className="serviceIcon">
                                    <img src={service.img} alt="" />
                                </div>
                                <div>
                                    <h2>{service.title}</h2>
                                    <h3>{service.counter} Project </h3>
                                </div>
                            </motion.div>
                        ))
                    }
                </motion.div>
                <div className="counterList">
                    <Counter from={0} to={104} text="Projects Completed" />

                    <Counter from={0} to={72} text="Happy Clients" />
                </div>
            </div>
            <div className="sSection right" >
                {currentServiceId === 1 ? (<ComputerModelContainer />) : currentServiceId === 2 ? (<MugModelContainer />) : <ConsoleModelContainer />}
            </div>
        </div>
    )
}

export default Services