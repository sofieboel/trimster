import * as React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { getAuth, signOut } from "firebase/auth";


/* handleLogout er en firebase  metode, som bruges til at logge en bruger ud */
function FrisørProfil () {

    const auth = getAuth();
    const user = auth.currentUser

    const handleLogOut = async () => {
        /* signOut logger selve brugeren ud */
        await signOut(auth).then(() => {
            /* Så er brugeren logget ud*/
          }).catch((error) => {
            /* Ellers vil der blive kastet en fejl */
          });
    };


/* Dette if statement tjekker om der er en bruger i det nuværende 'auth' object, og hvis ikke
teksten 'not found' køres*/
    if (!auth.currentUser) {
        return <View><Text>Not found</Text></View>;
    }

/* Inde i return bruges en anden firebase metode, som viser emailadressen på den bruger der er 
logget ind*/
    return (
        <View style={styles.container} >
            <Text>Current user: {user.email}</Text>
            {/* Her laver jeg en knap, hvor jeg kalder handleLogOut funktionen */}
            <Button onPress={() => handleLogOut()} title="Log ud" />
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: '5%',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
});

/* Eksporter FrisørProfil, så den kan importeres i app.js */
export default FrisørProfil

