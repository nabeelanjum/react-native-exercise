import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import { Color } from '../constants';

const SelectionBar = () => (
  <View style={{
    position: 'absolute',
    top: '48%',
    left: 10,
    right: 10,
    borderWidth: 1,
    borderColor: Color.action,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center'
  }}>
    <View style={{ marginLeft: '34%', height: 20, width: 1, backgroundColor: Color.primaryLight }} />
  </View>
);

class TimePicker extends React.PureComponent {

  dates = [
    'Today',
    'Tomorrow',
    moment().add(2, 'days').format('ddd MMM D'),
    moment().add(3, 'days').format('ddd MMM D'),
    moment().add(4, 'days').format('ddd MMM D'),
    moment().add(5, 'days').format('ddd MMM D'),
    moment().add(6, 'days').format('ddd MMM D'),
  ];

  times = [
    'between 7 pm - 8 pm',
    'between 7 pm - 8 pm',
    'between 7 pm - 8 pm',
    'between 7 pm - 8 pm',
    'between 7 pm - 8 pm',
    'between 7 pm - 8 pm',
    'between 7 pm - 8 pm',
  ];

  render() {
    return (
      <View style={styles.container}>
        <SelectionBar />
        <ScrollView
          style={{ width: '35%' }}
          contentContainerStyle={styles.daysScrollContainer}
          showsVerticalScrollIndicator={false}
          snapToOffsets={[60, 120, 180, 240, 300, 360]}
        >
          {this.dates.map((date) =>
            <View style={{ ...styles.item, height: 60, alignItems: 'flex-end' }}>
              <Text style={{ ...styles.text, fontWeight: 'bold' }}>{date}</Text>
            </View>
          )}
        </ScrollView>
        <ScrollView
          style={{ width: '65%' }}
          contentContainerStyle={styles.timesScrollContainer}
          showsVerticalScrollIndicator={false}
          snapToOffsets={[40, 80, 120, 160, 200, 240]}
        >
          {this.times.map((time) =>
            <View style={{ ...styles.item, height: 40, alignItems: 'flex-start' }}>
              <Text style={styles.text}>{time}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row'
  },
  daysScrollContainer: {
    paddingTop: 110,
    paddingBottom: 80,
  },
  timesScrollContainer: {
    paddingTop: 120,
    paddingBottom: 90
  },
  item: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: '#fff'
  }
})

export default TimePicker;