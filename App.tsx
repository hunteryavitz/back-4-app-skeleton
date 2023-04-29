import React, { useEffect, useState } from 'react';
import { View, Button, Text, SafeAreaView } from 'react-native';
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('', '');
Parse.serverURL = 'https://parseapi.back4app.com/';

const App = () => {
  const [user, setUser] = useState(new Parse.Object('User'));
  const [hello, setHello] = useState('');

  // const helloFunction = async () => {
  //   return await Parse.Cloud.run("helloTest");
  // }
  async function helloFunction() {
    try {
      const result = await Parse.Cloud.run('helloTest');
      setHello(result);
      console.log(result);
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  // create a const from an async function that returns a promise

  async function addUser() {
    try {
      const newUser = new Parse.Object('User');
      await newUser.save();
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }

  async function fetchUser() {
    let query = new Parse.Query('User');
    let queryResult = await query.find();
    console.log('all users:');
    console.log(queryResult);
    const currentUser = queryResult[0];
    console.log('current user:');
    console.log(currentUser);
    console.log('current user objectId: ', currentUser.id);
    console.log('can read:');
    let acl = currentUser.get('ACL');
    console.log(acl);
    let entireThing = acl.get('read');
    console.log(entireThing);
    console.log('current user email: ', currentUser.get());
    setUser(currentUser);
  }

  useEffect(() => {
    fetchUser().then(r => console.log(r));
  }, []);

  return (
      <SafeAreaView>
        <View>
          <Text>Name: {user.get('name')}</Text>
          <Text>{hello || 'hi'}</Text>
          <Text>email: {user.get('email')}</Text>
          <Button title='Add user' onPress={addUser} />
          <Button title='Fetch user' onPress={fetchUser} />
          <Button title='Fetch greeting' onPress={helloFunction} />
          {/* Your other components here ....*/}
        </View>
      </SafeAreaView>
  )
}



export default App;
