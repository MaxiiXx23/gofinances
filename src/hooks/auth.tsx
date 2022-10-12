import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import uuid from "react-native-uuid"; 

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

import { LoadingIndicator } from "../components/LoadingIndicator";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

const userStorageKey = "@gofinances:user";


interface AuthProviderProps {
    children: ReactNode
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface IAuthContextData {
    user: User;
    signInWhithGoogle(): Promise<void>;
    singInWhithApple(): Promise<void>;
    signOut(): Promise<void>;
    userStorageLoading: boolean;
}

interface AuthorizationResponse{
    params:{
        access_token: string;

    };
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);

    async function signInWhithGoogle() {
        try {
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params} = await AuthSession.startAsync({
                authUrl,
            }) as AuthorizationResponse;

            if(type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();

                const userLogged = {
                    id: userInfo.id,
                    name: userInfo.given_name,
                    email: userInfo.email,
                    photo: userInfo.picture,
                }

                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
            }

        } catch (error) {
            const { message } = error as Error;
            throw new Error(message)
        }
    }

    async function singInWhithApple(){
        try{
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });

              if(credential){

                const name = credential.fullName!.givenName!;
                const photo = `https://ui-avatars.com/api/?name=${name}&length=1`
                const userLogged = {
                    id: String(uuid.v4()),
                    name,
                    email: credential.email!,
                    photo,
                }
                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
              }
              

        }catch(error){
            const { message } = error as Error;
            console.log(error);
            throw new Error(message);
        }
    }

    async function loadStorageDate(): Promise<void>{
        const userStorage = await AsyncStorage.getItem(userStorageKey);

        if(userStorage){
            const userLogged = JSON.parse(userStorage) as User;
            setUser(userLogged);
        }

        setUserStorageLoading(false);

    }

    async function signOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(userStorageKey);

    }

    useEffect(()=>{
        loadStorageDate();
    },[])

    return (
        <AuthContext.Provider value={{
            user,
            signInWhithGoogle,
            singInWhithApple,
            signOut,
            userStorageLoading
        }}>
            {
                userStorageLoading 
                ? <LoadingIndicator />
                : children
            }
        </AuthContext.Provider>
    )
}

// hook personalizado

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };