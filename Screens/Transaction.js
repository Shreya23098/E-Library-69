import React,{Component} from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import Permissions from "expo-permissions";
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TranscationScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            domState: "normal",
            hasCameraPermissions: null,
            scanned: false,
            scannedData:""
        }
    }
    getCameraPermissions= async domState =>{
       const {status}= await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === "granted",
            domState:  domState,
            scanned: false,

        });
        handleBarCodeScanned= async()=>{
            this.setState({
                scanned: true,
                scannedData:data,
                domState: "normal",
                
            });
        }
    }
    render(){
        const {domState,hasCameraPermissions,scanned,scannedData} = this.state;
        if(domState === "scanner"){
            return(
                <BarCodeScanner 
                onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}/>
            );
        }
        return(
            <View style={styles.container}>
                <TouchableOpacity style={[styles.button,{marginTop:25}]}
                onPress={()=> this.getCameraPermissions("scanner")}>
                    <Text style={styles.text}>QR CODE</Text>
                </TouchableOpacity>

            
            </View>
        )
    }
} 


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"blue"
    },
    text:{
        color:"white",
        fontSize:30
    },
    button: {
        width: "43%",
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F48D20",
        borderRadius: 15
      },
      buttonText: {
        fontSize: 24,
        color: "#FFFFFF"
      }
});