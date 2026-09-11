/*WALA KO KABALO UNSA NI HAHAHAH GI GPT RA NAKO NI */

import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function User() {

  const { id } = useLocalSearchParams();

  return (
    <Text>
      User: {id}
    </Text>
  );
}
