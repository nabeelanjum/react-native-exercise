import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';

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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.daysScrollContainer}
          showsVerticalScrollIndicator={false}
          snapToOffsets={[60, 120, 180, 240, 300, 360]}
        >
          {this.dates.map((date) =>
            <View style={styles.item}>
              <Text style={styles.dayText}>{date}</Text>
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
  item: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  dayText: {
    fontWeight: 'bold',
    color: '#fff'
  }
})

export default TimePicker;