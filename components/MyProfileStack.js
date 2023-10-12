import * as React from "react";
import MyProfile from "./components/stackcomponents/MyProfile";
import MySettings from "./components/stackcomponents/MySettings";
import { createStackNavigator } from '@react-navigation/stack';

//Her instantieres en StackNavigator.
const Stack = createStackNavigator()

/*
* I return() placeres en Stack.Navigator komponent, som i 'initialRoutName' henviser til DetailsScreen.
* Dernæst fastsættes tre Screens i Stacken. Disse er DetailsScreen, ScreenOne og ScreenTwo
* Hver Screen har individuel Styling qf den fremviste header.
 */
function MyProfileStack() {
    return (
        <Stack.Navigator
            initialRouteName="Details"
        >
            <Stack.Screen name="Details" component={MyProfile}
                          options={{
                              headerTitleAlign: 'center',
                              headerTitleStyle: {color: 'white'},
                              headerStyle: {backgroundColor: '#ba6262'}}
                          }
            />
            <Stack.Screen name="ScreenOne" component={MySettings} options={{
                headerTitleStyle: { textAlign: 'right', color: 'white' },
                headerStyle: {backgroundColor: '#62bab5'}
            }} />
        </Stack.Navigator>
    )
}

//Eksport af den funktionelle komponent, således den kan importeres i andre komponenter
export default MyProfileStack