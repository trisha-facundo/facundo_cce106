import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity, StyleSheet,} from 'react-native';

export default function App() {

  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');

  const [result, setResult] = useState('');

  const calculate = (operator: string) => {

    if (num1 === '' || num2 === '') {
      setResult('Please enter both numbers.');
      return;
    }

    const number1 = Number(num1);
    const number2 = Number(num2);

    if (isNaN(number1) || isNaN(number2)) {
      setResult('Please enter valid numbers.');
      return;
    }

    if (operator === '+') {
      setResult(String(number1 + number2));
    }

    // Subtraction
    else if (operator === '-') {
      setResult(String(number1 - number2));
    }

    else if (operator === '*') {
      setResult(String(number1 * number2));
    }

    else if (operator === '/') {

      if (number2 === 0) {
        setResult('Cannot divide by zero.');
        return;
      }

      setResult(String(number1 / number2));
    }
  };

  const clearCalculator = () => {
    setNum1('');
    setNum2('');
    setResult('');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Simple Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />

      <View style={styles.buttonRow}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('+')}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('-')}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('*')}
        >
          <Text style={styles.buttonText}>×</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('/')}
        >
          <Text style={styles.buttonText}>÷</Text>
        </TouchableOpacity>

      </View>

      <Text style={styles.result}>
        Result: {result}
      </Text>

      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearCalculator}
      >
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#d1eee4',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 15,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  button: {
    backgroundColor: '#469af3',
    padding: 18,
    borderRadius: 8,
    width: '22%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  result: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold',
    color: 'green'
  },

  clearButton: {
    backgroundColor: 'rgb(211, 80, 80)',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },

  clearText: {
    color: '#fff9f9',
    fontSize: 20,
  },
});