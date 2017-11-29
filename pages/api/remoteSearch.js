import request from '~/pages/utils/request'

export function userSearch(name) {
    return request({
        url: '/search/user',
        method: 'get',
        params: {name}
    })
}
