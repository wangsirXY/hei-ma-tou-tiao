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
 * @param {*} id 文章ID
 * @returns Promise
 */
export const dislikeArticleAPI = (id) => {
  return request.post('/v1_0/article/dislikes', {
    target: id
  })
}

/**
 * 举报文章内容
 * @param {String | Number} target 文章ID
 * @param {Number} type 文章类型
 * @returns Promise
 */
export const reportArticleAPI = (target, type) => {
  return request.post('/v1_0/article/reports', {
    target, // 文章的 Id
    type // 举报的类型
  })
}

/**
 * 获取所有频道数据的 API
 * @returns Promise
 */
export const getAllChannelAPI = () => {
  return request.get('/v1_0/channels')
}

/**
 * 更新用户频道列表数据的 API
 * @param { Array<Object> } channels [ {id, seq} ]
 * @returns Promise
 */
export const updateUserChannelAPI = channels => {
  return request.put('/v1_0/user/channels', {
    channels
  })
}
