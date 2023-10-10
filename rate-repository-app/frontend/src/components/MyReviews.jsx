import Text from "./Text";
import React, { useState, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet, Pressable, Alert, ActivityIndicator } from "react-native";
import theme from "../theme";
import useUser from "../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import { context } from "../context/Context";
import useReview from "../hooks/useReview";

const style = StyleSheet.create({
	container:{
		backgroundColor: "white",
		padding: 20
	},
	divC:{
		justifyContent: "space-between",
		width:"90%",
		paddingRight:20,
		paddingLeft:20,
		gap: 2,
	},
	div:{
		flexDirection: "row",
		justifyContent:"space-between",
		padding: 5
	},
	rating:{
		borderWidth:2,
		borderRadius:100,
		borderColor:theme.colors.primary,
		width:50,
		height:50,
		paddingTop:12,
		textAlign:'center',
	},
	separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={style.separator} />;

const ReviewItem = ({ review }) => {
	const navigation = useNavigation();
	const {repositories} = useContext(context);
	const repository = repositories.edges.find(e => e.node.id === review.repositoryId);
	const repId = review.repositoryId.split('.');
	const {deleteReview} = useReview();

	const handleDelete = async() => {
		Alert.alert('Delete review', 'Are you sure you want to delete this review?',
    [{
      text: 'Cancel',
    },
    {
      text: 'Delete',
      onPress: async() => {
        try{
					await deleteReview(review._id);
				}
				catch(e){
					console.log(e);
				}
      }
    }]);
	};

  return (
		<View style={style.container}>
			<View style={style.div}>
				<Text fontWeight='bold' color='primary' style={style.rating}>{review.rating}</Text>
				<View style={style.divC}>
					<Text fontWeight="bold" fontSize="subheading" testID='repositoryId'>{`${repId[0]}/${repId[1]}`}</Text>
					<Text color='textSecondary' testID='createdAt'>{review.createdAt}</Text>
					<Text testID='text' style={{marginTop: 5}}>{review.text}</Text>
				</View>
			</View>
			<View style={style.div}>
				<Pressable testID="submit" onPress={() => navigation.navigate("Repository", {repository : repository.node})}>
					<Text bg="primary" style={theme.button} fontWeight={"bold"} color="white">View repository</Text>
				</Pressable>
				<Pressable testID="submit" onPress={handleDelete}>
					<Text bg="danger" style={theme.button} fontWeight={"bold"} color="white">Delete review</Text>
				</Pressable>
			</View>
		</View>
	);
};

const MyReviews = () => {
	const {data, loading} = useUser({includeReviews: true});
	const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (data){
      setReviews(data?.me?.reviews?.edges?.map(e => e.node));
    }
  }, [data]);
	
	if (loading) return (
	<View style={{flex:1, justifyContent:"center"}}>
		<ActivityIndicator size={"large"}/>
	</View>);

  return (
    <FlatList
      data={reviews}
			ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item}/>}
      keyExtractor={({ _id }, i) => _id+i}
    />
  );
};

export default MyReviews;