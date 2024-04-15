Proyecto Desafio 02 -Aplicacion de pedidos de comida mexicana - README
Este proyecto consiste en una aplicación móvil para realizar pedidos de comida mexicana. La aplicación permite a los usuarios seleccionar diferentes platillos del menú, agregarlos al carrito de compras y 
completar la compra mediante un proceso de pago, por el momento el pago es simulado con fines educativos.

Características principales de la aplicación

Menú de Comidas: Los usuarios pueden explorar diferentes platillos de comida mexicana disponibles en el menú.

Carrito de Compras: Los usuarios pueden agregar varios platillos al carrito de compras y ver un resumen de la orden antes de realizar el pago.

Historial de Compras (Por el momento no funcional): La aplicación guarda un historial de las compras realizadas por los usuarios, incluyendo la fecha, 
el total y los detalles de cada compra.

Proceso de Pago: Por el momento no hay una forma de pago real.

Tecnologías utilizadas

React Native: El proyecto está desarrollado utilizando el framework React Native para la construcción de la interfaz de usuario de la aplicación móvil.

AsyncStorage: Se utiliza AsyncStorage, una API de almacenamiento persistente basada en clave-valor, para guardar el historial de compras localmente en el dispositivo del usuario.

FlatList: La componente FlatList de React Native se utiliza para mostrar listas de elementos, como el menú de comida y el historial de compras.

React Navigation: Se utiliza React Navigation para manejar la navegación entre las diferentes pantallas de la aplicación, como el menú, el carrito de compras, el resumen de la 
orden y el historial de compras.

Instalación y Uso
Clona este repositorio en tu máquina local.
Asegúrate de tener Node.js y npm instalados en tu sistema.
Navega al directorio del proyecto y ejecuta npm install para instalar las dependencias.
Ejecuta npm start para iniciar la aplicación. Esto abrirá Metro Bundler, desde donde podrás lanzar la aplicación en un emulador o dispositivo físico.
Contribuciones
Si deseas contribuir a este proyecto, ¡eres bienvenido! Siéntete libre de abrir un issue o enviar una solicitud de extracción con tus mejoras o correcciones.

Licencia
Este proyecto está bajo la Licencia MIT.
