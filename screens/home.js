import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View, StyleSheet} from 'react-native';
import {baseimageUrl} from '../constants';
import {getPopularMovies, getUpcomingMovies} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/list';

const dimensions = Dimensions.get('screen');

const Home = () => {
  const [movieImages, setMovieImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getUpcomingMovies()
      .then(movies => {
        const imageArray = [];
        movies.forEach(movie => {
          imageArray.push(baseimageUrl + movie.poster_path);
        });
        setMovieImages(imageArray);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });

    getPopularMovies()
      .then(movies => {
        setPopularMovies(movies);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });
  }, []);

  return (
    <React.Fragment>
      <View style={styles.sliderContainer}>
        {/* <Text>{movie.original_title}</Text>
      <Text>{movie.original_title}</Text>
      <Text>{movie.original_title}</Text> */}
        <SliderBox
          images={movieImages}
          dotStyle={styles.dotStyle}
          sliderBoxHeight={dimensions.height * 0.65}
          autoplay={true}
          circleLoop={true}
        />
        {error && <Text style={{color: 'red'}}>error</Text>}
      </View>

      <View style={styles.carousel}>
        <List title="Popular Movies" content={popularMovies}></List>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    height: 0,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
