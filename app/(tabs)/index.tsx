import React, { useState } from 'react';
import { View,Text, Pressable, StyleSheet} from 'react-native';

export default function App() {

  const [counter, setCounter] = useState(0);

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  const decreaseCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const resetCounter = () => {
    setCounter(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Counter App</Text>

        <Text style={styles.counter}>
          {counter}
        </Text>

        <Pressable
          style={styles.increaseButton}
          onPress={increaseCounter}
        >
          <Text style={styles.buttonText}>+ Increase</Text>
        </Pressable>

        <Pressable
          style={styles.decreaseButton}
          onPress={decreaseCounter}
        >
          <Text style={styles.buttonText}>- Decrease</Text>
        </Pressable>

        <Pressable
          style={styles.resetButton}
          onPress={resetCounter}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container2:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(255,255,255,0.5)',
    padding: 50,
    marginTop: 100,
    marginBottom: 100,
    borderRadius: 25
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'pink'
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  counter: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 30,
  },

    increaseButton: {
    backgroundColor: '#80ef80',
    padding: 15,
    width: 200,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },

  decreaseButton: {
    backgroundColor: '#ffee8c',
    padding: 15,
    width: 200,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },

  resetButton: {
    backgroundColor: '#ff746c',
    padding: 15,
    width: 200,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: '#1d1c1a',
    fontSize: 18,
    fontWeight: 'bold',
  },
});