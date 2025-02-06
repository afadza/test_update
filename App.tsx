import {StyleSheet, View, Text, Button, Image} from 'react-native';
import {useCheckVersion} from './useCheckVersion';

export default function App() {
  const {version} = useCheckVersion();

  return (
    <View style={styles.container}>
      <Text>UDH KE UPDATE</Text>
      <Button title={'check update Git'} onPress={version.onCheckGitVersion} />

      <Image
        source={require('./src/assets/spiderman.png')}
        style={styles.img}
      />
      <Image source={require('./src/assets/batman.png')} style={styles.img} />
      {version.state.loading && <Text>Loading from git...</Text>}
      {!!version.state.progress && (
        <View style={styles.progress}>
          <View
            style={[
              styles.process,
              {
                width: `${version.state.progress}%`,
              },
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  progress: {
    height: 10,
    width: '80%',
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 1,
    overflow: 'hidden',
  },
  process: {
    height: 10,
    backgroundColor: 'blue',
  },
  img: {
    width: 180,
    height: 180,
    resizeMode: 'center',
    marginBottom: 20,
  },
});
