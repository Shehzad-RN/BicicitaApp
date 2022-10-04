import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Axios from 'axios';
import {Left, Body, Right} from 'native-base';
import MapIcon from 'react-native-vector-icons/Feather';
import IconFor from 'react-native-vector-icons/MaterialIcons';
import IconPlus from 'react-native-vector-icons/AntDesign';
import {CheckBox} from 'react-native-elements';
import LocationIcon from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import Icons from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import MultiSelect from 'react-native-multiple-select';
import IconPlaceholder from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import IconMinus from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import ButtonComp from '../../../components/ButtonComp';
import Loader from '../../../components/LoaderComponent';

import {setSelectedUsers} from '../../../redux/Actions/UsersActionFiles';

const Creacita_Createapointment = ({navigation, route}) => {
  const {user} = useSelector(({stakreducer}) => stakreducer);
  const {cities} = useSelector(({Citiesreducer}) => Citiesreducer);
  const {selectedUsers} = useSelector(({AppReducer}) => AppReducer);

  const [check1, setcheck1] = useState(false);
  const [check2, setcheck2] = useState(false);
  const [show, setShow] = useState('');
  const [maps, setmap] = useState(false);
  const [check3, setcheck3] = useState(false);
  const [check4, setcheck4] = useState(false);
  const [male, setmale] = useState(false);
  const [female, setfemale] = useState(false);
  const [publicdata, setpublicdata] = useState(false);
  const [privatedata, setprivatedata] = useState(false);
  const [bothgenders, setbothgenders] = useState(false);
  const [date, setDate] = useState('');
  const [vis, setVis] = useState(false);
  const [time, setTime] = useState('');
  const [showAnd, setShowAnd] = useState(false);
  const [showAnd1, setShowAnd1] = useState(false);
  const [place, setPlace] = useState('');
  const [departure, setDeparture] = useState({
    latitude: parseFloat(user?.userdata?.latitude),
    longitude: parseFloat(user?.userdata?.longitude),
  });
  const [showBigger, setShowBigger] = useState(false);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [bikes, setbikes] = useState([]);
  const [showimages, setshowimages] = useState(false);
  const [colorRes, setcolorsRes] = useState([]);
  const [introduction, setIntrodunction] = useState('');
  const [image, setimage] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [mapImage, setMapImage] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [increment, setIncrement] = useState(5);
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  const bikesarray = [
    {
      id: '1',
      name: 'E-bike Carretera',
      color: 'red',
    },
    {
      id: '2',
      name: 'Carretera',
      color: 'blue',
    },
    {
      id: '3',
      name: 'Mtb',
      color: 'orange',
    },
    {
      id: '4',
      name: 'E-bike Mtb',
      color: 'yellow',
    },
    {
      id: '5',
      name: 'Gravel',
      color: 'skyblue',
    },
    {
      id: '6',
      name: 'Paseo',
      color: 'black',
    },
    {
      id: '7',
      name: 'Descenso',
      color: 'brown',
    },
    {
      id: '8',
      name: 'Enduro',
      color: 'grey',
    },
  ];
  const myModal1 = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {
          setVis(!vis);
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000088',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginRight: 20,
              marginBottom: 10,
              width: '100%',
            }}>
            <Icons
              onPress={() => setVis(!vis)}
              name="circle-with-cross"
              color="white"
              size={25}
            />
          </View>
          <View
            style={{
              borderRadius: 10,
              // padding: 20,
              height: '50%',
              // flex: 4,
              backgroundColor: 'white',
              width: '100%',
            }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{flex: 1}}
              region={{
                latitude: parseFloat(user?.userdata?.latitude),
                longitude: parseFloat(user?.userdata?.longitude),
                latitudeDelta: 0.922,
                longitudeDelta: 0.421,
              }}>
              {/* {list()} */}
              {/* <Marker
                coordinate={{
                  latitude: parseFloat(user.userdata.latitude),
                  longitude: parseFloat(user.userdata.longitude),
                  // latitudeDelta: 0.0922,
                  // longitudeDelta: 0.0421,
                }}
                // pinColor="red"
                // image={{uri: element.profile_image}}
              /> */}
              <Marker
                draggable
                coordinate={departure}
                onDragEnd={(e) => {
                  setDeparture(e.nativeEvent.coordinate);
                }}
              />
            </MapView>
          </View>
          <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
            <ButtonComp
              onPress={() => {
                setVis(!vis);
                setLat(departure.latitude);
                setLong(departure.longitude);
                setmap(true);
              }}
              style={{backgroundColor: '#9561F1', borderRadius: 6}}
              title={'seleccionar coordenada'}
            />
          </View>
        </View>
      </Modal>
    );
  };
  const myModal2 = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showBigger}
      onRequestClose={() => {
        setShowBigger(!showBigger);
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#00000088',
          justifyContent: 'center',
        }}>
        <View style={{height: '80%', width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingRight: 10,
            }}>
            <TouchableOpacity
              onPress={() => setShowBigger(false)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 25,
                width: 30,
                // backgroundColor: 'red',
              }}>
              <LocationIcon name="circle-with-cross" size={20} />
            </TouchableOpacity>
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: lat ? parseFloat(lat) : 37.78825,
              longitude: long ? parseFloat(long) : -122.4324,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            {/* {list()} */}
            {/* <Marker
                coordinate={{
                  latitude: parseFloat(user.userdata.latitude),
                  longitude: parseFloat(user.userdata.longitude),
                  // latitudeDelta: 0.0922,
                  // longitudeDelta: 0.0421,
                }}
                // pinColor="red"
                // image={{uri: element.profile_image}}
              /> */}
            {lat ? (
              <Marker
                // draggable
                coordinate={{
                  latitude: parseFloat(lat),
                  longitude: parseFloat(long),
                }}
                onDragEnd={(e) => {
                  setDeparture(e.nativeEvent.coordinate);
                }}
              />
            ) : null}
            {/* <Marker
              // draggable
              coordinate={{
                latitude: parseFloat(user?.userdata?.latitude),
                longitude: parseFloat(user?.userdata?.longitude),
              }}
              onDragEnd={(e) => {
                setDeparture(e.nativeEvent.coordinate);
              }}
            /> */}
          </MapView>
        </View>
      </View>
    </Modal>
  );
  const onSelectedItemsChange = (selectedItems) => {
    const res = bikesarray.filter((item) => selectedItems.includes(item.id));
    setSelectedItems(selectedItems);
    setcolorsRes(res);
    let data = [];
    res.map((item) => {
      data.push(item.name);
    });
    setbikes(data);
  };
  useEffect(() => {
    if (lat) {
      getName();
    }
  }, [lat]);
  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (e: KeyboardEvent) => {
        setKeyboardStatus(true);
        // setKeyHeight(e.endCoordinates.height);
      },
    );
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
      // setKeyHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const getName = () => {
    let radius = 150;
    let myapikey = 'AIzaSyB_H2_55fkLI8-EyfYLUlJI4obywUd-KnE';
    let request = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${departure.latitude},${departure.longitude}&radius=${radius}&key=${myapikey}`;
    return Axios.get(request)
      .then(({data, status}) => {
        if (data.status == 'OK') {
          setPlace(data.results[0].name);
          // // Alert.alert("i get data");
          // setSearchInput(data.results[0].name);
          // setgoogleSearchText(data.results[0].name);
          // ToastAndroid.show("Got Location !", ToastAndroid.SHORT);
          // return status === 200 || status === 201 ? data : null;
        } else {
          // Alert.alert("i got denied")
        }
      })
      .catch((e) => {});
  };
  const chooseImage = (isImg) => {
    ImagePicker.openPicker({
      multiple: false,
      width: 300,
      height: 400,
      cropping: false,
    }).then((image) => {
      if (isImg) {
        setimage(image);
        setshowimages(true);
      } else {
        setMapImage(image);
        setShowMap(true);
      }
    });
  };
  const CreateApointmentFunction = () => {
    const gender = bothgenders
      ? 'Todos'
      : male
      ? 'Hombre'
      : female
      ? 'Mujer'
      : '';
    const status = publicdata ? 'public' : privatedata ? 'private' : null;
    if (!introduction) {
      Alert.alert('Añade descripción de la ruta');
      return;
    } else if (time === '') {
      Alert.alert('Seleccionar hora');
      return;
    } else if (date === '') {
      Alert.alert('Seleccione fecha');
      return;
    } else if (!status) {
      Alert.alert('Selecciona privacidad de ruta');
      return;
    } else if (!image) {
      Alert.alert('Selecciona una imagen');
      return;
    } else if (!lat) {
      Alert.alert('Añadir lugar');
      return;
    } else if (!gender) {
      Alert.alert('Añade quién asistirá');
      return;
    } else if (!bikes.length) {
      Alert.alert('seleccionar bicicleta');
      return;
    } else if (!check1 && !check2 && !check3 && !check4) {
      Alert.alert('Añade Niveles');
      return;
    }
    setloading(true);

    const data = new FormData();
    const jsonData = {gender, level: [], bikes: [], status};
    gender && data.append('gender[]', gender);
    introduction && data.append('introduction', introduction);
    increment && data.append('participants', increment);
    data.append('city', place);
    selectedUsers.length &&
      selectedUsers?.forEach((item) => {
        data.append('invite[]', item.friend_id);
      });
    time && data.append('time', time);
    date && data.append('calendar', date);
    data.append('longitude', long);
    data.append('latitude', lat);
    status && data.append('status', status);
    image &&
      data.append('image', {
        uri: image.path,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });
    mapImage &&
      data.append('map_image', {
        uri: mapImage.path,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });
    check1 && (data.append('level[]', 'Inicio'), jsonData.level.push(1));
    check2 && (data.append('level[]', 'medio'), jsonData.level.push(2));
    check3 && (data.append('level[]', 'Avanzado'), jsonData.level.push(3));
    check4 && (data.append('level[]', 'Pro'), jsonData.level.push(4));
    bikes.forEach((item) => {
      data.append('bike[]', item);
      jsonData.bikes.push(item);
    });

    fetch(`https://bicicita.com/app/api/appointment`, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user?.userdata?.api_token}`,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setloading(false);
        if (res.status === 'success') {
          Alert.alert(res.message);
        }
      })
      .catch((error) => {
        setloading(false);
      });
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Image
          source={require('../../../assets/Icons/logoapp.png')}
          style={{height: 40, width: 150, resizeMode: 'contain'}}
        />
      ),
      headerLeft: () =>
        Platform.OS === 'ios' && (
          <IconPlus
            name="arrowleft"
            color="black"
            size={20}
            style={{left: 15}}
            onPress={() => navigation.goBack()}
          />
        ),
      headerStyle: {
        elevation: 0,
      },
      headerTitleAlign: 'center',
    });
  }, []);
  const showDatePicker = () => {
    setShowAnd(true);
  };
  const showDatePicker1 = () => {
    setShowAnd1(true);
  };

  const hideDatePicker = () => {
    setShowAnd(false);
  };
  const hideDatePicker1 = () => {
    setShowAnd1(false);
  };
  console.log('users', selectedUsers);
  const handleConfirm = (date) => {
    setDate(moment(date).format('YYYY-MM-DD'));
    setShow(moment(date).format('DD-MM-YYYY'));
    hideDatePicker();
  };
  const handleConfirm1 = (time) => {
    setTime(moment(time).format('h:mm a'));
    hideDatePicker1();
  };
  console.log('departure', departure);
  console.log('lattitude', lat);
  console.log('longitude', long);
  const myapikeys = 'AIzaSyB_H2_55fkLI8-EyfYLUlJI4obywUd-KnE';
  return (
    <View style={styles.conatiner}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.subcontainer}>
          <Text style={styles.headerstext}>Crear Cita</Text>
          {/* <View style={styles.placecontainer}>
            <Left>
              <LocationIcon name="location-pin" size={20} color="#9561F1" />
            </Left>
            <Right>
              <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields: 'geometry'}}
                fetchDetails={true}
                styles={{
                  textInputContainer: {
                    // backgroundColor: 'grey',
                    width: 200,
                  },
                  textInput: {
                    // height: 38,
                    color: '#5d5d5d',
                    // fontSize: 16,
                    borderWidth: 1,
                    borderColor: '#ccc',
                  },
                  listView: {
                    height: 100,
                  },
                }}
                placeholder="Search"
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                    'lat ,long',
                    JSON.stringify(details.geometry.location),
                  );
                }}
                query={{
                  key: myapikeys,
                  language: 'en',
                }}
              />
              
            </Right>
          </View> */}
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Lugar
              </Text>
            </Left>
            <Right>
              <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields: 'geometry'}}
                fetchDetails={true}
                styles={{
                  textInputContainer: {
                    // backgroundColor: 'grey',
                    width: 200,
                  },
                  textInput: {
                    // height: 38,
                    color: '#5d5d5d',
                    // fontSize: 16,
                    borderWidth: 1,
                    borderColor: '#ccc',
                  },
                  listView: {
                    height: 100,
                  },
                }}
                value={'abc'}
                placeholder={'Search'}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log('data', data);
                  console.log('details', details);
                  setPlace(data.description);
                  console.log(
                    'lat ,long',
                    JSON.stringify(details.geometry.location),
                  );
                  setDeparture({
                    lattitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                  });
                  setLat(details.geometry.location.lat);
                  setLong(details.geometry.location.lng);
                  setTimeout(() => {
                    setmap(true);
                  }, 1000);
                }}
                query={{
                  key: myapikeys,
                  language: 'en',
                }}
              />

              {/* <TouchableOpacity
                onPress={() => setVis(true)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                  {place ? place : 'Elige Localidad'}
                </Text>
                <IconFor name={'keyboard-arrow-right'} size={24} />
              </TouchableOpacity> */}
            </Right>
          </View>
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 12, fontFamily: 'Inter-Medium'}}>
                ¿Quién asistirá?
              </Text>
            </Left>
            <Right>
              <View
                style={{
                  flexDirection: 'row',
                  // left: 20,
                  // backgroundColor: 'red',
                }}>
                <View style={{marginRight: 6}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (bothgenders && male) {
                        setmale(true);
                        setfemale(false);
                      } else {
                        setfemale(false);
                        setmale(!male);
                      }
                      setbothgenders(false);
                    }}
                    style={{
                      padding: 6,
                      paddingLeft: 12,
                      paddingRight: 12,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: male ? '#46E1FC' : '#979797',
                    }}>
                    <Text style={styles.text}>Hombre</Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginRight: 6}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (bothgenders && female) {
                        setmale(false);
                        setfemale(true);
                      } else {
                        setfemale(!female);
                        setmale(false);
                      }
                      setbothgenders(false);
                    }}
                    style={{
                      padding: 6,
                      paddingLeft: 12,
                      paddingRight: 12,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: female ? '#46E1FC' : '#979797',
                    }}>
                    <Text style={styles.text}>Mujer</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setbothgenders(!bothgenders);
                    setmale(!bothgenders);
                    setfemale(!bothgenders);
                  }}
                  style={{
                    padding: 6,
                    borderRadius: 20,
                    alignItems: 'center',
                    paddingLeft: 12,
                    paddingRight: 12,
                    justifyContent: 'center',
                    backgroundColor: bothgenders ? '#FF632B' : '#979797',
                  }}>
                  <Text style={styles.text}>Todos</Text>
                </TouchableOpacity>
              </View>
            </Right>
          </View>
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Participantes
              </Text>
            </Left>
            <Right>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    if (increment > 1) {
                      setIncrement(increment - 1);
                      if (selectedUsers.length) {
                        setSelectedUsers([])(dispatch);
                      }
                    }
                  }}
                  style={{
                    padding: 6,
                    borderRadius: 20,
                    backgroundColor: '#f8f8f8',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <IconMinus name={'minus'} size={15} color={'#9561f1'} />
                </TouchableOpacity>
                <View style={{marginLeft: 10, marginRight: 10}}>
                  <View
                    style={{
                      padding: 6,
                      paddingRight: 10,
                      paddingLeft: 10,
                      backgroundColor: '#46E1FC',
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'white',
                        fontFamily: 'Inter-Regular',
                      }}>
                      {increment}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setIncrement(increment + 1);
                    if (selectedUsers.length) {
                      setSelectedUsers([])(dispatch);
                    }
                  }}
                  style={{
                    padding: 6,
                    borderRadius: 20,
                    backgroundColor: '#f8f8f8',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <IconPlus name={'plus'} size={15} color={'#9561f1'} />
                </TouchableOpacity>
              </View>
            </Right>
          </View>
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Invitar amigos
              </Text>
            </Left>
            <Right style={{flex: 0.5}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '60%',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    padding: 6,
                    paddingLeft: 10,
                    paddingRight: 10,
                    backgroundColor: '#46E1FC',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'white',
                      fontFamily: 'Inter-Regular',
                    }}>
                    {selectedUsers.length}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Friendslist', {
                      myitem: increment,
                    })
                  }
                  style={{
                    padding: 6,
                    borderRadius: 20,
                    backgroundColor: '#f8f8f8',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <IconPlus name={'plus'} size={15} color={'#9561f1'} />
                </TouchableOpacity>
              </View>
            </Right>
          </View>
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Fecha
              </Text>
            </Left>
            <Right>
              <TouchableOpacity
                onPress={() => {
                  showDatePicker();
                  // setShowAnd(true);
                }}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                {!date ? (
                  <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                    Calendario
                  </Text>
                ) : (
                  <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                    {show}
                  </Text>
                )}
                <IconFor name={'keyboard-arrow-right'} size={24} />
              </TouchableOpacity>
            </Right>
            <DateTimePickerModal
              isVisible={showAnd}
              mode="date"
              locale={'es'}
              // locale={'fr'}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              minimumDate={
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate(),
                )
              }
            />
            {/* {showAnd && (
              <DateTimePicker
                value={dateP}
                mode={'date'}
                minimumDate={new Date()}
                is24Hour={true}
                display={'calendar'}
                onChange={(event, selectedDate) => {
                  const thisDate = new Date(selectedDate);
                  const currentDate =
                    thisDate.getDate() +
                      '-' +
                      (thisDate.getMonth() + 1) +
                      '-' +
                      thisDate.getFullYear() || date;
                  setShowAnd(false);
                  setShowAnd2(true);
                  setDate(currentDate);
                }}
              />
            )} */}
          </View>
          <View style={styles.placecontainer}>
            <Left>
              <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
                Hora
              </Text>
            </Left>
            <Right>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginRight: 10}}>
                  <TouchableOpacity
                    onPress={() => setShowAnd1(true)}
                    style={{
                      padding: 6,
                      backgroundColor: '#46E1FC',
                      borderRadius: 20,
                    }}>
                    {!time ? (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'white',
                          fontFamily: 'Inter-Regular',
                        }}>
                        02:00pm
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'white',
                          fontFamily: 'Inter-Regular',
                        }}>
                        {time}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </Right>
            <DateTimePickerModal
              isVisible={showAnd1}
              mode="time"
              onConfirm={handleConfirm1}
              onCancel={hideDatePicker1}
            />
            {/* {showAndTime && (
              <DateTimePicker
                value={TimeP}
                mode={'time'}
                is24Hour={true}
                display={'clock'}
                onChange={(event, selectedDate) => {
                  setShowAndTime(false);
                  setShowAndTime2(true);
                  setTime(moment(selectedDate).format('h:mm a'));
                }}
              />
            )} */}
          </View>
          <View style={{width: '93%'}}>
            <MultiSelect
              styleRowList={{backgroundColor: 'white'}}
              styleDropdownMenuSubsection={{
                ...styles.selectdropdown,
                ...{paddingLeft: 10, paddingRight: 5, marginTop: 0},
              }}
              hideTags
              items={bikesarray}
              uniqueKey="id"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Tipo de bici"
              textColor={'#979797'}
              searchInputPlaceholderText=""
              searchIcon={false}
              tagRemoveIconColor={'blue'}
              tagBorderColor={'skyblue'}
              tagTextColor={'skybllue'}
              selectedItemTextColor={'skyblue'}
              selectedItemIconColor={'skyblue'}
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{color: '#000'}}
              submitButtonColor={'skyblue'}
              submitButtonText="Seleccionar"
              textInputProps={{editable: false, autoFocus: false}}
              styleInputGroup={{display: 'none'}}
            />
          </View>
          <View
            style={{
              height: 45,
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              borderTopColor: '#e2e2e2',
              borderBottomColor: '#e2e2e2',
              width: '90%',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
            }}>
            <Text style={{fontSize: 14, fontFamily: 'Inter-Medium'}}>
              Nivel
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 28,
                alignItems: 'flex-end',
                justifyContent: 'center',
                width: '80%',
              }}>
              <View style={{marginLeft: '45%'}}>
                <CheckBox
                  center
                  checkedIcon={
                    <Image
                      source={require('../../../assets/Circles/Circlegreen_tick.png')}
                      style={{height: 25, width: 25, resizeMode: 'contain'}}
                    />
                  }
                  uncheckedIcon={
                    <Image
                      source={require('../../../assets/Circles/Circlegreen.png')}
                      style={{height: 25, width: 25, resizeMode: 'contain'}}
                    />
                  }
                  checked={check1}
                  onPress={() => setcheck1(!check1)}
                />
              </View>

              <View style={{right: 15}}>
                <CheckBox
                  center
                  checkedIcon={
                    <Image
                      source={require('../../../assets/Circles/Circleorange_tick.png')}
                      style={{height: 25, width: 25, resizeMode: 'contain'}}
                    />
                  }
                  uncheckedIcon={
                    <Image
                      source={require('../../../assets/Circles/Circleorange.png')}
                      style={{height: 25, width: 25, resizeMode: 'contain'}}
                    />
                  }
                  checked={check2}
                  onPress={() => setcheck2(!check2)}
                />
              </View>
              <View style={{right: 30}}>
                <CheckBox
                  center
                  checkedIcon={
                    <Image
                      source={require('../../../assets/Circles/Circleblue_tick.png')}
                      style={{height: 25, width: 25, resizeMode: 'contain'}}
                    />
                  }
                  uncheckedIcon={
                    <Image
                      source={require('../../../assets/Circles/Circleblue.png')}
                      style={{height: 25, width: 25, resizeMode: 'contain'}}
                    />
                  }
                  checked={check3}
                  onPress={() => setcheck3(!check3)}
                />
              </View>
              <View style={{right: 45}}>
                <CheckBox
                  center
                  checkedIcon={
                    <Image
                      source={require('../../../assets/Circles/Circlepink_tick.png')}
                      style={{height: 25, width: 25, resizeMode: 'contain'}}
                    />
                  }
                  uncheckedIcon={
                    <Image
                      source={require('../../../assets/Circles/Circlepink.png')}
                      style={{height: 25, width: 25, resizeMode: 'contain'}}
                    />
                  }
                  checked={check4}
                  onPress={() => setcheck4(!check4)}
                />
              </View>
            </View>
          </View>
          <View style={{height: 15}} />
          <TextInput
            textAlignVertical={'top'}
            style={{
              borderWidth: 0,
              width: '90%',
              borderRadius: 4,
              backgroundColor: '#e2e2e2',
              height: 100,
              padding: 4,
              paddingLeft: 8,
              color: 'black',
              fontFamily: 'Inter-Regular',
              fontSize: 14,
            }}
            placeholder={'Descripción de la ruta'}
            value={introduction}
            onChangeText={(text) => setIntrodunction(text)}
            underlineColorAndroid="transparent"
            multiline
          />
          <View style={{height: 18}} />
          <View
            style={{
              height: 120,
              borderRadius: 6,
              flexDirection: 'row',
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {showimages ? (
              <TouchableOpacity
                onPress={() => chooseImage(true)}
                style={{
                  height: 120,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  width: '50%',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                  }}>
                  <Image
                    source={{uri: image.path}}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => chooseImage(true)}
                style={{
                  height: 120,
                  flexDirection: 'row',
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: 'black',
                }}>
                <IconPlaceholder name={'image'} size={80} color={'#dfdfdf'} />
              </TouchableOpacity>
            )}
            {maps ? (
              <TouchableOpacity
                style={{zIndex: 3}}
                // onPress={() => {
                //   console.log('i am logged');
                //   maps && setShowBigger(true);
                // }}
                // onLongPress={() => {
                //   setShowBigger(false);
                // }}
                style={{
                  height: 120,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  width: '50%',
                  marginLeft: 3,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                  }}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{flex: 1}}
                    region={{
                      latitude: lat ? parseFloat(lat) : 37.78825,
                      longitude: long ? parseFloat(long) : -122.4324,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}>
                    {/* {list()} */}
                    {/* <Marker
                coordinate={{
                  latitude: parseFloat(user.userdata.latitude),
                  longitude: parseFloat(user.userdata.longitude),
                  // latitudeDelta: 0.0922,
                  // longitudeDelta: 0.0421,
                }}
                // pinColor="red"
                // image={{uri: element.profile_image}}
              /> */}
                    {lat ? (
                      <Marker
                        // draggable
                        coordinate={{latitude: lat, longitude: long}}
                        onDragEnd={(e) => {
                          setDeparture(e.nativeEvent.coordinate);
                        }}
                      />
                    ) : null}
                    {/* <Marker
                      // draggable
                      coordinate={{
                        latitude: parseFloat(user?.userdata?.latitude),
                        longitude: parseFloat(user?.userdata?.longitude),
                      }}
                      onDragEnd={(e) => {
                        setDeparture(e.nativeEvent.coordinate);
                      }}
                    /> */}
                  </MapView>
                  <TouchableOpacity
                    onPress={() => maps && setShowBigger(true)}
                    style={{
                      // backgroundColor: 'red',
                      position: 'absolute',
                      height: 120,
                      width: '100%',
                    }}></TouchableOpacity>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                // onPress={() => setmap(true)}
                style={{
                  height: 120,
                  // backgroundColor: '#979797',
                  width: '50%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: 'black',
                  marginLeft: 3,
                }}>
                <MapIcon name={'map-pin'} size={50} color={'grey'} />
              </TouchableOpacity>
            )}
          </View>

          <View style={{height: 30}} />
          <View style={{flexDirection: 'row', width: '90%'}}>
            <Left>
              <Text>Ruta Privada</Text>
            </Left>
            <Body></Body>
            <Right>
              <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 6}}>
                  <TouchableOpacity
                    onPress={() => {
                      setprivatedata(!privatedata);
                      setpublicdata(false);
                    }}
                    style={{
                      padding: 4,
                      paddingRight: 25,
                      paddingLeft: 25,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: privatedata ? '#46E1FC' : '#979797',
                    }}>
                    <Text style={{color: 'white'}}>Si</Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginRight: 6}}>
                  <TouchableOpacity
                    onPress={() => {
                      setpublicdata(!publicdata);
                      setprivatedata(false);
                    }}
                    style={{
                      padding: 4,
                      paddingRight: 25,
                      paddingLeft: 25,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: publicdata ? '#46E1FC' : '#979797',
                    }}>
                    <Text style={{color: 'white'}}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Right>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <ButtonComp
            onPress={() => CreateApointmentFunction()}
            style={{backgroundColor: '#9561F1', borderRadius: 6}}
            title={'Crear'}
          />
        </View>
        {keyboardStatus && <View style={{height: 250}} />}
        {/* <View style={{backgroundColor: 'red'}}>
          <GooglePlacesAutocomplete
            keyboardShouldPersistTaps="always"
            styles={{
              textInputContainer: {
                // backgroundColor: 'grey',
                width: 200,
              },
              textInput: {
                // height: 38,
                color: '#5d5d5d',
                // fontSize: 16,
                borderWidth: 1,
                borderColor: '#ccc',
              },
              listView: {
                backgroundColor: 'red',
              },
            }}
            placeholder="Search"
            onPress={(data, details = null) => {
              Alert.alert('hello');
              // 'details' is provided when fetchDetails = true
                    }}
            query={{
              key: myapikey,
              language: 'en',
            }}
          />
        </View> */}
      </ScrollView>
      {loading ? <Loader /> : null}
      {myModal1()}
      {myModal2()}
    </View>
  );
};

export default Creacita_Createapointment;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 10,
  },
  selectdropdown: {
    marginTop: 14,
    backgroundColor: '#dfdfdf',
    height: 40,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 6,
  },
  subcontainer: {
    flex: 5,
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  switchcontainer: {
    flexDirection: 'row',
    margin: 14,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.3,
    borderRadius: 5,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {},
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  firstbtn: {
    padding: 6,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF632B',
  },
  colorchangeviewbtns: {
    padding: 6,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46E1FC',
  },
  placecontainer: {
    flexDirection: 'row',
    margin: 14,
    bottom: 12,
  },
  bottomcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapiconview: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#38D836',
  },
  headerstext: {
    fontSize: 18,
    padding: 10,
    color: '#979797',
    fontFamily: 'Inter-Regular',
    bottom: 25,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#000',
    width: '90%',
    backgroundColor: '#f8f8f8',
  },
});
