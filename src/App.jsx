

import Test from "./components/Test"
import Test3d from "./components/Test3d"
import { lazy, Suspense } from "react"
import LazyLoad from "react-lazyload";

const Hero = lazy(() => import("./components/hero/Hero"))
const Services = lazy(() => import("./components/services/Services"))
const Portfolio = lazy(() => import("./components/portfolio/Portfolio"))
const Contact = lazy(() => import("./components/contact/Contact"))


const App = () => {
  return (
    <div className='container'>
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="#home">
            <Hero />
          </section>
        </LazyLoad>
      </Suspense>
      <Suspense fallback={"loading..."}>
        <section id="#services">
          <Services />
        </section>
      </Suspense>
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"}>
          <Portfolio />

        </LazyLoad>
      </Suspense>
      <Suspense fallback={"loading..."}>
        <LazyLoad height={"100vh"} offset={-100}>
          <section id="#contact">
            <Contact />
          </section>
        </LazyLoad>
      </Suspense>
      {/* <Test /> */}
      {/* <Test3d /> */}
    </div>
  )
}

export default App