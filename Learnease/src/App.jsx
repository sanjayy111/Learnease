import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from './Components/Navbar'
import Hero from './Components/Hero/Hero'
import Programs from './Components/Programs/Programs'
import Title from './Components/Title/Title'
import About from './Components/About/About'
import Campus from './Components/Campus/Campus'
import Testimonials from './Components/Testimonials/Testimonials'
import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'

import Login from './Components/Pages/Login'

const HomePage = () => (
  <>
    <Hero />
    <div className="container">
      <Title subTitle='OUR PROGRAM' title='What We Offer' />
      <Programs />
      <About />
      <Title subTitle='Gallery' title='Campus Photos' />
      <Campus />
      <Title subTitle='Testimonials' title='What Students Says' />
      <Testimonials />
      <Title subTitle='Contact us' title='Get in Touch' />
      <Contact />
    </div>
  </>
);

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;

