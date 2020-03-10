import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Helper from '../../Utilities/helper';
import Fonts from "../../Resources/fonts";

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subOperations: [],
            message: "",
            operations: props.navigation.getParam("operations", [])
        };
    }

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`
    });

    componentDidMount() {

        if (this.state.operations.length > 0) {
            Helper.getOperations(this.state.operations, "name", (status, result) => {
                if (status) {
                    this.setState({ subOperations: result })
                }
            })
        }
    }

    flatListItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ alignSelf: "center", marginTop: 10, fontFamily: Fonts.fontFamily }}> SubModule -> Operations </Text>
                {
                    this.state.subOperations.length > 0 ? (<FlatList
                        style={{ margin:10 }}
                        data={this.state.subOperations}
                        ItemSeparatorComponent={this.flatListItemSeparator}
                        renderItem={({ item }) => (
                            <View style={{ height: 44 }}>
                                <Text style={styles.item}>
                                    {item}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(index) => index.toString()}
                    />) : (<Text>{this.state.message}</Text>)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        flex: 0.8,
        height: 25,
        lineHeight: 25,
        fontSize: 17,
        marginLeft: 12,
        color: "#000",
        justifyContent: "center",
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        fontFamily: Fonts.fontFamily
    }
});

export default Details;
