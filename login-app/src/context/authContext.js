import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase';

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext)
    if(!context) throw new Error ('There is not auth provider')
    return context
}

export function AuthProvider ({children}) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

      const signup = (email, password) => 
        createUserWithEmailAndPassword(auth, email, password); //envia mis datos a firebase

      const login = (email, password) => 
        signInWithEmailAndPassword(auth, email, password);   //comprueba si el usuario está en nuestra base de datos
      
      const logout = () => signOut(auth)

      const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
      }

      useEffect(()=> {
        const unsuscribe = onAuthStateChanged(auth, currentUser =>{
            //console.log(currentUser)
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsuscribe();
      },[])
    return (
        <authContext.Provider value={{signup, login, user, logout, loading, loginWithGoogle}}>
            {children}
        </authContext.Provider>
    )
}