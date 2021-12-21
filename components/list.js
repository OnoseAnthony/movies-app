import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import MovieCard from './movie_card';
import PropTypes from 'prop-types';

const propTypes = {
  content: PropTypes.object,
  title: PropTypes.object,
};

class List extends React.PureComponent {
  render() {
    const {title, content} = this.props;
    return (
      <View style={styles.section}>
        <View>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View>
          <FlatList
            data={content}
            renderItem={({item}) => <MovieCard movie={item} />}
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
