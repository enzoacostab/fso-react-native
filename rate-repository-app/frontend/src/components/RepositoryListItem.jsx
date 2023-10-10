import Text from "./Text";
import { View, Image, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../theme";
import React from "react";

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
		gap: 10,
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
	}
});

const RepositoryListItem = ({item}) => {
	const navigation = useNavigation();

	const handlePress = () => {
		navigation.navigate("Repository", {repository : item});
	};

	return (
		<Pressable onPress={handlePress}>
			<View style={style.container}>
				<View style={style.div}>
					<Image style={theme.logo} source={{uri:item.ownerAvatarUrl}}></Image>
					<View style={style.divC}>
						<Text fontWeight="bold" fontSize="subheading" testID='fullName'>{item.fullName}</Text>
						<Text testID='description'>{item.description}</Text>
						<Text fontWeight="bold" style={style.language} testID='language'>{item.language}</Text>
					</View>
				</View>
				<View style={style.div}>
					<View style={style.center}>
						<Text fontWeight="bold" testID='stargazersCount'>{(item.stargazersCount/1000).toFixed(1)+"k"}</Text>
						<Text>Stars</Text>
					</View>
					<View style={style.center}>
						<Text fontWeight="bold" testID='forksCount'>{(item.forksCount/1000).toFixed(1)+"k"}</Text>
						<Text>Forks</Text>
					</View>
					<View style={style.center}>
						<Text fontWeight="bold" testID='reviewCount'>{item.reviewCount}</Text>
						<Text>Reviews</Text>
					</View>
					<View style={style.center}>
						<Text fontWeight="bold" testID='ratingAverage'>{item.ratingAverage}</Text>
						<Text>Rating</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default RepositoryListItem;