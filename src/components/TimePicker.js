import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import { Color } from '../constants';
import { dayScrollInterval, getSchedulingDays, getWorkingHours, timeScrollInterval } from '../utils/dateTime';

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

    if (hourOfDay >= 8 && hourOfDay < 21) {
      // Remove those time slots from todayWorkingHours array that are already passed //
      todayWorkingHours.splice(1, (hourOfDay - 7));
      this.setState({ hoursArray: todayWorkingHours });
      return;
    } else if (hourOfDay >= 21) {
      // if time is already past 9pm then remove 'today' from days array //
      days.splice(0, 1);
    }
    this.setState({ hoursArray: workingHours });
  }

  handleDayChange = (e) => {
    const { todayWorkingHours, workingHours, hourOfDay } = this;

    if (e.contentOffset.y < timeScrollInterval && hourOfDay >= 8 && hourOfDay < 21) {
      this._timeSelector.scrollTo({ y: 0 });
      setTimeout(() => this.setState({ hoursArray: todayWorkingHours }), 100);
    } else if (this.state.hoursArray !== workingHours) {
      this._timeSelector.scrollTo({ y: 0 });
      setTimeout(() => this.setState({ hoursArray: workingHours }), 100);
    }
  }

  render() {

    const { days } = this;
    const { hoursArray } = this.state;

    return (
      <View style={styles.container}>
        <SelectionBar />
        <ScrollView
          ref={(ref) => this._daySelector = ref}
          style={{ width: '35%' }}
          contentContainerStyle={styles.daysScrollContainer}
          showsVerticalScrollIndicator={false}
          snapToInterval={dayScrollInterval}
          decelerationRate={'fast'}
          scrollsToTop={false}
          onMomentumScrollEnd={(e) => this.handleDayChange(e.nativeEvent)}
        >
          {days.map((day, i) =>
            <TouchableOpacity onPress={() => this._daySelector.scrollTo({ y: i * dayScrollInterval })} key={i.toString()} style={{ ...styles.item, height: dayScrollInterval, alignItems: 'flex-end' }}>
              <Text style={{ ...styles.text, fontWeight: 'bold' }}>{day}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <ScrollView
          ref={(ref) => this._timeSelector = ref}
          style={{ width: '65%' }}
          contentContainerStyle={styles.timesScrollContainer}
          showsVerticalScrollIndicator={false}
          snapToInterval={timeScrollInterval}
          decelerationRate={'fast'}
          scrollsToTop={false}
        >
          {hoursArray.map((time, i) =>
            <TouchableOpacity onPress={() => this._timeSelector.scrollTo({ y: i * timeScrollInterval })} key={i.toString()} style={{ ...styles.item, height: timeScrollInterval, alignItems: 'flex-start' }}>
              <Text style={styles.text}>{time}</Text>
            </TouchableOpacity>
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