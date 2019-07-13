import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

var { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0
  },
  image: {
    width: 25,
    height: 25
  },
  text1: {
    fontSize: 10,
    paddingTop: 5,
    fontWeight: 'bold'
  },
  headerButton: {
    position: 'absolute',
    top: 17,
    right: 17
  },
  headerButtonIcon: {
    color: 'gray',
    fontSize: 25
  },
  header: {
    width: width,
    elevation: 5,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.95)'
  },
  headerBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  content: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: width
  },
  avatarBox: {
    paddingRight: 15,
    paddingVertical: 10
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#19FAC2'
  },
  usernameBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  usernameitem1: {
    width: 220,
    padding: 5,
    elevation: 2,
    paddingLeft: 30,
    marginBottom: 8,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 5
  },
  usernameText1: {
    fontSize: 18,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold'
  },
  usernameitem2: {
    width: 220,
    padding: 5,
    paddingLeft: 30,
    marginTop: 8,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 5
  },
  usernameText2: {
    fontSize: 18,
    fontFamily: 'sans-serif-condensed'
  },
  menuBox: {
    elevation: 10,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.97)',
    width: width,
    height: 400,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 80,
    padding: 20
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderBottomColor: '#19FAC2',
    borderBottomWidth: 2
  },
  menuHeaderText: {
    fontSize: 20,
    fontFamily: 'sans-serif-condensed',
    fontWeight: 'bold'
  },
  menuItem: {
    width: width,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingVertical: 20
  },
  menuItemBox: {
    backgroundColor: 'rgba(7,240,177,0.18)',
    padding: 10,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 80,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: 270,
    margin: 10
  },
  menuItemThumbnail: {
    borderColor: '#1FD6EC',
    marginLeft: 5,
    borderWidth: 2,
    backgroundColor: '#EFEFEF'
  },
  menuItemText: {
    marginLeft: 20,
    fontSize: 18,
    fontFamily: 'sans-serif-medium'
  }
});

export default styles;
