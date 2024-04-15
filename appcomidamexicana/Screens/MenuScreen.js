import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

import { Icon } from 'react-native-elements';

const MenuScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Tacos de Birria', price: 8, image: 'https://www.goya.com/media/7912/birria-tacos.jpg?quality=80' },
    { id: 2, name: 'Burrito de Res', price: 10, image: 'https://images.hola.com/imagenes/cocina/recetas/20191015151658/burrito-pollo-verduras/0-733-361/burrito-pollo-m.jpg' },
    { id: 3, name: 'Quesadillas', price: 6, image: 'https://cdn.recetasderechupete.com/wp-content/uploads/2021/05/Quesadillas-de-pollo.jpg' },
    { id: 4, name: 'Tortilla con Guacamole', price: 7, image: 'https://www.twopeasandtheirpod.com/wp-content/uploads/2020/01/Guacamole-2.jpg' },
    { id: 5, name: 'Sopa de tortilla ', price: 10, image: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2018/11/receta-sopa-de-tortilla-para-40-personas.jpg' },
    { id: 6, name: 'Torta Mixta', price: 8, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Torta_Cubana.jpg/800px-Torta_Cubana.jpg' },
    { id: 7, name: 'Gringas de birria', price: 7, image: 'https://cookingwithcocktailrings.com/wp-content/uploads/2021/11/Birria-Tacos-114-500x500.jpg' },
    { id: 8, name: 'Tequila', price: 5, image: 'https://www.gob.mx/cms/uploads/article/main_image/112637/tequila_con_limon.jpg' },
    { id: 9, name: ' Horchata', price: 3, image: 'https://bellyfull.net/wp-content/uploads/2022/04/Horchata-blog-3.jpg' },
    { id: 10, name: 'Michelada', price: 8, image: 'https://imag.bonviveur.com/foto-de-portada-del-coctel-michelada.jpg' },
  ]);

  // Estado para mantener un registro de los elementos seleccionados por el usuario
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // Función para agregar un elemento seleccionado al carrito
  const addToCart = (item, quantity) => {
    setSelectedItems([...selectedItems, { ...item, quantity }]);
    setShowAlert(true); // Mostrar el aviso cuando se agrega un artículo al carrito
    // Ocultar el aviso después de 2 segundos
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  // Función para mostrar el resumen de la orden
  const showOrderSummary = () => {
    navigation.navigate('OrderSummary', { selectedItems });
  };

  // Función para navegar a la pantalla de historial de compras
  const goToPurchaseHistory = () => {
    navigation.navigate('PurchaseHistory');
  };

  // Función para renderizar cada elemento del menú
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item, 1)}>
        <Text style={styles.addButtonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );

   return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a nuestro menú!  ¿Qué se te antoja hoy?😋</Text>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.menuList}
      />
      {showAlert && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>¡Agregado al carrito correctamente!</Text>
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={showOrderSummary}>
          <Icon name="shopping-bag" type="material" color="#C69774" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={goToPurchaseHistory}>
          <Icon name="history" type="material" color="#C69774" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  menuList: {
    paddingHorizontal: 5,
  },
  card: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#637E76',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton:{
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  alertContainer: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    zIndex: 1,
  },
  alertText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MenuScreen;

