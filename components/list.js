import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import MovieCard from './movie_card';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};

class List extends React.PureComponent {
  render() {
    const {navigation, title, content} = this.props;
    return (
      <View style={styles.section}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View>
          <FlatList
            data={content}
            initialNumToRender={7}
            renderItem={({item}) => (
              <MovieCard navigation={navigation} movie={item} />
            )}
            horizontal={true}></FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  section: {
    marginTop: 25,
  },
});

List.propTypes = propTypes;
export default List;
