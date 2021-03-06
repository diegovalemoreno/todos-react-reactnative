/**
 * @author Mahmud Ahsan <https://github.com/mahmudahsan>
 * https://github.com/vonovak/react-navigation-header-buttons
 * https://github.com/joinspontaneous/react-native-loading-spinner-overlay
 */

 import React from 'react';
 import { View, WebView } from 'react-native';

 import Config from '../config/Settings';
 import { Platform } from 'expo-core';
 import Spinner from 'react-native-loading-spinner-overlay';

 export default class AboutScreen extends React.Component {
  state = {
    visible: true,
    url: ""
  }

  static navigationOptions = {
    title: Config.aboutScreenTitle,
  }

  componentDidMount(){
    /**
     * If Apple Store webpage provide, and user open the app in iOS
     * the apple webpage will be shown.
     * Same goes for Google Play.
     * If no Apple Store page or Google Play page but normal webpage only then normal web page will be open.
     */
    if (Platform.OS === 'ios') {
      if (Config.aboutiOSURL !== ""){
        this.setState({url: Config.aboutiOSURL});
      }
      else if (Config.aboutWebPage !== ""){
        this.setState({url: Config.aboutWebPage});
      }
    }
    else if (Platform.OS === 'android'){
      if (Config.aboutGooglePlayURL !== ""){
        this.setState({url: Config.aboutGooglePlayURL});
      }
      else if (Config.aboutWebPage !== ""){
        this.setState({url: Config.aboutWebPage});
      }
    }
  }

  showSpinner() {
    this.setState({ visible: true });
  }

  hideSpinner() {
    this.setState({ visible: false });
  }


  render(){
    //console.log(this.state.url);
    return (
      <View style={{ flex: 1 }}>
        <Spinner
          visible={this.state.visible}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />
        <WebView
          originWhitelist={['*']}
          source={{uri: this.state.url}}
          useWebKit={true}  //iOS
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode="always"
          onLoad={() => this.hideSpinner()}
          style={{ flex: 1 }}
        />
      </View>
    )
  }
 }
