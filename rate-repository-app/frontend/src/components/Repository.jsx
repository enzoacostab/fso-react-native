import Text from "./Text";
import { View, Image, Pressable, FlatList, StyleSheet } from "react-native";
import theme from "../theme";
import React, { useState, useEffect } from "react";
import { useRepository } from "../hooks/useRepository";
import { openURL } from 'expo-linking';

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
	language:{
		padding: 5,
		borderRadius: 5,
		maxWidth: 100,
		textAlign: "center",
		color: "white",
		backgroundColor: theme.colors.primary
	},
	center:{
		justifyContent: "center",
		alignItems: "center"
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

const RepositoryInfo = ({repository}) => {
	return (
		<View>
			<View style={style.container}>
				<View style={style.div}>
					<Image style={theme.logo} source={{uri:repository.ownerAvatarUrl}}></Image>
					<View style={style.divC}>
						<Text fontWeight="bold" fontSize="subheading" testID='fullName'>{repository.fullName}</Text>
						<Text testID='description'>{repository.description}</Text>
						<Text fontWeight="bold" style={style.language} testID='language'>{repository.language}</Text>
					</View>
				</View>
				<View style={style.div}>
					<View style={style.center}>
						<Text fontWeight="bold" testID='stargazersCount'>{(repository.stargazersCount/1000).toFixed(1)+"k"}</Text>
						<Text>Stars</Text>
					</View>
					<View style={style.center}>
						<Text fontWeight="bold" testID='forksCount'>{(repository.forksCount/1000).toFixed(1)+"k"}</Text>
						<Text>Forks</Text>
					</View>
					<View style={style.center}>
						<Text fontWeight="bold" testID='reviewCount'>{repository.reviewCount}</Text>
						<Text>Reviews</Text>
					</View>
					<View style={style.center}>
						<Text fontWeight="bold" testID='ratingAverage'>{repository.ratingAverage}</Text>
						<Text>Rating</Text>
					</View>
				</View>
				<Pressable onPress={() => openURL(`https://github.com/${repository.fullName}`)}>
					<Text bg="primary" style={theme.button} fontWeight={"bold"} color="white">Open in GitHub</Text>
				</Pressable>
			</View>
			<ItemSeparator/>
		</View>
	);
};

const ReviewItem = ({ review }) => {
	return (
		<View style={style.container}>
			<View style={style.div}>
				<Text fontWeight='bold' color='primary' style={style.rating}>{review.rating}</Text>
				<View style={style.divC}>
					<Text fontWeight="bold" fontSize="subheading" testID='username'>{review.user && review.user.username}</Text>
					<Text color='textSecondary' testID='createdAt'>{review.createdAt.toString()}</Text>
					<Text testID='text' style={{marginTop: 5}}>{review.text}</Text>
				</View>
			</View>
		</View>
	);
};

const Repository = ({route}) => {
	const {repository} = route.params;
	const {data, fetchMore, loading} = useRepository(repository.id, {first:10});
	const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (data){
      setReviews(data.repository?.reviews?.edges?.map(e => e.node));
    }
  }, [data, loading]);
	
	const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
			ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ _id }, i) => _id+i}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
			onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Repository;