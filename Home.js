import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { apiCall, customerSelectors, otpApiCall } from './redux/reducer';

const Home = () => {
    const dispatch = useDispatch()
    const { apiResponse, otpResponse } = customerSelectors()

    console.log("apiResponse>>>>", apiResponse)
    console.log("otpResponse>>>>", otpResponse)
    
    useEffect(() => {

    }, [otpResponse, apiResponse])

    const data = {
        Mobile_No: '+919898989898',
        pageNumber: 0,
        pageSize: 99,
    }

    const response = () => {
        console.log("sdfsadfsdf")
        dispatch(apiCall(data))
    }

    const LikeFunction = () => {
        likeData = {
            mobile_No: '+919898989898',
        }
        dispatch(otpApiCall(likeData))
    }
    const renderItem = ({ item }) => {

        return (
            <View>
                <Text style={{ fontSize: 30, color: 'purple' }}>{item.name}</Text>
                <Text style={{ fontSize: 30, color: 'purple' }}>{item.likecount}</Text>
                <TouchableOpacity onPress={() => LikeFunction()}><Text>Like status</Text></TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            <Text>home page</Text>
            <FlatList data={apiResponse?.items}
                renderItem={renderItem}
            />
            <Button onPress={() => response()} title='click' />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})