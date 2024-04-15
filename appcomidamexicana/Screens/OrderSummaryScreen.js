import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importación de AsyncStorage

const OrderSummaryScreen = ({ route, navigation }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Función para calcular el total de la orden
  const calculateTotal = () => {
    let total = 0;
    selectedItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  // Función para agrupar elementos del mismo tipo y calcular su cantidad total
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

  // Función para limpiar los elementos seleccionados
  const clearSelectedItems = () => {
    setSelectedItems([]);
    navigation.navigate('PaymentConfirmation');
  };

  useEffect(() => {
    // Limpiar selectedItems cada vez que se monta la pantalla
    setSelectedItems(route.params.selectedItems || []);
  }, [route.params.selectedItems]);

  // Agrupamos los elementos seleccionados
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
      <TouchableOpacity
        style={styles.button}
        onPress={clearSelectedItems}
      >
        <Text style={styles.buttonText}>Realizar Pago</Text>
      </TouchableOpacity>
    </View>
  );
};

// Función para guardar el historial de compras en AsyncStorage
const savePurchaseHistory = async (history) => {
  try {
    await AsyncStorage.getItem('PurchaseHistory', JSON.stringify(history));
    console.log('Purchase history saved successfully.');
  } catch (error) {
    console.error('Error saving purchase history:', error);
  }
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




