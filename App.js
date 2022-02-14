import React from "react";
import { StyleSheet, Text, SafeAreaView, Pressable, Image, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors"
import SongItem from "./components/SongItem";
import millisToMinutesAndSeconds from "./utils/millisToMinuteSeconds";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SongDetails from "./components/SongDetails";
import SongPreview from "./components/SongPreview";

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState("");  // when true, show list of songs
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  // useEffect tells React to execute callback when 'response' changed between renderings
  // this function updates token
  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  // this function selects the track
  useEffect(() => {
    if (token) {
      // TODO: Select which option you want: Top Tracks or Album Tracks
      // Comment out the one you are not using
      myTopTracks(setTracks, token);
      // albumTracks(ALBUM_ID, setTracks, token);
    }
  }, [token]);

  // load data for songs
  const DATA = []
  song_num = 1
  for (const song in tracks) {
    song_object = tracks[song]
    let dict = {
      image: song_object["album"]["images"][2]["url"],
      title: song_object["name"],
      artist: song_object["album"]["artists"][0]["name"],
      album: song_object["album"]["name"],
      duration: millisToMinutesAndSeconds(song_object["duration_ms"]),
      id: song_num.toString(),
      external_url: song_object["external_urls"]["spotify"],
      preview_url: song_object["preview_url"]
    }
    song_num += 1
    DATA.push(dict)
  }
  // render songs
  const renderItem = (item, navigation) => (
    <SongItem
      image={item.image}
      title={item.title}
      artist={item.artist}
      album={item.album}
      duration={item.duration}
      id={item.id}
      external_url={item.external_url}
      preview_url={item.preview_url} 
      navigation={navigation}
      />
  );

  function SongList({ navigation }) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleRow}>
          <View style={styles.connect_view}>
            <Image source={require("./assets/spotify-logo.png")} style={styles.spotify_logo}/>
            <Text style={styles.connect_text}>My Top Tracks</Text>
          </View>
        </View>
  
        <FlatList
          data={DATA} // the array of data that the FlatList displays
          renderItem={({item}) => renderItem(item, navigation)} // function that renders each item
          keyExtractor={(item) => item.id} // unique key for each item
        />
      </SafeAreaView>
    );
  }

  let contentDisplays = null;
  if (token) {
    contentDisplays = (
      <NavigationContainer>
        <Stack.Navigator
        screenOptions= {{
            headerStyle: {
              backgroundColor: Colors.background,
            },
            headerTitleStyle: {
              color: 'white',
            }
        }}>
            <Stack.Screen 
                name="Song List" 
                options={{headerShown: false}}
                component={SongList}
            />
            <Stack.Screen name="Song Details" component={SongDetails}
                options={{
                  title: 'Song details',
                  headerTitleStyle: {
                    color: "white"
                  },
                  headerBackTitle: "Back"
                }}
            />
            <Stack.Screen name="Song Preview" component={SongPreview}
                options={{
                  title: 'Song preview',
                  headerTitleStyle: {
                    color: "white"
                  },
                  headerBackTitle: "Back"
                }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    contentDisplays = (
      <SafeAreaView style={styles.container}>
        <Pressable
          onPress={() => {
            promptAsync() // trigger spotify auth
          }}
          style={styles.pressable_connect}>
            <View style={styles.connect_view}>
              <Image source={require("./assets/spotify-logo.png")} style={styles.spotify_logo}/>
              <Text style={styles.connect_text}>
                CONNECT WITH SPOTIFY
              </Text>
            </View>
        </Pressable>
      </SafeAreaView>
    )
  }

  return (
      contentDisplays // this returns the content
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  spotify_logo: {
    width: 30,
    height: 30,
    margin: 5
  },
  connect_text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    margin: 5
  },
  connect_view: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  pressable_connect: {
    backgroundColor: Colors.spotify,
    borderRadius: 99999,
  },
  titleRow: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center'
  },
});
