import React from 'react'
import './Campus.css'
import gallery1 from '../../assets/gallery-1.png'
import gallery2 from '../../assets/gallery-2.png'
import gallery3 from '../../assets/gallery-3.png'
import white_arrow from '../../assets/white-arrow.png'

const Campus = () => {
  return (
    <div className='campus'>

      {/* Existing Gallery */}
      <div className="gallery">
        <img src={gallery1} alt="" />
        <img src={gallery2} alt="" />
        <img src={gallery3} alt="" />
        
      </div>

      

    
      <div className="features-section">

        <div className="feature-card">
          <h2>Daily live classes</h2>
          <p>
            Chat with educators, ask questions, answer live polls, 
            and get your doubts cleared all while the class is going on.
          </p>
        </div>

        <div className="feature-card">
          <h2>Practice and revise</h2>
          <p>
            Learning isn't just limited to classes. Access our practice section, 
            mock tests, and lecture notes shared as PDFs for your revision.
          </p>
        </div>

        <div className="feature-card">
          <h2>Learn anytime, anywhere</h2>
          <p>
            One subscription gets you access to all our live and recorded classes 
            to watch from the comfort of any of your devices.
          </p>
        </div>
       

      </div>
      <div className='btnnn'>
         <button className='btn dark-btn'>
        See More Here <img src={white_arrow} alt="" />
      </button>
      </div>
      
    </div>
  )
}


export default Campus
