import axios from "axios";
import { LOGIN, REGISTER, TODO_LIST, ADD_TODO, MARK_TODO, DELETE_TODO } from "./apiUrls";

const getToken =  () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    const token = user?.token ?? ""; 
    return token;
  };

export const login = async (data)=>{
    return await axios.post(LOGIN,data);
}

export const register = async (data)=>{
    return await axios.post(REGISTER,data);
}

export const getTodoList = async ()=>{
    return await axios.get(TODO_LIST,{
        headers: {
          'auth': getToken()
        }
      });
}

export const createTodo = async (formData)=>{
    return await axios.post(ADD_TODO,formData,{
        headers: {
          'auth': getToken()
        },
      });
}

export const markTodo = async (formData)=>{
    return await axios.post(MARK_TODO,formData,{
        headers: {
          'auth': getToken()
        },
      });
}

export const deleteTodo = async (formData)=>{
    return await axios.post(DELETE_TODO,formData,{
        headers: {
          'auth': getToken()
        },
      });
}