import React from 'react'
import { ScrollView, SafeAreaView, View } from 'react-native'
import { DrawerNavigatorItems, DrawerItems } from 'react-navigation-drawer'

export default function SideBar(props) {
    const ScreensPerms = ['Home', 'Details', 'Contact']
    return (
        <ScrollView>
            <SafeAreaView>
                <View forceInsect={{ top: "always", horizontal: "never"}}>
                    <DrawerNavigatorItems {...props} 
                        items={ props.items.filter( e => ScreensPerms.indexOf(e.key) != -1 )}/>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}