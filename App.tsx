import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import MathQuestionScreen from './src/screens/MathQuestionScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="MathQuestion">
    //     <Stack.Screen name="MathQuestion" component={MathQuestionScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <View style={styles.container}>
      <MathQuestionScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
