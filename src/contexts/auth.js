import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigation = useNavigation();

    useEffect(()=>{
        async function loadStorage(){

            const storageUser = await AsyncStorage.getItem(`@finToken`)
            if (storageUser){
                const response = api.get('/me',{
                    headers:{
                        'Authorization': `Bearer ${storageUser}`
                    }
                })
                .catch(()=>{
                    setUser(null)
                })

                api.defaults.headers['Authorization'] = `Bearer ${token}`
                setUser(response.data)
                
            }

            setLoading(false)
        }

        loadStorage()
    })


    async function signUp(name, email, password){
       try {
        setLoadingAuth(true)
        const response = await api.post('/users',{
            name: name,
            email: email,
            password: password
        })
        setLoadingAuth(false)
        navigation.goBack();
       } catch (error) {
            console.log("Error to signup: ", error)
            setLoadingAuth(false)
       } 
        
    }

    async function signIn(email, password){
        setLoadingAuth(true);

        try {
            const response = await api.post('/login', {
                email,
                password
            })

            const {id, name, token } = response.data;

            const data = {
                id,
                name,
                email,
                token
            }
            await AsyncStorage.setItem(`@finToken`, token)
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email
            })

            setLoadingAuth(false)
        } catch (error) {
            console.log('Erro', error);
            setLoadingAuth(false)
        }
    }
    
    return(
        <AuthContext.Provider value={{ 
                signed: !!user,  
                user, 
                signUp, 
                signIn, 
                loadingAuth,
                loading
            }}>

            {children}
        </AuthContext.Provider> 
    )
}

export default AuthProvider