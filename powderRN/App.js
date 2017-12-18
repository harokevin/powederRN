import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Report from './Report';
import WhitePassReport from './WhitePassReport';

const BASE_URL = "https://www.parsehub.com";
const PROJECT_TOKEN = "tYRR9MB_cbfM";
const API_KEY_QUERY_PARAMETER = "?api_key=toxisgTKgB50";
const LAST_READY_RUN_REQUEST = BASE_URL+"/api/v2/projects/"+PROJECT_TOKEN+"/last_ready_run/data"+API_KEY_QUERY_PARAMETER;

const SAMPLE_RUN_ID = "tC74o-msJ5pr";
const GET_RUN_BY_ID_REQUEST = BASE_URL+"/api/v2/runs/"+SAMPLE_RUN_ID+"/data"+API_KEY_QUERY_PARAMETER;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  parseMissionRidge(responseJson) {
    let js = responseJson;
    let mr = js.MissionRidge;

    let resort = {};
    resort.name = "Mission Ridge";
    resort.metrics = [];
    let i = 0;
    for (i=0; i < mr.length; i++) {
        metric = mr[i];
        metric_name = metric.metric;
        if (["48 hrs", "24 hrs", "Overnight"].includes(metric_name) == false) {
            continue;
        }
        let mobj = new Object();
        mobj.name = metric.metric;
        mobj.base = metric.base;
        mobj.summit = metric.summit;
        mobj.midway = metric.midway;
        resort[metric_name] = mobj;
        resort.metrics.push(metric_name);
    }
    return resort;
  }

  parseWhitePass(responseJson) {
    return responseJson.WhitePass[0];
  }

  componentDidMount() {

    this.setState({ isLoading: true});

    return fetch(LAST_READY_RUN_REQUEST)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return null;
        }
      })
      .then((responseJson) => {

        console.log(responseJson);

        if (responseJson) {
          let missionRidgeReport = this.parseMissionRidge(responseJson);

          let whitePassReport = this.parseWhitePass(responseJson);

          let report = { missionRidge: missionRidgeReport, whitePass: whitePassReport }

          this.setState({ response_ok: true, isLoading: false, report: report });

        } else {

          this.setState({ response_ok: false, isLoading: false});

        }
      })
      .catch((error) => {
        this.setState({ response_ok: false, isLoading: false});
        console.error(error);
      });
  }

  render() {

    if (this.state.isLoading) {
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

    if (this.state.response_ok) {
      return(
        <View style={styles.container}>

          <Report style={styles.report} value={this.state.report.missionRidge}/>
          <WhitePassReport style={styles.report} value={this.state.report.whitePass}/>
          <Report style={styles.report} value={this.state.report.missionRidge}/>
          <Report style={styles.report} value={this.state.report.missionRidge}/>
          <Report style={styles.report} value={this.state.report.missionRidge}/>
          <Report style={styles.report} value={this.state.report.missionRidge}/>

        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: 'powderblue'}} />
          <View style={{flex: 2, backgroundColor: 'skyblue', justifyContent:'center'}}>
            <Text style={{textAlign: 'center', fontSize: 20 }}>Oops</Text>
            <Text style={{textAlign: 'center'}}>Something went wrong.</Text>
            <Text style={{textAlign: 'center'}}>My bad.</Text>
          </View>
          <View style={{flex: 3, backgroundColor: 'steelblue'}} />
        </View>
      );
    }

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
    paddingTop: 425
  },
});
