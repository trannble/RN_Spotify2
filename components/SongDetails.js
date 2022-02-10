import React from 'react';
import { WebView } from 'react-native-webview';

export default function SongDetails({ navigation, route }) {
    return <WebView source={{ uri: route.params.external_url}} />
}