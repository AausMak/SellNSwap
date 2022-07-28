import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      dropdownHeight: 40
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  async addPost() {
    if (
      this.state.ProductName &&
      this.state.description &&
      this.state.Amount &&
      this.state.ContactNumber
    ) {
      let postData = {
        ProductName: this.state.ProductName,
        description: this.state.description,
        Amount: this.state.Amount,
        ContactNumber: this.state.ContactNumber,
        author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_uid: firebase.auth().currentUser.uid,
        likes: 0
      };
      await firebase
        .database()
        .ref(
          "/posts/" +
            Math.random()
              .toString(36)
              .slice(2)
        )
        .set(postData)
        .then(function(snapshot) {});
      this.props.setUpdateToTrue();
      this.props.navigation.navigate("Feed");
    } else {
      Alert.alert(
        "Error",
        "All fields are required!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } 
    else {

      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
                New Post
              </Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              <View style={styles.submitButton}>
                <Button
                  onPress={() => this.addPost()}
                  title="Submit"
                  color="#841584"
                />
              </View>

              <TouchableOpacity onPress={()=>this.sellProducts}>
                  <Text>SELL</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.swapProducts}>
                  <Text>SWAP</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

sellProducts=()=>{
          <View>
                <TextInput
                  style={
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont
                  }
                  onChangeText={ProductName => this.setState({ ProductName })}
                  multiline={true}
                  numberOfLines={2}
                  placeholder={"Product Name"}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                  onChangeText={description => this.setState({ description })}
                  placeholder={"Description"}
                  multiline={true}
                  numberOfLines={12}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                  onChangeText={Amount => this.setState({ Amount  })}
                  placeholder={"Amount"}
                  keyboardType="number-pad"
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                  onChangeText={ContactNumber => this.setState({ ContactNumber })}
                  placeholder={"Contact Information"}
                  keyboardType="number-pad"
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
        </View>
}

swapProducts=()=>{
  <View>
  <TextInput
  style={
    this.state.light_theme
      ? styles.inputFontLight
      : styles.inputFont
  }
  onChangeText={ProductName => this.setState({ ProductName })}
  multiline={true}
  numberOfLines={2}
  placeholder={"Product Name"}
  placeholderTextColor={
    this.state.light_theme ? "black" : "white"
  }
/>
<TextInput
  style={[
    this.state.light_theme
      ? styles.inputFontLight
      : styles.inputFont,
    styles.inputFontExtra,
    styles.inputTextBig
  ]}
  onChangeText={description => this.setState({ description })}
  placeholder={"Description"}
  multiline={true}
  numberOfLines={12}
  placeholderTextColor={
    this.state.light_theme ? "black" : "white"
  }
/>
<TextInput
  style={[
    this.state.light_theme
      ? styles.inputFontLight
      : styles.inputFont,
    styles.inputFontExtra,
    styles.inputTextBig
  ]}
  onChangeText={Amount => this.setState({ Amount  })}
  placeholder={"Amount"}
  keyboardType="number-pad"
  placeholderTextColor={
    this.state.light_theme ? "black" : "white"
  }
/>
<TextInput
  style={[
    this.state.light_theme
      ? styles.inputFontLight
      : styles.inputFont,
    styles.inputFontExtra,
    styles.inputTextBig
  ]}
  onChangeText={ContactNumber => this.setState({ ContactNumber })}
  placeholder={"Contact Information"}
  keyboardType="number-pad"
  placeholderTextColor={
    this.state.light_theme ? "black" : "white"
  }
/>
</View>
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  fieldsContainer: {
    flex: 0.85
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain"
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans"
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "black",
    fontFamily: "Bubblegum-Sans"
  },
  dropdownLabel: {
    color: "white",
    fontFamily: "Bubblegum-Sans"
  },
  dropdownLabelLight: {
    color: "black",
    fontFamily: "Bubblegum-Sans"
  },
  inputFontExtra: {
    marginTop: RFValue(15)
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5)
  },
  submitButton: {
    marginTop: RFValue(20),
    alignItems: "center",
    justifyContent: "center"
  }
});
