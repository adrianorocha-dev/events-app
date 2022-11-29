import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { InstitutionSignUp } from './screens/InstitutionSignUp'

import { Login } from './screens/Login'
import { ParticipantSignUp } from './screens/ParticipantSignUp'

const Stack = createNativeStackNavigator()

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
        />

        <Stack.Screen
          name="ParticipantSignUp"
          component={ParticipantSignUp}
        />

        <Stack.Screen
          name="InstitutionSignUp"
          component={InstitutionSignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}