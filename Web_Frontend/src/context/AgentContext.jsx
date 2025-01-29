import { createContext,useContext,useState } from "react";
import { BskyAgent } from "@atproto/api";


export const AgentContext = createContext();

export const useAgentContext = () => {
  return useContext(AgentContext);
}

export const AgentContextProvider = ({children}) => {
  const agent = new BskyAgent({
    service: "https://bsky.social",
  });

  const connect = async (username, password) => {
    return agent.login({
      identifier: username,
      password: password,
    });
  };

  const isLoggedin_BlueSky = () => {
    return agent.session !== null && agent.session !== undefined;
  };
  console.log(agent);
  
  return <AgentContext.Provider value={{agent,connect,isLoggedin_BlueSky}}>
    {children}
    </AgentContext.Provider>;
}