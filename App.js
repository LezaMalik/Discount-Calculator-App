import React, { useState } from 'react';
import { Button, StyleSheet,Text, TextInput, TouchableOpacity, View,FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DataTable } from 'react-native-paper';


function HomeScreen({navigation}) {
  const [getPrice, setPrice] = useState(""); 
  const [getDiscount, setDiscount] = useState("");
  const [getFinal,setFinal] = useState(0);
  const [getSave, setSave] = useState(0);

  const [getArray, setArray] = useState([]);

    //Function to calculate: You Save:
  const DiscountFunction = (value)  =>{
    if(value>0 && value<=100){
      setDiscount(value)
      var a= getPrice * ( value / 100)
      a = Math.round(a*100)/100
      setSave(a);

      var b =getPrice - a 
      b = Math.round(b*100)/100
      setFinal(b);
    }

    else{
      alert("Please Between 0 - 100%") 
    }
   
  }

  //Function to calculate: Total Price:
    const PriceFunction = (value)  =>{
      if(value>0){
          setPrice(value)
          var a = getPrice;
          var b= a * ( getDiscount / 10)
          b = Math.round(b*100)/100
          setSave(b);

          var c =value - b 
          c = Math.round(c*100)/100
          setFinal(c);
      }

      else{alert("Please Enter a Positive Value")}
   


  }

  //Function to Check if the user has entered any input
  const checkFn = () => {
    if ((getPrice.length <=0) && (getDiscount.length <=0) ) {
      return true;
    }
    else
    return false;

  }

 

    React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.button}       
          onPress={() => navigation.navigate
          ("History",{keepHistoryObj: {getArray, setArray} ,   historyTemp: getArray
      })}>
          <Text style={{fontFamily: 'Serial', fontSize: 15, color: '#dde3e4', margin: 2}}>
            History</Text>
        </TouchableOpacity>),
    });
  }, );
  

  return (  
    <View style={styles.container}>  
    <Text style = {styles.headerStyle} >DISCOUNT APP</Text>
    <Text style= {{color: '#050708', fontSize: 15, textAlign: 'center', margin: 10, fontFamily:'Bookman Old Style', fontStyle: "italic"}}>
      Find Your Discounted Prices!</Text>

    <TextInput  style={styles.textInputStyle} 
                placeholder= "Original Price" 
                onChangeText= {(value)=>PriceFunction(value) }>
    </TextInput>   
    <TextInput style={styles.textInputStyle} 
                placeholder = "Discount Percentage" 
                onChangeText= {(value)=>DiscountFunction(value) }>
    </TextInput>

    <View style={styles.container2}>

    <View style={{flexDirection: 'col' , margin: 5}} >
   <Text style={styles.textStyle} >Final Price: {getFinal} </Text>
   <Text style={styles.textStyle}>You Save: {getSave} </Text>
   </View>
   <TouchableOpacity style={styles.button} 
                      onPress={() => 
                        {setArray([...getArray,
                        {Price: { getPrice}, Discount: { getDiscount }, 
                        DiscountPrice: { getFinal }} ]) }}
                        disabled={checkFn()} >
                      
          
    <Text style={{fontFamily: 'Serial', fontSize: 15, color: '#dde3e4', margin: 2}} 
     >Save</Text>
     
  </TouchableOpacity>
  </View>
    </View>
  );
  }


