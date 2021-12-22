import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View, StyleSheet, ScrollView} from 'react-native';
import {baseimageUrl} from '../constants';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyShows,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/list';

const dimensions = Dimensions.get('screen');

const Home = () => {
  const [movieImages, setMovieImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [familyTvShows, setFamilyTvShows] = useState([]);
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
      .then(popularMovies => {
        const movieArray = [];
        popularMovies.forEach(movie => {
          movieArray.push(movie);
        });
        setPopularMovies(movieArray);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });

    getPopularTv()
      .then(popularTv => {
        const movieArray = [];
        popularTv.forEach(movie => {
          movieArray.push(movie);
        });
        setPopularTvShows(movieArray);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });

    getFamilyShows()
      .then(familyShows => {
        const movieArray = [];
        familyShows.forEach(movie => {
          movieArray.push(movie);
        });
        setFamilyTvShows(movieArray);
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });
  }, []);

  return (
    <React.Fragment>
      <ScrollView>
        <View style={styles.sliderContainer}>
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
          <List title={'Popular Movies'} content={popularMovies} />
        </View>
        <View style={styles.carousel}>
          <List title={'Tv Shows'} content={popularTvShows} />
        </View>
        <View style={styles.carousel}>
          <List title={'Family Shows'} content={familyTvShows} />
        </View>
      </ScrollView>
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
