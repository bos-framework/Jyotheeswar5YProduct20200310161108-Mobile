import React, { Component } from "react";
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import Helper from '../../Utilities/helper';
import Fonts from "../../Resources/fonts";

class Status extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subModules: [],
            operations: [],
            message: ""
        };
    }

    componentDidMount() {

        Helper.getSubModulesForModuleName("Status", (status, result) => {
            if (status) {
                this.setState({ subModules: result.subModules, operations: result.operations })
            } else {
                this.setState({ message: result })
            }
        });
    }

    flatListItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }} />
        );
    };

    onSelectRow(index) {

        let operation = this.state.subModules[index].operations;
        this.props.navigation.navigate("DetailsScreen", {
            operations: operation,
            title: this.state.subModules[index].name
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <View style={styles.container}>
                    {
                        this.state.subModules.length > 0 ? (<FlatList
                            style={styles.list}
                            data={this.state.subModules}
                            ItemSeparatorComponent={this.flatListItemSeparator}
                            renderItem={({ index, item }) => (
                                <TouchableOpacity onPress={() => { this.onSelectRow(index) }}>
                                    <View style={styles.row} >
                                        <View style={{ flex: 0.9, justifyContent: "center" }}>
                                            <Text style={styles.item}> {item.name} </Text>
                                        </View>
                                        <View style={{ flex: 0.1, alignItems: "flex-end" }}>
                                            <Image styles={{ width: 10, height: 10 }} source={require('../../Assets/Images/next.png')} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(index) => index.toString()}
                        />) : (<Text>{this.state.message}</Text>)
                    }
                </View >
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    name: {
        height: 30,
        fontSize: 17,
        marginLeft: 12,
        color: "#000",
        justifyContent: "center",
    },
    item: {
        fontSize: 17,
        paddingLeft: 10,
        fontFamily: Fonts.fontFamily
    },
    list: {
        margin: 10,
    },
    row: {
        height: 44,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Status;
