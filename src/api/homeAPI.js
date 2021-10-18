import request from '../utils/request'

/**
 * 请求用户频道列表数据的 API
 * @returns Promise
 */
export const getUserChannelAPI = () => {
  return request.get('/v1_0/user/channels')
}

/**
 * 请求文章列表数据
 * @returns Promise
 */
export const getArticleListAPI = (id, time) => {
  return request.get('/v1_0/articles', {
    params: {
      channel_id: id, // 频道的 Id
      timestamp: time // 时间戳
    }
  })
}

/**
 * 将文章设置为不感兴趣（形参 id 是文章的 id）
 * @param {*} id ID
 * @returns Promise
 */
export const dislikeArticleAPI = id => {
  return request.post('/v1_0/article/dislikes', {
    target: id
  })
}
