import Analytics from 'react-native-more-sentinal';
import { Text, View, StyleSheet } from 'react-native';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    Analytics.init();
    Analytics.setUserId('113425235');
    setTimeout(() => {
      Analytics.sendDataToServer('test', { sdjn: 'dsagasdg' });
    }, 2000);
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
