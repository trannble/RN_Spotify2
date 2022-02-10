import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import Colors from "../Themes/colors"
import { AntDesign } from '@expo/vector-icons';

export default function SongItem({image, title, artist, album, duration, id, external_url, preview_url, navigation}) {
    return (
    <Pressable
        onPress={() => {
            navigation.navigate('Song Details', {external_url: external_url})
        }}>
            <View style={styles.item}>
                <View style={styles.index}>
                    <Pressable 
                        onPress={(e) => {
                            e.stopPropagation();
                            navigation.navigate('Song Preview', {preview_url: preview_url})
                        }}>
                        <AntDesign size={15} color={Colors.spotify} name="play" />
                    </Pressable>
                </View>
                <View style={styles.image}>
                    <Image source={{uri: image}} style={{width: '80%', height: '80%'}}/>
                </View>
                <View style={styles.title_and_artist}>
                    <Text numberOfLines={1} style={styles.primary_text}>{title}</Text>
                    <Text numberOfLines={1} style={styles.secondary_text}>{artist}</Text>
                </View>
                <View style={styles.album}>
                    <Text numberOfLines={1} style={styles.primary_text}>{album}</Text>
                </View>
                <View style={styles.duration}>
                    <Text style={styles.primary_text}>{duration}</Text>
                </View>
            </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    item: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 70,
        marginLeft: "2%"
    },
    index: {
        width: "8%",
    },
    image: {
        width: "18%",
    },
    title_and_artist: {
        width: "35%"
    },
    album: {
        width: "25%"
    },
    duration: {
        width: "10%"
    },
    primary_text: {
        fontSize: 15,
        color: "white",
    },
    secondary_text: {
        fontSize: 15,
        color: Colors.gray
    }
})
