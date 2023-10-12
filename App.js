import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Importerer de services jeg skal bruge fra firebase */
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Card } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


/* Importerer mine komponenter */
import FrisørSignup from './components/FrisørSignup';
import FrisørLogin from './components/FrisørLogin';
import FrisørProfil from './components/FrisørProfil';
import MyProfileStack from './components/MyProfileStack';
import HomeScreen from './components/HomeScreen';


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


const Tab = createBottomTabNavigator();
const homeScreenText = "Dette er HomeScreen!"
const settingsScreenText = "Dette er SettingsScreen!"

  const LoggedInScreen = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [
        {
          display: "flex"
        },
          null
          ],
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Home') {
              return (
                  <Ionicons
                      name={'home-outline'}
                      size={size}
                      color={color}
                  />
              );
            } else if (route.name === 'Settings') {
              return (
                  <Ionicons
                      name='md-settings-outline'
                      size={size}
                      color={color}
                  />
              );
            }
            else{
              return (
                  <Ionicons
                      name='md-list-outline'
                      size={size}
                      color={color}
                  />
              );
            }
          },
        })}
        >
          <Tab.Screen name="Settings" children={()=><FrisørProfil prop={settingsScreenText}/>} />
          <Tab.Screen name="Home" children={()=><HomeScreen prop={homeScreenText}/>} />
          <Tab.Screen name="Stack" component={MyProfileStack} />
        </Tab.Navigator>
      </NavigationContainer>
  );  
  }
  
  const DefaultPage = () => {
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
  vil de blive sendt tilbage til 'DefaultPage' siden, hvor login og signup formen findes */
  return user.loggedIn ? <LoggedInScreen /> : <DefaultPage/> ;
  // return <LoggedInScreen/>
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
