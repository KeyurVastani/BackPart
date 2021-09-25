import { styles } from 'ansi-colors';
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../helper/screenHelper';
import Color from '../assets/colors/color';
import moment from 'moment';
import axios from '../axios';
import { Calendar } from 'react-native-calendars';
import LongRouButton from '../components/LongRouButton';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setDateObject } from '../store/action/DateAction';
import { CalTheme } from '../data/CalenderThem';
import ProgressLoader from 'rn-progress-loader';
import BlueButton from '../components/BlueButton';
import LinearGradient from 'react-native-linear-gradient';

const ENTRIES1 = [
  {
    profile: require('../images/5.jpg'),
  },
  {
    profile: require('../images/3.png'),
  },
  {
    profile: require('../images/4.png'),
  },
  {
    profile: require('../images/6.jpg'),
  },
  {
    profile: require('../images/8.jpg'),
  },
  {
    profile: require('../images/9.jpg'),
  },
];

const { width: screenWidth } = Dimensions.get('window');

// function call
const getDaysBetweenDates = (startDate, endDate) => {
  var now = startDate.clone(),
    dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format('YYYY-MM-DD'));
    now.add(1, 'days');
  }

  return dates;
};

const Inquiry = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const today = moment().format('YYYY-MM-DD');
  const todayTime = new Date(today).getTime();
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [date, setDate] = useState([]);
  const [newDaysObject, setnewDaysObject] = useState({});
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  useEffect(() => {
    if (isFocused) {
      setDate([]);
      callApi();
    }
  }, [isFocused]);

  if (Loaded) {
    return (
      <View
        style={{
          backgroundColor: Color.lightblue,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <ProgressLoader
          style={{height: 40, width: 20}}
          visible={Loaded}
          isModal={true}
          isHUD={true}
          hudColor={'#fff'}
          color={'#000000'}
          barHeight={64}
        />
      </View>
    );
  }

  const pagination = () => {
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeIndex}
        containerStyle={{ marginTop: hp(-10) }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: 'gray',
        }}
        dotContainerStyle={{
          paddingTop: -10,
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ height: hp(30), width: screenWidth }}>
        <Image source={item.profile} style={style.image} />
      </View>
    );
  };

  //get aPi
  const callApi = async () => {
    setLoaded(true);
    await axios
      .get('/booking')
      .then(res => {
        let data = res?.data?.bookdate;

        const dataList = data.map(item => {
          const startDate = moment(item.indate);
          const endDate = moment(item.outdate);

          return getDaysBetweenDates(startDate, endDate);
        });

        for (let i = 0; i < dataList.length; i++) {
          var innerArrayLength = dataList[i].length;

          for (let j = 0; j < innerArrayLength; j++) {
            date.push(dataList[i][j]);
          }
        }

        var newDaysObjects = {};
        date.map(day => {
          const dayTime = new Date(day).getTime();

          if (dayTime < todayTime - 1) {
          } else {
            newDaysObjects = {
              ...newDaysObjects,

              [day]: {
                selected: true,
                marked: true,
                selectedColor: '#2acaea',
                disableTouchEvent: true,
              },
            };
          }
        });
        setnewDaysObject(newDaysObjects);

        dispatch(setDateObject(newDaysObjects));
        setLoaded(false);
      })
      .catch(err => {
        alert(err?.response?.data?.error);
        setLoaded(false);
      });
  };

  return (
    <View style={{ marginTop: hp(4), flex: 1 }}>
      <Carousel
        autoplay={true}
        autoplayInterval={5000}
        loop={true}
        layout="default"
        containerCustomStyle={{
          height: 10,
          marginTop: hp(-25),
          backgroundColor: '#e2e2e2',
        }}
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth - 40}
        itemWidth={screenWidth}
        data={entries}
        renderItem={renderItem}
        onSnapToItem={index => {
          setActiveIndex(index);
        }}
      />
      <View>{pagination()}</View>

      <LinearGradient
        colors={['#4c669f', 'rgba(0,0,0,0)']}
        style={{
          position: 'absolute',
          top: -33,

          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
        }}>

      </LinearGradient>

      <View style={style.book}>
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}></View>
        {/* <Button title='Check The Availabity' onPress={() => {
                    navigation.navigate("DateAvailable")
                }} 
                /> */}
        {date.length >= 0 && (
          <Calendar
            minDate={today}
            disableAllTouchEventsForDisabledDays={true}
            style={{
              height: 100,
            }}
            theme={CalTheme}
            markedDates={newDaysObject}
          />
        )}


        <View style={{ position: 'absolute', marginTop: 350, left: 32 }}>
          <BlueButton
            onPress={() => {
              navigation.navigate('DateAvailable');
            }}
            btnstyle={{
              top: 13,
              marginHorizontal: 50,
              height: 50,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            textstyle={{ fontFamily: 'roboto-medium', fontSize: 23 }}>
            Check Available Date
          </BlueButton>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    paddingHorizontal: wp(5),
    marginBottom: wp(10),
  },
  item: {
    width: screenWidth,
    backgroundColor: 'black',
  },
  imageContainer: {
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    height: 620,
    width: screenWidth,
    resizeMode: 'contain',
  },
  book: {
    flex: 1,
    backgroundColor: '#e2e2e2',
  },
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: 35,
    color: Color.green,
  },
  textbutton: {
    fontSize: 28,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
});

export default Inquiry;
