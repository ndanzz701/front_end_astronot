import {StyleSheet} from 'react-native'
import {Dimensions} from 'react-native'

var {width,height}=Dimensions.get('window')

const styles = StyleSheet.create({
    contentItem3: {
        flexDirection:'row',
        margin:10
    },
    container: {
        flex:1,
        margin:0
    },
    content: {
        flex:1,
        height:height,
        alignItems:'center',
        justifyContent:'center'
    },
    content2: {
        backgroundColor:'rgba(31,52,67,0.1)',
        borderRadius:30
    },
    contentItem: {
        flexDirection:'column',
        alignItems:'center',
        position:'absolute',
        top:5,
        margin:20
    },
    image: {
        width:50,
        height:50
    },
    text1: {
        fontSize:13,
        paddingTop:5,
        fontWeight:'bold'
    },
    contentItem2: {
        padding:20,
        flexDirection:'column',
        alignItems:'center',
    },
    inputBox: {
        flexDirection:'row',
        minWidth: 300,
        padding: 5,
        paddingHorizontal:40,
        margin: 10,
        alignSelf: 'stretch',
        borderTopRightRadius:40,
        borderTopLeftRadius:5,
        borderBottomRightRadius:5,
        borderBottomLeftRadius:40,
        backgroundColor: 'rgba(92,178,251,0.9)'
    },
    inputText: {
        fontSize: 18,
        color: 'white',
        width:200
    },
    inputText2: {
        fontSize: 18,
        color: 'white',
        width:200
    },
    iconBox: {
        alignItems:'center',
        justifyContent:'center'
    },
    iconItem: {
        fontSize:20,
        color:'white'
    },
    inputBox2: {
        flexDirection:'row',
        minWidth: 300,
        minHeight:55,
        padding: 10,
        paddingHorizontal:20,
        margin: 10,
        alignItems:'center',
        justifyContent:'center',
        alignSelf: 'stretch',
        borderColor:'white',
        borderWidth:0.5,
        borderTopRightRadius:5,
        borderTopLeftRadius:40,
        borderBottomRightRadius:40,
        borderBottomLeftRadius:5,
        backgroundColor: 'rgba(56,150,246,0.8)'
    },
    iconItem2: {
        fontSize: 18,
        color: 'white',
        fontWeight:'bold'
    },
    contentItem3: {
        flexDirection:'row',
        margin:10
    },
    contentItem4: {
        flexDirection:'column',
        alignItems:'center',
        borderBottomColor:'#E4F1FD',
        borderBottomWidth:0.5,
        padding:15
    },
    text2: {
        fontSize:15
    },
    inputBox3: {
        paddingHorizontal:7
    },
    text3: {
        fontWeight:'bold', 
        fontSize:15
    },
    text4: {
        fontSize:22,
        fontWeight:'bold',
        color:'#EEFBFD'
    }
})

export default styles