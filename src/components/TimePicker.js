import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import { Color } from '../constants';
import { getSchedulingDays, getWorkingHours } from '../utils/dateTime';

// A centered Selection Bar on top of date/time picker //
const SelectionBar = () => (
  <View style={styles.selectionBar}>
    <View style={{ marginLeft: '34%', height: 20, width: 1, backgroundColor: Color.primaryLight }} />
  </View>
);

class TimePicker extends React.PureComponent {

  hourOfDay = moment().hour();
  days = getSchedulingDays();
  workingHours = getWorkingHours();
  todayWorkingHours = [
    'within 1 hour',
    ...this.workingHours,
  ];

  state = {
    hoursArray: [],
  }

  componentDidMount = () => {
    const { hourOfDay, days, todayWorkingHours, workingHours } = this;

    // if time is already past 9pm then remove 'today' from the days array //
    if (hourOfDay >= 21) {
      days.splice(0, 1);
      this.setState({ hoursArray: workingHours });
    }

    // Remove those time values from todayWorkingHours array that are already passed //
    if (hourOfDay > 8 && hourOfDay < 21) {
      todayWorkingHours.splice(1, (hourOfDay - 7));
      this.setState({ hoursArray: todayWorkingHours });
    }

  }

  handleDayChange = (e) => {
    const { todayWorkingHours, workingHours, hourOfDay } = this;

    if (e.contentOffset.y < 40 && hourOfDay < 22) {
      this.setState({ hoursArray: todayWorkingHours });
    } else {
      this.setState({ hoursArray: workingHours });
    }
  }

  render() {

    const { days } = this;
    const { hoursArray } = this.state;

    return (
      <View style={styles.container}>
        <SelectionBar />
        <ScrollView
          style={{ width: '35%' }}
          contentContainerStyle={styles.daysScrollContainer}
          showsVerticalScrollIndicator={false}
          snapToInterval={60}
          decelerationRate={'fast'}
          onMomentumScrollEnd={(e) => this.handleDayChange(e.nativeEvent)}
        >
          {days.map((day, i) =>
            <View key={i.toString()} style={{ ...styles.item, height: 60, alignItems: 'flex-end' }}>
              <Text style={{ ...styles.text, fontWeight: 'bold' }}>{day}</Text>
            </View>
          )}
        </ScrollView>
        <ScrollView
          ref={(ref) => this._timeSelector = ref}
          style={{ width: '65%' }}
          contentContainerStyle={styles.timesScrollContainer}
          showsVerticalScrollIndicator={false}
          snapToInterval={40}
          decelerationRate={'fast'}
          onContentSizeChange={() => this._timeSelector.scrollTo({ y: 0 })}
        >
          {hoursArray.map((time, i) =>
            <View key={i.toString()} style={{ ...styles.item, height: 40, alignItems: 'flex-start' }}>
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
  },
  selectionBar: {
    position: 'absolute',
    top: '48%',
    left: 12,
    right: 12,
    borderWidth: 1,
    borderColor: Color.action,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center'
  }
});

export default TimePicker;