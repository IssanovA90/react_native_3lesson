import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



function HomeScreen({ navigation }) {
  return (
    <View style={{ gap: 10, padding: 20 }}>
      <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate("Счет")}>
        <Text style={{ color: "white" }}>Ваш счет</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate("Помощь")}>
        <Text style={{ color: "white" }}>Помощь</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={() => navigation.navigate("Профиль")}>
        <Text style={{ color: "white" }}>Информация о пользователе</Text>
      </TouchableOpacity>
    </View>
  );
}



function Check() {
  const [input5, setInput5] = useState("");
  const [balans, setBalans] = useState(0);



  useEffect(() => {
    AsyncStorage.getItem("balans")
      .then((value) => {
        if (value !== null) {
          setBalans(parseFloat(value));
        }
      })
  }, []);

  const saveBalansToAsyncStorage = (newBalans) => {
    AsyncStorage.setItem("balans", String(newBalans))
  };



  const add = () => {
    const addition = parseFloat(input5);
    if (!isNaN(addition)) {
      const newBalans = balans + addition;
      setBalans(newBalans);
      saveBalansToAsyncStorage(newBalans);
    }
    setInput5("");
  };



  const minus = () => {
    const subtraction = parseFloat(input5);
    if (!isNaN(subtraction)) {
      const newBalans = balans - subtraction;
      if (newBalans >= 0) {
        setBalans(newBalans);
        saveBalansToAsyncStorage(newBalans);
      } else {
        console.error("Ошибка: Сумма для снятия больше, чем текущий баланс.");
      }
    }
    setInput5("");
  };

  return (
    <View style={{ marginTop: 30, alignItems: "center", gap: 20 }}>
      <View>
        <Text>Баланс: {balans}</Text>
        <View style={{ borderBottomWidth: 2, width: 300, marginTop: 20 }}></View>
      </View>
      <TextInput
        style={{
          borderWidth: 1,
          backgroundColor: "red",
          width: 300,
          height: 40,
          color: "white",
          borderRadius: 5,
          padding: 5
        }}
        placeholder="Сумма"
        value={input5}
        onChangeText={(text) => setInput5(text)}
      />
      <TouchableOpacity
        style={{ backgroundColor: "green", width: 300, height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center" }}
        onPress={add}
      >
        <Text style={{ color: "white" }}>Добавить</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "red", width: 300, height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center" }}
        onPress={minus}
      >
        <Text style={{ color: "white" }}>Снять</Text>
      </TouchableOpacity>
    </View>
  );
}

function HelpScreen({ }) {
  return (
    <View style={{ marginTop: 30, alignItems: "center" }}>
      <Text style={{ width: 300, height: 110, borderRadius: 10, borderWidth: 1, backgroundColor: "red", color: "white", padding: 10 }}>
        В этой ситуации нужно попросить «check» или «bill». Они оба правильные, просто первое — американское, а второе используют в
        Британии. Could we have the bill/Can you bring a check — Можно счет, пожалуйста.</Text>
    </View>
  );
}



function InfoScreen() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');

  useEffect(() => {
    AsyncStorage.get(['input1', 'input2', 'input3', 'input4'])
      .then((values) => {
        values.forEach((value) => {
          const [key, storedValue] = value;
          if (storedValue !== null) {
            switch (key) {
              case 'input1':
                setInput1(storedValue);
                break;
              case 'input2':
                setInput2(storedValue);
                break;
              case 'input3':
                setInput3(storedValue);
                break;
              case 'input4':
                setInput4(storedValue);
                break;
              default:
                break;
            }
          }
        });
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных из AsyncStorage:', error);
      });
  }, []);

  const saveInfo = () => {
    AsyncStorage.set([
      ['input1', input1],
      ['input2', input2],
      ['input3', input3],
      ['input4', input4],
    ])
      .then(() => {
        console.log('Данные успешно сохранены в AsyncStorage');
      })
      .catch((error) => {
        console.error('Ошибка при сохранении данных в AsyncStorage:', error);
      });
  };

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <TextInput
        style={{
          borderWidth: 1,
          backgroundColor: 'green',
          width: 300,
          height: 40,
          color: 'white',
          borderRadius: 5,
          padding: 5,
        }}
        placeholder="Имя"
        value={input1}
        onChangeText={(text) => setInput1(text)}
      />
      <TextInput
        style={{
          borderWidth: 1,
          backgroundColor: 'green',
          width: 300,
          height: 40,
          color: 'white',
          borderRadius: 5,
          padding: 5,
        }}
        placeholder="Фамилия"
        value={input2}
        onChangeText={(text) => setInput2(text)}
      />
      <TextInput
        style={{
          borderWidth: 1,
          backgroundColor: 'green',
          width: 300,
          height: 40,
          color: 'white',
          borderRadius: 5,
          padding: 5,
        }}
        placeholder="Телефон"
        value={input3}
        onChangeText={(text) => setInput3(text)}
      />
      <TextInput
        style={{
          borderWidth: 1,
          backgroundColor: 'green',
          width: 300,
          height: 40,
          color: 'white',
          borderRadius: 5,
          padding: 5,
        }}
        placeholder="E-mail"
        value={input4}
        onChangeText={(text) => setInput4(text)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          width: 300,
          height: 50,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={saveInfo}
      >
        <Text style={{ color: 'white' }}>Сохранить</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Главная страница" component={HomeScreen} />
        <Stack.Screen name="Помощь" component={HelpScreen} />
        <Stack.Screen name="Счет" component={Check} />
        <Stack.Screen name="Профиль" component={InfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  buttons: {
    width: 300,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 10,
    backgroundColor: "blue",
  }
});

export default App;


