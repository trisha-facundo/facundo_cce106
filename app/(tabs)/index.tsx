import { Image } from 'expo-image';
import { useState } from 'react';
import { Platform, StyleSheet , View, Text, ScrollView, TextInput, Alert, Pressable} from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [yearCourse, setYearCourse] = useState('');
  const [subject, setSubject] = useState('');
  const [code, setCode] = useState('');

  const [savedName, setSavedName] = useState('Trisha G. Facundo');
  const [savedYearCourse, setSavedYearCourse] = useState('3rd Year BSIT');
  const [savedSubject, setSavedSubject] = useState('CCE106');
  const [savedCode, setSavedCode] = useState('2013');

  const saveData = () => {
    if (
      !name.trim() ||
      !yearCourse.trim() ||
      !subject.trim() ||
      !code.trim()
    ) {
      Alert.alert(
        'Required Information',
        'Please fill in all the fields before saving.'
      );
      return;
    }
     setSavedName(name);
    setSavedYearCourse(yearCourse);
    setSavedSubject(subject);
    setSavedCode(code);

    Alert.alert(
      'Success',
      'Your information has been saved!'
    );
  };

  return (
    <View style={styles.background}>
      <View style={{ margin: 20 }}>

        <Text style={[styles.bee, styles.bee1]}>🐝</Text>
        <Text style={[styles.bee, styles.bee2]}>🐝</Text>
        <Text style={[styles.bee, styles.bee3]}>🐝</Text>
        <Text style={[styles.bee, styles.bee4]}>🐝</Text>
        <Text style={[styles.bee, styles.bee5]}>🐝</Text>

        <Text style={[styles.flower, styles.flower1]}>🌼</Text>
        <Text style={[styles.flower, styles.flower2]}>🌼</Text>

        <ScrollView>

          <Text style={styles.textHeader}>
            Personal Profile Screen
          </Text>

          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('@/assets/images/minecraft_bee.avif')}
              style={styles.beepic}
            />
          </View>

          <View style={styles.card3}>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.subHeading}>
                Student Information
              </Text>
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text style={styles.textLabel}>Full Name</Text>
              <Text style={styles.textInfo}>
                {savedName}
              </Text>
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text style={styles.textLabel}>Program</Text>
              <Text style={styles.textInfo}>
                {savedYearCourse}
              </Text>
            </View>

            <View style={{ marginBottom: 10 }}>
              <Text style={styles.textLabel}>Short Biography</Text>
              <Text style={styles.textInfo}>
                {savedSubject}
              </Text>
            </View>

            <View>
              <Text style={styles.textLabel}>Contact Information</Text>
              <Text style={styles.textInfo}>
                {savedCode}
              </Text>
            </View>
          </View>

          <View style={styles.card3}>

            <Text style={styles.subHeading}>
              Edit Information
            </Text>

            <View style={styles.container}>
              <TextInput
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </View>

            <View style={styles.container}>
              <TextInput
                placeholder="Enter your program"
                value={yearCourse}
                onChangeText={setYearCourse}
                style={styles.input}
              />
            </View>

            <View style={styles.container}>
              <TextInput
                placeholder="Enter your short biography"
                value={subject}
                onChangeText={setSubject}
                style={styles.input}
              />
            </View>

            <View style={styles.container}>
              <TextInput
                placeholder="Enter contact information"
                value={code}
                onChangeText={setCode}
                style={styles.input}
              />
            </View>

            <Pressable
              style={styles.saveButton}
              onPress={saveData}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>

          </View>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card :{
    backgroundColor: '#FFD95A',
    borderRadius: 30,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    marginTop:20
  },
  card2:{
    backgroundColor: '#ffeb9b',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    marginBottom: 0,
    marginTop:10
  },
  card3:{
    backgroundColor: '#ffff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 5,
    marginTop:10,
    shadowColor: '#C99A00',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },
  textHeader:{
    fontSize: 30,
    fontWeight: "bold",
    color: "#4A2C00",
    marginTop:5
  },
  normalText:{
    fontSize: 12,
    color: "#5C4100",
    lineHeight:15,
    marginTop:5,
    textAlign: "center",
  },
  subHeading:{
    fontSize:18,
    color: "#4A2C00",
    fontWeight:"bold",
  },
  textLabel:{
    fontSize:11,
    color: '#d3d3d3',
    fontWeight: '600',
  },
  textInfo:{
    fontSize: 15,
    color: '#4A2C00',
    fontWeight: '700',
    marginTop: 2,
  },
  beepic: {
    width: 190,
    height: 160,
    marginTop: 5,
    borderRadius:80,
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    
  },
  bee: {
    position: 'absolute',
    fontSize: 24,
    opacity: 0.35,
    zIndex: 0,
  },

  bee1: {
    top: 90,
    left: 12,
    transform: [{ rotate: '-15deg' }],
  },

  bee2: {
    top: 250,
    right: 8,
    transform: [{ rotate: '15deg' }],
  },

  bee3: {
    top: 470,
    left: 5,
    transform: [{ rotate: '10deg' }],
  },

  bee4: {
    top: 700,
    right: 10,
    transform: [{ rotate: '-10deg' }],
  },

  bee5: {
    top: 930,
    left: 15,
    transform: [{ rotate: '15deg' }],
  },

  flower: {
    position: 'absolute',
    fontSize: 25,
    opacity: 0.45,
    zIndex: 0,
  },

  flower1: {
    top: 160,
    right: 20,
  },

  flower2: {
    top: 580,
    left: 15,
  },
  container: {
    padding: 20,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#d3d3d3'
  },
  saveButton: {
  backgroundColor: '#FFD95A',
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  marginTop: 10,
},

saveButtonText: {
  color: '#4A2C00',
  fontSize: 16,
  fontWeight: 'bold',
},
});
