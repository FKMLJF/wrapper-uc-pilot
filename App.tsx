/**
 * Copyright (c) 2023 Jozsef Vincze
 */

import React from 'react';

import {SafeAreaView, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';

function App(): JSX.Element {
  const URL = 'https://uc.procats.hu';

  return (
      <SafeAreaView style={styles.body}>
        <WebView source={{uri: URL}}></WebView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
  },
});

export default App;