//Screen 2: Display History Screen
  function HistoryScreen({navigation, route}) {
    
      const {getArray, setArray} = route.params.keepHistoryObj;
      const [getTempHistory, setTempHistory] = useState(route.params.historyTemp);

 
        //Delete items from the list
        const deleteItem = (index) => {       
        setTempHistory(getTempHistory.filter((item, i) => (i != index ? item : null)));
       setArray(getArray.filter((item, i) => i != index ? item: null ))
       
      }

        

    React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (

          //Delete Button on top right corner to delete all the items from the list
          <TouchableOpacity
          style={styles.button}
          onPress={() => {setArray([]), navigation.navigate("Home")}}>
          <Text style={{fontFamily:'Serial',fontSize:15,color:'#dde3e4', margin:2}}>
          Delete All </Text>
        </TouchableOpacity>)});},);

    return(
      <View style={styles.container}>    
    <Text style= {{color: 'grey',fontWeight:'bold', fontSize:26, textAlign: 'center', marginTop: 35, fontFamily:'Bookman Old Style'}}>
      View History Here!</Text>
      
     
       <View style={styles.container}>
    <DataTable  style={{ borderWidth: 4, height: 350, }}>
            <DataTable.Header style={{ borderWidth: 3,  alignItems: 'center', justifyContent:'center', backgroundColor:'#365c60', borderColor: '#1c2223', borderStyle: 'dashed'}}>
            
            <DataTable.Cell> <Text style= {{fontWeight: 'bold', color: '#101b1c'}}>
            Price</Text></DataTable.Cell>

            <DataTable.Cell><Text style= {{fontWeight: 'bold', color: '#101b1c'}}>
             Discount</Text></DataTable.Cell>

             <DataTable.Cell><Text style= {{fontWeight: 'bold', color: '#101b1c'}}> 
             Final Price</Text></DataTable.Cell>
            
          </DataTable.Header>

         
          <FlatList
            style={{ height: 480, width: 280}}
            data={getTempHistory}
            renderItem={({ item, index }) => {
              
                return (
                    //Taking items from the Flatlist to display in datatable
                    <DataTable.Row >
                      <DataTable.Cell style={{fontSize: 12}}>
                      Rs {item.Price.getPrice}</DataTable.Cell>

                      <DataTable.Cell style={{fontSize: 12,alignItems: 'center', 
                      justifyContent: 'center' }}>
                        {item.Discount.getDiscount}%
                      </DataTable.Cell>

                      <DataTable.Cell style={{fontSize: 12,alignItems: 'center', 
                      justifyContent: 'center' }}>
                        Rs {item.DiscountPrice.getFinal}

                      </DataTable.Cell>
                      
                    
                    <TouchableOpacity
                style={{             
                backgroundColor: 'black',
                borderWidth: 1,
                borderColor: 'grey',
                width: 25,
                height: 25,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 6,
                marginRight: 0,
                marginBottom: 3,
                marginTop: 8
              }}
              onPress={()=> deleteItem(index)}            
              
            >
              <Text style={{color:'grey', fontsize:6, textAlign:'center' }}>X</Text>
            </TouchableOpacity>
                    </DataTable.Row>
                 
                );
               
              }
            }

          />
          </DataTable>      
        
            </View>    
      </View>

    );
  }


const Stack = createNativeStackNavigator();



export default function App() {
 
 return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}  //First Screen
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#204656',
           
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 19,
            color: '#8f979a'
          },
        }} />   

        <Stack.Screen name="History" component={HistoryScreen} //Second Screen
        options={{
          title: 'History',
          headerStyle: {
            backgroundColor: '#204656',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 19,
            color: '#8f979a'
          },
        }}/>   
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    fontWeight: 20,
    backgroundColor: '#132932',
  },
  
  //Container for displaying final price and savings
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2f4d58',
    borderColor: '#182021',
    borderWidth: 3,
    height: 200,
    width: 230,
    margin: 20,
    padding: 5,
    borderRadius: 15,
    borderStyle: 'dotted'
  },

 //Button styles for Touchable Opacity
  button: {
    alignItems: "center",
    backgroundColor: "#132932",
    padding: 6,
    textAlign: "center",
    margin: 5,
    borderColor: '#dde3e4',
    borderRadius: 20,
    borderWidth: 1,
    width: 90, 
  },

  //Styling for the TextInput Fields
  textInputStyle: {
  alignContent: 'center',
  backgroundColor: '#0e3c4e',
  textShadowRadius: 1,
  fontSize: 18,
  borderColor: 'black',
  borderWidth: 2,
  margin: 5,
  height: 40,
  fontWeight: 'normal',
  textAlign: "center",
  padding: 2,
  fontFamily: 'sans-serif-light',
  color: 'black'
  },

//Styling for the text
  textStyle: {
    alignContent: 'center',
    fontSize: 17,
    borderColor: 'black',
    borderWidth: 1.8,
    borderRadius: 10,
    margin: 5,
    height: 35,
    width: 170,
    textAlign: "center",
    padding: 5,
    fontFamily: 'sans-serif',
    color: 'black',
    backgroundColor: '#21404c',
    },

    //Styling for the header "Discount App"
    headerStyle: {
      margin: 13,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center',
      color: '#719aa9',
      padding: 8,
      fontFamily:'Ms Gothic',
      borderStyle: 'double',
      borderWidth: 8,
      borderColor: '#43626d',
      alignContent: 'center',
      
    },

});
