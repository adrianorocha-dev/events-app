import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Login } from './screens/Login'
import { ParticipantSignUp } from './screens/ParticipantSignUp'
import { InstitutionSignUp } from './screens/InstitutionSignUp'
import { ManageEvents } from '@screens/ManageEvents'
import { CreateEvent } from '@screens/CreateEvent'

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

        <Stack.Screen
          name="ManageEvents"
          component={ManageEvents}
        />

        <Stack.Screen
          name="CreateEvent"
          component={CreateEvent}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}