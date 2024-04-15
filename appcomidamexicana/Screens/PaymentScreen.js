import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, AsyncStorage } from 'react-native';

const OrderSummaryScreen = ({ route, navigation }) => {
  const { selectedItems } = route.params;

  const calculateTotal = () => {
    let total = 0;
    selectedItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  const groupItems = (items) => {
    const groupedItems = {};
    items.forEach((item) => {
      if (groupedItems[item.name]) {
        groupedItems[item.name].quantity += item.quantity;
      } else {
        groupedItems[item.name] = { ...item };
      }
    });
    return Object.values(groupedItems);
  };

  const savePurchaseHistory = async () => {
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

      // Navegar a la pantalla de confirmación de pago
      navigation.navigate('PaymentConfirmation', { selectedItems });
    } catch (error) {
      console.error('Error saving purchase history:', error);
    }
  };

  const groupedSelectedItems = groupItems(selectedItems);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de la Orden</Text>
      <FlatList
        data={groupedSelectedItems}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>Cantidad: {item.quantity}</Text>
            <Text style={styles.itemPrice}>Precio unitario: ${item.price.toFixed(2)}</Text>
            <Text style={styles.itemPrice}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.itemList}
      />
      <Text style={styles.total}>Total: ${calculateTotal()}</Text>
      <TouchableOpacity style={styles.button} onPress={savePurchaseHistory}>
        <Text style={styles.buttonText}>Realizar Pago</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemList: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#637E76',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderSummaryScreen;
