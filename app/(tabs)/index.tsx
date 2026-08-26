import { Image } from 'expo-image';
import { Platform, StyleSheet , View, Text} from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    
      
    <View style={styles.background}>
      <View style={{margin:20}}>
        <Text style={[styles.bee, styles.bee1]}>🐝</Text>
        <Text style={[styles.bee, styles.bee2]}>🐝</Text>
        <Text style={[styles.bee, styles.bee3]}>🐝</Text>
        <Text style={[styles.bee, styles.bee4]}>🐝</Text>
        <Text style={[styles.bee, styles.bee5]}>🐝</Text>
        <Text style={[styles.flower, styles.flower1]}>🌼</Text>
        <Text style={[styles.flower, styles.flower2]}>🌼</Text>

        <View style={styles.card}>
          <Image
            source={require('@/assets/images/minecraft_bee.avif')}
            style={styles.beepic}
          />

            <Text style={styles.textHeader}> Bee Bot</Text>
            <Text style={styles.normalText}>An automated bot that can detect damages of your laptop inside and out.</Text>
        </View>

        <Text style={styles.subHeading}>Features</Text>
        <View style={styles.card2}>
          <Text>Smart AI Asssistant</Text>
        </View>
        <View style={styles.card2}>
          <Text>Friendly User Interface</Text>
        </View>

        <View style={styles.card3}>
          <View style={{marginBottom:10}}><Text style={styles.subHeading}>Student Information</Text></View>
          <View style={{marginBottom:10}}>
            <Text style={styles.textLabel}>Name</Text>
            <Text style={styles.textInfo}>Trisha G. Facundo</Text>
          </View>
          <View style={{marginBottom:10}}>
            <Text style={styles.textLabel}>Year & Course</Text>
            <Text style={styles.textInfo}>3rd Year BSIT</Text>
          </View>
          <View style={{marginBottom:10}}>
            <Text style={styles.textLabel}>Subject</Text>
            <Text style={styles.textInfo}>CCE106</Text>
          </View>
          <View>
            <Text style={styles.textLabel}>Code</Text>
            <Text style={styles.textInfo}>2013</Text>
          </View>
          
        </View>
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
    color: '#A08B66',
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
    borderRadius:10,
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
});
