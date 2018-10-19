import React, { Component } from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

@connect(({ user }) => ({
  user: user.currentUser,
}))
class CommentShare extends Component {
  render() {
    const name = R.path(['user', 'realname'])(this.props);
    const title = R.path(['user', 'title'])(this.props);
    const company = R.path(['user', 'company'])(this.props);
    const avatar_url = R.path(['user', 'avatar_url'])(this.props);
    const comment = R.path(['comment'])(this.props);

    const showCommentHeader = name && title && company && avatar_url;
    return (
      <View style={style.container}>
        {showCommentHeader && (
          <View>
            <View style={style.poster.avatar}>
              <ImageBackground
                source={require('asset/coin_share/avatar_background.png')}
                style={{ width: 110, height: 110, alignItems: 'center', justifyContent: 'center' }}
              >
                <Image
                  source={avatar_url ? { uri: avatar_url } : require('asset/project/project_logo_default.png')}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              </ImageBackground>
            </View>
            <View style={style.poster.detail}>
              <View style={style.poster.name}>
                <Text style={style.poster.nameText}>{name}</Text>
              </View>
              <Text style={style.poster.titleText}>{company || ''} {title || ''}</Text>
            </View>
          </View>
        )}
        <View style={{ marginTop: 15 }}>
          <Text style={style.poster.commentText}>{comment}</Text>
          <Image
            source={require('asset/coin_share/comment_arrow.png')}
            style={{ width: 659 / 2, height: 10, marginBottom: 23.75, marginTop: 10 }}
          />
        </View>
      </View>
    );
  }
}

CommentShare.propTypes = {};
CommentShare.defaultProps = {};

const style = {
  container: { zIndex: 20, marginHorizontal: 20, marginTop: 37.5 },
  poster: {
    avatar: {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 10,
    },
    container: {
      position: 'relative',
      zIndex: 5,
    },
    detail: {
      height: 110,
    },
    name: {
      width: 152,
      height: 36.5,
      backgroundColor: 'white',
      borderRadius: 2,
      marginLeft: 92,
      marginTop: 21.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    commentText: { fontFamily: 'PingFangSC-Medium', fontSize: 16, color: '#FFFFFF', letterSpacing: 0.19, lineHeight: 27, textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2, textShadowColor: 'rgba(18,41,50,0.25)' },
    nameText: { fontSize: 20, color: '#1890FF', letterSpacing: 0.24, fontFamily: 'PingFangSC-Medium' },
    titleText: { fontSize: 13, color: '#FFFFFF', letterSpacing: 0.15, marginTop: 15, marginLeft: 114, fontFamily: 'PingFangSC-Medium' },
  },
};
export default CommentShare;
