// import React from 'react'
// import './Sidebar.css'
// import {assets} from '../../assets/assets'

// const Sidebar = () => {
//   const [extended,setExtended] = useState(false)

//   return (
//     <div className="sidebar">
//       <div className="top">
        
//         <img onClick={()=>setExtended(prev=>!prev)} className="menu" src={assets.menu_icon} alt="Menu Icon" />

       
//         <div className="new-chat">
     
//           <img src={assets.plus_icon} alt="Plus Icon" />
//             {extended?<p>New Chat</p>:null}
//         </div>
//         {extended
//           ?<div className="recent">
//           <p className="recent-title">Recent</p>

//       <div className="recent-entry">
//         <img src={assets.message_icon} alt="Message Icon" />
//         <p>What is React...</p>
//       </div>
//       </div>
//       :null
//         }
      
//       </div>

//       <div className="bottom">
       
//         <div className="bottom-item recent-entry">
//           <img src={assets.question_icon} alt="Help Icon" />
//           {extended?<p>Help</p>:null}
//         </div>

       
//         <div className="bottom-item recent-entry">
//           <img src={assets.history_icon} alt="History Icon" />
//           {extended?<p>Activity</p>:null}
//         </div>

       
//         <div className="bottom-item recent-entry">
//           <img src={assets.setting_icon} alt="Settings Icon" />
//           {extended?<p>Settings</p>:null}
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useContext, useState } from 'react';  // Make sure to import useState here
import './Sidebar.css';
import { assets } from '../../assets/assets';
import ContextProvider, { Context } from '../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const {onSent,prevPrompt,setRecentPrompt} = useContext(Context)

  const loadPrompt =async(prompt) =>{
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
        />

        <div onClick={()=>newChat()}  className="new-chat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item,index)=>{
            return(
              <div onClick={() => loadPrompt(item)} className="recent-entry">

                      <img src={assets.message_icon} alt="Message Icon" />
                      <p>{item.slice(0,18)}</p>
                    </div>)})}
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help Icon" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="History Icon" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
