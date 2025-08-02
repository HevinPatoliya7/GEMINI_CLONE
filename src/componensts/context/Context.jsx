//  import { createContext } from "react";
//  import run from "../Config/gemini";


// export const Context = createContext();

// const ContextProvider =(props)=>{
    
//     const onSent = async (prompt) =>{
//         await run(prompt)
//     }

//     onSent("What is React JS")

//     return(
//         <Context.Provider value={contentValue}>
//             {props.children}
//         </Context.Provider>
//     )        
// }
// export default ContextProvider

// import { createContext, useState, useEffect } from "react";
// import run from "../Config/gemini";

// export const Context = createContext();

// const ContextProvider = (props) => {
//     const[contentValue, setContentValue] = useState(null); 
//     const[input,setInput] =useState("");
//     const[recentPrompt,setRecentPrompt] = useState("");
//     const[prevPrompt,setPrevPrompt] = useState([]);
//     const[showResult,setShowResult] = useState(false);
//     const[loading, setLoading] = useState(false);
//     const[resultData,setResultData] = useState("");

//     const onSent = async (prompt) => {
//         const response = await run(input);
//         setContentValue(response);
//         //await run(input); 
//     };

//     const contextValue ={
//         prevPrompt,
//         setPrevPrompt,
//         onSent,
//         setRecentPrompt,
//         recentPrompt,
//         showResult,
//         loading,
//         resultData,
//         input,
//         setInput
//     }     

//     return (
//         <Context.Provider value={contentValue}>
//             {props.children}
//         </Context.Provider>
//     );
// };

// export default ContextProvider;


import { createContext, useState, useEffect } from "react";
import run from "../Config/gemini";

// Create the context
export const Context = createContext();

const ContextProvider = (props) => {
  // Define states
  const [input, setInput] = useState(""); // User input
  const [recentPrompt, setRecentPrompt] = useState(""); // Previous prompt
  const [prevPrompt, setPrevPrompt] = useState([]); // Array of previous prompts
  const [showResult, setShowResult] = useState(false); // Result visibility
  const [loading, setLoading] = useState(false); // Loading state
  const [resultData, setResultData] = useState(""); // Result data

  const delayPara =(index,netWord) =>{
      setTimeout(function(){
        setResultData(prev=>prev+netWord);
      },75*index)
  }

  const newChat =() =>{
    setLoading(false)
    setShowResult(false)
  }

  // Function to handle the sending of the prompt
  const onSent = async (prompt) => {
    // setLoading(true); // Set loading to true while awaiting the response
    // const response = await run(prompt); // Assuming run function handles API call
    // setResultData(response); // Set the result data
    // setShowResult(true); // Show the result
    // setRecentPrompt(prompt); // Store the most recent prompt
    // setPrevPrompt((prev) => [...prev, prompt]); // Store previous prompts
    // setLoading(true); // Set loading to false once the response is received
    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response;
    if(prompt !== undefined)
    {
      response = await run(prompt)
      setRecentPrompt(prompt) 
    }
    else
    {
        setPrevPrompt(prev=>[...prev,input])
        setRecentPrompt(input)
        response = await run(input)
    }
  
    let responseArray = response.split("**");
    let newResponse ="";
    for(let i=0;i < responseArray.length;i++)
    {
      if(i === 0 || i%2 !== 1)
      {
        newResponse += responseArray[i];  
      }
      else
      {
        newResponse += "<b>"+responseArray[i]+"</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>")
    let newResponseArray = newResponse2.split(" ");
   for(let i=0; i<newResponseArray.length; i++)
   {
      const netWords = newResponseArray[i];
      delayPara(i,netWords+"  ")
   }
    setLoading(false)
    setInput("")

  };
  // Define the context value to be passed to the Provider
  const contextValue = {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    prevPrompt,
    setPrevPrompt,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children} {/* Render the child components */}
    </Context.Provider>
  );
};

export default ContextProvider;
