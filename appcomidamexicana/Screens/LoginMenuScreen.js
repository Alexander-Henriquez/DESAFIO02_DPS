import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'usuario' && password === 'contrasena') {
      navigation.navigate('Menu');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Menu');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Only {'\n'}Mexican {'\n'}Food</Text>
      <Image source={require('../assets/mexicano.png')} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log-in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Omitir por ahora</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C69774',
  },
  title: {
    color:"#FFF",
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: "#fff",
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#637E76',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 25,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  skipButton: {
    width: '80%',
    height: 40,
    borderRadius: 20,
    backgroundColor: '#637E76',
    padding: 10,
    marginTop: 10,
  },
  skipButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default LoginScreen;


