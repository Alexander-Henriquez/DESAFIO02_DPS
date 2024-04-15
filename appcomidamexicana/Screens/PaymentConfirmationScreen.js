import React, { useEffect } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';

const PaymentConfirmationScreen = ({ route, navigation }) => {
  useEffect(() => {
    const { selectedItems } = route.params || {}; // Obtener los elementos seleccionados de las props de ruta

    // Guardar los datos de la compra en AsyncStorage si los elementos seleccionados están definidos
    if (selectedItems) {
      savePurchaseHistory(selectedItems); // Llamar a la función para guardar el historial de compras
    }

    // Limpiar elementos seleccionados después de un cierto tiempo (por ejemplo, 2 segundos)
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Menu' }] // Redirigir de vuelta al menú después de limpiar
      });
    }, 1000); // Esperar 2 segundos antes de limpiar

    return () => clearTimeout(timer);
  }, [route.params, navigation]);

  const savePurchaseHistory = async (selectedItems) => {
    try {
      // Obtener el historial de compras existente de AsyncStorage
      const history = await AsyncStorage.getItem('purchaseHistory');
      const existingHistory = history ? JSON.parse(history) : [];

      // Crear un nuevo registro de compra
      const newPurchase = {
        date: new Date().toISOString(), // Fecha actual
        total: calculateTotal(selectedItems), // Calcular el total de la compra
        items: selectedItems, // Elementos seleccionados
      };

      // Agregar el nuevo registro al historial de compras existente
      const updatedHistory = [...existingHistory, newPurchase];

      // Guardar el historial de compras actualizado en AsyncStorage
      await AsyncStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));

    } catch (error) {
      console.error('Error saving purchase history:', error);
    }
  };

  const calculateTotal = (selectedItems) => {
    let total = 0;
    selectedItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

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
