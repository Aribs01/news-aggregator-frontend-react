import React from 'react'
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

// import '../assets/css/footer.css'

const FooterComponent = () => {
  return (
    <div className='footer-container'>
      <div className="icons-container">
        <span className='Copyright'>
          Copyright 2023 @ Abiola. All Rights Reserved.
          <AiFillLinkedin className='icons' size={25} />
          <AiFillGithub className='icons' size={25} />
        </span>
      </div>
    </div>
  )
}

export default FooterComponent;