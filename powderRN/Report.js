import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default class Report extends React.Component {

  constructor(props) {
    super(props);
    this.state = { name: null, overnight: null, _24_Hours: null, _48_Hours: null };
  }

  componentDidMount() {
    this.setState( prevState => {
      let value = this.props.value;
      return { name: value.name, overnight: value.Overnight.summit, _24_Hours: value["24 hrs"].summit, _48_Hours: value["48 hrs"].summit };
    });
  }

  render() {

    return(
      <View style={{width:450, height: 140, paddingBottom: 5, paddingTop: 20}}>
        <Text style={{textAlign:'center'}}>{this.state.name}</Text>
        <View style={{flex: 1, flexDirection: 'row'}} >
          <View style={{flex:1, backgroundColor: 'powderblue', justifyContent:'center'}}><Text style={{textAlign:'center'}}>Overnight</Text></View>
          <View style={{flex:1, backgroundColor: 'skyblue', justifyContent:'center'}}><Text style={{textAlign:'center'}}>24 Hours</Text></View>
          <View style={{flex:1, backgroundColor: 'steelblue', justifyContent:'center'}}><Text style={{textAlign:'center'}}>48 Hours</Text></View>
        </View>
        <View style={{flex: 2, flexDirection: 'row'}}>
          <View style={{flex: 1, backgroundColor: 'powderblue', justifyContent:'center'}}><Text style={{textAlign:'center'}}>{this.state.overnight}</Text></View>
          <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent:'center'}}><Text style={{textAlign:'center'}}>{this.state._24_Hours}</Text></View>
          <View style={{flex: 1, backgroundColor: 'steelblue', justifyContent:'center'}}><Text style={{textAlign:'center'}}>{this.state._48_Hours}</Text></View>
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
