import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  View,
  Modal,
} from 'react-native';
import Error from '../components/error';
import {baseimageUrl} from '../constants';
import {getmovieInfo, getmovieLink} from '../services/services';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import PlayButton from '../components/button';
import Video from '../components/video';

const placeHolder = require('../assets/images/placeholder.png');
const dimensions = Dimensions.get('screen');

const Detail = ({route, navigation}) => {
  const movie_id = route.params.movieId;
  const [movie, setMovieDetail] = useState();
  const [trailerLink, setTrailerLink] = useState('');
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    Promise.all([getmovieInfo(movie_id), getmovieLink(movie_id)])
      .then(([info, link]) => {
        setMovieDetail(info);
        setTrailerLink(link);
        setLoaded(true);
      })
      .catch(err => {
        setError(true);
        setLoaded(true);
      })
      .finally(onFinally => {});
  }, [movie_id]);

  const showVideo = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && !error && (
        <View>
          <ScrollView>
            {movie && (
              <Image
                style={styles.image}
                resizeMode="cover"
                source={
                  movie.poster_path
                    ? {uri: baseimageUrl + movie.poster_path}
                    : placeHolder
                }
              />
            )}

            <View style={styles.scroll}>
              <View style={styles.playButton}>
                <PlayButton onPress={showVideo} />
              </View>
              <Text style={styles.title}>{movie.title}</Text>
              {movie.genres && (
                <View style={styles.genreView}>
                  {movie.genres.map(genre => (
                    <Text key={genre.id} style={styles.genre}>
                      {genre.name}
                    </Text>
                  ))}
                </View>
              )}

              <StarRating
                disabled={true}
                fullStarColor={'gold'}
                starSize={30}
                maxStars={5}
                rating={movie.vote_average * 0.5}
              />

              <Text style={styles.overview}>{movie.overview}</Text>
              <Text style={styles.release}>
                {'Release Date: ' +
                  dateFormat(movie.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={['portrait', 'landscape']}
            animationType="slide"
            visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video
                onClose={showVideo}
                trailerUrl={
                  !trailerLink
                    ? trailerLink
                    : 'https://vjs.zencdn.net/v/oceans.mp4'
                }
              />
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size={'large'} />}
      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: dimensions.height * 0.4,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  genre: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginRight: 10,
  },
  genreView: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  overview: {
    padding: 15,
    alignContent: 'center',
  },
  release: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -30,
    right: 10,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
