import React from 'react'
import { View, Text, Button } from 'react-native'
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';


class HomeScreen extends React.Component {

    static navigationOptions = {
        headerRight: () => (
            <Button
                onPress={() => this.props.navigation.toggleDrawer()}
                title="Info"
                color="#fff"
            />
        ),
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Ir a detalle"
                    onPress={() => this.props.navigation.navigate('Details',
                        {
                            item_id: 5
                        })}
                />
                {/* <Button
                    onPress={() => this.props.navigation.toggleDrawer()}
                    title="Ver menu"
                    color="#fff"
                /> */}
            </View>
        );
    }
}

export default HomeScreen;