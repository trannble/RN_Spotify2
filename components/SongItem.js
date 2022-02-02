import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "../Themes/colors"

export default function SongItem({index, image, title, artist, album, duration, id}) {
  return (
    <View style={styles.item}>
        <View style={styles.index}>
            <Text style={styles.secondary_text}>{index}</Text>
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
  );
}

const styles = StyleSheet.create({
    item: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 70
    },
    index: {
        width: "10%",
    },
    image: {
        width: "20%",
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
