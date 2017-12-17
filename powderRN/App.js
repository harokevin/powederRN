import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { report: null };
  }

  componentDidMount() {
    console.log("From componentDidMount");
    return fetch("https://www.parsehub.com/api/v2/runs/teBk3g2Tv_2B/data?api_key=toxisgTKgB50")
      .then((response) => { console.log(response); return response.json(); })
      .then((responseJson) => {
        this.setState({ report: responseJson.toString() })
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>report: {this.state.report}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
