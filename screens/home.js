import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {baseimageUrl} from '../constants';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTv,
  getFamilyShows,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/list';
import Error from '../components/error';

const dimensions = Dimensions.get('screen');

const getData = () => {
  return Promise.all([
    getUpcomingMovies(),
    getPopularMovies(),
    getPopularTv(),
    getFamilyShows(),
  ]);
};

const Home = ({navigation}) => {
  const [movieImages, setMovieImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [familyTvShows, setFamilyTvShows] = useState([]);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTvData,
          familyMoviesData,
        ]) => {
          const moviesImagesArray = [];
          upcomingMoviesData.forEach(movie => {
            moviesImagesArray.push(baseimageUrl + movie.poster_path);
          });

          const popularMovieArray = [];
          popularMoviesData.forEach(movie => {
            popularMovieArray.push(movie);
          });

          const popularTvArray = [];
          popularTvData.forEach(movie => {
            popularTvArray.push(movie);
          });

          const familyTvArray = [];
          familyMoviesData.forEach(movie => {
            familyTvArray.push(movie);
          });

          setMovieImages(moviesImagesArray);
          setPopularMovies(popularMovieArray);
          setPopularTvShows(popularTvArray);
          setFamilyTvShows(familyTvArray);
        },
      )
      .catch(() => {
        setError(err);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      {loaded && !error && (
        <ScrollView>
          {movieImages && (
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
          )}
          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Popular Movies'}
                content={popularMovies}
              />
            </View>
          )}
          {popularTvShows && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Tv Shows'}
                content={popularTvShows}
              />
            </View>
          )}
          {familyTvShows && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Family Shows'}
                content={familyTvShows}
              />
            </View>
          )}
        </ScrollView>
      )}

      {!loaded && <ActivityIndicator size={'large'} />}
      {error && <Error />}
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
