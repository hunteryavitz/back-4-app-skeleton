import React, { useEffect, useState } from 'react';
import { View, Button, Text, SafeAreaView } from 'react-native';

// In a React Native application
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Initializing the SDK
Parse.setAsyncStorage(AsyncStorage);
//Paste below the Back4App Application ID AND the JavaScript KEY
Parse.initialize('5HjeuWlRNyi4Qo8cJE6mngNin8emued64p5Ka6DO', 'nAUqNqShvELZoqzXcmXA8ejXsXQY33sTWtB8ZAtB');
//Point to Back4App Parse API address
Parse.serverURL = 'https://parseapi.back4app.com/';

const App = () => {
  const [user, setUser] = useState(new Parse.Object('User'));

  async function addUser() {
    try {
      //create a new Parse Object instance
      const newUser = new Parse.Object('User');
      //define the attributes you want for your Object
      newUser.set('name', 'John');
      newUser.set('email', 'john@back4app.com');
      //save it on Back4App Data Store
      await newUser.save();
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }

  async function fetchUser() {
    //create your Parse Query using the Person Class you've created
    let query = new Parse.Query('User');
    //run the query to retrieve all objects on Person class, optionally you can add your filters
    let queryResult = await query.find();
    //the resul is an arry of objects. Pick the first result
    const currentUser = queryResult[0];
    //access the Parse Object attributes
    console.log('person id: ', currentUser.get('id'));
    console.log('person name: ', currentUser.get('name'));
    console.log('person email: ', currentUser.get('email'));
    setUser(currentUser);
  }

  useEffect(() => {
    fetchUser()
  }, []);

  return (
      <SafeAreaView>
        <View>
          <Text>Name: {user.get('name')}</Text>
          <Text>email: {user.get('email')}</Text>
          <Button title='Add user' onPress={addUser} />
          <Button title='Fetch user' onPress={fetchUser} />
          {/* Your other components here ....*/}
        </View>
      </SafeAreaView>
  )
}

export default App;