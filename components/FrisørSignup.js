import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

// Importerer de moduler jeg skal bruge fra firebase (authentication og createUser)
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

/* Importerer usestate, som gør det muligt at tilføje en 'state' til en komponent, som
som jeg skal bruge til Signupformen ??? */
import React, { useState } from 'react';

/*Opretter min signup komponent ogkonstanter til de statevariabler, som jeg skal bruge 
til Signup formen (blandt andet email og password)*/
function FrisørSignup() {

const auth = getAuth()

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [isCompleted, setCompleted] = useState(false)
const [errorMessage, setErrorMessage] = useState(null)



/* Laver en knap, hvor jeg bruger onpress til at kalde  metoden, som skal
 aktivere oprettelse af brugeren */
const opretKnap = () => {
    return <Button onPress={() => handleSubmit()} title="Opret" />;
};

/* Opretter derefter en handlesubmit som skal aktivere brugereoprettelsen i min firebase database.
 */
const handleSubmit = async() => {
    /* createUserWithEmailAndPassword er en funktion fra firebase 'bibliotek', som
    som bruges til at oprette en ny bruger med email og password */
    await createUserWithEmailAndPassword(auth, email, password)
    /* Hvis oprettelsen er 'godkendt' vil der bliver oprettet en ny bruger med de informationer,
    som brugeren har indtastet */
    .then((userCredential) => {
      const user = userCredential.user;
    })
    /* Hvis ikke oprettelsen er succesfuld vil en fejlmeddelse blive kørt */
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorMessage)
    });
  }

/* I return laver jeg inputfelter til email og password*/
    return (
        <View>
            <Text style={styles.header}>Opret Bruger</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry
                style={styles.inputField}
            /> 
            {/* Brugeren får en fejl meddelelse hvis de lader et af felterne stå tomme*/}
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {/* Kalder den knap jeg har lavet ovenstående */}
            {opretKnap()} 
        </View>
    );
}

const styles = StyleSheet.create({
  error: {
      color: 'red',
  },
  inputField: {
      borderWidth: 2,
      margin: 10,
      padding: 5,
      width: 250
  },
  header: {
      fontSize: 20,
      color:`#00008b`
  },
});

/* Eksporterer til sidst FrisørSignup, så den kan importeres i app.js */
  export default FrisørSignup
  