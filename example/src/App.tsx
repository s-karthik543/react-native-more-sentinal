import Sentinal from 'react-native-more-sentinal';
import { Text, View, StyleSheet } from 'react-native';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    Sentinal.init({
      api_key: 'test_12345',
      url: 'https://moreretail.in/',
      env: 'dev',
    });
    Sentinal.setUserId('113425235');

    Sentinal.trackEvents('test', { sdjn: 'dsagasdg' });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
