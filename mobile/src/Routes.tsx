import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Login } from './screens/Login'
import { ParticipantSignUp } from './screens/ParticipantSignUp'
import { InstitutionSignUp } from './screens/InstitutionSignUp'
import { ManageEvents } from '@screens/ManageEvents'
import { CreateEvent } from '@screens/CreateEvent'
import { trpc } from '@shared/services/trpc'
import { EventsList } from '@screens/EventsList'
import { DetailEvent } from '@screens/DetailEvent'

const Stack = createNativeStackNavigator()

export function Routes() {
  const { data: user, error } = trpc.users.me.useQuery(undefined, {
    retry: false,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {(!user || error?.data?.code === 'UNAUTHORIZED') && (
          <>
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
          </>
        )}

        {user?.type === 'INSTITUTION' && (
          <>
            <Stack.Screen
              name="ManageEvents"
              component={ManageEvents}
            />

            <Stack.Screen
              name="CreateEvent"
              component={CreateEvent}
            />
          </>
        )}

        {user?.type === 'PARTICIPANT' && (
          <>
            <Stack.Screen
              name="EventsList"
              component={EventsList}
            />

            <Stack.Screen
              name="DetailEvent"
              component={DetailEvent}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}