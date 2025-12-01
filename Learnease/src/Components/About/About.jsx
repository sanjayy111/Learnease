import React from "react";
import "./About.css";
import about_img from "../../assets/about.png";
import play_icon from "../../assets/play-icon.png";

const About = () => {
  return (
    <div className="about">
      <div className="about-left">
        <img src={about_img} alt="" className="about-img" />
        {/* <img src={play_icon} alt="" className='play-icon' /> */}
      </div>
      <div className="about-right">
        <h3>ABOUT</h3>
        <h2>Reimagine your career in the AI era</h2>

        <p>
          AI isn't here to replace your potential; it's here to amplify it. This
          is the moment to learn, adapt, and unlock new possibilities. Embrace
          the tools, master the trends, and let innovation shape your next
          chapter.
        </p>

        <p>
          Artificial Intelligence is transforming every industry, and success
          now depends on how quickly we adapt. Upskill, explore new pathways,
          and redefine what your career can look like in a world powered by
          intelligent technology
        </p>
        <p>
          A common fear is that AI will take away jobs. While AI will automate
          repetitive tasks, it cannot replace the unique strengths that humans
          bring—creativity, emotional intelligence, critical thinking, cultural
          understanding, and strategic decision-making.
        </p>
      </div>
    </div>
  );
};

export default About;
