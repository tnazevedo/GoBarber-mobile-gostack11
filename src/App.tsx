import React from 'react';
import { View, StatusBar } from 'react-native';
// * A statusBar tem várias configurações que são possíveis para android.

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <View style={{ backgroundColor: '#312e38', flex: 1 }} />
    </>
  );
};
export default App;
