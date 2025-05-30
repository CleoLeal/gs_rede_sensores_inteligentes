import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  container: { flex:1, padding:20, backgroundColor:'#F0F8FF' },
  label: { fontSize:16, marginBottom:5, color:'#333' },
  input: {
    backgroundColor:'#fff',
    borderColor:'#ccc',
    borderWidth:1,
    borderRadius:5,
    marginBottom:20,
    paddingHorizontal:10,
    height:40,
  },
  title: { fontSize:24, fontWeight:'bold', marginBottom:10, textAlign:'center' },
  item: {
    backgroundColor:'#fff',
    padding:10,
    borderRadius:6,
    marginVertical:6,
    borderColor:'#ccc',
    borderWidth:1,
  },
  btn: {
    marginTop:20,
    marginHorizontal:50,
  },
  empty: {
    fontStyle:'italic',
    color:'#555',
    textAlign:'center',
    marginTop:50,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  boldText: {
    fontWeight: 'bold',
  },
  linkButton: {
    backgroundColor: '#0056b3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  risk: { fontSize:20, fontWeight:'bold', marginTop:15 },
  subtitle: { fontSize:18, textAlign:'center', marginBottom:40, color:'#555' },
  container_welcome: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#F0F8FF', padding:20 },
  title_welcome: { fontSize:32, fontWeight:'bold', marginBottom:10, color:'#333' },
  subtitle_welcome: { fontSize:18, textAlign:'center', marginBottom:40, color:'#555' },
});

export default Styles;
