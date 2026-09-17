import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type Status = 'Present' | 'Absent' | null;

type Student = {
  id: string;
  name: string;
  status: Status;
};

const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: 'Allen Bucayong', status: null },
  { id: '2', name: 'Trisha Facundo', status: null },
  { id: '3', name: 'Karl Jun Calizar', status: null },
  { id: '4', name: 'Zhianne May', status: null },
  { id: '5', name: 'Joyce Jayagan', status: null },
  { id: '6', name: 'Desiree Alindajao', status: null },
];

export default function App() {

  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  const presentCount = students.filter((s) => s.status === 'Present').length;
  const absentCount = students.filter((s) => s.status === 'Absent').length;
  const summary = `Present: ${presentCount}   Absent: ${absentCount}`;

  useEffect(() => {

    console.log(`Attendance updated — ${summary}`);

  }, [students, summary]);

  const markStatus = (id: string, status: Status) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const renderItem = ({ item }: { item: Student }) => (
    <View style={styles.row}>

      <Text style={styles.name}>{item.name}</Text>

      <View style={styles.buttonGroup}>

        <TouchableOpacity
          style={[
            styles.statusButton,
            styles.presentButton,
            item.status === 'Present' && styles.selectedButton,
          ]}
          onPress={() => markStatus(item.id, 'Present')}
        >
          <Text style={styles.buttonText}>Present</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.statusButton,
            styles.absentButton,
            item.status === 'Absent' && styles.selectedButton,
          ]}
          onPress={() => markStatus(item.id, 'Absent')}
        >
          <Text style={styles.buttonText}>Absent</Text>
        </TouchableOpacity>

      </View>

    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Attendance List</Text>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <Text style={styles.summary}>{summary}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d1eee4',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  row: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statusButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    opacity: 0.5,
  },

  presentButton: {
    backgroundColor: '#4caf50',
    marginRight: 8,
  },

  absentButton: {
    backgroundColor: '#d35050',
  },

  selectedButton: {
    opacity: 1,
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },

  summary: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: 'bold',
    color: 'black',
  },
});
