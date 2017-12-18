import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Report from './Report';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true, oldRunCode: "teBk3g2Tv_2B", latestRunCode: "tKWREbcsOqdJ" };
  }

  componentDidMount() {
    return fetch("https://www.parsehub.com/api/v2/runs/"+this.state.latestRunCode+"/data?api_key=toxisgTKgB50")
      .then((response) => { return response.json(); })
      .then((responseJson) => {
        let js = responseJson;
        let mr = js.MissionRidge;

        let resort = {};
        resort.name = "Mission Ridge";
        resort.metrics = [];
        let i = 0;
        for (i=0; i < mr.length; i++) {
            metric = mr[i];
            metric_name = metric["metric"];
            if (["48 hrs", "24 hrs", "Overnight"].includes(metric_name) == false) {
                continue;
            }
            let mobj = new Object();
            mobj["name"] = metric["metric"];
            mobj.Base = metric.Base;
            mobj.Summit = metric.Summit;
            mobj.Midway = metric.Midway;
            resort[metric_name] = mobj;
            resort.metrics.push(metric_name);
        }

        this.setState({ isLoading: false, resort: resort, name: resort.name, Overnight: resort.Overnight.Summit, _24_Hours: resort["24 hrs"].Summit, _48_Hours: resort["48 hrs"].Summit  });
        console.log(resort);

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    if(this.state.isLoading) {
      return (
        <View style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'powderblue'}} />
          <View style={{flex: 2, backgroundColor: 'skyblue'}}>
            <ActivityIndicator size="large" color="white" style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}/>
          </View>
          <View style={{flex: 3, backgroundColor: 'steelblue'}} />
        </View>
      );
    }

    return(
      <View style={styles.container}>

        <Report style={styles.report} value={this.state.resort}/>
        <Report style={styles.report} value={this.state.resort}/>
        <Report style={styles.report} value={this.state.resort}/>
        <Report style={styles.report} value={this.state.resort}/>
        <Report style={styles.report} value={this.state.resort}/>

      </View>
    );

  }
}

const styles = StyleSheet.create({
  report: {
    width:450,
    height: 140,
    paddingBottom: 10
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150
  },
});
