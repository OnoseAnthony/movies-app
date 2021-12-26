import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
import {baseimageUrl} from '../constants';
import PropTypes from 'prop-types';

const placeHolder = require('../assets/images/placeholder.png');

const propTypes = {
  item: PropTypes.object,
};
class MovieCard extends React.PureComponent {
  render() {
    const {navigation, movie} = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {movieId: movie.id})}
        style={styles.movieCard}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={
            movie.poster_path
              ? {uri: baseimageUrl + movie.poster_path}
              : placeHolder
          }
        />
        {!movie.poster_path && (
          <Text style={styles.placeholderText}>{movie.title}</Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  movieCard: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
  },

  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },

  placeholderText: {
    position: 'absolute',
    width: 120,
    top: 10,
    padding: 5,
    textAlign: 'center',
  },
});

MovieCard.propTypes = propTypes;
export default MovieCard;
