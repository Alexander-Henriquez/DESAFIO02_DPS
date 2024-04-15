import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, AsyncStorage, StyleSheet } from 'react-native';




const PurchaseHistoryScreen = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('PurchaseHistory');
        if (history) {
          setPurchaseHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    fetchPurchaseHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Compras</Text>
      {purchaseHistory.length > 0 ? (
        <FlatList
          data={purchaseHistory}
          renderItem={({ item }) => (
            <View style={styles.purchaseItem}>
              <Text>{/* Mostrar detalles de la compra */}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.emptyText}>No hay historial de compras.</Text>
      )}
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
  purchaseItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PurchaseHistoryScreen;


