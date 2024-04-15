import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PaymentConfirmationScreen = ({ navigation }) => {
  useEffect(() => {
    // Limpiar elementos seleccionados después de un cierto tiempo (por ejemplo, 2 segundos)
    const timer = setTimeout(() => {
      navigation.reset({              
        index: 0,
        routes: [{ name: 'Menu' }]    // Redirigir de vuelta al menú después de limpiar
      });
    }, 1000);  // Esperar 2 segundos antes de limpiar

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Pago Exitoso!</Text>
      <Text style={styles.message}>Gracias por tu compra.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
  },
});

export default PaymentConfirmationScreen;

