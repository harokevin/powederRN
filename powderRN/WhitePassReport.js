import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default class WhitePassReport extends React.Component {

  constructor(props) {
    super(props);
    this.state = { name: "White Pass", updated: null, message: null, new: null, temp: null, total_snow: null };
  }

  componentDidMount() {
    this.setState( prevState => {
      let value = this.props.value;
      return { name: "White Pass", updated: value.updated, message: value.message, new: value.new, temp: value.temp, total_snow: value.total_snow };
    });
  }

  render() {

    return(
      <View style={{width:390, height: 225, paddingBottom: 20}}>
        <Text style={{textAlign:'center'}}>{this.state.name}</Text>

        <View style={{flex: 1, flexDirection: 'column'}} >
          <View style={{flex: 2, backgroundColor: 'powderblue', justifyContent:'center'}}>
            <Text style={{textAlign:'center'}}>{this.state.updated}</Text>
            <Text style={{textAlign:'center'}}>{this.state.message}</Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent:'center'}}>
            <Text style={{textAlign:'center'}}>{this.state.new}</Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'steelblue', justifyContent:'center'}}>
            <Text style={{textAlign:'center'}}>{this.state.temp}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
