import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

/* Importerer de services jeg skal bruge fra firebase */
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Card } from 'react-native-paper';

/* Importerer mine komponenter */
import FrisørSignup from './components/FrisørSignup';
import FrisørLogin from './components/FrisørLogin';
import FrisørProfil from './components/FrisørProfil';

/* Importerer stack funktioner
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './components/stackcomponents/Settings'; */

// const Stack = createStackNavigator();

/* Her laver jeg en database konfiguration*/
const firebaseConfig = {
  apiKey: "AIzaSyDtmy7c2hr1j8wJW7gd1pIxzdVeZnq2neM",
  authDomain: "trimster-bfe45.firebaseapp.com",
  projectId: "trimster-bfe45",
  storageBucket: "trimster-bfe45.appspot.com",
  messagingSenderId: "142381384729",
  appId: "1:142381384729:web:091063a009eef77f469688"
};


export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

/* Her afprøver jeg om en firebase app allerede er initialiseret og hvis ikke, vil den console
logge firebase on i terminalen, så jeg ved at den kører */
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log("Firebase On!");
  } else {
    console.log("Firebase not on!");
  }

/* Herunder benytter jeg firebase metode til at monitorere hvorvidt en bruger er aktiv */
  const auth = getAuth();

  function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      {/* Hvis brugeren er aktiv vil loggedIn være true og der vil console logges
      'Du er nu logget ind. Hvis ikke vil loggedIn være false og brugeren vil ikke
      være logget ind */}
      if (user) {
        const uid = user.uid;
        callback({loggedIn: true, user: user});
        console.log("Du er nu logget ind!");
      } else {
        callback({loggedIn: false});
      }
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const Hjem = () => {
    return(
        <View style={styles.container}>
          {/* I nedenstående tekst komponent har jeg tilføjet et header objekt, så jeg kunne
          style overskriftens farve og størrelse nede i styles nederst på siden  */}
          <Text style={styles.header}>
            Trimster
          </Text>
          {/* Disse cards bruges til at komme indholdet fra signup og login i en separat 'boks', 
          så det bliver adskilt og mere overskueligt at se på */}
          <Card style={{padding:20, margin: 20}}>
            <FrisørSignup />
          </Card>
          
          <Card style={{padding:20, margin: 20}}>
            <FrisørLogin />
          </Card>

        </View>
    )
  }
  /* Hvis brugeren er aktiv vil de blive omdirigeret til frisørprofil siden, og hvis ikke
  vil de blive sendt tilbage til 'Hjem' siden, hvor login og signup formen findes */
  return user.loggedIn ? <FrisørProfil /> : <Hjem/> ;

/* Her tjekker vi om brugeren er logget ind, og hvis ja, vil de blive sendt til FrisørProfil,
og hvis ikke, vil de blive sendt tilbage til Hjem */
  /* return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={FrisørProfil} />
        <Stack.Screen name="Profile" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );*/

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
     fontSize: 30,
     color:`#00008b`
  }
})
