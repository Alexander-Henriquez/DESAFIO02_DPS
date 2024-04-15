import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginMenuScreen';
import MenuScreen from './Screens/MenuScreen';
import OrderSummaryScreen from './Screens/OrderSummaryScreen'; 
import PaymentScreen from './Screens/PaymentScreen';
import PurchaseHistoryScreen from './Screens/PurchaseHistoryScreen';
import PaymentConfirmationScreen from './Screens/PaymentConfirmationScreen'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Inicio de Sesión' }} />
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Menú' }} />
        <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} options={{ title: 'Resumen de Orden' }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Pago de la Orden' }} />
        <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} options={{ title: 'Confirmación de Pago' }} />

        <Stack.Screen name="PurchaseHistory" component={PurchaseHistoryScreen} options={{ title: 'Historial de Compras' }} />
        {}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



