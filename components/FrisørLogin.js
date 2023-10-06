import { Button, Text, View, TextInput, StyleSheet} from 'react-native';

/* Importerer de moduler jeg skal bruge fra firebase (authentication og createUser) */
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

/* Importerer usestate, som gør det muligt at tilføje en 'state variabler' til en komponent, 
altså fx email og password */
import React, { useState} from 'react';

/*Opretter min login komponent og konstanter til de statevariabler, som jeg skal bruge 
til Signup formen (blandt andet email og password)*/
function FrisørLogin() {

const auth = getAuth();

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [isCompleted, setCompleted] = useState(false)
const [errorMessage, setErrorMessage] = useState(null)

/* Laver en knap, hvor jeg bruger onpress til at kalde  metoden, som skal
 aktivere oprettelse af brugeren */
const LoginKnap = () => {
    return <Button onPress={() => handleSubmit()} title="Login" />;
};

/* Opretter derefter en handlesubmit som skal aktivere brugereoprettelsen i min firebase database.
 */
    const handleSubmit = async () => {
    /* signInWithEmailAndPassword er en funktion fra firebase 'bibliotek', som
    som bruges til at logge en bruger ind med email og password */
        await signInWithEmailAndPassword(auth, email, password)
    /* Hvis login er 'godkendt' vil den specifikke brugers information blive sat til 'user',
    og vil blive logget ind */
        .then((userCredential) => {
            const user = userCredential.user;  
        })
    /* Hvis ikke oprettelsen er succesfuld vil en fejlmeddelse blive kørt */
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        });
    }

    /* I return laver jeg inputfelter til email og password*/
    return (
        <View>
            <Text style={styles.header}>Login</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password) }
                secureTextEntry
                style={styles.inputField}
            />
            {/* Brugeren får en fejl meddelelse hvis de lader et af felterne stå tomme*/}
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {/* Kalder den knap jeg har lavet ovenstående */}
            {LoginKnap()}
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

/* Eksporterer til sidst FrisørLogin, så den kan importeres i app.js */
export default FrisørLogin