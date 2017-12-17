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
      .then((response) => { return response.json(); })
      .then((responseJson) => {
        this.setState({ report: responseJson.toString(),
                        json: responseJson,
                      });
        let js = responseJson;
        let mr = js.MissionRidge;
        
        let resort = new Object();
        resort["name"] = "Mission Ridge";
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
            console.log(mobj);
        }
        this.setState({ resort: resort });

        console.log(resort);
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
