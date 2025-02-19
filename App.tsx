import type {PropsWithChildren} from 'react';
import React, {useCallback, useRef, useState} from 'react';
import {
  Button,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import RNFS from 'react-native-fs';

import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Canvas from './src/components/Canvas';
import {ClearIcon} from './src/assets/icons';
import type {CanvasControls} from './src/types';
import {ImageFormat, makeImageFromView} from '@shopify/react-native-skia';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const signatureRef = useRef<CanvasControls>(null);
  const snapShotTargetRef = useRef<View>(null);

  const [visible, setVisible] = useState<boolean>(false);

  const onCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

  const onCapture = useCallback(async () => {
    console.log('🚀 ~ App ~ onCapture:');
    if (snapShotTargetRef) {
      return makeImageFromView(snapShotTargetRef)
        .then(async snapshot => {
          const base64ImageData = snapshot?.encodeToBase64(ImageFormat.PNG, 50);
          if (!base64ImageData) {
            throw new Error('base64 image is missing');
          }
          await RNFS.writeFile(
            `${RNFS.CachesDirectoryPath}${Date.now().toString()}.png`,
            base64ImageData,
            'base64',
          ).catch(error => {
            console.error(`error in writeFile: ${error}`);
          });
        })
        .catch(error => {
          console.error(`Error in takeScreenShot: ${error}`);
        });
    }
  }, []);

  const onCanvas = useCallback(() => {
    console.log('🚀 ~ App ~ onDraw:');
    setVisible(true);
  }, []);

  const onRemove = useCallback(() => {
    console.log('🚀 ~ App ~ onRemove:');
  }, []);

  const onSubmit = useCallback(() => {
    console.log('🚀 ~ App ~ onSubmit:');
    setVisible(true);
  }, []);

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View>
        <Header />
        <View
          collapsable={false}
          ref={snapShotTargetRef}
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginBottom: 24,
        }}>
        <Button onPress={onCapture} title="capture" />
        <Button onPress={onCanvas} title="canvas" />
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onCloseModal}>
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <Text style={{fontSize: 16, fontWeight: 600}}>
                Customer Signature
              </Text>
              <TouchableOpacity onPress={onCloseModal}>
                <ClearIcon size={24} />
              </TouchableOpacity>
            </View>
            <Canvas
              // touchEnabled={!imagePath}
              // backgroundImage={image}
              toolColor={'#0A4FFF'}
              strokeWeight={2}
              canvasColor={'#FFFFFF'}
              ref={signatureRef}
            />
            <View style={styles.buttonContainer}>
              <Button onPress={onRemove} title={'Clear'} />
              <Button onPress={onSubmit} title={'Submit'} />
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#DDDDDD',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#DADADA',
    borderBottomWidth: 0.5,
    borderBottomColor: '#9394a088',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 24,
    paddingTop: 24,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
